function htmlToElement(html) {
    return document.createRange().createContextualFragment(html);
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

function addElementToDOM(element) {
    let contentContainer = document.getElementsByClassName('folder-active')[0];

    if (contentContainer.children.length > 0) {
        contentContainer.insertBefore(element, contentContainer.firstChild);
    } else {
        contentContainer.appendChild(element);
    }

    return contentContainer.querySelector('div');
}

function copyToBuffer(elem) {
    let element = elem.closest('.easy-element') ?? elem.closest('.title-string-element');

    let contentElem = element.querySelector('.copy-content');
    navigator.clipboard.writeText(contentElem.innerText);
}

function removeElement() {
    const folderElem = window.removeElementPrepared.getElementsByClassName('folder-element')[0];

    if (folderElem) {
        const id = folderElem.getAttribute('folder-id');
        const removing_folder = document.getElementById(id);
        removing_folder.remove()
    }

    window.removeElementPrepared.remove();
}

function removeElementPreparing(elem) {
    window.removeElementPrepared = elem.closest('.element');
}

function removeElementPreparingDeleteTag(elem) {
    window.removeElementPrepared = elem.closest('.delete-element');
}
