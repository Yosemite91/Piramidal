Imports System.Data.Entity
Imports System.Net
Imports System.Threading.Tasks
Imports System.Web.Http
Imports GPC.Data
Imports GPC.Web.Models
Imports System.Security.Cryptography
Imports GPC.Clases

Namespace Controllers.APIControllers
    <RoutePrefix("api/login")>
    Public Class LoginApiController
        Inherits ApiController

#Region "Validar Login"
        <Route("", Name:="ValidarLogin")>
        <HttpPost>
        Public Async Function ValidarLogin(<FromBody> model As LoginModel) As Task(Of IHttpActionResult)
            Dim db As New GpcDBContext()
            Dim usuario As New Usuario
            Try
                If (Not Me.ModelState.IsValid) Then
                    Return Me.BadRequest(Me.ModelState)
                End If

                Dim user As Usuario = Await db.Usuarios.SingleOrDefaultAsync(Function(u) u.Run = model.Run)

                If user Is Nothing Then
                    Return Me.Content(HttpStatusCode.BadRequest, "Usuario No Registrado.")
                End If

                If Not CheckPassword(user, model.Contrasena) Then
                    Return Me.Content(HttpStatusCode.BadRequest, "Contraseña Inválida.")
                End If

                If Not user.EsActivo Then Return Me.Content(HttpStatusCode.BadRequest, "Usuario no activo.")

                Dim tokenActual As String = RandomString(10)
                Dim entity As Token = db.Token.Create()
                entity.UsuarioID = user.ID
                entity.Run = user.Run
                entity.TokenActual = tokenActual
                entity.Fecha = Now()
                db.Token.Add(entity)
                Await db.SaveChangesAsync()
                Return Me.Ok(New With {
                                    .Run = user.Run,
                                    .Token = Modules.BasicAuthHttpModule.Encode(user.ID, tokenActual),
                                    .EsAdministrador = user.EsAdministrador,
                                    .EsColaborador = user.EsColaborador
                                })
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message())
            Finally
                db.Dispose()
            End Try

        End Function
#End Region

        Private Function CheckPassword(user As Usuario, password As String) As Boolean
            Return AreEqual(user.Password, password)
        End Function

        Public Function AreEqual(saltedPassword As String, password As String) As Boolean
            Dim delim As String = "*"
            If String.IsNullOrEmpty(saltedPassword) Then
                Return String.IsNullOrEmpty(password)
            End If
            If String.IsNullOrEmpty(password) Then
                Return False
            End If
            Dim delimPos As Integer = saltedPassword.IndexOf(delim)
            If delimPos <= 0 Then
                Return saltedPassword.Equals(password)
            Else
                Dim calculatedSaltedPassword As String = SaltPassword(password, saltedPassword.Substring(0, delimPos))
                Dim expectedSaltedPassword As String = saltedPassword.Substring(delimPos + delim.Length)
                If expectedSaltedPassword.Equals(calculatedSaltedPassword) Then
                    Return True
                End If
                Return expectedSaltedPassword.Equals(SaltPassword(password, "System.Byte[]"))
            End If
        End Function

        Public Function SaltPassword(password As String, salt As String) As String
            Dim hashAlgorithm As SHA512 = SHA512.Create()
            Return Convert.ToBase64String(hashAlgorithm.ComputeHash(System.Text.Encoding.UTF8.GetBytes(salt & password)))
        End Function

        Public Function RandomString(cb As Integer) As String
            Randomize()
            Dim rgch As String
            rgch = "abcdefghijklmnopqrstuvwxyz"
            rgch = rgch & UCase(rgch) & "0123456789"

            Dim i As Long
            Dim result As String = String.Empty
            For i = 1 To cb
                result &= Mid$(rgch, CInt(Int(Rnd() * Len(rgch) + 1)), 1)
            Next
            Return result
        End Function

    End Class
End Namespace
