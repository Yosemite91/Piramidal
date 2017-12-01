@Code
    ViewData("Title") = "Index"
End Code

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Index</title>
</head>
<body>
    <div> 
    </div>
</body>
</html>

@Section Scripts
<script src="~/Scripts/app/Index/IndexViewModel.js"></script>
<script>
    ko.applyBindings(new Index.IndexViewModel());
</script>
End Section
