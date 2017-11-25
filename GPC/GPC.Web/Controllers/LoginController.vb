Imports System.Web.Mvc

Namespace Controllers
    Public Class LoginController
        Inherits Controller

        ' GET: Login
        Function Login() As ActionResult
            ViewData("Title") = "Login"
            Return View()
        End Function

    End Class
End Namespace
