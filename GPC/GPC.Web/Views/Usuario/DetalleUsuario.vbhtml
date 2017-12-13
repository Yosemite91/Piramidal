@Code
    ViewData("Title") = "Detalle Usuario"
End Code
<!-- ko if: esAdministrador === 'true' -->
<div id="titulo" class="long-title">
    <h3>Detalle Usuario</h3>    
</div>
<div data-bind="foreach: fotoPerfil">
    <img style="margin-bottom: 10px" class="img-circle img-responsive bubble" id="perfil" data-bind="attr: {src: cuerpo, alt: nombre}">
</div>

<div class="container">
    <div id="customPadding">
        <div class="row">
            <div data-bind="dxLoadPanel: { visible: loading }"></div>

            <div id="botonesDetalle">
                <div id="volver" data-bind="dxButton: goBack"> </div>
                <div id="solicitar-button" data-bind="dxButton: applyButtonOptionsRestaurarPass"> </div>
            </div>

            <div id="usuario-form" data-bind="dxForm: form"></div>
            
            <div class="row">
                <div id="bloquear-button" data-bind="dxButton: botonBloquear"> </div>
                <div id="desbloquear-button" data-bind="dxButton: botonDesbloquear"> </div>
                <div id="modificar-button" data-bind="dxButton: applyButtonOptionsModificar"> </div>
            </div>
            
        </div>
    </div>
</div>
<!-- /ko -->
@Section Scripts
    <script src="~/Scripts/app/Usuarios/DetalleUsuarioViewModel.js"></script>
    <script>
        ko.applyBindings(new Usuarios.DetalleUsuarioViewModel());
    </script>
End Section

