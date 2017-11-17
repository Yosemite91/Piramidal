Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class initial
        Inherits DbMigration
    
        Public Overrides Sub Up()
            CreateTable(
                "dbo.Actividad",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Nombre = c.String(),
                        .Descripcion = c.String(),
                        .FechaInicio = c.DateTime(nullable := False),
                        .FechaTermino = c.DateTime(nullable := False),
                        .Ubicacion = c.Int(nullable := False),
                        .CreadorID = c.Int(nullable := False)
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Usuario", Function(t) t.CreadorID) _
                .Index(Function(t) t.CreadorID)
            
            CreateTable(
                "dbo.Usuario",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Nombre = c.String(),
                        .Apellido = c.String(),
                        .Email = c.String(),
                        .Telefono = c.String(),
                        .Run = c.String(),
                        .Password = c.String(),
                        .FechaNacimiento = c.DateTime(nullable := False),
                        .Foto = c.Binary(),
                        .Ubicacion = c.Int(nullable := False),
                        .EsActivo = c.Boolean(nullable := False),
                        .EsAdministrador = c.Boolean(nullable := False),
                        .EsColaborador = c.Boolean(nullable := False),
                        .Asociado = c.Int(nullable := False),
                        .AnioIngreso = c.DateTime(nullable := False),
                        .Puntaje = c.Int(nullable := False)
                    }) _
                .PrimaryKey(Function(t) t.ID)
            
            CreateTable(
                "dbo.Publicacion",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Titulo = c.String(),
                        .Descripcion = c.String(),
                        .Foto = c.Binary(),
                        .FechaPublicacion = c.DateTime(nullable := False),
                        .EsActivo = c.Boolean(nullable := False),
                        .CreadorID = c.Int(nullable := False)
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Usuario", Function(t) t.CreadorID) _
                .Index(Function(t) t.CreadorID)
            
            CreateTable(
                "dbo.Postulacion",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Run = c.String(),
                        .Ubicacion = c.Int(nullable := False),
                        .Asociado = c.Int(nullable := False),
                        .Email = c.String(),
                        .Curriculum = c.Binary(),
                        .EsActivo = c.Boolean(nullable := False),
                        .FechaPostulacion = c.DateTime(nullable := False)
                    }) _
                .PrimaryKey(Function(t) t.ID)
            
            CreateTable(
                "dbo.Token",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Run = c.String(),
                        .TokenActual = c.String(),
                        .Fecha = c.DateTime(nullable := False),
                        .UsuarioID = c.Int(nullable := False)
                    }) _
                .PrimaryKey(Function(t) t.ID)
            
        End Sub
        
        Public Overrides Sub Down()
            DropForeignKey("dbo.Publicacion", "CreadorID", "dbo.Usuario")
            DropForeignKey("dbo.Actividad", "CreadorID", "dbo.Usuario")
            DropIndex("dbo.Publicacion", New String() { "CreadorID" })
            DropIndex("dbo.Actividad", New String() { "CreadorID" })
            DropTable("dbo.Token")
            DropTable("dbo.Postulacion")
            DropTable("dbo.Publicacion")
            DropTable("dbo.Usuario")
            DropTable("dbo.Actividad")
        End Sub
    End Class
End Namespace
