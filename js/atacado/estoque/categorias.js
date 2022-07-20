$(document).ready( function(){
    CarregarCategorias();
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

                var linhaINI = "<tr>";
                var colunaCODIGO = "<td>" + categoria.codigo + "</td>";
                var colunaDESCRICAO = "<td>" + categoria.descricao + "</td>";
                var colunaSITUACAO = "<td>" + categoria.situacao + "</td>";
                var linhaFIM = "</tr>";

                var linha = linhaINI + colunaCODIGO + colunaDESCRICAO + colunaSITUACAO + linhaFIM;

                $("#tblCategorias tbody").append(linha);
            }
        }
    });
}