const apikey = '';

const blogContainer = document.getElementById('blog-container');

let query="technology";
let pagesz=12;
const searchFeild=document.getElementById('search-input');
const searchButton=document.getElementById('search-button');

const LoadMore=document.getElementById('load-more');

async function fetchRandomNews() {
    try {
        const apiurl = `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=${pagesz}&apiKey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;  // <-- use "articles" instead of "article"
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}


async function fetchNewsQuery() {

    try {
        const apiurl = `https://newsapi.org/v2/everything?q=${query}&from=2025-05-06&pageSize=${pagesz}&sortBy=publishedAt&apiKey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;  // <-- use "articles" instead of "article"
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}


searchButton.addEventListener("click",async ()=>{
    query =searchFeild.value.trim();
    pagesz=12;
    if(query !==""){
        try {
            const articles =await fetchNewsQuery();
            displayBlogs(articles)
        } catch (error) {
            console.error("Error fetching news by query", error);
        }
    }

})

LoadMore.addEventListener("click",async()=>{
    pagesz+=12;
    if(query !==""){
        try {
            const articles =await fetchNewsQuery();
            displayBlogs(articles)
        } catch (error) {
            console.error("Error fetching news by query", error);
        }
    }
})



function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach(article => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");
        // title.textContent = article.title;
        const trucatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." :
            article.title;
        title.textContent = trucatedTitle;

        // const description = document.createElement("p");
        // description.textContent = article.description;
        const description = document.createElement("p");
        if (article.description) {
            const truncatedDesc = article.description.length > 120
                ? article.description.slice(0, 120) + "..."
                : article.description;
            description.textContent = truncatedDesc;
        } else {
            description.textContent = "No description available.";
        }



        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        })
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();
