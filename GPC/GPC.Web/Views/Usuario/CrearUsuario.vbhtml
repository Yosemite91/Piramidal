@Code
    ViewData("Title") = "Crear Usuario"
End Code
<!-- ko if: esAdministrador === 'true' -->
<div data-bind="dxPopup: popUpCrear"></div>
<div data-bind="dxPopup: popUpCancelar"></div>
<div id="titulo" class="long-title"><h3>Crear Usuario</h3></div>

<div class="container">
    <div data-bind="dxLoadPanel: { visible: loading }"></div>
    <div id="customPadding">
        <div class="row">
            @* INFORMACIÓN USUARIO *@
            <div class="dx-fieldset">
                <div class="dx-fieldset-header">Información del Usuario</div>

                <div class="dx-field">
                    <div class="dx-field-label">Nombre</div>
                    <div class="dx-field-value">
                        <div data-bind="dxTextBox: dxNombre, dxValidator: validatorOptions"></div>
                    </div>
                </div>

                <div class="dx-field">
                    <div class="dx-field-label">Apellido</div>
                    <div class="dx-field-value">
                        <div data-bind="dxTextBox: dxApellido, dxValidator: validatorOptions"></div>
                    </div>
                </div>

                <div class="dx-field">
                    <div class="dx-field-label">Email</div>
                    <div class="dx-field-value">
                        <div data-bind="dxTextBox: dxEmail, dxValidator: emailValidatorOptions"></div>
                    </div>
                </div>

                <div class="dx-field">
                    <div class="dx-field-label">Teléfono</div>
                    <div class="dx-field-value">
                        <div data-bind="dxTextBox: dxTelefono, dxValidator: telefonoValidatorOptions"></div>
                    </div>
                </div>

                <div class="dx-field">
                    <div class="dx-field-label">Run</div>
                    <div class="dx-field-value">
                        <div data-bind="dxTextBox: dxRun, dxValidator: validatorOptions"></div>
                    </div>
                </div>

                <div class="dx-field">
                    <div class="dx-field-label">Fecha Nacimiento</div>
                    <div class="dx-field-value">
                        <div data-bind="dxDateBox: dxFechaNacimiento, dxValidator: validatorOptions"></div>
                    </div>
                </div>

                <div class="dx-field">
                    <div class="dx-field-label">Ubicación</div>
                    <div class="dx-field-value">
                        <div data-bind="dxSelectBox: dxUbicacion, dxValidator: validatorOptions"></div>
                    </div>
                </div>

                <div class="dx-field">
                    <div class="dx-field-label">Asociado a Empresa</div>
                    <div class="dx-field-value">
                        <div data-bind="dxSelectBox: dxAsociado, dxValidator: validatorOptions"></div>
                    </div>
                </div>

                <br />
                <div class="dx-fieldset-header">Privilegios Otorgables</div>

                <div class="dx-field">
                    <div class="dx-field-label">¿Es Administrador?</div>
                    <div class="dx-field-value">
                        <div data-bind="dxSwitch: dxEsAdministrador"></div>
                    </div>
                </div>

                <div class="dx-field">
                    <div class="dx-field-label">¿Es Colaborador?</div>
                    <div class="dx-field-value">
                        <div data-bind="dxSwitch: dxEsColaborador"></div>
                    </div>
                </div>      
                <br />
                @* UPLOAD IMAGE *@
                <div class="dx-fieldset-header">Foto Usuario</div>
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
    <script src="~/Scripts/app/Usuarios/CrearUsuarioViewModel.js"></script>
    <script>
        ko.applyBindings(new Usuarios.CrearUsuarioViewModel());
    </script>
End Section