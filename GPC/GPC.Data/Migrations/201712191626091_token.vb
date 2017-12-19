Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class token
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AddColumn("dbo.Token", "Ubicacion", Function(c) c.Int(nullable := False))
        End Sub
        
        Public Overrides Sub Down()
            DropColumn("dbo.Token", "Ubicacion")
        End Sub
    End Class
End Namespace
