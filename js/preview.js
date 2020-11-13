'use strict';

const COUNT_COMMENTS = 5;

const bigPicturePreview = document.querySelector(`.big-picture`);
const commentsList = bigPicturePreview.querySelector(`.social__comments`);
const loaderComments = bigPicturePreview.querySelector(`.comments-loader`);

const declineComments = (elementsCount) => {
  let commentsForm = (elementsCount % 10 === 1 && elementsCount !== 11)
    ? `комментария`
    : `комментариев`;
  return commentsForm;
};

const renderComment = (comment) => {
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

const updateComments = (comments, allCommentsCount) => {
  let commentsForm = declineComments(allCommentsCount);
  let fragmentLength;
  let loadCommentsCount;

  if (comments.length <= COUNT_COMMENTS) {
    fragmentLength = comments.length;
    loaderComments.classList.add(`hidden`);
  } else {
    fragmentLength = COUNT_COMMENTS;
    loaderComments.classList.remove(`hidden`);
  }

  const photoComments = document.createDocumentFragment();
  for (let i = 0; i < fragmentLength; i++) {
    photoComments.appendChild(renderComment(comments[0]));
    comments.shift();
  }
  commentsList.appendChild(photoComments);

  loadCommentsCount = allCommentsCount - comments.length;
  bigPicturePreview.querySelector(`.social__comment-count`).textContent = `${loadCommentsCount} из ${allCommentsCount} ${commentsForm}`;
};

window.preview = {
  renderBigPicture(photo) {
    bigPicturePreview.querySelector(`.big-picture__img img`).src = photo.url;
    bigPicturePreview.querySelector(`.likes-count`).textContent = photo.likes;
    bigPicturePreview.querySelector(`.social__caption`).textContent = photo.description;

    commentsList.textContent = ``;

    const countComments = photo.comments.length;
    const loadComments = photo.comments.slice();

    updateComments(loadComments, countComments);
    loaderComments.addEventListener(`click`, () => {
      updateComments(loadComments, countComments);
    });
  },

  bigPicture: bigPicturePreview
};
