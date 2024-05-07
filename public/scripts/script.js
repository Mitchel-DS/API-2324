console.log('script loaded');

// Webanimation API
const poster = document.querySelector('.moviePoster');
poster.addEventListener('mouseover', function() {
    let animation = poster.animate({
        transform: ['scale(1)', 'scale(1.25)']
    }, 300);
    poster.style.transform = 'scale(1,25)';
});

poster.addEventListener('mouseout', function() {
    let animation = poster.animate({
        transform: ['scale(1.25)', 'scale(1)']
    }, 300);
    poster.style.transform = '';
});