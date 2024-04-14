function setupSlider() {
    // Get all slider options
    const sliderOptions = document.querySelectorAll('.slider-campaign-options > div');

    // Add click event listeners to buttons inside slider options for direct navigation
    sliderOptions.forEach((option, index) => {
        const button = option.querySelector('.slider-bottom-buttons');
        button.addEventListener('click', () => {
            // Remove 'active-slider' class from all slider options
            sliderOptions.forEach(opt => {
                opt.classList.remove('active-slider');
            });

            // Add 'active-slider' class to the clicked slider option
            console.log("Added active to the slider number: ", option);
            option.classList.add('active-slider');
        });
    });

    // Get the forward and backward arrow buttons
    const forwardArrow = document.querySelector('.slider-arrow-button-campaigns');
    const backwardArrow = document.querySelector('.slider-arrow-button');

    // Add click event listener to forward arrow button
    forwardArrow.addEventListener('click', () => {
        navigateSlider(true);
    });

    // Add click event listener to backward arrow button
    backwardArrow.addEventListener('click', () => {
        navigateSlider(false);
    });

    // Function to navigate the slider
    function navigateSlider(forward) {
        // Find the currently active slider option
        const activeIndex = Array.from(sliderOptions).findIndex(option => option.classList.contains('active-slider'));

        // Remove 'active-slider' class from all slider options
        sliderOptions.forEach(option => {
            option.classList.remove('active-slider');
        });

        // Calculate the index for the next or previous slider option
        let nextIndex;
        if (forward) {
            nextIndex = (activeIndex + 1) % sliderOptions.length;
        } else {
            nextIndex = (activeIndex - 1 + sliderOptions.length) % sliderOptions.length;
        }

        // Add 'active-slider' class to the next or previous slider option
        sliderOptions[nextIndex].classList.add('active-slider');
    }
}

function setupSliderButtons() {
    // Get all slider buttons
    const sliderButtons = document.querySelectorAll('.slider-buttons-container .slider-buttons');

    // Add click event listeners to slider buttons for direct navigation
    sliderButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all slider buttons
            sliderButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Add 'active' class to the clicked slider button
            button.classList.add('active');
        });
    });
}

function setupSliderBackground() {
    // Get all slider options
    const sliderOptions = document.querySelectorAll('.slider-campaign-options > div');

    // Function to update slider background
    function updateBackground(index) {
        const backgroundImageUrls = [
            "url('https://images.hepsiburada.net/banners/s/1/1344-756/bannerImage2098_20240405182552.png/format:webp')",
            "url('https://images.hepsiburada.net/banners/s/1/142-80/thumbnailImage2079_20240406112637.jpeg/format:webp')",
        ];

        // Set the background image based on the index of the active slider option
        document.querySelector('.slider-campaign-1-img').style.backgroundImage = backgroundImageUrls[index];
    }

    // Add click event listeners to slider options for background change
    sliderOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            // Remove 'active-slider' class from all slider options
            sliderOptions.forEach(opt => {
                opt.classList.remove('active-slider');
            });

            // Add 'active-slider' class to the clicked slider option
            option.classList.add('active-slider');

            // Update the background image based on the index of the clicked slider option
            updateBackground(index);
        });
    });
}

// Call the function to set up the slider background
setupSliderBackground();

// Call the function to set up the slider buttons
setupSliderButtons();

// Call the function to set up the slider
setupSlider();
