'use strict';

const FILE_TYPES = [`jpg`, `jpeg`, `png`];

const fileChooser = document.querySelector(`#upload-file`);
const preview = document.querySelector(`.img-upload__preview img`);
const effectsPreviews = document.querySelectorAll(`.effects__preview`);

fileChooser.addEventListener(`change`, () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      preview.src = reader.result;

      for (const effectsPreview of effectsPreviews) {
        effectsPreview.style.backgroundImage = `url(${reader.result})`;
      }
    });

    reader.readAsDataURL(file);
  }
});
