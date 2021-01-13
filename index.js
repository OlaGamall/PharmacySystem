var db = openDatabase('pharma-db', '1.0', 'pharma db', 2 * 1024 * 1024);

db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM items', [], function (tx, results) {
        var len = results.rows.length, i;

        for (i = 0; i < len; i++) {
            var currentItem = results.rows.item(i);

            var itemCol = document.createElement("div");
            itemCol.innerHTML =
                '<div class="card mb-2 mr-2" style="width: 18rem;">' +
                `<div style="height:200; background:url(${localStorage.getItem(currentItem.name)}); background-size: cover;"> </div>` +
                '<div class="card-body">' +
                '<div class="row">' +
                `<div class="col"><h5 class="card-title">${currentItem.name}</h5></div>` +
                // `<h5 class="card-title">${currentItem.name}</h5>` +
                `<div class="col">` +
                '<div class="nav-item dropdown">' +
                '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">' +
                '</a>' +
                '<ul class="dropdown-menu" aria-labelledby="navbarDropdown">' +
                `<li><a id = ${currentItem.name} class="dropdown-item" href="index.html" onclick = "deleteItem(this.id)">Delete</a></li>` +
                `<li><a class="dropdown-item" href="invoice.html">Make Invoice</a></li>` +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>' +

                '<div class="row">' +
                `<div class="col card-text">${currentItem.amount} items</div>` +
                `<div class="col card-text text-right mr-2">${currentItem.price}$</div>` +
                '</div>' +
                '</div>' +
                '</div>';

            document.getElementById("items").appendChild(itemCol);

        }
    }, null);
});


function deleteItem(name) {
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM items WHERE name = ?', [name]);
    });
}