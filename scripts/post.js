//Creates the HTML for a post with a photo and its data
const createPost = (obj, liked, numOfComments, comments) => {
    const {img_src, id, rover, camera, earth_date} = obj;
    return `
        <article class="post">
            <figure class="nasa-photo-container">
                <img 
                    class="nasa-photo" 
                    src="${img_src}" 
                    alt="" ondblclick="likeHandler('${id}')" 
                />
                <figcaption class="nasa-photo-caption">
                    ${rover.name} Rover - ${camera.full_name}
                </figcaption>
            </figure>
            <section class="nasa-photo-date">
                <time>${earth_date}</time>
            </section>
            <section class="comment-area">
                <span>Comments 
                    <span id="${id}-comments-num">
                        (${numOfComments || 0})
                    </span>
                </span>
                <ul class="comments" id="${id}-comments">
                    ${comments || ''}
                </ul>
                <form 
                    class="comment-form" 
                    action="./index.html" 
                    method="GET" 
                    onsubmit="reset(); return false;"
                >
                    <label for="${id}-comment-field">
                        Enter a comment: 
                    </label>
                    <input 
                        class="comment-input" 
                        id="${id}-comment-field" 
                        type="text" 
                        name="comment" 
                        minlength="1" 
                        maxlength="250" 
                    />
                    <button 
                        class="comment-button" 
                        onclick="commentHandler(
                            '${id}-comments', 
                            '${id}-comment-field', 
                            '${id}-comments-num'
                        )"
                    >
                        Comment
                    </button>
                </form>
            </section>
            <div class="like-button-container">
                <button 
                    class="like-button" id="${id}" 
                    onclick="likeHandler('${id}')"
                >
                    <img 
                        class="outline-image" 
                        id="${id}-outline-id" 
                        style="display: ${liked ? 'none' : 'block'};" 
                        src="./icons/heart-svgrepo-com-outline.svg" 
                        alt="Like" 
                    />
                    <img 
                        class="filled-image" 
                        id="${id}-filled-id" 
                        style="display: ${liked ? 'block' : 'none'};" 
                        src="./icons/heart-svgrepo-com-filled.svg" 
                        alt="Unlike" 
                    />
                </button>
            </div>
        </article>
    `;
};

//The "Like" button event handler function (used in the function above)
const likeHandler = (numString) => {
    let outlineImage = document.getElementById(`${numString}-outline-id`);
    let filledImage = document.getElementById(`${numString}-filled-id`);
    if (localStorage.getItem(numString) === null) {
        outlineImage.style.display = "none";
        filledImage.style.display = "block";
        localStorage.setItem(numString, 'liked');
    } else {
        outlineImage.style.display = "block";
        filledImage.style.display = "none";
        localStorage.removeItem(numString)
    }
};

//The "Comment" button event handler function (used in the function above)
const commentHandler = (ulId, inputId, numCommentsId) => {
    let ul = document.getElementById(ulId);
    let newComment = document.getElementById(inputId).value;
    let currentDate = new Date().toLocaleDateString('en-US');
    let li = `<li>[${currentDate}] - ${newComment}</li>`;
    let num = document.getElementById(numCommentsId);
    if (newComment) {
        ul.innerHTML += li;
        localStorage.setItem(ulId, (localStorage.getItem(ulId) || '') + li);
        localStorage.setItem(numCommentsId, (parseInt(localStorage.getItem(numCommentsId)) || 0) + 1);
        num.innerHTML = `(${localStorage.getItem(numCommentsId)})`;
    }
};
