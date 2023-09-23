// Replace with your own publishable key: https://dashboard.stripe.com/test/apikeys
var PUBLISHABLE_KEY = 'pk_test_51NP5ZIHdvmpfrQnfpkvqUze23OzpV1kVkTVNGexckajy66pOKV9OM6ON4FJA2B18l79EU90na7fZF8qHhoBaH4sS00toJHJaSs';

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
    var items = [{ price: priceId, quantity: 1 }];

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