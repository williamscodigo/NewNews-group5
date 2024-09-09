//variables definitions
let xmlArray = [];
const newsArray = [];
const input = document.getElementById("form");

//In case of a page reload or when the page is revisited, pulls locally saved array info.
xmlArray = JSON.parse(localStorage.getItem("xmlLocalArray")); 

//Pulls data from xml rss feed that the user inputs
const displayXML = function(xmlArray) {

        //parses the xml file
        for(i = 0; i < xmlArray.length; i++) {
            fetch(xmlArray[i]).then(response => {  
                return response.text();
             }).then(xmlStr => {
                const xmlDocument = new DOMParser().parseFromString(xmlStr, "text/xml");
                const news = xmlDocument.querySelectorAll('item');

                //Pulls individual items from rss feed and displays them in the html.
                for (const item of news) {
                    
                    let article = {title: '', link: '', description: '', pubDate: '', image: ''}
                    article.title = item.querySelector('title').textContent;
                    article.link = item.querySelector('link').textContent;
                    article.description = item.querySelector('description').textContent;
                    article.pubDate = item.querySelector('pubDate').textContent;
                    // article.image = item.querySelectorAll("media\\:content");
                    const mediaContentElement = item.querySelector("media\\:content");
                    // article.image = mediaContentElement.getAttribute("url");

                    console.log(article.image);
                    console.log(typeof article.pubDate);
                    console.log(article);
                    newsArray.push(article);

                    //creating nested Elmements
                    const feed = document.getElementById("feed");
                    feed.classList.add("parent");
                    const section = document.createElement("section");
                    section.classList.add("article");
                    feed.appendChild(section);
                    const ul = document.createElement("ul");
                    section.appendChild(ul);
                    const li = document.createElement("li");
                    ul.appendChild(li);
                    const a = document.createElement("a");
                    a.textContent = article.title;
                    a.setAttribute("href", article.link);
                    li.appendChild(a);
                    const img = document.createElement("img");
                }; 
            });    
        };
 };

input.addEventListener("submit", (event) => {
    event.preventDefault(); 
    const iv = document.getElementById("userInput").value;
    xmlArray.push(iv);
    console.log(xmlArray);
    localStorage.setItem("xmlLocalArray", JSON.stringify(xmlArray));
    xmlArray = JSON.parse(localStorage.getItem("xmlLocalArray"));
    displayXML(xmlArray);
});

//modal
const addRSS = document.querySelector('#addRss');
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');
addRss.addEventListener('click', () => {
    modal.classList.add('is-active');
});
modalBg.addEventListener('click', () => {
    modal.classList.remove('is-active');
});

displayXML(xmlArray);
console.log(newsArray);
