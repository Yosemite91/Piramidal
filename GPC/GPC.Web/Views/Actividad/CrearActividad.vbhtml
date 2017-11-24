@Code
    ViewData("Title") = "Crear Actividad"
End Code

<div data-bind="dxPopup: popUpCrear"></div>
<div data-bind="dxPopup: popUpCancelar"></div>
<div id="titulo" class="long-title"><h3>Crear Actividad</h3></div>

<div class="container">
    <div data-bind="dxLoadPanel: { visible: loading }"></div>
    <div id="customPadding">
        <div class="row">
            @* INFORMACIÓN USUARIO *@
            <div class="dx-fieldset">
                <div class="dx-fieldset-header">Información de la actividad</div>

                <div class="dx-field">
                    <div class="dx-field-label">Nombre</div>
                    <div class="dx-field-value">
                        <div data-bind="dxTextBox: dxNombre, dxValidator: validatorOptions"></div>
                    </div>
                </div>

                <div class="dx-field">
                    <div class="dx-field-label">Descripción</div>
                    <div class="dx-field-value">
                        <div data-bind="dxTextBox: dxDescripcion, dxValidator: validatorOptions"></div>
                    </div>
                </div>              

                <div class="dx-field">
                    <div class="dx-field-label">Fecha Inicio</div>
                    <div class="dx-field-value">
                        <div data-bind="dxDateBox: dxFechaInicio, dxValidator: validatorOptions"></div>
                    </div>
                </div>

                <div class="dx-field">
                    <div class="dx-field-label">Fecha Término</div>
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
                <div id="solicitar-button" data-bind="dxButton: botonCancelar"> </div>
                <div id="solicitar-button" data-bind="dxButton: botonGuardar"> </div>
            </div>
        </div>
    </div>
</div>

@Section Scripts
    <script src="~/Scripts/app/Actividades/CrearActividadViewModel.js"></script>
    <script>
        ko.applyBindings(new Actividades.CrearActividadViewModel());
    </script>
End Section