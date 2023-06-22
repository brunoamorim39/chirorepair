window.onbeforeunload = () => {
    for(const form of document.getElementsByTagName('form')) {
      form.reset();
    }
}

let setRedirectUrl = function() {
    window.location.replace = '/submitted'
}