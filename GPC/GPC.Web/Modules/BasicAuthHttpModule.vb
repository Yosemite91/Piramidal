Imports System.Net.Http.Headers
Imports System.Security.Principal
Imports System.Threading
Imports GPC.Clases
Imports GPC.Data

Namespace Modules
    Public Class BasicAuthHttpModule
        Implements IHttpModule

        Private ReadOnly _manager As GpcDbContext

        Public Sub New()
            _manager = New GpcDBContext()
        End Sub

        Public Sub New(manager As GpcDBContext)
            _manager = manager
        End Sub

        Public Sub Init(context As System.Web.HttpApplication) Implements System.Web.IHttpModule.Init
            ' Register event handlers
            AddHandler context.AuthenticateRequest, AddressOf OnApplicationAuthenticateRequest
            AddHandler context.EndRequest, AddressOf OnApplicationEndRequest
        End Sub

        Private Shared Sub SetPrincipal(principal As IPrincipal)
            Thread.CurrentPrincipal = principal
            If HttpContext.Current IsNot Nothing Then
                HttpContext.Current.User = principal
            End If
        End Sub

        Private Function CheckToken(userId As Integer, password As String) As Usuario
            Dim token As New Token
            Dim user As Usuario = Nothing

            Try
                token = _manager.Token.Where(Function(t) t.UsuarioID = userId AndAlso t.TokenActual = password).SingleOrDefault()
                user = _manager.Usuarios.Where(Function(u) u.ID = token.UsuarioID).SingleOrDefault()
            Catch ex As Exception

            End Try

            Return If(token IsNot Nothing AndAlso user IsNot Nothing, user, Nothing)
        End Function

        Friend Structure UserCredentials
            Public Property UserID As Integer
            Public Property Token As String
        End Structure

        Friend Shared Function Encode(userID As Integer, token As String) As String
            Return Convert.ToBase64String(Encoding.GetEncoding("iso-8859-1").GetBytes(String.Format("{0}:{1}", userID, token)))
        End Function

        Friend Shared Function Encode(credentials As UserCredentials) As String
            Return Encode(credentials.UserID, credentials.Token)
        End Function

        Friend Shared Function Decode(credentials As String) As UserCredentials
            Dim decoded As String() = Encoding.GetEncoding("iso-8859-1").GetString(Convert.FromBase64String(credentials)).Split({":"c}, 2)
            Return New UserCredentials With {.UserID = CInt(decoded(0)), .Token = decoded(1)}
        End Function

        Private Function AuthenticateUser(credentials As String) As Boolean
            Dim validated As Boolean = False
            Try
                Dim creds As UserCredentials = Decode(credentials)
                Dim usuario As Usuario = CheckToken(creds.UserID, creds.Token)
                If usuario IsNot Nothing Then
                    validated = True
                    Dim identity As New SuiteIdentity(usuario)
                    SetPrincipal(New SuitePrincipal(identity, _manager))
                End If

            Catch ex As FormatException
                ' Credentials were not formatted correctly.
                validated = False
            End Try
            Return validated
        End Function

        Private Sub OnApplicationAuthenticateRequest(sender As Object, e As EventArgs)
            Dim request As HttpRequest = HttpContext.Current.Request
            Dim authHeader As String = request.Headers("Authorization")
            If authHeader IsNot Nothing Then
                Dim authHeaderVal As AuthenticationHeaderValue = AuthenticationHeaderValue.Parse(authHeader)

                ' RFC 2617 sec 1.2, "scheme" name is case-insensitive
                If authHeaderVal.Scheme.Equals("basic", StringComparison.OrdinalIgnoreCase) AndAlso authHeaderVal.Parameter IsNot Nothing Then
                    AuthenticateUser(authHeaderVal.Parameter)
                End If
            Else
                Dim auth As String = request.QueryString("authorization")
                If Not String.IsNullOrWhiteSpace(auth) Then
                    AuthenticateUser(auth)
                End If
            End If
        End Sub

        ' If the request was unauthorized, add the WWW-Authenticate header to the response.
        Private Shared Sub OnApplicationEndRequest(sender As Object, e As EventArgs)
            Dim response As HttpResponse = HttpContext.Current.Response
            If response.StatusCode = 401 Then
                'response.Headers.Add("WWW-Authenticate", String.Format("Basic realm=""{0}""", Realm))
            End If
        End Sub

        Public Sub Dispose() Implements IHttpModule.Dispose

        End Sub
    End Class

    Public Class SuiteIdentity
        Implements IIdentity

        Private ReadOnly _user As Usuario
        Public Sub New(user As Usuario)
            _user = user
        End Sub

        Public ReadOnly Property User As Usuario
            Get
                Return _user
            End Get
        End Property


        Public ReadOnly Property AuthenticationType As String Implements IIdentity.AuthenticationType
            Get
                Return "Basic"
            End Get
        End Property

        Public ReadOnly Property IsAuthenticated As Boolean Implements IIdentity.IsAuthenticated
            Get
                Return _user IsNot Nothing
            End Get
        End Property

        Public ReadOnly Property Name As String Implements IIdentity.Name
            Get
                Return String.Format("{0}", User.Nombre)
            End Get
        End Property
    End Class

    Public Class SuitePrincipal
        Implements IPrincipal

        Private ReadOnly _identity As SuiteIdentity
        Private ReadOnly _db As GpcDBContext
        Public Sub New(identity As SuiteIdentity, db As GpcDBContext)
            _db = db
            _identity = identity
        End Sub

        Public ReadOnly Property Identity As SuiteIdentity
            Get
                Return _identity
            End Get
        End Property

        Private ReadOnly Property IPrincipal_Identity As IIdentity Implements IPrincipal.Identity
            Get
                Return _identity
            End Get
        End Property

        Public Function IsInRole(role As String) As Boolean Implements IPrincipal.IsInRole
            Select Case role
                Case "Administrador"
                    Return Identity.User.EsAdministrador
                Case "Colaborador"
                    Return Identity.User.EsColaborador
                Case Else
                    Return False
            End Select
        End Function

    End Class
End Namespace
