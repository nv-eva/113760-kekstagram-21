'use strict';

(function () {
  const bigPicture = document.querySelector(`.big-picture`);
  const commentsList = bigPicture.querySelector(`.social__comments`);
  const loaderComments = bigPicture.querySelector(`.comments-loader`);

  const COUNT_COMMENTS = 5;

  const renderComment = function (comment) {
    const photoComment = document.createElement(`li`);
    photoComment.classList.add(`social__comment`);

    const avatar = document.createElement(`img`);
    avatar.classList.add(`social__picture`);
    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    avatar.width = `35`;
    avatar.height = `35`;
    photoComment.appendChild(avatar);

    const commentText = document.createElement(`p`);
    commentText.classList.add(`social__text`);
    commentText.textContent = comment.message;
    photoComment.appendChild(commentText);

    return photoComment;
  };

  /*
  const hideCounterComments = function () {
    const counterComments = window.bigPicture.querySelector(`.social__comment-count`);
    counterComments.classList.add(`hidden`);
  };
  */

  const updateComments = function (comments) {
    let fragmentLength;

    if (comments.length <= COUNT_COMMENTS) {
      fragmentLength = comments.length;
      loaderComments.classList.add(`hidden`);
    } else {
      fragmentLength = COUNT_COMMENTS;
      loaderComments.classList.remove(`hidden`);
    }

    const photoComments = document.createDocumentFragment();
    for (let i = 0; i < fragmentLength; i++) {
      const comment = renderComment(comments[0]);
      photoComments.appendChild(comment);
      comments.shift();
    }
    commentsList.appendChild(photoComments);
  };

  window.renderBigPicture = function (photo) {
    bigPicture.querySelector(`.big-picture__img img`).src = photo.url;
    bigPicture.querySelector(`.likes-count`).textContent = photo.likes;
    bigPicture.querySelector(`.comments-count`).textContent = photo.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = photo.description;

    commentsList.textContent = ``;

    const loadComments = photo.comments.slice();

    updateComments(loadComments);
    loaderComments.addEventListener(`click`, function () {
      updateComments(loadComments);
    });
  };

  window.bigPicture = bigPicture;
})();
