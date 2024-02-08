function getText() {
    var input = document.getElementById('imgInput');
    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        var imgData = e.target.result;
        toBackend(imgData);
    };

    reader.readAsDataURL(file);
}

function toBackend(imgData) {
    fetch('/extract_text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'imgData=' + encodeURIComponent(imgData)
    })
    .then(response => response.json())
    .then(data => {document.getElementById('output').innerText = data.text;})
    .catch(error => console.error('Error', error));
}