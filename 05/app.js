document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");
    const buttons = navbar.getElementsByClassName("text");

    // Smooth scrolling when clicking on text links
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            const range = parseInt(buttons[i].getAttribute("data-range"));
            const scrollTo = range * window.innerHeight;
            window.scrollTo({
                top: scrollTo,
                behavior: "smooth"
            });
        });
    }

    window.addEventListener("scroll", function () {
        const scrollTop = window.scrollY;
        const viewportHeight = window.innerHeight;

        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            const range = parseInt(button.getAttribute("data-range"));
            const start = range * viewportHeight;
            const end = (range + 1) * viewportHeight;

            if (scrollTop >= start && scrollTop < end) {
                buttons[i].classList.add("underline");
            } else {
                buttons[i].classList.remove("underline");
            }
        }

        // Show/hide back-to-top button based on scroll position
    });
    window.addEventListener("scroll", function () {
        const scrollTop = window.scrollY;
        // Show/hide back-to-top button based on scroll position (corrected logic)
        const backToTopButton = document.querySelector('.back-to-top');
        backToTopButton.style.display = scrollTop > 1600 ? 'block' : 'none'; // Show button if scrolled more than 400px
    });
});

// Function to scroll to the top when back-to-top button is clicked
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const bookmeButton = document.getElementById('sign');

function flicker() {
    const pauseDuration = Math.random() * 200 + 100; // Random pause duration between 0.5 and 2.5 seconds
    const blinkDuration = Math.random() * 500 + 20; // Random blinking duration between 0.2 and 0.7 seconds

    // Apply varient class
    bookmeButton.classList.add('varient');

    // Set a timeout to remove the varient class after the random blinking duration
    setTimeout(() => {
        bookmeButton.classList.remove('varient');

        // Set a timeout to call the flicker function again after the random pause duration
        setTimeout(flicker, pauseDuration);
    }, blinkDuration);
}

// Initial call to start the flickering
flicker();

document.addEventListener('mousemove', (e) => {
    const mousex = e.clientX - 20;
    const mousey = e.clientY - 20;
    const circles = document.querySelectorAll(".circle");

    // Check if the mouse is within the screen boundaries
    const isMouseWithinScreen = mousex >= 0 && mousey >= 0 && mousex <= window.innerWidth && mousey <= window.innerHeight;

    circles.forEach(circle => {
        if (isMouseWithinScreen) {
            circle.style.opacity = '1';  // Show the circle

            // Calculate speed based on the change in mouse position
            const speed = Math.sqrt((e.movementX ** 2) + (e.movementY ** 2));

            // Adjust width and height of the circle based on speed
            const diameter = Math.min(100, 40 + speed * 0.5); // Adjust the multiplier to control sensitivity

            // Set width and height to create an elliptical effect
            circle.style.width = `${diameter}px`;
            circle.style.height = `${diameter}px`;

            circle.style.transform = `translate(${mousex}px, ${mousey}px)`;
        } else {
            circle.style.opacity = '0';   // Hide the circle
        }
    });
});


// document.addEventListener('mousemove', (e) => {
//     const mouseX = e.clientX;
//     const mouseY = e.clientY;

//     const eyeContainer = document.querySelector('.eye-container');
//     const eye = document.querySelector('.eye');
//     const pupil = document.querySelector('.pupil');

//     const eyeRect = eyeContainer.getBoundingClientRect();

//     const eyeCenterX = eyeRect.left + eyeRect.width / 2;
//     const eyeCenterY = eyeRect.top + eyeRect.height / 2;

//     const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
//     const distance = Math.min(eyeRect.width / 4, eyeRect.height / 4);

//     const pupilX = distance * Math.cos(angle);
//     const pupilY = distance * Math.sin(angle);

//     pupil.style.transform = `translate(-50%, -50%) translate(${pupilX}px, ${pupilY}px)`;
// });

const homeImage = document.getElementById('homeImage');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const mouseX = clientX / window.innerWidth - 0.5;
    const mouseY = -(clientY / window.innerHeight - 0.5);
    const perspective = 50; // Adjust the perspective value as needed
    const depth = 100; // Adjust the depth value as needed

    homeImage.style.transform = `rotateX(${mouseY * perspective}deg) rotateY(${mouseX * perspective}deg) translateZ(${depth}px)`;
});

const toggleButton = document.getElementById('toggleButton');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('invert-colors');
});


document.addEventListener('DOMContentLoaded', function () {
    const parent = document.getElementById('parent');
    const bar = document.getElementById('bar');

    let prevMouseX = 2;
    let prevTimestamp = Date.now();

    document.addEventListener('mousemove', function (event) {
        const mouseX = event.clientX - parent.getBoundingClientRect().left;
        const timestamp = Date.now();
        const deltaTime = timestamp - prevTimestamp;

        // Calculate speed (change in mouse position over time)
        const speed = Math.abs(mouseX - prevMouseX) / deltaTime;

        // Use speed to modify the width of the bar
        const barWidth = Math.min(50, speed * 50); // Adjust the multiplier to control sensitivity

        // Ensure the bar stays within the boundaries of the parent
        const barX = Math.min(Math.max(0, mouseX - barWidth / 2), parent.clientWidth - barWidth);

        bar.style.left = barX + 'px';
        bar.style.width = barWidth + 'px';

        prevMouseX = mouseX;
        prevTimestamp = timestamp;
    });
});