@Code
    ViewData("Title") = "Calendario Actividades"
End Code
<!-- ko if: esAdministrador === 'true' || esColaborador === 'true' -->
<div id="titulo" class="long-title">
    <h3>Calendario Actividades</h3>
</div>

<div class="container">
    <div id="customPadding">
        <div class="row">
            <div data-bind="dxLoadPanel: { visible: loading }"></div>

            <div id="botonesDetalle">
                <div id="volver" data-bind="dxButton: goBack"> </div>
            </div>

            @* Calendario Activdades *@
            <div id="scheduler-demo">
                <div data-bind="dxScheduler: calendario"></div>
            </div>
        </div>
    </div>
</div>
<!-- /ko -->
@Section Scripts
    <script src="~/Scripts/app/Actividades/CalendarioActividadesViewModel.js"></script>
    <script>
        ko.applyBindings(new Actividades.CalendarioActividadesViewModel());
    </script>
End Section
