const db = openDatabase('pharma-db', '1.0', 'pharma db', 2 * 1024 * 1024);

// db.transaction(function (tx) {
//     tx.executeSql('delete from invoice');
//     // tx.executeSql('CREATE TABLE IF NOT EXISTS invoice (id INTEGER PRIMARY KEY AUTOINCREMENT, name, quantity, date, type, user_name)');
//     // tx.executeSql('INSERT INTO invoice VALUES (1,"cetamoul", 4, "4-12-2019", "sell", "ola")');
// });

function addInvoice(type) {
    var date = $('#start').val();
    var name = $('#itemname').val();
    var quantity = Number($('#itemquant').val());
    if (name.length != 0 && quantity.length != 0) {
        if (type == "buy") {
            db.transaction(function (tx) {
                tx.executeSql("SELECT * FROM items WHERE name = ?", [name], function (tx, results) {
                    if (quantity <= results.rows.item(0).amount) {
                        db.transaction(function (tx) {
                            tx.executeSql("INSERT INTO invoice (name, quantity, date, type, user_name) VALUES(?,?,?,?,?)", [name, quantity, date, type, localStorage.username]);
                        });

                        db.transaction(function (tx) {
                            tx.executeSql("UPDATE items SET amount=amount-? WHERE name=?", [quantity, name]);
                        });
                    }
                    else {
                        alert("Not enough amount");
                    }
                });
            });
        }
        else if (type == "sell") {
            db.transaction(function (tx) {
                tx.executeSql("SELECT * FROM items WHERE name = ?", [name], function (tx, results) {
                    if (results.rows.length >= 1) {
                        db.transaction(function (tx) {
                            tx.executeSql("INSERT INTO invoice (name, quantity, date, type, user_name) VALUES(?,?,?,?,?)", [name, quantity, date, type, localStorage.username]);
                        
                        });

                        db.transaction(function (tx) {
                            tx.executeSql("UPDATE items SET amount=amount+? WHERE name=?", [quantity, name]);
                        });
                    }
                    else {
                        alert("Not Exist");
                    }
                });
            });
        }


    }
    else {
        alert("Please, fill all fields");
    }
}


function getPrice() {
    var name = document.getElementById("itemname").value;
    var price = document.getElementById("itemprice");
    var total = document.getElementById("totalprice");
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM items WHERE name = ?", [name], function (tx, results) {
            price.value = results.rows.item(0).price;
            total.value = Number(document.getElementById("itemquant").value) * Number(results.rows.item(0).price);
        });
    });
}
