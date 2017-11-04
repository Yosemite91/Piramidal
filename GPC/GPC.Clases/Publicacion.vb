Public Class Publicacion
    Public Property ID As Integer
    Public Property Titulo As String
    Public Property Descripcion As String
    Public Property Foto As Byte()
    Public Property FechaPublicacion As Date
    Public Property EsActivo As Boolean

    Public Property CreadorID As Integer
    Public Overridable Property Creador As Usuario
End Class
