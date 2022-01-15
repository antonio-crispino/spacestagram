
//Declared variables
const API_KEY = "3sya2GgBeyElbcNiWSSIEevSORr0mWJdzKgcVLDF";
const website = page => `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=${API_KEY}`;
const CONTAINER = document.getElementById("container");
const LOAD_BUTTON = document.getElementById("load-more");
let pageCounter = 2;

//Creates a post with a photo and its data
const createPost = (obj, liked) => {
    return `
        <article>
            <figure>
                <img src="${obj.img_src}" alt="${""}" />
                <figcaption>${obj.rover.name}</figcaption>
            </figure>
            <section class="date">
                <time>${obj.earth_date}</time>
            </section>
            <section class="description">
                <span>${"Description"}</span>
            </section>
            <section class="comments">
                <span>Comments (${"0"})</span>
                <ul>${"<li>comments</li>"}</ul>
                <form action="./index.html" method="PUT">
                    <label for="comment-field">Enter a comment: </label>
                    <input type="text" name="comment" id="comment-field" minlength="1" maxlength="250" />
                    <button class="comment">Comment</button>
                </form>
            </section>
            <div class="button-container">
                <button class="like">${liked ? "Unlike" : "Like"}</button>
            </div>
        </article>
    `;
}

//Loads the first set of (25) photos
window.onload = () => sendApiRequest(1);

//Loads the next set of (25) photos, and so on
LOAD_BUTTON.addEventListener("click", () => sendApiRequest(pageCounter++));

//Gets the object containing the set of photos
async function sendApiRequest(page) {
    let response = await fetch(website(page));
    let dataObj = await response.json();
    console.log(dataObj) //remove
    addPosts(dataObj.photos);
}

//Adds the posts to the web page
const addPosts = photos => {
    photos.forEach(photo => {
        CONTAINER.innerHTML += createPost(photo, false);
    });
}

// Places the current year in the footer
document.getElementById("copyright-year").innerHTML = new Date().getFullYear();
