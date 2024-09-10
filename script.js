//variables definitions
let xmlArray = [];
// localStorage.setItem("xmlLocalArray", JSON.stringify(xmlArray));
// xmlArray = JSON.parse(localStorage.getItem("xmlLocalArray")); 
const newsArray = [];
const input = document.getElementById("form");

// if(xmlArray){
//     localStorage.setItem("xmlLocalArray", JSON.stringify(xmlArray));
//     xmlArray = JSON.parse(localStorage.getItem("xmlLocalArray")); 
// }



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

                    // failed attempt to import images from an xml file
                    // const media = item.querySelector('media\\:content');
                    // console.log(media);
                    // const mediaContentElement = item.querySelectorAll("media").textContent;
                    // art icle.image = media.getAttribute('url');

                    newsArray.push(article);

                    //creating nested Elmements
                    const feed = document.getElementById("feed");
                    feed.classList.add("parent");
                    const div = document.createElement("div");
                    div.classList.add("article");
                    div.setAttribute("href", article.link);
                    feed.appendChild(div);
                    const ul = document.createElement("ul");
                    div.appendChild(ul);
                    const li = document.createElement("li");
                    ul.appendChild(li);
                    const a = document.createElement("a");
                    a.setAttribute("href", article.link);
                    a.classList.add("fill-div");
                    li.appendChild(a);
                    const h2 = document.createElement('h2');
                    h2.textContent = article.title;
                    li.appendChild(h2);
                    const img = document.createElement("img");
                    img.src = 'https://picsum.photos/200/300'; 
                    li.appendChild(img);
                    const p  = document.createElement("p");
                    p.classList.add("description");
                    p.textContent = article.description;
                    li.appendChild(p);

                    
                }; 
            });    
        };
    xmlArray = JSON.parse(localStorage.getItem("xmlLocalArray")); 
 };

 //user input
input.addEventListener("submit", (event) => {
    event.preventDefault(); 
    const iv = document.getElementById("userInput").value;
    xmlArray.push(iv);
    console.log(xmlArray);
    localStorage.setItem("xmlLocalArray", JSON.stringify(xmlArray));
    xmlArray = JSON.parse(localStorage.getItem("xmlLocalArray"));
    displayXML(xmlArray);
});

//clear memory button
const clearMem = document.querySelector('#clearRss');
clearMem.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
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



//Running function  
displayXML(xmlArray);

//In case of a page reload or when the page is revisited, pulls locally saved array info.
// xmlArray = JSON.parse(localStorage.getItem("xmlLocalArray")); 

console.log(newsArray);

