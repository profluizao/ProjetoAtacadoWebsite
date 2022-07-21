$(document).ready( function(){
    AvaliarOperacao();

    $('#btnCANCELAR').click(function() { 
        var operacao = localStorage.getItem('opercat');
        if ((operacao == 2) || (operacao == 3)) {
            localStorage.removeItem('opercatid');    
        }
        localStorage.removeItem('opercat');
        window.location = 'categorias.html';
    });
});

function AvaliarOperacao() {
    var operacao = localStorage.getItem('opercat');
    if (operacao == 1) {
        $('#lblOPERACAO').text('INCLUSÃO');
    }
    else if (operacao == 2) {
        $('#lblOPERACAO').text('ALTERAÇÃO');
        var id = localStorage.getItem('opercatid');
        CarregarCategoria(id);
    }
    else if (operacao == 3) {
        $('#lblOPERACAO').text('EXCLUSÃO');
        var id = localStorage.getItem('opercatid');
        CarregarCategoria(id);
        PrepararExclusao();
    }
    else
    {
        alert('Operação Inválida!!!');
    }
}

function CarregarCategoria(id) {
    var urlServico = 'https://localhost:7294/api/estoque/Categoria/' + id;
    $.get(urlServico, function (retorno, status) {
        if (retorno == '') {
            alert('Categoria não existe (' + id + ')!!!');
            return;
        }
        else {
            $('#txtID').val(retorno.codigo);
            $('#txtID').prop('readonly', true);

            $('#txtDESCRICAO').val(retorno.descricao);

            if (retorno.situacao == true) { 
                $('#radTRUE').prop('checked', true);
            }
            else {
                $('#radFALSE').prop('checked', true);
            }
        }
    });
}

function PrepararExclusao() {
    $('#txtID').prop('readonly', true);
    $('#txtDESCRICAO').prop('readonly', true);
    $('#radTRUE').prop('disabled', true);
    $('#radFALSE').prop('disabled', true);
}


function Confirmar() {
    var operacao = localStorage.getItem('opercat');
    if (operacao == 1) {
        AcionarInclusao();
    }
    else if (operacao == 2) {
    }
    else if (operacao == 3) {
    }    
}


function AcionarInclusao() {
    var categoria = {
        codigo: 0,
        descricao: 'string',
        situacao: true
    };
    
    categoria.descricao = $('#txtDESCRICAO').val();
    if ($('#radTRUE').val() == true) {
        categoria.situacao = true;
    }
    else {
        categoria.situacao = false;
    }

    var urlServico = 'https://localhost:7294/api/estoque/Categoria';
    $.post(urlServico, categoria, function(retorno, status) { 
        if (retorno == '') {
            alert('Ocorreu um erro ao executar a inclusão.');
        }
        else { 
            if (retorno.codigo != 0) {
                alert('Inclusão realizada com sucesso (ID: ' + retorno.codigo + ').');
            }
        }
    });
}
