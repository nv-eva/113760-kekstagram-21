'use strict';

(function () {
  const FILE_TYPES = [`jpg`, `jpeg`, `png`];

  const fileChooser = document.querySelector(`#upload-file`);
  const preview = document.querySelector(`.img-upload__preview img`);
  const effectsPreview = document.querySelectorAll(`.effects__preview`);

  fileChooser.addEventListener(`change`, function () {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, function () {
        preview.src = reader.result;

        for (let i = 0; i < effectsPreview.length; i++) {
          effectsPreview[i].style.backgroundImage = `url(${reader.result})`;
        }
      });

      reader.readAsDataURL(file);
    }
  });
})();
