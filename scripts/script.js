//Declared variables
const API_KEY = "3sya2GgBeyElbcNiWSSIEevSORr0mWJdzKgcVLDF";
const website = (page, date) => `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&page=${page}&api_key=${API_KEY}`;
const CONTAINER = document.getElementById("container");
const LOAD_BUTTON = document.getElementById("load-more");
let pageCounter = 1;

//Loads the first set of (25) photos
//window.onload = () => sendApiRequest(pageCounter++, '2022-01-14');

//Loads the next set of (25) photos, and so on
LOAD_BUTTON.addEventListener("click", () => sendApiRequest(pageCounter++, '2022-01-14'));

//Gets the object containing the set of photos
async function sendApiRequest(page, date) {
    let response = await fetch(website(page, date));
    let dataObj = await response.json();
    console.log(dataObj) //remove
    addPosts(dataObj.photos);
}

//Adds the posts to the web page
const addPosts = photos => {
    photos.forEach(photo => {
        let photoIsLiked = localStorage.getItem(`${photo.id}`) !== null;
        let numOfComments = localStorage.getItem(`${photo.id}-comments-num`);
        let comments = localStorage.getItem(`${photo.id}-comments`);
        CONTAINER.innerHTML += createPost(photo, photoIsLiked, numOfComments, comments);
    });
};

// Places the current year in the footer
document.getElementById("copyright-year").innerHTML = new Date().getFullYear();


//REMOVE THIS (only for testing purposes)
const likeHandle = () => {
    if (document.getElementById('outline-id').style.display === "block") {
        document.getElementById('outline-id').style.display = "none";
        document.getElementById('filled-id').style.display = "block";
    } else {
        document.getElementById('outline-id').style.display = "block";
        document.getElementById('filled-id').style.display = "none";
    }
}
document.getElementById('like-id').addEventListener("click", likeHandle);
