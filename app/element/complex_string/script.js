function addEasyComplexElement() {

    const title = document.getElementById('easy-complex-title').value;

    const elements = document.getElementsByClassName('easy-complex-content');

    let lines = '';

    Array.prototype.forEach.call(elements, (el) => {
        lines += '            <div class="easy-element">\n' +
            '                <div class="easy-element-content">\n' +
            '                    <span class="copy-content content-cell">' + el.value + '</span>\n' +
            '                </div>\n' +
            '                <div class="button-panel">\n' +
            '                    <button class="btn btn-outline-dark btn-sm edit-button" onclick="editElement(this)">\n' +
            '                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M13.0207 5.82839L15.8491 2.99996L20.7988 7.94971L17.9704 10.7781M13.0207 5.82839L3.41405 15.435C3.22652 15.6225 3.12116 15.8769 3.12116 16.1421V20.6776H7.65669C7.92191 20.6776 8.17626 20.5723 8.3638 20.3847L17.9704 10.7781M13.0207 5.82839L17.9704 10.7781" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path> </svg>\n' +
            '                    </button>\n' +
            '                </div>\n' +
            '            </div>\n'
    });


    let element = htmlToElement('\n    <div class="element composite-element">\n' +
        '        <div class="easy-element">\n' +
        '            <b class="title-cell">' + title + ':</b>\n' +
        '            <div class="button-panel">\n' +
        '                <button class="btn btn-outline-dark btn-sm remove-button" onclick="removeElementPreparing(this)" data-bs-toggle="modal" data-bs-target="#deleteModal">\n' +
        '                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path></svg>\n' +
        '                </button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="composite-element-container">\n' +

        lines +

        '        </div>\n' +
        '    </div>\n');

    addElementToDOM(element);
}

function addComplexLine() {
    let element = htmlToElement('<div class="input-group mb-3">\n' +
        '                        <span style="width: 45px; visibility: hidden"></span>\n' +
        '                        <span class="input-group-text" style="width: 90px">Контент:</span>\n' +
        '                        <input type="text" class="form-control easy-complex-content">\n' +
        '</div>');

    document.getElementById('complex-lines-container').appendChild(element);
}
