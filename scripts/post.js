//Creates the HTML for a post with a photo and its data
const createPost = (obj, liked, numOfComments, comments) => {
    return `
        <article>
            <figure>
                <img src="${obj.img_src}" alt="" ondblclick="likeHandler('${obj.id}')" />
                <figcaption>${obj.rover.name} Rover - ${obj.camera.full_name}</figcaption>
            </figure>
            <section class="date">
                <time>${obj.earth_date}</time>
            </section>
            <section class="description">
                <span>${"Description"}</span>
            </section>
            <section class="comments">
                <span>Comments (<span id="${obj.id}-comments-num">${numOfComments || 0}</span>)</span>
                <ul id="${obj.id}-comments">${comments || ''}</ul>
                <form action="./index.html" method="GET" onsubmit="reset(); return false;">
                    <label for="${obj.id}-comment-field">Enter a comment: </label>
                    <input type="text" id="${obj.id}-comment-field" name="comment" minlength="1" maxlength="250" />
                    <button class="comment" onclick="commentHandler('${obj.id}-comments', '${obj.id}-comment-field', '${obj.id}-comments-num')">Comment</button>
                </form>
            </section>
            <div class="button-container">
                <button class="like" id="${obj.id}" onclick="likeHandler('${obj.id}')">${liked ? "Unlike" : "Like"}</button>
            </div>
        </article>
    `;
};

//The "Like" button event handler function (used in the function above)
const likeHandler = (numString) => {
    let button = document.getElementById(numString);
    if (localStorage.getItem(numString) === null) {
        button.innerHTML = 'Unlike';
        localStorage.setItem(numString, 'liked');
    } else {
        button.innerHTML = 'Like';
        localStorage.removeItem(numString)
    }
};

//The "Comment" button event handler function (used in the function above)
const commentHandler = (ulId, inputId, numCommentsId) => {
    let ul = document.getElementById(ulId);
    let newComment = document.getElementById(inputId).value;
    let li = `<li>${newComment}</li>`;
    let num = document.getElementById(numCommentsId);
    if (newComment) {
        ul.innerHTML += li;
        localStorage.setItem(ulId, (localStorage.getItem(ulId) || '') + li);
        localStorage.setItem(numCommentsId, (parseInt(localStorage.getItem(numCommentsId)) || 0) + 1);
        num.innerHTML = localStorage.getItem(numCommentsId);
    }
};
