/**
 * This file calls NASA's API and adds the images received to the website
 */

//Declared variables
const API_KEY = "3sya2GgBeyElbcNiWSSIEevSORr0mWJdzKgcVLDF";
const website = (page, date) => `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&page=${page}&api_key=${API_KEY}`;
const CONTAINER = document.getElementById("posts-container");
const LOAD_BUTTON = document.getElementById("load-more-button");
let pageCounter = 1;

//Loads the first set of (25) photos
window.onload = () => sendApiRequest(pageCounter++, '2022-01-14');

//Loads the next set of (25) photos, and so on
LOAD_BUTTON.addEventListener("click", () => sendApiRequest(pageCounter++, '2022-01-14'));

/**
 * Sends the API request, gets the object containing the set of photos, and calls the function "addPosts"
 * @author  Antonio Crispino - me ;)  <antonioscrispino@gmail.com>
 * @param   {Number}   page           The page number in the API request
 * @param   {String}   page           The date in the API request
 * @return  {Void}  
 */
const sendApiRequest = async (page, date) => {
    let response = await fetch(website(page, date));
    let dataObj = await response.json();
    addPosts(dataObj.photos);
}

/**
 * Adds the posts to the web page
 * @author  Antonio Crispino - me ;)  <antonioscrispino@gmail.com>
 * @param   {Object}   photos         Array of photos
 * @return  {Void}  
 */
const addPosts = photos => {
    photos.forEach(photo => {
        let photoIsLiked = localStorage.getItem(`${photo.id}`) !== null; //true or false
        let numOfComments = localStorage.getItem(`${photo.id}-comments-num`); //can be null
        let comments = localStorage.getItem(`${photo.id}-comments`); //can be null
        CONTAINER.innerHTML += createPost(photo, photoIsLiked, numOfComments, comments);
    });
};

// Places the current year in the footer
document.getElementById("copyright-year").innerHTML = new Date().getFullYear();
