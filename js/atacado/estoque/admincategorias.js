$(document).ready( function(){
    AvaliarOperacao();

    $('#btnCANCELAR').click(function() { 
        Cancelar();
    });
});

function Cancelar() {
    var operacao = localStorage.getItem('opercat');
    if ((operacao == 2) || (operacao == 3)) {
        localStorage.removeItem('opercatid');    
    }
    localStorage.removeItem('opercat');
    window.location = 'categorias.html';    
}

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
            $('#txtID').prop('disabled', true);

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
    $('#txtID').prop('disabled', true);

    $('#txtDESCRICAO').prop('readonly', true);
    $('#txtDESCRICAO').prop('disabled', true);

    $('#radTRUE').prop('disabled', true);
    $('#radFALSE').prop('disabled', true);
}

function Confirmar() {
    var operacao = localStorage.getItem('opercat');
    if (operacao == 1) {
        AcionarInclusao();
    }
    else if (operacao == 2) {
        AcionarAlteracao();
    }
    else if (operacao == 3) {
        AcionarExclusao();
    }    
}

function AcionarInclusao() {
    var categoria = {
        codigo: 0,
        descricao: 'string',
        situacao: true
    };
    categoria.descricao = $('#txtDESCRICAO').val();
    categoria.situacao = $("#radTRUE").is(':checked') ? true : false;
    var urlServico = 'https://localhost:7294/api/estoque/Categoria';
    $.ajax({
        url: urlServico,
        type: 'post',
        dataType: 'json',
        data: JSON.stringify(categoria),
        contentType: 'application/json',
        success: function (data) {
            alert('Categoria salva com sucesso (ID: ' + data.codigo +').');
            Cancelar();
        }        
    });
}

function AcionarAlteracao() {
    var categoria = {
        codigo: 0,
        descricao: 'string',
        situacao: true
    };
    categoria.codigo = $('#txtID').val();
    categoria.descricao = $('#txtDESCRICAO').val();
    categoria.situacao = $("#radTRUE").is(':checked') ? true : false;
    var urlServico = 'https://localhost:7294/api/estoque/Categoria';
    $.ajax({
        url: urlServico,
        type: 'put',
        dataType: 'json',
        data: JSON.stringify(categoria),
        contentType: 'application/json',
        success: function (data) {
            alert('Categoria alterada com sucesso (ID: ' + data.codigo +').');
            Cancelar();
        }        
    });    
}

function AcionarExclusao() {
    var id = localStorage.getItem('opercatid');
    var urlServico = 'https://localhost:7294/api/estoque/Categoria/' + id;
    $.ajax({
        url: urlServico,
        type: 'delete',
        dataType: null,
        data: null,
        contentType: 'application/json',
        success: function (data) {
            alert('Categoria excluída com sucesso (ID: ' + data.codigo +').');
            Cancelar();
        }        
    });    
}
