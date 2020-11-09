'use strict';

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

const updateComments = function (comments, allCommentsCount) {
  let fragmentLength;
  let loadCommentsCount;

  if (comments.length <= COUNT_COMMENTS) {
    fragmentLength = comments.length;
    loaderComments.classList.add(`hidden`);
  } else {
    fragmentLength = COUNT_COMMENTS;
    loaderComments.classList.remove(`hidden`);
  }

  // Вставляет комментарии
  const photoComments = document.createDocumentFragment();
  for (let i = 0; i < fragmentLength; i++) {
    photoComments.appendChild(renderComment(comments[0]));
    comments.shift();
  }
  commentsList.appendChild(photoComments);

  // Изменяет текст счетчика
  loadCommentsCount = allCommentsCount - comments.length;
  let elements = (allCommentsCount % 10 === 1 && allCommentsCount !== 11)
    ? `комментария`
    : `комментариев`;
  bigPicture.querySelector(`.social__comment-count`).textContent = `${loadCommentsCount} из ${allCommentsCount} ${elements}`;
};

window.renderBigPicture = function (photo) {
  bigPicture.querySelector(`.big-picture__img img`).src = photo.url;
  bigPicture.querySelector(`.likes-count`).textContent = photo.likes;
  bigPicture.querySelector(`.social__caption`).textContent = photo.description;

  commentsList.textContent = ``;

  const countComments = photo.comments.length;
  const loadComments = photo.comments.slice();

  updateComments(loadComments, countComments);
  loaderComments.addEventListener(`click`, function () {
    updateComments(loadComments, countComments);
  });
};

window.bigPicture = bigPicture;
