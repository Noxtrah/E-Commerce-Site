document.addEventListener("DOMContentLoaded", function() {
    // Fetch navbar.html using AJAX
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Insert the navbar content into the placeholder
                document.getElementById("navbar-placeholder").innerHTML = xhr.responseText;
                createSearchBoxOnClick();
                makeNavbarSectionsClickable();
                createLocationDropdown();
                } else {
                console.error('Error loading navbar: ' + xhr.status);
            }
        }
    };
    xhr.open("GET", "navBar.html", true);
    xhr.send();

    // Add click event listener to document for event delegation
    document.addEventListener('click', function(event) {
        const searchBar = event.target.closest('.searchbar');
        const searchBox = document.querySelector('.search-box');
        
        if (searchBar && !searchBox) {
            createSearchBox();
        } else if (!searchBar && searchBox) {
            removeSearchBox();
        }
    });
});

function createSearchBox(){
    var searchBox = document.createElement('div');
    searchBox.classList.add('search-box');

    var searchBoxFirstLabel = document.createElement('div');
    searchBoxFirstLabel.classList.add('search-box-first-label');
    searchBoxFirstLabel.innerHTML = 'Aramaya başlamak için <b>en az 2 karakter</b> yazmalısınız.';
    searchBox.appendChild(searchBoxFirstLabel);

    const searchbarContainer = document.querySelector('.searchbar-container');
    searchbarContainer.appendChild(searchBox);

    const category = document.querySelector('.search-input');
    category.addEventListener('input', searchBarSuggestions);
}

function removeSearchBox() {
    var searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.style.display = 'none';
    }
}

function createSearchBoxOnClick(){
    const searchBar = document.querySelector('.searchbar');
    searchBar.addEventListener('click', function() {
        toggleSearchBox();
    });
}

function toggleSearchBox() {
    var searchBox = document.querySelector('.search-box');
    if (searchBox) {
        if (searchBox.style.display === 'none') {
            searchBox.style.display = 'block';
        } else {
            searchBox.style.display = 'none';
        }
    }
}

function searchBarSuggestions(){
    const category = document.querySelector('.search-input');
    console.log(category);
    const inputValue = category.value.trim().toLowerCase();
    console.log(inputValue);
    const searchBoxFirstLabel = document.querySelector('.search-box-first-label');

    // Check if the length of the input value is less than 2
    if (inputValue.length < 2) {
        // Clear previous suggestions
        searchBoxFirstLabel.innerHTML = 'Aramaya başlamak için <b>en az 2 karakter</b> yazmalısınız.';
        return; // Exit the function early
    }

    var tags = ["Elektronik","Moda","Ev, Yaşam, Kırtasiye, Ofis","Oto, Bahçe, Yapı, Market","Anne, Bebek, Oyuncak","Spor, Outdoor","Kozmetik, Kişisel Bakım","Süpermarket, Pet Shop", "Kitap, Film, Müzik, Hobi"];

    // Clear previous suggestions
    searchBoxFirstLabel.innerHTML = '';

    // Filter tags array based on input value
    const filteredTags = tags.filter(tag => tag.toLowerCase().includes(inputValue));

    // Create li elements for filtered tags
    filteredTags.forEach(tag => {
        const li = document.createElement('li');
        li.classList.add('filtered-tags');
        li.textContent = tag;

        // Add click event listener to each li element
        li.addEventListener('click', function() {
            // Perform action when li element is clicked
            category.value = tag; // Set the value of the input to the clicked tag
            // Optionally, you can submit a form or trigger a search function here

            window.location.href = "searchResultPage.html?category=" + encodeURIComponent(category.value);
        });

        searchBoxFirstLabel.appendChild(li);
    });
}

function makeNavbarSectionsClickable() {
    // Get all the li elements with the class 'navbar-section'
    const navbarSections = document.querySelectorAll('.navbar-section');

    // Iterate over each li element and add a click event listener
    navbarSections.forEach(li => {
        li.addEventListener('click', function() {
            // Get the text content of the clicked li element
            const category = this.textContent.trim();

            // Encode the category value for URL
            const encodedCategory = encodeURIComponent(category);

            // Redirect to the search result page with the category parameter
            window.location.href = `searchResultPage.html?category=${encodedCategory}`;
        });
    });

    const header = document.querySelectorAll('.brand-title');

    header.forEach(li => {
        li.addEventListener('click', function() {
            window.location.href = "mainBoard.html";
        })
    })
}

async function createLocationDropdown() {
    const locationDropdown = document.querySelector('.location-container');

    locationDropdown.addEventListener('click', async function() {
        const existingBox = document.querySelector('.new-box');

        // If a box exists, remove it
        if (existingBox) {
            existingBox.remove();
        } else {
            // Create the new box
            const newBox = document.createElement('div');
            newBox.classList.add('new-box');
            // Create the dropdown box
            const cityDropdown = document.createElement('select');
            cityDropdown.classList.add('dropdown');

            const townDropdown = document.createElement('select');
            townDropdown.classList.add('dropdown');

            const locationHeader = document.createElement('span');
            locationHeader.classList.add('select-location-header');
            locationHeader.textContent = "Konumunuzu Belirleyin";

            const locationInfo = document.createElement('span');
            locationInfo.classList.add('select-location-info');
            locationInfo.textContent = "Adresinizi veya konum bilgilerinizi seçerek özel hizmetleri görebilirsiniz.";

            const saveButton = document.createElement('button');
            saveButton.classList.add('save-button');
            saveButton.textContent = "Kaydet";

            const locationSelector = document.querySelector('.location-selector');

            saveButton.addEventListener('click', function() {
                const selectedCity = cityDropdown.options[cityDropdown.selectedIndex].text;
                const selectedTown = townDropdown.options[townDropdown.selectedIndex].text;
                locationSelector.textContent = `${selectedCity}, ${selectedTown}`;
                const locationInfo = document.querySelector('.current-location-info');
                locationInfo.textContent = `${selectedCity}`;
            });

            // Fetch Turkey's cities and towns from an API
            try {
                const response = await fetch('https://turkiyeapi.dev/api/v1/provinces');
                const responseData = await response.json();

                const provinces = responseData.data;

                // Add cities to the city dropdown
                provinces.forEach(province => {
                    const cityOption = document.createElement('option');
                    cityOption.text = province.name;
                    cityOption.value = province.id;
                    cityDropdown.add(cityOption);
                });

                // Add event listener to the city dropdown to populate towns based on the selected city
                cityDropdown.addEventListener('change', async function() {
                    const selectedCityId = parseInt(this.value);
                    // Find the selected city
                    const selectedCity = provinces.find(city => city.id === selectedCityId);
                    // Remove existing town options
                    townDropdown.innerHTML = '';

                    // Check if the selected city and its districts exist
                    if (selectedCity && selectedCity.districts) {
                        // Add towns to the town dropdown
                        selectedCity.districts.forEach(town => {
                            const townOption = document.createElement('option');
                            townOption.text = town.name;
                            townOption.value = town.id;
                            townDropdown.add(townOption);
                        });
                    }
                });
                cityDropdown.dispatchEvent(new Event('change'));

            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
            // Position the new box below the location container
            const locationRect = locationDropdown.getBoundingClientRect();
            newBox.style.position = 'absolute';
            newBox.style.top = locationRect.bottom + 'px';
            newBox.style.left = locationRect.left + 'px';

            newBox.appendChild(locationHeader);
            newBox.appendChild(locationInfo);
            newBox.appendChild(cityDropdown);
            newBox.appendChild(townDropdown);
            newBox.appendChild(saveButton);
            document.body.appendChild(newBox);
        }
    });
}