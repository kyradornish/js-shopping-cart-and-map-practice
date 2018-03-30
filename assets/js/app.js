var urlCard = './assets/products.json';
var cart = [];
var inventory;
var add;

firebase.initializeApp(config);

$.getJSON(urlCard, function(res) {
    var HTMLcard = '';
    inventory = res;
    $.each(res, function (index, card) {
        HTMLcard += '<div class="card"><img src="http://via.placeholder.com/150x150"> <br><br><p><b>' + card.name + '</b><br><span id="desc">' + card.description + '</span><br>' + card.price + '</p><button onclick="addtocart('+card.id+')" id="add" class="btn">Add to Cart</button></div>';
    });
    $("#cards").html(HTMLcard)
});

function addtocart(id) {
    $.each(inventory, function (index, prod) {
        if (prod.id === id) {
            cart.push(prod);
            }
        });
    add = true;
    writeData(cart);
    getCart();
    sumtotal();
}

function displaycart(items) {
    HTMLprodcart = '';
    if (items === null) {
        cart = []
    }
    else {for (var i=0; i<items.length; i++) {
            HTMLprodcart += '<div class="cartprod" ><a href="#" onclick="remove('+i+')"><span class="glyphicon glyphicon-remove"></span></a>' + items[i].name + ': <span class="floatright">' + items[i].price + '</span></div>';
        };
    }
    $("#prodcart").html(HTMLprodcart);
}

function sumtotal(){
    var HTMLtotal = 0;
    for (var i=0; i<cart.length; i++) {
        if (add === true) {
            HTMLtotal += cart[i].price;
        } else {
            HTMLtotal -= cart[i].price;
        }
    };
    $("#total").html(HTMLtotal.toFixed(2));
}

function remove(i){
    cart.splice(i, 1);
    writeData(cart);
    getCart();
    sumtotal();
}

//Database Functions
function getCart() {
    var cartItems = firebase.database().ref('cart/items');
    cartItems.on('value', function (items) {
        displaycart(items.val());
    });
};

function writeData(cart) {
    firebase.database().ref('cart/').set({
        'items': cart
    });
}


//maps
function initMap() {
    var uluru = {
        lat: 38.877007,
        lng: -77.006336
    };
    var map = new google
        .maps
        .Map(document.getElementById('map'), {
            zoom: 14,
            center: uluru
        });
    var marker = new google
        .maps
        .Marker({position: uluru, map: map});
}

//smooth scroll
$(document)
    .ready(function () {
        $("a")
            .on('click', function (event) {
                if (this.hash !== "") {
                    event.preventDefault();
                    var hash = this.hash;
                    $('html, body').animate({
                        scrollTop: $(hash)
                            .offset()
                            .top
                    }, 800, function () {
                        window.location.hash = hash;
                    });
                } 
            });
    });