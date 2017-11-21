Imports System.Web.Mvc

Namespace Controllers
    Public Class UsuarioController
        Inherits Controller


        Function CrearUsuario() As ActionResult
            Return View()
        End Function

        Function DetalleUsuario() As ActionResult
            ViewData("Title") = "Detalle Usuario"
            Return View()
        End Function

        Function EditarUsuario() As ActionResult
            ViewData("Title") = "Editar Usuario"
            Return View()
        End Function
    End Class
End Namespace