window.onbeforeunload = () => {
    for(const form of document.getElementsByTagName('form')) {
      form.reset();
    }
}

let setRedirectUrl = function() {
    window.location.replace = '/submitted'
}

window.onload = function() {
    fetch('./products.json').then(function(response) {
        response.json().then(function(products) {
            let productType = window.location.search.substring(1);

            let splashContainer = document.getElementById('splash-image');
            let productsContainer = document.getElementById('products-container');

            if (products[productType]) {
                let splashHTML = `<img class="header-image card mx-3 mt-3" src="./assets/${products[productType]['splash_image']}">`;
                splashContainer.innerHTML += splashHTML;
                
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
                let splashHTML = `<img class="header-image card mx-3 mt-3" src="./assets/P1020741-1.webp">`;
                splashContainer.innerHTML += splashHTML;
                
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
