<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title - Mi aplicación ASP.NET</title>
    @Styles.Render("~/Content/css")
    @Scripts.Render("~/bundles/modernizr")

</head>
<body>
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                @Html.ActionLink("GPC", "Index", "Home", New With {.area = ""}, New With {.class = "navbar-brand"})
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">                    
                    <li>@Html.ActionLink("Inicio", "Index", "Index")</li>
                    <li>@Html.ActionLink("Acerca de", "About", "Home")</li>
                    <li>@Html.ActionLink("Contacto", "Contact", "Home")</li>                    
                    <!-- ko if: Token === null -->
                    <li>
                        @Html.ActionLink("Iniciar Sesión", "Login", "Login")
                    </li>
                    <!-- /ko -->
                    <!-- ko if: Token !== null -->
                    <li>@Html.ActionLink("Usuarios", "ListaUsuarios", "Usuario")</li>
                    <li>@Html.ActionLink("Postular", "CrearPostulacion", "Postulacion")</li>
                    <li>@Html.ActionLink("Postulaciones", "ListaPostulaciones", "Postulacion")</li>
                    <li>@Html.ActionLink("Actividades", "ListaActividades", "Actividades")</li>
                    <li>@Html.ActionLink("Mi Perfil", "MiPerfil", "Usuario")</li>
                    <li> 
                        <a href="#" onClick="Salir();"> Cerrar Sesión</a>
                    </li>
                    <!-- /ko -->
                </ul>
            </div>
        </div>
    </div>

    <div class="container body-content">
        @RenderBody()
        <hr />
        <footer>
            <p>&copy; @DateTime.Now.Year - PIRAMIDAL ASOCIADOS</p>
        </footer>
    </div>

    @Scripts.Render("~/bundles/jquery")
    @Scripts.Render("~/bundles/bootstrap")
    @Scripts.Render("~/bundles/knockout")
    @Scripts.Render("~/bundles/devextreme")
    @Scripts.Render("~/bundles/app")
    

    @* LOGIN *@
    <script>
        esAdministrador = App.esAdministrador;
        esAdminPublicacion = App.esAdminPublicacion;

        App.apiRoot = '@Url.Content("~/")api/';
        App.appRoot = '@Url.Content("~/")';
        var Token = localStorage.getItem(App.appPrefix + 'login.token');

        function Salir(){
            App.goToLogin();
        }        
    </script>
    @RenderSection("scripts", required:=False)
</body>
</html>
