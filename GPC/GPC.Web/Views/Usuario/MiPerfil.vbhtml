@Code
    ViewData("Title") = "Mi Perfil"
End Code
<!-- ko if: esAdministrador === 'true' || esColaborador === 'true' -->
<div data-bind="dxPopup: popUpCambiarPass"></div>

<div id="titulo" class="long-title">
    <h3>Mi Perfil</h3>
</div>
<div data-bind="foreach: fotoPerfil">
    <img style="margin-bottom: 10px" class="img-circle img-responsive bubble" id="perfil" data-bind="attr: {src: cuerpo, alt: nombre}">
</div>

<div class="container">
    <div id="customPadding">
        <div data-bind="dxLoadPanel: { visible: loading }"></div>
                
        <div id="usuario-form" data-bind="dxForm: form"></div>
        <div id="modificar-button" data-bind="dxButton: applyButtonOptionsModificar"> </div>
        <div id="usuario-form-contrasena" data-bind="dxForm: formContrasena"></div>
        <div id="modificar-button" data-bind="dxButton: applyButtonOptionsModificarContrasena"> </div>
    </div>
</div>
<!-- /ko -->
@Section Scripts
    <script src="~/Scripts/app/Usuarios/MiPerfilViewModel.js"></script>
    <script>
        ko.applyBindings(new Usuarios.MiPerfilViewModel());
    </script>
End Section
