@Code
    ViewData("Title") = "Modificar Publicación"
End Code
<!-- ko if: esAdministrador === 'true'  -->
<div data-bind="dxPopup: popUpModificar"></div>
<div data-bind="dxPopup: popUpCancelar"></div>
<div id="titulo" class="long-title"><h3>Editar Noticia</h3></div>

<div class="container">
    <div id="customPadding">
        <div data-bind="dxLoadPanel: { visible: loading }"></div>

        <div class="row">
            @* INFORMACIÓN PUBLICACION *@
            <div class="dx-fieldset">
                <div class="dx-fieldset-header">Información de la Publicación</div>

                <div class="dx-field">
                    <div class="dx-field-label">Titulo</div>
                    <div class="dx-field-value">
                        <div data-bind="dxTextBox: dxTitulo, dxValidator: validatorOptions"></div>
                    </div>
                </div>

                <div class="dx-field">
                    <div class="dx-field-label">Descripción</div>
                    <div class="dx-field-value">
                        <div data-bind="dxTextArea: dxDescripcion, dxValidator: validatorOptions"></div>
                    </div>
                </div>

                <br />
                @* UPLOAD IMAGE *@
                <div class="dx-fieldset-header" style="margin:0">Foto Perfil</div>
                <div class="dx-field">
                    <div class="dx-field-value">
                        <div data-bind="dxFileUploader: dxSubirImagen"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div id="botonesDetalle">
                <div id="solicitar-button" data-bind="dxButton: botonCancelarEdicion"> </div>
                <div id="solicitar-button" data-bind="dxButton: botonGuardar"> </div>
            </div>
        </div>
    </div>
</div>
<!-- /ko -->
@Section Scripts
    <script src="~/Scripts/app/Publicaciones/EditarPublicacionViewModel.js"></script>
    <script>
        ko.applyBindings(new Publicaciones.EditarPublicacionViewModel());
    </script>
End Section

