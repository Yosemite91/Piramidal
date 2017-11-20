Imports System.ComponentModel.DataAnnotations

Namespace Models

    Public Class UsuarioModel
        Public Property ID As Integer
        Public Property Nombre As String
        Public Property Apellido As String
        Public Property Email As String
        Public Property Telefono As String
        Public Property Run As String
        Public Property Password As String
        Public Property FechaNacimiento As Date?
        Public Property Foto As String
        Public Property FotoByte As Byte()
        Public Property Ubicacion As Integer
        Public Property EsActivo As Boolean
        Public Property EsAdministrador As Boolean
        Public Property EsColaborador As Boolean
        Public Property Asociado As Integer
        Public Property AnioIngreso As Date
    End Class

End Namespace