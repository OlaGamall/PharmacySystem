const db = openDatabase('pharma-db', '1.0', 'pharma db', 2 * 1024 * 1024);
var encryptedPass = MD5("55555");

db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS items (name unique, amount, price)');
});

db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS users (username unique, password)'); 
    tx.executeSql('INSERT INTO users VALUES("ola",?)', [encryptedPass]);
});

db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS invoice (id INTEGER PRIMARY KEY AUTOINCREMENT, name, quantity, date, type, user_name)');
});


function getLogin() {
    var username = $('#usrnametxt').val();
    var password = MD5($('#passwordtxt').val());
    //var intPassword = Number(password);
    if (username.length == 0 || password.length == 0) {
        alert("Enter username and password");
    }
    else {
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], function (tx, results) {
                if (results.rows.length == 1) {
                    window.location.href = "index.html";
                    localStorage.username = username;
                }
                else alert("Username or Password is invalid");
            });
        });
    }
}

