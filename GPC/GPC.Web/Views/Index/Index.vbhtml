@Code
    ViewData("Title") = "Inicio"
End Code

@*Header*@
<header id="top" class="header">
    <div class="text-vertical-center">
        <div class="long-title">
            <h2>
                <strong>
                    <h1>GPC</h1>
                </strong>
            </h2>
        </div>
        <h4>Esfuerzo &amp; Compromiso</h4>
    </div>
</header>

@*Motivados por un cambio*@
<section id="about" class="about">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <h2>Motivados por lograr un cambio</h2>
            </div>
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</section>

@*Motivados por un cambio*@
<section id="about" class="about">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
            </div>
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</section>

@*Callout*@
<aside class="callout">
    <div class="text-vertical-center">
        <h2>Trabajo Enfocado</h2>
    </div>
</aside>

@*Noticias*@
<section id="portfolio" class="portfolio">
    <div class="container">
        <div class="row">
            <div class="col-lg-10 col-lg-offset-1 text-center">
                
            </div>
            <!-- /.col-lg-10 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</section>

@*Acerca de nosotros*@
<aside id="acercaDe" class="call-to-action bg-primary">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <h3>Acerca de Nosotros</h3>
                <div id="aboutUs" style="font-size: 16px">
                        Tras una extensa experiencia en la comercialización de productos alternativos en perfumería, y
                        con la reciente venta de toallas higiénicas, GPC pretende dar un salto a su visión negociadora
                        mediante la gestación de una red de socios que deseen obtener mayores ingresos a su
                        presupuesto familiar. 
                    <p id="revelar" style="font-size: 16px; display: none; margin-top: 0">
                        GPC representa a dos grandes empresas:
                        Parfum D´Parfum, empresa Chilena dedicada a la venta de más de 160 tipos alternativos de
                        perfumes de reconocimiento internacional, con un buen apoyo de marketing y con interesantes
                        márgenes de ganancia.
                        JM Internacional, empresa internacional que distribuye toallas higiénicas y otros productos que
                        tienen una creciente demanda comercial.
                    <p id="mision" class="btn btn-dark btn-lg" style="display:none">Misión</p>
                    <p id="vision" class="btn btn-dark btn-lg" style="display:none">Visión</p>
                    </p>
                </div>

                <div style="display:">
                    <div id="mision2" style="display:none; margin-left:auto; margin-right:auto">
                        <p><h3>Misión:</h3>
                            GPC tiene como misión la comercialización de productos de uso personal a precios accesibles y de alta calidad, con aromas reconocidos a nivel mundial. Además, aspira brindar oportunidades de negocio a socios (as) independientes que se incorporen una red comercial multinivel con incentivos y promociones.
                        </p>
                    </div>

                    <div id="vision2" style="display:none; margin-left:auto; margin-right:auto">
                        <p><h3>Visión:</h3>
                            GCP tiene como visión consolidar su emprendimiento comercial como la mejor opción para sus
                            clientes y socios, tanto en cumplimiento y entrega de servicio de calidad, como en la innovación de
                            productos de comprobada demanda. Asimismo, la creación de redes comerciales para tener una
                            fuente de generación de dinero en forma inmediata y permanente.
                        </p>
                    </div>
                </div>

                <p id="conocerMas" class="btn btn-lg btn-light">Conocer más</p>
            </div>
        </div>
    </div>
</aside>

@*Footer solo para Index*@
<footer>
    <div id="contact" class="container">
        <div class="row">
            <div class="col-lg-10 col-lg-offset-1 text-center">
                <h4>
                    <strong>Contacto</strong>
                </h4>
                <p>
                    3481 Melrose Place
                    <br>Beverly Hills, CA 90210
                </p>
                <ul class="list-unstyled">
                    <li><i class="fa fa-phone fa-fw"></i> (123) 456-7890</li>
                    <li>
                        <i class="fa fa-envelope-o fa-fw"></i> <a href="mailto:name@example.com">name@example.com</a>
                    </li>
                </ul>
                <ul class="list-inline">
                    <li>
                        <a href="#"><i class="fa fa-facebook fa-fw fa-3x"></i></a>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-twitter fa-fw fa-3x"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</footer>

@Section Scripts
<script src="~/Scripts/app/Index/IndexViewModel.js"></script>
<script>
    $(document).ready(function () {
        $("#conocerMas").click(function () {
            $("#revelar").toggle(500);
            $("#mision").toggle(500);
            $("#vision").toggle(500);
            $("#mision2").hide(500);
            $("#vision2").hide(500);
        });

        $("#mision").click(function () {
            $("#mision2").toggle(500);
        });
        $("#vision").click(function () {
            $("#vision2").toggle(500);
        });
    });
    ko.applyBindings(new Index.IndexViewModel());
</script>
End Section
