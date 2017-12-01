Imports System.Data.Entity
Imports System.Net
Imports System.Threading.Tasks
Imports System.Web.Http
Imports GPC.Data
Imports GPC.Clases
Imports GPC.Web.Models

Namespace Controllers.APIControllers
    <RoutePrefix("api/postulaciones")>
    Public Class PostulacionApiController
        Inherits ApiController

#Region "CrearPostulacion"
        <Route("crear", Name:="crearPostulacion")>
        <HttpPost>
        Public Async Function CrearPostulacion(<FromBody> model As PostulacionModel) As Task(Of IHttpActionResult)

            Dim db As New GpcDBContext()
            Dim usuario As Postulacion = Nothing

            Try
                If Await db.Postulaciones.AnyAsync(Function(u) u.Run = model.Run) Then
                    Return Me.Content(HttpStatusCode.BadRequest, $"Ya existe una postulación asociada al run {model.Run}")
                End If

                usuario = db.Postulaciones.Create()
                usuario.Email = model.Email
                usuario.Run = model.Run
                usuario.Curriculum = Encoding.ASCII.GetBytes(model.Curriculum)
                usuario.Ubicacion = model.Ubicacion
                usuario.EsActivo = True
                usuario.Asociado = model.Asociado
                usuario.FechaPostulacion = Now

                db.Postulaciones.Add(usuario)
                Await db.SaveChangesAsync()
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, String.Format("Problemas para enviar postulación. Error: {0}", ex.Message))
            Finally
                db.Dispose()
            End Try
            Return Me.CreatedAtRoute("crearPostulacion", New With {.Run = usuario.Run}, "Postulación enviada")
        End Function

#End Region

#Region "GetPostulaciones"
        <Route("get-postulaciones", Name:="getPostulaciones")>
        <HttpGet>
        Public Async Function GetPostulaciones() As Task(Of IHttpActionResult)
            Dim db As New GpcDBContext()
            Dim usuarios As List(Of PostulacionModel) = Nothing
            Dim user As PostulacionModel = Nothing
            Dim usuariosFinal As List(Of PostulacionModel) = New List(Of PostulacionModel)

            Try
                usuarios = Await db.Postulaciones _
                           .Select(Function(u) New PostulacionModel With {
                                                               .ID = u.ID,
                                                               .Run = u.Run,
                                                               .Asociado = u.Asociado,
                                                               .Email = u.Email,
                                                               .EsActivo = u.EsActivo,
                                                               .FechaPostulacion = u.FechaPostulacion,
                                                               .Ubicacion = u.Ubicacion,
                                                               .CurriculumByte = u.Curriculum
                                                            }) _
                           .ToListAsync()

                For Each user In usuarios
                    user.Curriculum = Encoding.Default.GetString(user.CurriculumByte)
                    usuariosFinal.Add(user)
                Next

                Return Me.Ok(usuarios)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, String.Format("Problemas para retornar postulaciones. Error: {0}", ex.Message))
            Finally
                db.Dispose()
            End Try
        End Function
#End Region

    End Class
End Namespace
