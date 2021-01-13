var imgAsDataURL;
var db = openDatabase('pharma-db', '1.0', 'pharma db', 2 * 1024 * 1024);

function insertNewItem() {
    var name = document.getElementById("itemname");
    var quantity = document.getElementById("itemquantity");
    var price = document.getElementById("itemprice");
    db.transaction(function (tx) {
        //tx.executeSql('CREATE TABLE IF NOT EXISTS items (name unique, amount, price)');
        tx.executeSql('INSERT INTO items VALUES (?,?,?)', [name.value, quantity.value, price.value]);
    });
    localStorage.setItem(name.value, imgAsDataURL);
}

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
            video.srcObject = stream;
        })
        .catch(function (error) {
            console.log("Something went wrong!");
        });
}

//take photo with camera
var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#canvas");

// function stop(e) {

//     var stream = video.srcObject;
//     var tracks = stream.getTracks();

//     for (var i = 0; i < tracks.length; i++) {
//         var track = tracks[i];
//         track.stop();
//     }

//     video.srcObject = null;
// }
function takescreenshot() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    // Other browsers will fall back to image/png
    imgAsDataURL = canvas.toDataURL("image/webp");
};

function loadCanvasWithInputFile() {
    var context = canvas.getContext("2d");
    var fileinput = document.getElementById('myfile');
    var img = new Image();

    fileinput.onchange = function (evt) {
        var files = evt.target.files;
        var file = files[0];
        var reader = new FileReader();
        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
        reader.onload = function (evt) {
            if (evt.target.readyState == FileReader.DONE) {
                img.src = evt.target.result;
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0);
                    imgAsDataURL = canvas.toDataURL("image/*");
                }
            }
        }

    };
}

loadCanvasWithInputFile();