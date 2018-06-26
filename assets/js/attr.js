
function addLine() {
    var line = 
    '<div class="row">' +
        '<div class="col">' +
            '<label>Nome:</label>' +
            '<input type="text" class="form-control" name="attrName">' +
        '</div>' +
        '<div class="col">' +
            '<label>Tipo:</label>' +
            '<select class="form-control" name="attrType">' +
                '<option value="text">Texto</option>' + 
                '<option value="number">Número</option>' +
                '<option value="password">Senha</option>' +
                '<option value="checkbox">Caixa de Seleção</option>' +
                '<option value="textarea">Área de Texto</option>' +
            '</select>' +
        '</div>' +
        '<div class="col">' +
            '<div class="form-group">' +
                '<input style="position: relative; top: 31px" type="button" class="btn btn-success" id="btnAdd" onclick="addLine()" value="+">' +
            '</div>' +
        '</div>' +
    '</div>' +
    '<br>';

    var div = document.getElementById("lines").innerHTML;
    document.getElementById("lines").innerHTML = div + line;
}