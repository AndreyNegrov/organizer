function dragulaTootle() {
    const drug = document.getElementsByClassName('draguble');
    if (drug.length === 0) {
        document.getElementsByClassName('folder-active')[0].classList.add('draguble');
        dragula([document.querySelector('.folder-active')])
            .on('drop', function (el) {
                setTimeout(function () {
                    const saveButton = document.getElementById('save_div');
                    saveButton.click();
                }, 0)
            })
    } else {
        document.getElementsByClassName('draguble')[0].classList.remove('draguble');
    }
}