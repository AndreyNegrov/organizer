const fs = require('fs');
const path = require('path');
const ipcRenderer = require("electron").ipcRenderer;

window.addEventListener('DOMContentLoaded', () => {

    window.download_libraries();
    window.init_content();
    setTimeout(() => {
        window.init_elements();
        window.set_event_to_save_buttons()
    }, 0);

    document.getElementById('logout-yandex-button').onclick = () => {
        ipcRenderer.send('logout');
    }

    document.getElementById('login-yandex-button').onclick = () => {
        ipcRenderer.send('auth-window');
    }
});

window.download_libraries = () => {
    const downloadJSFiles = [
        'app/general/drag-lib.js',
        'app/general/bootstrap-lib.js',
        'app/general/functions.js',
        'app/general/drug.js'
    ];

    downloadJSFiles.forEach((path) => {
        let script = document.createElement('script');
        script.src = path;
        document.body.appendChild(script);
    });

    const downloadCssFiles = [
        'app/general/bootstrap-lib.css',
        'app/general/style.css'
    ];

    downloadCssFiles.forEach((path) => {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path;
        document.head.appendChild(link);
    });
}

window.set_event_to_save_buttons = () => {
    const saveButtons = document.getElementsByClassName('save_easy');
    for (let i = 0; i < saveButtons.length; i++) {
        saveButtons[i].onclick = function () {
            window.save();
        };
    }
}

window.save = () => {
    for (let elem of document.getElementsByClassName('draguble')) {
        elem.classList.remove('draguble');
    }

    const content = document.getElementById('content-container').innerHTML;
    saveOrganizerContent(content);
}

window.init_content = () => {
    const contentContainer = document.getElementById('content-container');
    ipcRenderer.send('auth-window');
}

ipcRenderer.on('auth-info', function (event, info) {
    window.organizerYandexToken = info.token;
    getOrganizerContent();
});

ipcRenderer.on('logout-processed', () => {
    document.getElementById('content-container').innerHTML = '';
    window.organizerYandexToken = null;
    document.getElementById('login-yandex-button').style.display = 'block';
    document.getElementById('logout-yandex-button').style.display = 'none';
});

function getOrganizerContent() {
    fetch('https://cloud-api.yandex.net/v1/disk/resources?path=/organizer.html', {
        "headers": {
            'Authorization': `OAuth ${window.organizerYandexToken}`
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "method": "GET"
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.error === 'DiskNotFoundError') {
                const template = fs.readFileSync(path.join(__dirname, 'content.html'));
                saveOrganizerContent(template, true);
            } else {
                createContent(data.file);
            }
        });
}

function createContent(filepath) {
    const contentContainer = document.getElementById('content-container');

    fetch(filepath)
        .then(response => response.text())
        .then(data => {
            contentContainer.innerHTML = data;
            const activeFolders = contentContainer.getElementsByClassName('folder');
            for (const folder of activeFolders) {
                folder.classList.remove('folder-active');
                if (folder.getAttribute('id') === 'global-folder') {
                    folder.classList.add('folder-active');
                }
            }

            document.getElementById('login-yandex-button').style.display = 'none';
            document.getElementById('logout-yandex-button').style.display = 'block';

            window.dispatchEvent(new CustomEvent('content-created'));

        })
        .catch(error => {
            console.error('Error fetching file:', error);
        })
}

function saveOrganizerContent(content, isTemplate = false) {

    const uploadUrl = 'https://cloud-api.yandex.net/v1/disk/resources/upload';
    const params = {
        path: '/organizer.html',
        overwrite: 'true',
    };

    fetch(`${uploadUrl}?${new URLSearchParams(params)}`, {
        method: 'GET',
        headers: {
            'Authorization': `OAuth ${window.organizerYandexToken}`
        },
    })
        .then((response) => response.json())
        .then((data) => {
            const uploadLink = data.href;
            return fetch(uploadLink, {
                method: 'PUT',
                headers: {
                    'Authorization': `OAuth ${window.organizerYandexToken}`
                },
                body: content,
            });
        })
        .then(() => {
            if (isTemplate === true) {
                getOrganizerContent();
            }
        })
        .catch((error) => {
            console.error('Error uploading file:', error);
        });
}

window.init_elements = () => {
    const folders = [];

    const files = fs.readdirSync(path.join(__dirname, 'app/element'));
    files.forEach(file => {
        let dropdown = fs.readFileSync(path.join(__dirname, 'app/element/' + file + '/dropdown.html'), 'utf8');
        let fragment_dropdown = document.createRange().createContextualFragment(dropdown);
        document.getElementById('element-dropdown-menu').appendChild(fragment_dropdown);

        let script = document.createElement('script');
        script.src = path.join(__dirname, 'app/element/' + file + '/script.js');
        document.body.appendChild(script);

        let modal = fs.readFileSync(path.join(__dirname, 'app/element/' + file + '/modal.html'), 'utf8');
        let fragment_modal = document.createRange().createContextualFragment(modal);
        document.body.appendChild(fragment_modal);
    });
}


