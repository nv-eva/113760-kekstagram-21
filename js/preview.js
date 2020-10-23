'use strict';

(function () {
  const bigPicture = document.querySelector(`.big-picture`);

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

  const renderBigPicture = function (photo) {
    bigPicture.querySelector(`.big-picture__img img`).src = photo.url;
    bigPicture.querySelector(`.likes-count`).textContent = photo.likes;
    bigPicture.querySelector(`.comments-count`).textContent = photo.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = photo.description;

    const commentsList = bigPicture.querySelector(`.social__comments`);
    commentsList.textContent = ``;

    const photoComments = document.createDocumentFragment();
    for (let j = 0; j < photo.comments.length; j++) {
      const comment = renderComment(photo.comments[j]);
      photoComments.appendChild(comment);
    }
    commentsList.appendChild(photoComments);
  };
})();
