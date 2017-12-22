Namespace Models

    Public Class ActividadModel
        Public Property ID As Integer
        Public Property Nombre As String
        Public Property Descripcion As String
        Public Property FechaInicio As Date
        Public Property FechaTermino As Date
        Public Property Ubicacion As GPC.Clases.Region
        Public Property UbicacionStr As String

    End Class

    Public Class CalendarioModel
        Public Property Text As String
        Public Property Descripcion As String
        Public Property StartDate As Date
        Public Property EndDate As Date
    End Class

End Namespace