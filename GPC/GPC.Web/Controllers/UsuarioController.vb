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

        Function ListaUsuarios() As ActionResult
            ViewData("Title") = "Lista Usuarios"
            Return View()
        End Function

        Function EditarUsuario() As ActionResult
            ViewData("Title") = "Editar Usuario"
            Return View()
        End Function

        Function MiPerfil() As ActionResult
            ViewData("Title") = "Mi Perfil"
            Return View()
        End Function
    End Class
End Namespace