Imports System.ComponentModel.DataAnnotations

Namespace Models

    Public Class PostulacionModel
        Public Property ID As Integer
        Public Property Email As String
        Public Property Run As String
        Public Property Curriculum As String
        Public Property CurriculumByte As Byte()
        Public Property Ubicacion As Integer
        Public Property EsActivo As Boolean
        Public Property Asociado As Integer
        Public Property FechaPostulacion As Date
    End Class

End Namespace
