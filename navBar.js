document.addEventListener("DOMContentLoaded", function() {
    // Fetch navbar.html using AJAX
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Insert the navbar content into the placeholder
                document.getElementById("navbar-placeholder").innerHTML = xhr.responseText;
                createSearchBoxOnClick();
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
    const searchbarContainer = document.querySelector('.searchbar-container');
    searchbarContainer.appendChild(searchBox);
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
