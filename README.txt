Link to deployment:
hepsiburadawebappbykayra.azurewebsites.net

GitHub link:
https://github.com/Noxtrah/E-Commerce-Site.git

Video link:
https://drive.google.com/file/d/1g3RO40IRwrLhEO-C9XCJCPeSPI-v4VFm/view?usp=sharing

IMPORTANT:
-After the page loads the nav-bar(logo, search bar and location selector) load a little later than the page. The reason is the same nav-bar is used in 3 different pages. So I
made a special .html file just for nav-bar and fetch it to other 3 pages(mainPage, searchedItemsPage and itemDetailPage).
-Sometimes the .css and .js of the nav-bar loads later than the .html. So the visual may seem primitive. Waiting a little longer or refreshing the page solves the problem.
Because the free app service of Azure starts very slowly at first (works completely fine in local, this is why I am sure the problem is in free app service).
-Database works slow on the start because of cool-start. After first fetch it gets faster. Refreshing the page will solve the problem if the data doesn't come.

Notes:
1-) Search bar only searches by tag. (i.e. Elektronik, Moda, etc.)
2-) Best way to test 'Yarın kapında' function is 'Elektronik' tag since it has 2 items in Izmir, 1 in Ankara and 1 in İstanbul.
3-) 'Süpermarket, Pet Shop' and 'Kozmetik, Kişisel Bakım' tags does not contain any items.
4-) Some items doesn't have descriptions (There is no problem in displaying item properties in itemDetail page).
5-) Mssql used as database.
