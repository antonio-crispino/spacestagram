/**
 * This file contains the event handler functions
 */

/**
 * The "Like/Heart" button event handler function - likes/dislikes with animation and localStorage
 * @author  Antonio Crispino - me ;)  <antonioscrispino@gmail.com>
 * @param   {String}   postIdString   The number id of the post as a string
 * @return  {Void}  
 */
const likeHandler = (postIdString) => {
    let outlinedHeartEl = document.getElementById(`${postIdString}-outline-id`);
    let filledHeartEl = document.getElementById(`${postIdString}-filled-id`);
    if (localStorage.getItem(postIdString) === null) {
        localStorage.setItem(postIdString, 'liked'); //store
        outlinedHeartEl.style.display = 'none'; //hide
        filledHeartEl.style.display = 'block'; //show
    } else {
        localStorage.removeItem(postIdString); //erase
        outlinedHeartEl.style.display = 'block'; //show
        filledHeartEl.style.display = 'none'; //hide
    }
}; //This helper function is used in the 'createPost' function

/**
 * The "Comment" button event handler function - adds comments to post with localStorage
 * @author  Antonio Crispino - me ;)  <antonioscrispino@gmail.com>
 * @param   {String}   ulId           The string id of the unordered list (ul)
 * @param   {String}   inputId        The string id of the text input field
 * @param   {String}   numCommentsId  The string id of the span containing the number of comments
 * @return  {Void}  
 */
const commentHandler = (ulId, inputId, numCommentsId) => {
    let ulEl = document.getElementById(ulId);
    let newComment = document.getElementById(inputId).value;
    let currentDate = new Date().toLocaleDateString('en-US');
    let li = `<li>[${currentDate}] - ${newComment}</li>`; //comment format
    let numEl = document.getElementById(numCommentsId);
    if (newComment) {
        localStorage.setItem(ulId, (localStorage.getItem(ulId) || '') + li); //store comment
        ulEl.innerHTML += li; //add list item (li)
        localStorage.setItem(numCommentsId, (parseInt(localStorage.getItem(numCommentsId)) || 0) + 1); //store number of comments
        numEl.innerHTML = `(${localStorage.getItem(numCommentsId)})`; //update number of comments
    }
}; //This helper function is used in the 'createPost' function
