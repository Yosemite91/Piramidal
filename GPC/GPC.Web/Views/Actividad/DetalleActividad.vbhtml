@Code
    ViewData("Title") = "DetalleActividad"
End Code
<!-- ko if: esAdministrador === 'true' -->
<div id="titulo" class="long-title">
    <h3>Detalle Actividad</h3>
</div>

<div class="container">
    <div id="customPadding">
        <div class="row">
            <div data-bind="dxLoadPanel: { visible: loading }"></div>

            <div id="botonesDetalle">
                <div id="volver" data-bind="dxButton: goBack"> </div>
            </div>

            <div id="actividad-form" data-bind="dxForm: form"></div>

            <div class="row">
                <div id="modificar-button" data-bind="dxButton: applyButtonOptionsModificar"> </div>
            </div>

        </div>
    </div>
</div>
<!-- /ko -->
@Section Scripts
    <script src="~/Scripts/app/Actividades/DetalleActividadViewModel.js"></script>
    <script>
        ko.applyBindings(new Actividades.DetalleActividadViewModel());
    </script>
End Section
