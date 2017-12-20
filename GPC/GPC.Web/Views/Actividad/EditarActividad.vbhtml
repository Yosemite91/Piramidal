@Code
    ViewData("Title") = "Modificar Actividad"
End Code
<!-- ko if: esAdministrador === 'true' -->
<div data-bind="dxPopup: popUpModificar"></div>
<div data-bind="dxPopup: popUpCancelar"></div>
<div id="titulo" class="long-title"><h3>Modificar Actividad</h3></div>

<div class="container">
    <div id="customPadding">
        <div data-bind="dxLoadPanel: { visible: loading }"></div>

        <div class="row">
            @* INFORMACIÓN USUARIO *@
            
                <div class="dx-fieldset-header">Información de la actividad</div>
            <div class="col-sm-6">
                @* NO EDITABLE, CONFLICTOS EN BD *@
                <div class="dx-field">
                    <div class="dx-field-label">Nombre</div>
                    <div class="dx-field-value">
                        <div data-bind="dxTextBox: dxNombre, dxValidator: validatorOptions"></div>
                    </div>
                </div>

                <div class="dx-field">
                    <div class="dx-field-label">Descripcion</div>
                    <div class="dx-field-value">
                        <div data-bind="dxTextBox: dxDescripcion, dxValidator: validatorOptions"></div>
                    </div>
                </div>
              </div>
            <div class="col-sm-6">
                <div class="dx-field">
                    <div class="dx-field-label">Fecha Inicio</div>
                    <div class="dx-field-value">
                        <div data-bind="dxDateBox: dxFechaInicio, dxValidator: validatorOptions"></div>
                    </div>
                </div>

                <div class="dx-field">
                    <div class="dx-field-label">Fecha Termino</div>
                    <div class="dx-field-value">
                        <div data-bind="dxDateBox: dxFechaTermino, dxValidator: validatorOptions"></div>
                    </div>
                </div>

                <div class="dx-field">
                    <div class="dx-field-label">Ubicación</div>
                    <div class="dx-field-value">
                        <div data-bind="dxSelectBox: dxUbicacion, dxValidator: validatorOptions"></div>
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
    <script src="~/Scripts/app/Actividades/EditarActividadViewModel.js"></script>
    <script>
        ko.applyBindings(new Actividades.EditarActividadViewModel());
    </script>
End Section

