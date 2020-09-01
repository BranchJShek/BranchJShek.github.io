$( document ).ready(function() {
    var previous = document.getElementById('previousParam');

    if (localStorage.getItem('adobeParam') !== null) {
        previous.value = localStorage.getItem('adobeParam');
    };
});

function createAdobeLink() {
    var baselink = document.getElementById('baselink').value;
    var adobeParam = document.getElementById('adobe_param').value;
    var league = document.getElementById('league').value;
    var landingPage = document.getElementById('landing_page').value;
    var initiative = document.getElementById('initiative').value;
    var placement = document.getElementById('placement').value;
    var campaign = document.getElementById('campaign').value;
    var optionals = document.getElementById('optionals').value;
    var display = document.getElementById('final_url');

    var adobeValue = league + ':' + landingPage + ':' + initiative + ':' + placement + ':' + campaign + ':' + optionals;
    
    if (adobeParam && league && landingPage && initiative && placement && campaign) {
        if (baselink !== null && baselink.includes("http") || baselink.includes("www")) {
            if (baselink.includes('nba') && !baselink.includes("?")) {
                var finishedLink = baselink + '?' + adobeParam + '=' + adobeValue;
    
                localStorage.setItem('adobeParam', adobeParam + '=' + adobeValue);
    
                display.value = finishedLink;
                console.log(finishedLink);
    
            } else if (baselink.includes('nba') && baselink.includes('?')) {
                var finishedLink = baselink + '&' + adobeParam + '=' + adobeValue;
    
                localStorage.setItem('adobeParam', adobeParam + '=' + adobeValue);
    
                display.value = finishedLink;
                console.log(finishedLink);
    
            } else {
                display.value = "Please enter a valid NBA base link."
            }
    
        } else {
            display.value = "Please ensure that you've entered a valid link."
        }

    } else {
        display.value = "Please check that you've selected an option for all of the above parameters."
    }
}
