Imports System.Web.Mvc

Namespace Controllers
    Public Class PostulacionController
        Inherits Controller

        Function CrearPostulacion() As ActionResult
            Return View()
        End Function

        Function ListaPostulaciones() As ActionResult
            ViewData("Title") = "Lista Postulaciones"
            Return View()
        End Function
    End Class
End Namespace
