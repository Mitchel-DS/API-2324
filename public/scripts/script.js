console.log('script loaded');

// Webanimation API
// let poster = document.querySelector('.moviePoster');
// poster.addEventListener('mouseover', function () {
//     let animation = poster.animate({
//         transform: ['scale(1)', 'scale(1.25)']
//     }, 300);
//     poster.style.transform = 'scale(1,25)';
// });

// poster.addEventListener('mouseout', function () {
//     let animation = poster.animate({
//         transform: ['scale(1.25)', 'scale(1)']
//     }, 300);
//     poster.style.transform = '';
// });

// geolocation API
function getLocation() {
    if (navigator.geolocation) {
        try {
            navigator.geolocation.getCurrentPosition(test);
        } catch (error) {
            console.log('Unable to retrieve your location', error)
        }
    } else {
        console.log('Geolocation is not supported by your browser.');
    }
}

function test(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    convertToCountry(latitude, longitude);
    console.log(latitude, longitude);
}

getLocation();

// converting geolocation to iso-code
function convertToCountry(lat, long) {
    const apiKey = '996ca33c42fd464dbec19f0261666e03'; // Replace with your API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${apiKey}`;
    
    // Fetch data from the API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Extract country code from the API response
            const countryCode = data.results[0].components.country_code;
            console.log(countryCode);
        })
        .catch(error => console.error('Error:', error));
    }


