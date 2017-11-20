Imports System.Data.Entity
Imports System.Net
Imports System.Threading.Tasks
Imports System.Web.Http
Imports GPC.Data
Imports GPC.Clases
Imports GPC.Web.Models

Namespace Controllers.APIControllers
    <RoutePrefix("api/usuarios")>
    Public Class UsuarioApiController
        Inherits ApiController


#Region "CrearUsuario"
        <Route("crear", Name:="crearUsuario")>
        <HttpPost>
        Public Async Function CrearUsuario(<FromBody> model As UsuarioModel) As Task(Of IHttpActionResult)

            Dim db As New GpcDBContext()
            Dim usuario As Usuario = Nothing

            Try
                If Await db.Usuarios.AnyAsync(Function(u) u.Run = model.Run) Then
                    Return Me.Content(HttpStatusCode.BadRequest, $"Ya existe un usuario con el run {model.Run}")
                End If

                usuario = db.Usuarios.Create()
                usuario.Nombre = model.Nombre
                usuario.Apellido = model.Apellido
                usuario.Email = model.Email
                usuario.Telefono = model.Telefono
                usuario.Run = model.Run
                usuario.Password = My.Settings.PasswordDefault
                usuario.FechaNacimiento = model.FechaNacimiento
                usuario.Foto = Encoding.ASCII.GetBytes(model.Foto)
                usuario.Ubicacion = 0 'model.Ubicacion
                usuario.EsActivo = True
                usuario.EsAdministrador = model.EsAdministrador
                usuario.EsColaborador = model.EsColaborador
                usuario.Asociado = 0 'model.Asociado
                usuario.AnioIngreso = Now

                db.Usuarios.Add(usuario)
                Await db.SaveChangesAsync()
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, String.Format("Problemas para crear usuario. Error: {0}", ex.Message))
            Finally
                db.Dispose()
            End Try
            Return Me.CreatedAtRoute("crearUsuario", New With {.Run = usuario.Run}, "Usuario creado exitosamente")
        End Function

#End Region

#Region "GetUsuario"
        <Route("get/{run:regex(^[1-9][0-9]{0,7}-[0-9kK]$)}", Name:="getUsuario")>
        <HttpGet>
        Public Async Function GetUsuario(run As String) As Task(Of IHttpActionResult)
            Dim db As New GpcDBContext()
            Dim result As UsuarioModel = Nothing
            Try

                Dim user As Usuario = Await db.Usuarios.Where(Function(u) u.Run = run).SingleOrDefaultAsync()
                result = New UsuarioModel With {
                    .Nombre = user.Nombre,
                    .Apellido = user.Apellido,
                    .Run = user.Run,
                    .Telefono = user.Telefono,
                    .FechaNacimiento = user.FechaNacimiento,
                    .EsActivo = user.EsActivo,
                    .EsAdministrador = user.EsAdministrador,
                    .EsColaborador = user.EsColaborador,
                    .Email = user.Email,
                    .AnioIngreso = user.AnioIngreso,
                    .Asociado = user.Asociado,
                    .Ubicacion = user.Ubicacion,
                    .Foto = Encoding.Default.GetString(user.Foto)
                }
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, String.Format("Problemas para retornar usuario. Error: {0}", ex.Message))
            Finally
                db.Dispose()
            End Try

            If result IsNot Nothing Then Return Me.Ok(result)
            Return Me.Content(HttpStatusCode.NotFound, "Información no encontrada")

        End Function
#End Region

    End Class




End Namespace