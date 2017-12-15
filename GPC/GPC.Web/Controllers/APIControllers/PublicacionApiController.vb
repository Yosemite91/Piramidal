﻿Imports System.Data.Entity
Imports System.Net
Imports System.Threading.Tasks
Imports System.Web.Http
Imports GPC.Data
Imports GPC.Clases
Imports AutoMapper.QueryableExtensions
Imports GPC.Web.Models

Namespace Controllers.APIControllers
    <RoutePrefix("api/publicaciones")>
    Public Class PublicacionApiController
        Inherits ApiController


#Region "Crear Publicacion"
        <Route("crear", Name:="crearPublicacion")>
        <HttpPost>
        Public Async Function CrearPublicacion(<FromBody> model As PublicacionModel) As Task(Of IHttpActionResult)

            Dim db As New GpcDBContext()
            Dim publicacion As Publicacion = Nothing


            Try
                publicacion = db.Publicaciones.Create()
                With publicacion
                    .Titulo = model.Titulo
                    .Descripcion = model.Descripcion
                    .Foto = Encoding.ASCII.GetBytes(model.Foto)
                    .FechaPublicacion = Now
                    .EsActivo = True
                    .CreadorID = 1 'Se requiere que exista un creador
                End With

                db.Publicaciones.Add(publicacion)
                Await db.SaveChangesAsync()
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, String.Format("Problemas para crear publicacion. Error: {0}", ex.Message))
            Finally
                db.Dispose()
            End Try
            Return Me.CreatedAtRoute("crearPublicacion", New With {.ID = publicacion.ID}, "Publicación creado exitosamente")
        End Function
#End Region

#Region "Detalle Publicacion"
        <Route("get/{id:int}", Name:="DetallePublicacion")>
        <HttpGet>
        Public Async Function DetallePublicacion(id As Integer) As Task(Of IHttpActionResult)
            Dim db As New GpcDBContext()
            Dim result As PublicacionModel = New PublicacionModel

            Try
                Dim publicacion As Publicacion = Await db.Publicaciones.Where(Function(u) u.ID = id).SingleOrDefaultAsync()
                result = New PublicacionModel With
                         {
                            .ID = publicacion.ID,
                            .Titulo = publicacion.Titulo,
                            .Descripcion = publicacion.Descripcion,
                            .FechaPublicacion = publicacion.FechaPublicacion,
                            .Foto = Encoding.Default.GetString(publicacion.Foto)
                         }
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, String.Format("Problemas para retornar publicación. Error: {0}", ex.Message))
            Finally
                db.Dispose()
            End Try

            If result IsNot Nothing Then Return Me.Ok(result)
            Return Me.Content(HttpStatusCode.NotFound, "Información no encontrada")

        End Function
#End Region

#Region "Lista Publicaciones"
        <Route("get-publicaciones", Name:="getPublicaciones")>
        <HttpGet>
        Public Async Function GetPublicaciones() As Task(Of IHttpActionResult)
            Dim db As New GpcDBContext()
            Dim noticias As List(Of PublicacionModel) = Nothing
            Try
                noticias = Await db.Publicaciones.Select(Function(e) New PublicacionModel With {
                                                            .ID = e.ID,
                                                            .Titulo = e.Titulo,
                                                            .Descripcion = e.Descripcion
                                                            }) _
                .ToListAsync()
                Return Me.Ok(noticias)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, String.Format("Problemas para retornar publicaciones. Error: {0}", ex.Message))
            Finally
                db.Dispose()
            End Try
        End Function
#End Region

#Region "Get Lista"
        <Route("get-lista", Name:="getLista")>
        <HttpGet>
        Public Async Function GetLista() As Task(Of IHttpActionResult)
            Dim db As New GpcDBContext()
            Dim noticias As List(Of PublicacionModel) = Nothing
            Dim nueva As PublicacionModel = Nothing
            Dim noticiaFinal As List(Of PublicacionModel) = New List(Of PublicacionModel)

            Try
                noticias = Await db.Publicaciones.Select(Function(e) New PublicacionModel With {
                                                               .ID = e.ID,
                                                               .FotoByte = e.Foto,
                                                               .Titulo = e.Titulo,
                                                               .Descripcion = e.Descripcion
                                                            }) _
                           .ToListAsync()

                For Each nueva In noticias
                    nueva.Foto = Encoding.Default.GetString(nueva.FotoByte)
                    noticiaFinal.Add(nueva)
                Next

                Return Me.Ok(noticias)
                '.Foto = Encoding.Default.GetString(u.Foto)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, String.Format("Problemas para retornar publicaciones. Error: {0}", ex.Message))
            Finally
                db.Dispose()
            End Try
        End Function
#End Region

#Region "Editar Publicación"
        <Route("editar", Name:="editarPublicacion")>
        <HttpPut>
        Public Async Function EditarPublicacion(<FromBody> model As PublicacionModel) As Task(Of IHttpActionResult)
            Dim db As New GpcDBContext()
            Dim publicacion As New Publicacion
            Try
                publicacion = db.Publicaciones.Find(model.ID)
                With publicacion
                    .Titulo = model.Titulo
                    .Descripcion = model.Descripcion
                    .Foto = Encoding.ASCII.GetBytes(model.Foto)
                End With
                Await db.SaveChangesAsync()
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, String.Format("Problemas para guardar cambios. Error: {0}", ex.Message))
            Finally
                db.Dispose()
            End Try
            Return Me.CreatedAtRoute("editarPublicacion", New With {.ID = publicacion.ID}, "Publicacion  Modificado exitosamente")
        End Function
#End Region

#Region "Eliminar Publicacion"
        <Route("eliminar", Name:="eliminarPublicacion")>
        <HttpPut>
        Public Async Function EliminarPublicacion(<FromBody> model As PublicacionModel) As Task(Of IHttpActionResult)
            Dim db As New GpcDBContext()
            Dim publicacion As New Publicacion
            Try
                publicacion = db.Publicaciones.Find(model.ID)

                db.Publicaciones.Remove(publicacion)
                db.SaveChanges()
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, String.Format("Problemas para deshabilitar la noticia. Error: {0}", ex.Message))
            Finally
                db.Dispose()
            End Try
            Return Me.CreatedAtRoute("eliminarPublicacion", New With {.ID = publicacion.ID}, "Publicacion Eliminada")
        End Function
#End Region
    End Class
End Namespace