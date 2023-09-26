// Replace with your own publishable key: https://dashboard.stripe.com/test/apikeys
var PUBLISHABLE_KEY = 'pk_live_51NP5ZIHdvmpfrQnfDZVvxtJmJxtaUWWSw0XxNJcfHfZRQr7WcgEZJvnf8ojzh7JWHDt6AjHyeno6DwuHRnCo4V6s00IajTe3A0';


// Replace with the domain you want your users to be redirected back to after payment
var DOMAIN = location.href.replace(/[^/]*$/, '');

var stripe = Stripe(PUBLISHABLE_KEY);

// Handle any errors from Checkout
var handleResult = function (result) {
  if (result.error) {
    var displayError = document.getElementById('error-message');
    displayError.textContent = result.error.message;
  }
};

document.querySelectorAll('button').forEach(function (button) {
  button.addEventListener('click', function (e) {
    var priceId = e.target.dataset.priceId;
    var quantity = e.target.parentNode.children[1].value;
    
    var items = [{ price: priceId, quantity: Number(quantity) }];

    // Make the call to Stripe.js to redirect to the checkout page
    // with the sku or plan ID.
    stripe.redirectToCheckout({
        mode: 'payment',
        lineItems: items,
        successUrl: DOMAIN + 'success.html?session_id={CHECKOUT_SESSION_ID}',
        cancelUrl: DOMAIN + 'canceled.html?session_id={CHECKOUT_SESSION_ID}',
        billingAddressCollection: 'required',
        shippingAddressCollection: {allowedCountries: ['US', 'CA', 'MX']},
      }).then(handleResult);
  });
});