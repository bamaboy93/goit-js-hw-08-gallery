import images from './gallery-items.js';
const galleryContainer = document.querySelector('.js-gallery');
const backdrop = document.querySelector('.lightbox__overlay');
const modalCard = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');
const modalBtn = document.querySelector('[data-action="close-lightbox"]');


const galleryMarkup = createImageCardsMarkup(images);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);
modalBtn.addEventListener('click', onGalleryContainerClose);
backdrop.addEventListener('click', onGalleryContainerClose);


function createImageCardsMarkup(images) {
    return images
    .map(({ preview, original, description }) => {
        return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
        </li>`;
        })
        .join('');
        
    
}

function onGalleryContainerClick(evt) {
    evt.preventDefault();
    
    if (!evt.target.classList.contains('gallery__image')) {
        return
    }
    modalCard.classList.add('is-open');
    
    modalImage.src = evt.target.getAttribute("data-source");
    modalImage.alt = evt.target.alt;

    window.addEventListener("keydown", closeByEsc);
    
}

function onGalleryContainerClose(evt) {
 
  modalCard.classList.remove('is-open');
  modalImage.src = '';
  modalImage.alt = '';
  window.removeEventListener("keydown", closeByEsc);
}

function closeByEsc(evt) {
  if (evt.code === 'Escape') {
    onGalleryContainerClose();
  }
}



