$(document).ready( function(){
    CarregarCategorias();

    $('#ddlCAT').change(function() {
        var idcat = $('#ddlCAT option:selected').val();
        CarregarSubcategorias(idcat);
    });

    $('#ddlSUB').change(function() {
        var idsub = $('#ddlSUB option:selected').val();
        CarregarProdutos(idsub);
    });

});

function CarregarCategorias() {
    var urlServico = 'https://localhost:7294/api/estoque/categoria';
    $.get(urlServico, function (retorno, status) {
        var keys = Object.keys(retorno);
        if (keys.lenght == 0) {
            alert("Erro ao obter os dados.");
        }
        else {
            for (var i = 0; i < keys.length; i++) {
                var categoria = retorno[i];
                var opcao = '<option value="' + categoria.codigo + '">' + categoria.descricao + '</option>';
                $('#ddlCAT').append(opcao);
            }
        }
    });
}

function CarregarSubcategorias(idcat) {
    var urlServico = 'https://localhost:7294/api/estoque/Subcategoria/PorIdCategoria/' + idcat;
    $.get(urlServico, function (retorno, status) {
        var keys = Object.keys(retorno);
        if (keys.lenght == 0) {
            alert("Erro ao obter os dados.");
        }
        else {
            for (var i = 0; i < keys.length; i++) {
                var subcategoria = retorno[i];
                var opcao = '<option value="' + subcategoria.idSubcategoria + '">' + subcategoria.descricaoSubcategoria + '</option>';
                $('#ddlSUB').append(opcao);
            }
        }
    });
}

function CarregarProdutos(idsub) {
    var urlServico = 'https://localhost:7294/api/Produto/PorSubcategoria/' + idsub;
    $.get(urlServico, function (retorno, status) {
        var keys = Object.keys(retorno);
        if (keys.lenght == 0) {
            alert("Erro ao obter os dados.");
        }
        else {
            for (var i = 0; i < keys.length; i++) {
                var produto = retorno[i];

                var linhaINI = "<tr>";
                var colunaCODIGO = "<td>" + produto.idProduto + "</td>";                
                var colunaDESCRICAO = "<td>" + produto.descricaoProduto + "</td>";
                var colunaSITUACAO = "<td>" + produto.situacao + "</td>";
                var linhaFIM = "</tr>";

                var linha = linhaINI + colunaCODIGO + colunaDESCRICAO + colunaSITUACAO + linhaFIM;

                $("#tblPRODS tbody").append(linha);
            }
        }
    });    
}
