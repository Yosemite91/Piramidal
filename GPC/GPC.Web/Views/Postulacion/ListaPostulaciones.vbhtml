@Code
    ViewData("Title") = "Lista Postulaciones"
End Code

<div id="titulo" class="long-title"><h3>Postulaciones</h3></div>

<div class="container">
    <div data-bind="dxLoadPanel: { visible: loading }"></div>
    <div id="customPadding">
        <div id="botonesDetalle">
            <div id="volver" data-bind="dxButton: goBack"> </div>
        </div>

        <div id="grid" data-bind="dxDataGrid: grid"></div>
    </div>
</div>

@Section Scripts
    <script src="~/Scripts/app/Postulaciones/ListaPostulacionesViewModel.js"></script>
    <script>
        ko.applyBindings(new Postulaciones.ListaPostulacionesViewModel());
    </script>
End Section
