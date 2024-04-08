document.addEventListener("DOMContentLoaded", function() {
    // Fetch navbar.html using AJAX
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Insert the navbar content into the placeholder
                document.getElementById("navbar-placeholder").innerHTML = xhr.responseText;
            } else {
                console.error('Error loading navbar: ' + xhr.status);
            }
        }
    };
    xhr.open("GET", "navBar.html", true);
    xhr.send();
});