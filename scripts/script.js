import { createPost } from './post.js';

//Declared variables
const API_KEY = "3sya2GgBeyElbcNiWSSIEevSORr0mWJdzKgcVLDF";
const website = page => `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=${API_KEY}`;
const CONTAINER = document.getElementById("container");
const LOAD_BUTTON = document.getElementById("load-more");
let pageCounter = 1;

//Loads the first set of (25) photos
window.onload = () => sendApiRequest(pageCounter++);

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
        let photoIsLiked = localStorage.getItem(`${photo.id}`) !== null;
        CONTAINER.innerHTML += createPost(photo, photoIsLiked);
    });
};

// Places the current year in the footer
document.getElementById("copyright-year").innerHTML = new Date().getFullYear();
