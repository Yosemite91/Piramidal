@Code
    ViewData("Title") = "Detalle Postulación"
End Code
<!-- ko if: esAdministrador === 'true' -->
<div id="titulo" class="long-title">
    <h3>Detalle Postulación</h3>    
</div>

<div class="container">
    <div id="customPadding">
        <div class="row">
            <div data-bind="dxLoadPanel: { visible: loading }"></div>

            <div id="botonesDetalle">
                <div id="volver" data-bind="dxButton: goBack"> </div>
            </div>

            <div id="usuario-form" data-bind="dxForm: form"></div>

            <div class="row">
                <div id="bloquear-button" data-bind="dxButton: botonBloquear"> </div>
                <div id="desbloquear-button" data-bind="dxButton: botonDesbloquear"> </div>
            </div>
        </div>

        <br/>
        @*CURRICULUM*@
        <div data-bind="foreach: fotoPerfil">
            <img class="img-thumbnail" id="perfil2" data-bind="attr: {src: cuerpo, alt: nombre}">
        </div>
    </div>
</div>
<!-- /ko -->
@Section Scripts
<script src="~/Scripts/app/Postulaciones/DetallePostulacionViewModel.js"></script>
<script>
    ko.applyBindings(new Postulaciones.DetallePostulacionViewModel());
</script>
End Section
