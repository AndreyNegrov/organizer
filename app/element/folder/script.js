function addFolder() {
    const folderName = document.getElementById('folder-name').value;

    const folder_id = makeid(10);

    let element = htmlToElement('\n    <div class="element">\n' +
        '        <div class="folder-element" folder-id="' + folder_id + '">\n' +
        '            <div class="folder-button btn btn-outline-dark" style="cursor: pointer" onclick="openFolder(this)">\n' +
        '                <img width="64" height="64" alt="" src="data:image/png;base64,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">\n' +
        '                <p class="folder-title">' + folderName + '</p>\n' +
        '            </div>\n' +
        '            <div class="button-panel">\n' +
        '                <button class="btn btn-outline-dark btn-sm remove-button" onclick="removeElementPreparing(this)" data-bs-toggle="modal" data-bs-target="#deleteModal">\n' +
        '                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path></svg>\n' +
        '                </button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n');

    addElementToDOM(element);

    let folder = htmlToElement('\n\n<div class="folder" id="' + folder_id +'" folder-title="' + folderName + '"></div>');
    let contentContainer = document.getElementById('content-container');
    contentContainer.appendChild(folder);
}

function openFolder(elem) {

    const activeFolders = document.getElementsByClassName('folder-active');

    for (const folder of activeFolders) {
        folder.classList.remove('folder-active');
    }

    const folderId = elem.closest('.folder-element').getAttribute("folder-id");

    const changed_folder = document.getElementById(folderId);
    changed_folder.classList.add('folder-active');

    const crumb = document.getElementById('crumb1');
    crumb.innerHTML = '';

    const home = htmlToElement('<li onclick="goToHome()"><a href="#"><svg style="padding-bottom: 2px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="20px" width="20px" version="1.1" id="_x32_" viewBox="0 0 512 512" xml:space="preserve" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#ffffff;} </style> <g> <polygon class="st0" points="434.162,293.382 434.162,493.862 308.321,493.862 308.321,368.583 203.682,368.583 203.682,493.862 77.841,493.862 77.841,293.382 256.002,153.862 "/> <polygon class="st0" points="0,242.682 256,38.93 512,242.682 482.21,285.764 256,105.722 29.79,285.764 "/> <polygon class="st0" points="439.853,18.138 439.853,148.538 376.573,98.138 376.573,18.138 "/></g></g></svg></a></li>')
    crumb.appendChild(home);

    const folders = findFolderRecursive(elem, []);

    folders.forEach(function (folder) {
        const currentTitle = folder.getAttribute('folder-title');
        const content = htmlToElement('<li onclick="goToFolder(\'' + folder.getAttribute("id") + '\')"><a href="#">' + currentTitle + '</a></li>');
        crumb.appendChild(content);
    });

    const currentTitle = elem.closest('.folder-element').getElementsByClassName('folder-title')[0].innerHTML;
    const content = htmlToElement('<li><a href="#">' + currentTitle + '</a></li>');
    crumb.appendChild(content);
}

function findFolderRecursive(elem, result) {

    const folder = elem.closest('.folder');

    if (folder.getAttribute('id') === 'global-folder') {
        return result;
    }

    result.unshift(folder);

    const id = folder.getAttribute('id');

    const a = document.querySelectorAll('[folder-id="' + id + '"]');

    return findFolderRecursive(a[0], result);
}

function goToHome() {
    const activeFolders = document.getElementsByClassName('folder-active');

    for (const folder of activeFolders) {
        folder.classList.remove('folder-active');
    }

    document.getElementById('global-folder').classList.add('folder-active');

    const crumb = document.getElementById('crumb1');
    crumb.innerHTML = '';
}

function goToFolder(folderId) {
    const contentContainer = document.getElementById('content-container');
    const elem = contentContainer.querySelectorAll('[folder-id="' + folderId + '"]')[0];
    openFolder(elem);
}

