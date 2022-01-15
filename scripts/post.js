//Creates the HTML for a post with a photo and its data
const createPost = (obj, liked) => {
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
                <span>Comments (${"0"})</span>
                <ul>${"<li>comments</li>"}</ul>
                <form action="./index.html" method="PUT">
                    <label for="comment-field">Enter a comment: </label>
                    <input type="text" name="comment" id="comment-field" minlength="1" maxlength="250" />
                    <button class="comment">Comment</button>
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
        localStorage.setItem(numString, "liked");
    } else {
        button.innerHTML = 'Like';
        localStorage.removeItem(numString)
    }
};
