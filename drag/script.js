const dragAndDropArea = document.getElementById('drag-area-container');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(
    (eventName) =>
        dragAndDropArea.addEventListener(eventName, (event) => {
            event.preventDefault();
            event.stopPropagation();
        })
);
let fileEl = document.querySelector('#fileEl')
dragAndDropArea.addEventListener('drop', (event) => {

    let dataTransfer = event.dataTransfer;
    let files = dataTransfer.files;
    [...files].forEach(displayFiles);
});

let previewContainer = document.querySelector('.preview-container')
function displayFiles(file) {
    if (file) {
        let previewBlock = document.createElement('div');
        let icon = document.createElement('img')
        icon.src = './images/closer.jpg';
        icon.classList.add('icon')
        const img = document.createElement('img');
        img.setAttribute('draggable', 'true')
        icon.setAttribute('draggable', 'true')
        previewBlock.setAttribute('draggable', 'true')
        if (file.type.startsWith("image/")) {
            img.classList.add('image-box')
            img.src = URL.createObjectURL(file);
        }
        else if (file.type == 'text/plain') {
            img.classList.add('txt-box')
            img.src = './images/txt.png'
        }
        else if (file.type == 'text/csv') {
            img.classList.add('csv-box')
            img.src = './images/csv.png'
        }
        else {
            img.classList.add('other-box')
            img.src = './images/not-found.png'
        }
        function deleteImage() {
            previewBlock.remove()
        }
        icon.addEventListener('click', e => deleteImage(e))
        previewBlock.classList.add('previewBlock')
        previewContainer.appendChild(previewBlock)
        previewBlock.appendChild(img)
        previewBlock.appendChild(icon)
        previewContainer.classList.add('preview-border');

    }
}
fileEl.addEventListener('change', ({ target: { files } }) => {
    [...files].forEach(displayFiles);
})


//переміщення в preview-container 
//перестало працювати, коли почав створювати в ф-ції displayFile() спочатку previewBlock, а потім <img> i <img>

// код нище потрібно перемістити в функцію displayFile.
// previewContainer.addEventListener(... не годиться, оскільки це елемент який є контейнером для всіх
// прев'юшок, а не конкретної якоїсь. Після того як ви перемістите код нище в displayFile функцію,
// то замість previewContainer буде потрібно використовувати previewBlock.

previewContainer.addEventListener(`dragstart`, (evt) => { // не потрібно використовувати `` у даному випадку
    evt.target.classList.add(`selected`);
})
previewContainer.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
});
previewContainer.addEventListener(`dragover`, (evt) => {
    evt.preventDefault();
    const activeElement = previewContainer.querySelector(`.selected`);
    const currentElement = evt.target;
    const isMoveable = activeElement !== currentElement &&
        currentElement.classList.contains(`image-box`);
    if (isMoveable) { // вживати return; це погана практика, значить що в коді погано прописана логіка
        const nextElement = (currentElement === activeElement.nextElementSibling) ?
            currentElement.nextElementSibling :
            currentElement;
    
        previewContainer.insertBefore(activeElement, nextElement);
    }

});

