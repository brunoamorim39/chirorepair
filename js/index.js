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
    fetch('./homepage.json').then(function(response) {
        response.json().then(function(homepage_json) {
            // Our values section
            let ourValuesContainer = document.getElementById('our_values-container');

            for (let value in homepage_json['our_values']) {
                let valueHTML = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-header bg-dark">
                                <h5 class="card-title text-light">${homepage_json['our_values'][value].name}</h5>
                            </div>
                            <div class="card-body">
                                <p class="card-text">${homepage_json['our_values'][value].description}</p>
                            </div>
                        </div>
                    </div>
                `;
                ourValuesContainer.innerHTML += valueHTML;
            };

            // Testimonials section
            let testimonialsContainer = document.getElementById('testimonials-container');

            

            // Products section
            let productsContainer = document.getElementById('products-container');

            tabsHTML = `
                <ul class="nav nav-tabs justify-content-center mb-5" id="products-tabs" role="tablist">
            `;
            tabsContentHTML = `
                <div class="tab-content" id="products-tabs-content">
            `;
            for (let productType in homepage_json['products']) {
                tabsHTML += `
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="${homepage_json['products'][productType]['id']}-tab" data-bs-toggle="tab" data-bs-target="#${homepage_json['products'][productType]['id']}" type="button" role="tab" aria-controls="${homepage_json['products'][productType]['id']}" aria-selected="true">
                            ${homepage_json['products'][productType]['name']}
                        </button>
                    </li>
                `;

                tabsContentHTML += `
                    <div class="tab-pane fade row" id="${homepage_json['products'][productType]['id']}" role="tabpanel" aria-labelledby="${homepage_json['products'][productType]['id']}-tab">
                        <div class="d-flex flex-wrap">
                `;

                for (let product in homepage_json['products'][productType]['products']) {
                    tabsContentHTML += `
                        <div class="col-md-3 col-6 px-5 mb-4">
                            <img class="rounded w-100 mb-3" src="./assets/${homepage_json['products'][productType]['products'][product]['image']}">
                            <h5 class="text-center text-dark">${homepage_json['products'][productType]['products'][product]['name']}</h5>
                        </div>
                    `;
                }

                tabsContentHTML += `
                        </div>
                    </div>
                `;
            };
            tabsHTML += `</ul>`;
            productsContainer.innerHTML += tabsHTML;
            document.getElementById('products-tabs').childNodes[1].childNodes[1].classList.add('active');
            productsContainer.innerHTML += tabsContentHTML;
            document.getElementById('products-tabs-content').childNodes[1].classList.add('show', 'active');
        })
    });
}
