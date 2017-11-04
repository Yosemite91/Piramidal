Public Class Actividad
    Public Property ID As Integer
    Public Property Nombre As String
    Public Property Descripcion As String
    Public Property FechaInicio As Date
    Public Property FechaTermino As Date
    Public Property Ubicacion As Region

    Public Property CreadorID As Integer
    Public Overridable Property Creador As Usuario
End Class
