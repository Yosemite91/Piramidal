@Code
    ViewData("Title") = "Crear Publicacion"
End Code
<div data-bind="dxLoadPanel: { visible: loading }"></div>
<!-- ko if: esAdministrador === 'true' -->
<div data-bind="dxPopup: popUpCrear"></div>
<div data-bind="dxPopup: popUpCancelar"></div>
<div id="titulo" class="long-title"><h3>Crear Publicación</h3></div>

<div class="container">
    <div id="customPadding">
        <div class="row">
            @* INFORMACIÓN EVENTO *@
            <div class="dx-fieldset">
                <div class="dx-fieldset-header">Información de la Publicación</div>

                <div class="dx-field">
                    <div class="dx-field-label">Título</div>
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

                @* UPLOAD IMAGE *@
                <div class="dx-fieldset-header">Foto Noticia</div>
                <div class="dx-field">
                    <div class="dx-field-value">
                        <div data-bind="dxFileUploader: dxSubirImagen"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div id="botonesDetalle">
                <div id="solicitar-button" data-bind="dxButton: botonCancelar"> </div>
                <div id="solicitar-button" data-bind="dxButton: botonGuardar"> </div>
            </div>
        </div>
    </div>
</div>
<!-- /ko -->
@Section Scripts
    <script src="~/Scripts/app/Publicaciones/CrearPublicacionViewModel.js"></script>
    <script>
        ko.applyBindings(new Publicaciones.CrearPublicacionViewModel());
    </script>
End Section