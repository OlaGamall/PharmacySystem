var db = openDatabase('pharma-db', '1.0', 'pharma db', 2 * 1024 * 1024);
// db.transaction(function (tx) {
//     tx.executeSql('DELETE FROM users where username = "sara"');
//     // tx.executeSql('update users set username = "ola" where username = "shahenda"');
// });

function addNewUser() {
    var username = document.getElementById("exampleInputEmail1").value;
    var password = document.getElementById("exampleInputPassword1").value;
    var confirmPassword = document.getElementById("exampleInputPassword2").value;
    var encryptedPass = MD5(password);
    if (username.length != 0 && password.length != 0 && confirmPassword.length != 0) {
        if (password == confirmPassword) {
            db.transaction(function (tx) {
                tx.executeSql('INSERT INTO users VALUES (?,?)', [username, encryptedPass]);
            });
            alert("New user added")
        }
        else {
            alert("Unmatched passwords");
        }
    }
    else alert("Fill all fields");
}