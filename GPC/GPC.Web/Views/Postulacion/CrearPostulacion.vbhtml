@Code
    ViewData("Title") = "Postular"
End Code

<div data-bind="dxPopup: popUpCrear"></div>
<div data-bind="dxPopup: popUpCancelar"></div>
<div id="titulo" class="long-title"><h3>Iniciar Postulación</h3></div>

<div class="container">
    <div data-bind="dxLoadPanel: { visible: loading }"></div>
    <div id="customPadding">
        <div class="row">
            @* INFORMACIÓN USUARIO *@
            <div class="dx-fieldset">
                <div class="dx-fieldset-header">Información del Postulante</div>

                <div class="dx-field">
                    <div class="dx-field-label">Run</div>
                    <div class="dx-field-value">
                        <div data-bind="dxTextBox: dxRun, dxValidator: validatorOptions"></div>
                    </div>
                </div>

                <div class="dx-field">
                    <div class="dx-field-label">Email</div>
                    <div class="dx-field-value">
                        <div data-bind="dxTextBox: dxEmail, dxValidator: emailValidatorOptions"></div>
                    </div>
                </div>

                <div class="dx-field">
                    <div class="dx-field-label">Ubicación</div>
                    <div class="dx-field-value">
                        <div data-bind="dxSelectBox: dxUbicacion, dxValidator: validatorOptions"></div>
                    </div>
                </div>

                <div class="dx-field">
                    <div class="dx-field-label">Empresa a la que postula</div>
                    <div class="dx-field-value">
                        <div data-bind="dxSelectBox: dxAsociado, dxValidator: validatorOptions"></div>
                    </div>
                </div>                
                
                <br />
                @* UPLOAD IMAGE *@
                <div class="dx-fieldset-header">Curriculum Vitae</div>
                <div class="dx-field">
                    <div class="dx-field-value">
                        <div data-bind="dxFileUploader: dxSubirImagen, dxValidator: validatorOptions"></div>
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

@Section Scripts
    <script src="~/Scripts/app/Postulaciones/CrearPostulacionViewModel.js"></script>
    <script>
        ko.applyBindings(new Postulaciones.CrearPostulacionViewModel());
    </script>
End Section