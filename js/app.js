$(document).ready(function() {

    /*============================================================
    =            renderizando o HTML a partir do JSON            =
    ============================================================*/
    for (var i = 0; i < inventario.produtos.length; i++) {

        var formattedItemFoto = HTMLitemFoto.replace('%data%', inventario.produtos[i].img);
        var formattedItemNome = HTMLitemNome.replace('%data%', inventario.produtos[i].nome);
        var formattedItemDescricao = HTMLitemDescricao.replace('%data%', inventario.produtos[i].descricao);
        var formattedPreco = HTMLpreco.replace('%data%', inventario.produtos[i].preco);
        var formattedQuantidade = HTMLquantidade;
        var formattedIcone = HTMLicone;
        $('#main').prepend('<div class="row rowItem" id="item"><div class="col-xs-3" id="itemFoto"></div><div class="col-xs-4" id="itemDescricao"></div><div class="col-xs-4" id="precos"><div class="col-xs-6 text-right preco" id="preco"></div><div class="col-xs-4 quantidade" id="quantidade"></div><div class="col-xs-2" id="icone"></div></div></div>');

        $('#itemFoto').append(formattedItemFoto);
        $('#itemDescricao').append(formattedItemNome);
        $('#itemDescricao').append(formattedItemDescricao);
        $('#preco').append(formattedPreco);
        $('#quantidade').append(formattedQuantidade);
        $('#icone').append(formattedIcone);
    };

    /* iniciando as caixas de texto em 0 */
    $(".qtd").each(function() {
        $(this).val(0);
    });

    /*=====  End of renderizando o HTML a partir do JSON  ======*/

    function reiniciaPedido(argument) {
        // body...
        console.log("fluiu");
        $(".rowItem").each(function(index, el) {
            $(this).fadeTo(200, 0.4);
            $(this).fadeTo(100, 1);
        });
        $('.qtd').each(function(index, el) {
                $(this).val(0);

            });
        $("#total").val(0);

    }

    function finalizaPedido(argument) {
        // body...
        var r = confirm("deseja realmente finalizar o pedido?")
        if (r) {
            var pedido = [];
            var itens = [];
            var qtds = [];
            var totalPedido = 0;

            $('.product-name').each(function(index, el) {
                itens.push($(this).text());

            });
            $('.qtd').each(function(index, el) {
                qtds.push(parseInt($(this).val()));

            });

            for (var i = 0; i < itens.length; i++) {
                pedido.push({ "item": itens[i], "quantidade": qtds[i] });
            }

            totalPedido = $("#total").val();
            pedido.push({ "valorTotal": totalPedido });

            console.log(pedido);
            reiniciaPedido();
        }
    }


    $('#finalizar').click(function(event) {
        /* Act on the event */
        finalizaPedido();
    });
    /*==============================================
    =     função REMOVE PRODUTOS botao            =
    ==============================================*/

    $('#main').delegate('.remove', 'click', function() {
        $(this).parent().parent().parent().remove();
        updateCart();
    });

    /*=====  End of função remove produtos  ======*/



    /*================================================================
    =            Escuta o evento de mudança da quantidade            =
    ================================================================*/

    $('#main').on('change', 'input', function(event) {
        event.preventDefault();
        /* Act on the event */
        updateCart();

    });

    /*=====  End of   ======*/


    /*===============================
        =            funcões            =
        ===============================*/

    function updateCart() {

        // body...
        var quantidades = [];
        var precos = [];
        var total = 0;

        $(".qtd").each(function() {
            var cadaValor = parseInt($(this).val());
            if (cadaValor) {
                quantidades.push(cadaValor);
            } else {
                quantidades.push(0);
            }

        });

        $(".precoUnitario").each(function() {
            var cadaValor = parseInt($(this).text());
            precos.push(cadaValor);


        });

        for (var i = 0; i < quantidades.length; i++) {
            total = total + quantidades[i] * precos[i];
        }

        $("#total").val(total);
        //console.log("precos:"+precos);
        //console.log("quantidades:"+quantidades);
        //console.log("total:"+total);
    }

    /*=====  End of funcões  ======*/
});


var inventario = {
    "produtos": [{
            "cod": "00001",
            "nome": "Tradicional 500g",
            "descricao": "Pao de queijo tradicional",
            "preco": 15,
            "embalagem": "500g",
            "img": "http://placehold.it/100x70"
        }, {
            "cod": "00002",
            "nome": "Tradicional 1kg",
            "descricao": "Pao de queijo tradicional",
            "preco": 29,
            "embalagem": "1Kg",
            "img": "http://placehold.it/100x70"
        }, {
            "cod": "00003",
            "nome": "Tradicional 2Kg",
            "descricao": "Pao de queijo tradicional",
            "preco": 58,
            "embalagem": "2Kg",
            "img": "http://placehold.it/100x70"
        }, {
            "cod": "00011",
            "nome": "Multigrãos 500g",
            "descricao": "Pao de queijo Multigrãos",
            "preco": 16,
            "embalagem": "500g",
            "img": "http://placehold.it/100x70"
        }, {
            "cod": "00012",
            "nome": "Multigrãos 1kg",
            "descricao": "Pao de queijo Multigrãos",
            "preco": 31,
            "embalagem": "1Kg",
            "img": "http://placehold.it/100x70"
        }, {
            "cod": "00013",
            "nome": "Multigrãos 2Kg",
            "descricao": "Pao de queijo Multigrãos",
            "preco": 62,
            "embalagem": "2Kg",
            "img": "http://placehold.it/100x70"
        }

    ]
}
