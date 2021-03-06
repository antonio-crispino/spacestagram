/**
 * This file contains the function that creates the HTML for a post
 */

/**
 * Creates the HTML for a post - a structure containing a photo and its data
 * @author  Antonio Crispino - me ;)  <antonioscrispino@gmail.com>
 * @param   {Object}   obj            The object containing the data of an image from NASA's API
 * @param   {Boolean}  isLiked        Whether the post is liked (true) or not (false)
 * @param   {String}   numOfComments  The number of comments on the post, as a string
 * @param   {String}   comments       The comments of the post
 * @return  {String}                  The HTM for a post as a string
 */
const createPost = (obj, isLiked, numOfComments, comments) => {
    const {img_src, id, rover, camera, earth_date} = obj;
    return `
        <article class="post">
            <figure class="nasa-photo-container">
                <img 
                    class="nasa-photo" 
                    src="${img_src}" 
                    alt="A photo taken by the ${rover.name} Rover" 
                    draggable="false" 
                    ondblclick="likeHandler('${id}')" 
                />
                <figcaption class="nasa-photo-caption">
                    ${rover.name} Rover <br /> ${camera.full_name}
                </figcaption>
            </figure>
            <section class="nasa-photo-date">
                <time>${earth_date}</time>
            </section>
            <section class="comment-like-area">
                <span>Comments 
                    <span id="${id}-comments-num">
                        (${numOfComments || 0})
                    </span>
                </span>
                <ul class="comments" id="${id}-comments">
                    ${comments || ''}
                </ul>
                <div class="comment-like-items">
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
                            placeholder="Comment" 
                        />
                        <button 
                            class="comment-button" 
                            type="submit" 
                            onclick="commentHandler(
                                '${id}-comments', 
                                '${id}-comment-field', 
                                '${id}-comments-num'
                            )"
                        >
                        </button>
                    </form>
                    <div class="like-button-container">
                        <button 
                            class="like-button" id="${id}" 
                            onclick="likeHandler('${id}')"
                        >
                            <img 
                                class="outline-image" 
                                id="${id}-outline-id" 
                                src="./icons/heart-svgrepo-com-outline.svg" 
                                alt="Unliked" 
                                style="display: ${isLiked ? 'none' : 'block'};" 
                                draggable="false" 
                            />
                            <img 
                                class="filled-image" 
                                id="${id}-filled-id" 
                                src="./icons/heart-svgrepo-com-filled.svg" 
                                alt="Liked" 
                                style="display: ${isLiked ? 'block' : 'none'};" 
                                draggable="false" 
                            />
                        </button>
                    </div>
                </div>
            </section>
        </article>
    `;
};
