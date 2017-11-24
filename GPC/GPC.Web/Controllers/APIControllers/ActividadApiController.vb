Imports System.Data.Entity
Imports System.Net
Imports System.Threading.Tasks
Imports System.Web.Http
Imports GPC.Data
Imports GPC.Clases
Imports GPC.Web.Models

Namespace Controllers.APIControllers
    <RoutePrefix("api/actividades")>
    Public Class ActividadApiController
        Inherits ApiController

#Region "CrearActividad"
        <Route("crear", Name:="crearActividad")>
        <HttpPost>
        Public Async Function CrearActividad(<FromBody> model As ActividadModel) As Task(Of IHttpActionResult)

            Dim db As New GpcDBContext()
            Dim actividad As Actividad = Nothing

            Try
                actividad = db.Actividades.Create()
                actividad.Nombre = model.Nombre
                actividad.Descripcion = model.Descripcion
                actividad.FechaInicio = model.FechaInicio
                actividad.FechaTermino = model.FechaTermino
                actividad.Ubicacion = model.Ubicacion

                db.Actividades.Add(actividad)
                Await db.SaveChangesAsync()
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, String.Format("Problemas para crear actividad. Error: {0}", ex.Message))
            Finally
                db.Dispose()
            End Try
            Return Me.CreatedAtRoute("crearActividad", New With {.nombre = actividad.Nombre}, "Actividad creada exitosamente")
        End Function

#End Region

    End Class
End Namespace