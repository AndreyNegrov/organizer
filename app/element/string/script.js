function addEasyStringElement() {

    const element = htmlToElement('\n<div class="element">\n' +
        '        <div class="easy-element">\n' +
        '            <div class="easy-element-content">\n' +
        '                <span class="copy-content content-cell easy-element-content-cell" contenteditable="true" style="padding: 5px 3px" data-placeholder="Введите текст..."></span>\n' +
        '            </div>\n' +
        '            <div class="button-panel">\n' +
        '                <button class="btn btn-outline-dark btn-sm copy-button" onclick="copyToBuffer(this)">\n' +
        '                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"></path> <path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.006-1H7zM5.002 8L5 20h10V8H5.002zM9 6h8v10h2V4H9v2zm-2 5h6v2H7v-2zm0 4h6v2H7v-2z"></path> </g> </svg>\n' +
        '                </button>\n' +
        '                <button class="btn btn-outline-dark btn-sm remove-button" onclick="removeElementPreparing(this)" data-bs-toggle="modal" data-bs-target="#deleteModal">\n' +
        '                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path></svg>\n' +
        '                </button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n');

    const domElement = addElementToDOM(element);
    const span = domElement.getElementsByClassName('easy-element-content-cell')[0]
    addEventsToSpan(span);
    setTimeout(()=> {span.focus();}, 200);
}

window.addEventListener('content-created', (event) => {
    for (let elem of document.getElementsByClassName('easy-element-content-cell')) {
        addEventsToSpan(elem);
    }
});

function addEventsToSpan(span) {
    span.addEventListener('input', (event) => {
        console.log('input');
        span.flagEditable = true;
    });

    span.addEventListener('focusout', (event) => {
        console.log('focusout');
        event.currentTarget.blur();
        if (span.flagEditable) {
            span.flagEditable = false;
            console.log('save');
            const saveButton = document.getElementById('save_div');
            saveButton.click();
        }
    });

    span.addEventListener('input', () => {
        if (span.textContent) {
            span.dataset.placeholder = '';
        } else {
            span.dataset.placeholder = 'Введите текст...';
            span.innerHTML = '';
        }
    });
}
