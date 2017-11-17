Public Class Usuario
    Public Property ID As Integer
    Public Property Nombre As String
    Public Property Apellido As String
    Public Property Email As String
    Public Property Telefono As String
    Public Property Run As String
    Public Property Password As String
    Public Property FechaNacimiento As Date
    Public Property Foto As Byte()
    Public Property Ubicacion As Region
    Public Property EsActivo As Boolean
    Public Property EsAdministrador As Boolean
    Public Property EsColaborador As Boolean
    Public Property Asociado As Empresa
    Public Property AnioIngreso As Date
    Public Property Puntaje As Integer

    Public Overridable Property PublicacionesRealizadas As IList(Of Publicacion)
    Public Overridable Property ActividadesRealizadas As IList(Of Actividad)
End Class
