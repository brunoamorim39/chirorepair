window.onbeforeunload = () => {
    for(const form of document.getElementsByTagName('form')) {
      form.reset();
    }
}

let setRedirectUrl = function() {
    window.location.replace = '/submitted'
}

var splashCarousel = document.getElementById('splash-carousel');
var carousel = new bootstrap.Carousel(splashCarousel, {
    interval: 7500,
    wrap: true,
    pause: false
});

window.onload = function() {
    fetch('./products.json').then(function(response) {
        response.json().then(function(products) {
            let productType = window.location.search.substring(1);

            let splashContainer = document.getElementById('splash-image');
            let productsContainer = document.getElementById('products-container');

            if (products[productType]) {
                for (product in products[productType]['products']) {
                    let productHTML = `
                        <div class="col-md-3 col-6 px-5 mb-4">
                            <img class="rounded w-100 mb-3" src="./assets/${products[productType]['products'][product]['image']}">
                            <h5 class="text-center text-dark">${products[productType]['products'][product]['name']}</h5>
                        </div>
                    `;
                    productsContainer.innerHTML += productHTML;
                }
            } else {
                for (product in products['adjustment_tool']['products']) {
                    let productHTML = `
                        <div class="col-md-3 col-6 px-5 mb-4">
                            <img class="rounded w-100 mb-3" src="./assets/${products['adjustment_tool']['products'][product]['image']}">
                            <h5 class="text-center text-dark">${products['adjustment_tool']['products'][product]['name']}</h5>
                        </div>
                    `;
                    productsContainer.innerHTML += productHTML;
                }
            }
        })
    });
}
