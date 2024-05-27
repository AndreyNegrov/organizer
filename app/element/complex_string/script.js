function getLiContent(placeholder) {
    return '           <div class="complex-line-element easy-element delete-element">\n' +
        '                   <div class="easy-element-content complex-line-content">\n' +
        '                       <div class="copy-content complex-content-cell" contenteditable="true" data-placeholder="' + placeholder + '"></div>\n' +
        '                   </div>\n' +
        '                   <div class="button-panel">\n' +
        '                       <button class="btn btn-outline-dark btn-sm copy-button" onclick="copyToBuffer(this)">\n' +
        '                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"></path> <path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.006-1H7zM5.002 8L5 20h10V8H5.002zM9 6h8v10h2V4H9v2zm-2 5h6v2H7v-2zm0 4h6v2H7v-2z"></path> </g> </svg>\n' +
        '                       </button>\n' +
        '                       <button class="btn btn-outline-dark btn-sm remove-button" onclick="removeElementPreparingDeleteTag(this)" data-bs-toggle="modal" data-bs-target="#deleteModal">\n' +
        '                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path></svg>\n' +
        '                       </button>\n' +
        '                   </div>\n' +
        '           </div>\n';
}

function addEasyComplexElement() {

    let element = htmlToElement('\n    <div class="element composite-element">\n' +
        '        <div class="easy-element">\n' +
        '            <div class="complex-title-container"><div class="complex-title-cell" contenteditable="true" data-placeholder="Введите заголовок"></div><div class="title-string-title-b">:</div></div>\n' +
        '            <div class="button-panel">\n' +
        '                <button class="btn btn-outline-dark btn-sm remove-button" onclick="removeElementPreparing(this)" data-bs-toggle="modal" data-bs-target="#deleteModal">\n' +
        '                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path></svg>\n' +
        '                </button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="composite-element-container">\n' +

        getLiContent('Введите текст...') +

        '        </div>\n' +
        '    </div>\n');

    const domElement = addElementToDOM(element);

    const titleSpan = domElement.getElementsByClassName('complex-title-cell')[0];
    addEvents_ComplexString(titleSpan, 'Введите заголовок');

    const span = domElement.getElementsByClassName('complex-content-cell')[0];
    addEvents_ComplexString(span, 'Введите текст...');

    setTimeout(()=> {titleSpan.focus();}, 200);
}

window.addEventListener('content-created', (event) => {
    for (let elem of document.getElementsByClassName('complex-title-cell')) {
        addEvents_ComplexString(elem, 'Введите заголовок');
    }
    for (let elem of document.getElementsByClassName('complex-content-cell')) {
        addEvents_ComplexString(elem, 'Введите текст...');
    }
});

function addEvents_ComplexString(span, text) {
    span.addEventListener('input', () => {
        span.dataset.placeholder = span.textContent ? '' : text;
    });

    span.addEventListener('input', (event) => {
        span.flagEditable = true;

        if (span.className === 'copy-content complex-content-cell') {
            if (span.closest('.complex-line-element').nextElementSibling === null) {
                addComplexLine(span.closest('.composite-element-container'));
            }
        }
    });

    span.addEventListener('focusout', (e) => {
        e.currentTarget.blur();
        if (span.flagEditable) {
            span.flagEditable = false;

            const saveButton = document.getElementById('save_div');
            saveButton.click();
        }
    });
}

function addComplexLine(container) {

    const element = htmlToElement(getLiContent('Новый элемент...'));

    container.appendChild(element);

    const span = container.lastElementChild.getElementsByClassName('complex-content-cell')[0];
    addEvents_ComplexString(span, 'Введите текст...');
}
