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
            let productsContainer = document.getElementById('products-container')
            for (product in products) {
                let productHTML = `
                    <div class="col-md-3 col-6 px-5 mb-4">
                        <img class="rounded w-100 mb-3" src="assets/${products[product]['image']}">
                        <h5 class="text-center text-dark">${products[product]['name']}</h5>
                    </div>
                `;
                productsContainer.innerHTML += productHTML;
            }
        })
    });
}