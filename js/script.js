// Vår sök-knapp
const btn = document.querySelector('button');

// Gör knapp klickbar & tar bort föregående bilder vi sökt på när vi väljer att söka på något nytt
btn.addEventListener('click', function () {
    const txtInput = document.getElementById('search');
    const numInput = document.getElementById('amount');

    const divEl = document.querySelectorAll('#gallery img');
    for (let i = 0; i < divEl.length; i++) {
        const el = divEl[i];
        el.remove();
    }

    // Sänd input-value till funktionen SearchFlickr
    searchFlickr(txtInput.value, numInput.value);

});

// I searchFlickr tar vi user-inputen och addar till url. Sen gör vi en fetch för att få tillbaka JSON-data
// Ett error-meddelande är tillagt till användaren om det skulle vara något fel på vår länk etc.
function searchFlickr(searchText, numOfPics) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6c45ec57af53c8fee515b538828e76f8&text=${searchText}&per_page=${numOfPics}&format=json&nojsoncallback=1&sort=relevance&accuracy=1`;

    fetch(url).then(
        function (response) {
            return response.json();
        }
    ).then(
        function (data) {
            getImageUrl(data);
        }
    ).catch(
        function (error) {
            const h4 = document.createElement('h4');
            h4.innerText = 'Something is fishy here, try to reload the page or search for something else. The link might also be broken :('
            h4.style.color = 'white';
            h4.style.textAlign = 'center';
            document.body.appendChild(h4);
        }
    );
}

// Skapar en array med bilder som vi vill visa beroende på hur många bilder användaren väljer
function getImageUrl(photoObject) {
    let json = photoObject;
    let sizeOptions = document.getElementById('size');
    let size = sizeOptions.value;

    for (let i = 0; i < (json.photos.photo).length; i++) {
        let imgUrl = `https://live.staticflickr.com/${json.photos.photo[i].server}/${json.photos.photo[i].id}_${json.photos.photo[i].secret}_${size}.jpg`;

        displayImg(imgUrl);

    }

}

// Lägger till alla bilder i div:en som är flexad och centrerad på sidan
function displayImg(url) {
    let img = document.createElement('img');
    img.src = url;
    img.style.margin = '0.5rem 0.5rem';
    let div = document.getElementById('gallery');

    div.appendChild(img);

}