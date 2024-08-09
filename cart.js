function addToCart(productName, productPrice, quantityInputId, isKg = false) {
    var quantity = document.getElementById(quantityInputId).value;

    if (quantity && quantity > 0) {
        var totalPrice = productPrice * quantity;

        var table = document.getElementById('cartTable');
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = productName;
        cell2.innerHTML = quantity + (isKg ? " kg" : " Qty");
        cell3.innerHTML = "Rs. " + totalPrice.toFixed(2);

        updateTotal();
    } else {
        alert("Please enter a valid quantity.");
    }
}

function addToFavourite() {
    var cartTable = document.getElementById('cartTable');
    var favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    
    for (var i = 1; i < cartTable.rows.length; i++) {
        var row = cartTable.rows[i];
        var product = {
            name: row.cells[0].innerText,
            quantity: row.cells[1].innerText,
            price: row.cells[2].innerText
        };

        if (!favourites.some(fav => fav.name === product.name && fav.quantity === product.quantity)) {
            favourites.push(product);
        }
    }
    
    localStorage.setItem('favourites', JSON.stringify(favourites));
    alert("Items added to favourites!");
}

function applyToFavourite() {
    var cartTable = document.getElementById('cartTable');
    var favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    
    cartTable.innerHTML = "<tr><th>Name</th><th>Qty/Kg</th><th>Price</th></tr>";
    
    favourites.forEach(function(product) {
        var row = cartTable.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = product.name;
        cell2.innerHTML = product.quantity;
        cell3.innerHTML = product.price;
    });

    localStorage.removeItem('favourites');
    alert("Favourites applied to cart!");

    updateTotal();
}

function buyNow() {
    var cartTable = document.getElementById('cartTable');
    var items = [];
    
    for (var i = 1; i < cartTable.rows.length; i++) {
        var row = cartTable.rows[i];
        var item = {
            name: row.cells[0].innerText,
            quantity: row.cells[1].innerText,
            price: row.cells[2].innerText
        };
        items.push(item);
    }

    if (items.length === 0) {
        alert("Your cart is empty. Please add items to the cart before proceeding to buy.");
        return;
    }

    localStorage.setItem('cart', JSON.stringify(items));
    alert("Proceeding to checkout!");
    window.location.href = 'buy.html';
}

function displayCart() {
    var table = document.getElementById('cartTable');
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    table.innerHTML = "<tr><th>Name</th><th>Qty/Kg</th><th>Price</th></tr>";

    cart.forEach(function(product) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = product.name;
        cell2.innerHTML = product.quantity;
        cell3.innerHTML = product.price;
    });

    updateTotal();
}

function updateTotal() {
    var table = document.getElementById('cartTable');
    var total = 0;

    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var priceText = row.cells[2].innerText.replace("Rs. ", "");
        var price = parseFloat(priceText);

        total += price;
    }

    document.getElementById('totalPrice').innerText = "Total: Rs. " + total.toFixed(2);
}

document.getElementById('deliveryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);
    var deliveryDate = currentDate.toDateString();

    var outputDiv = document.getElementById('output');
    outputDiv.style.display = 'block';
    outputDiv.innerHTML = "<h2>Delivery Details</h2>" +
                          "<p><strong>Name:</strong> " + name + "</p>" +
                          "<p><strong>Address:</strong> " + address + "</p>" +
                          "<p><strong>Delivery Date:</strong> " + deliveryDate + "</p>" +
                          "<p>Thank you for ordering products at SMARKET. Thank you and hope to see you soon!!!</p>";
});

displayCart();
