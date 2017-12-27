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
                actividad.CreadorID = 1

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

#Region "Get Actividad"
        <Route("detalle/{id:int}", Name:="getActividad")>
        <HttpGet>
        Public Async Function GetActividad(id As Integer) As Task(Of IHttpActionResult)
            Dim db As New GpcDBContext()
            Dim result As ActividadModel = Nothing
            Try

                result = Await db.Actividades.Where(Function(u) u.ID = id) _
                            .Select(Function(u) New ActividadModel With {
                                                                    .Nombre = u.Nombre,
                                                                    .Descripcion = u.Descripcion,
                                                                    .FechaInicio = u.FechaInicio,
                                                                    .FechaTermino = u.FechaTermino,
                                                                    .Ubicacion = u.Ubicacion,
                                                                    .ID = u.ID
                                                                  }) _
                            .SingleOrDefaultAsync()

                Select Case result.Ubicacion
                    Case 0
                        result.UbicacionStr = "Metropolitana"
                    Case 1
                        result.UbicacionStr = "Tarapaca"
                    Case 2
                        result.UbicacionStr = "Antofagasta"
                    Case 3
                        result.UbicacionStr = "Atacama"
                    Case 4
                        result.UbicacionStr = "Coquimbo"
                    Case 5
                        result.UbicacionStr = "Valparaiso"
                    Case 6
                        result.UbicacionStr = "Ohiggins"
                    Case 7
                        result.UbicacionStr = "Maule"
                    Case 8
                        result.UbicacionStr = "BioBio"
                    Case 9
                        result.UbicacionStr = "Araucania"
                    Case 10
                        result.UbicacionStr = "LosRios"
                    Case 11
                        result.UbicacionStr = "LosLagos"
                    Case 12
                        result.UbicacionStr = "Aysen"
                    Case 13
                        result.UbicacionStr = "MagallanesAntartica"
                    Case 14
                        result.UbicacionStr = "AricaParinacota"
                End Select

            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, String.Format("Problemas para retornar la actividad. Error: {0}", ex.Message))
            Finally
                db.Dispose()
            End Try

            If result IsNot Nothing Then Return Me.Ok(result)
            Return Me.Content(HttpStatusCode.NotFound, "Información no encontrada")

        End Function
#End Region

#Region "Editar Actividad"
        <Route("editar", Name:="Editar actividad")>
        <HttpPut>
        Public Async Function PutActividad(<FromBody> model As ActividadModel) As Task(Of IHttpActionResult)
            Dim db As New GpcDBContext()
            Dim actividad As New Actividad

            Try
                actividad = db.Actividades.Find(model.ID)
                With actividad
                    .Nombre = model.Nombre
                    .Descripcion = model.Descripcion
                    .FechaInicio = model.FechaInicio
                    .FechaTermino = model.FechaTermino
                    .Ubicacion = model.Ubicacion
                End With

                Await db.SaveChangesAsync()
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, "Problemas para guardar cambios")
            Finally
                db.Dispose()
            End Try
            Return Me.CreatedAtRoute("Editar Actividad", New With {.ID = actividad.ID}, "Actividad Modificado exitosamente")
        End Function
#End Region

#Region "Lista Actividades"
        <Route("lista", Name:="GetActividades")>
        <HttpGet>
        Public Async Function GetPremios() As Task(Of IHttpActionResult)
            Dim db As New GpcDBContext
            Dim actividades As List(Of ActividadModel) = Nothing

            Try
                actividades = Await db.Actividades _
                           .Select(Function(u) New ActividadModel With {
                                                               .ID = u.ID,
                                                               .Nombre = u.Nombre,
                                                               .Descripcion = u.Descripcion,
                                                               .FechaInicio = u.FechaInicio,
                                                               .FechaTermino = u.FechaTermino
                                                            }) _
                           .ToListAsync()

                Return Me.Ok(actividades)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, String.Format("Problemas para retornar premios. Error: {0}", ex.Message))
            Finally
                db.Dispose()
            End Try

        End Function
#End Region

#Region "Calendario Actividades"
        <Route("calendario/{ubi:int}", Name:="GetCalendario")>
        <HttpGet>
        Public Async Function GetPremios2(ubi As Integer) As Task(Of IHttpActionResult)
            Dim db As New GpcDBContext
            Dim actividades As List(Of CalendarioModel) = Nothing

            Try
                actividades = Await db.Actividades _
                           .Where(Function(u) u.Ubicacion = ubi) _
                           .Select(Function(u) New CalendarioModel With {
                                                               .Text = u.Nombre,
                                                               .StartDate = u.FechaInicio,
                                                               .EndDate = u.FechaTermino
                                                            }) _
                           .ToListAsync()

                Return Me.Ok(actividades)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, String.Format("Problemas para retornar calendario. Error: {0}", ex.Message))
            Finally
                db.Dispose()
            End Try

        End Function
#End Region

    End Class
End Namespace