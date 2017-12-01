Imports System.Web.Mvc

Namespace Controllers
    Public Class IndexController
        Inherits Controller

        ' GET: Index
        Function Index() As ActionResult
            ViewData("Title") = "Index"
            Return View()
        End Function
    End Class
End Namespace
