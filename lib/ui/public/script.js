function getId(regex, viewId) {
    return viewId.replace(regex, '');
}

let arrBaseUrl = window.location.href.split('/').filter((data) => {
        return data;
    }),
    url = arrBaseUrl[0] + '//' + arrBaseUrl[1];

function baseIconUrl(cb) {
    $.ajax({
        url: url + '/iconUrl',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            cb(data.url);
        }
    });
}

function getImageName(url) {
    let arr = url.split('/');
    return arr[arr.length - 1];
}

function viewVisibility(tId, type) {
    let targetId = document.getElementById(tId);

    if (window.getComputedStyle(targetId).display === type)
        return targetId.style.display = 'none';

    targetId.style.display = type;
}

function arrowImageStatus(tId) {
    let targetId = document.getElementById(tId);
    let isDownImage = getImageName(targetId.src) === 'arrow-down.svg';

    if (isDownImage) {
        return baseIconUrl(url => {
            targetId.src = url + 'arrow-right.svg';
        });
    }
    baseIconUrl(url => {
        targetId.src = url + 'arrow-down.svg';
    });
}

function arrowTagVisibility(view) {
    let tId = `desc-for-tag-${getId('arrow-tag-', view.id)}`;
    arrowImageStatus(view.id);
    viewVisibility(tId, 'block');
}

function tagItemVerticalBackgroundVisibility(view) {
    arrowImageStatus(`arrow-vertical-item-tag-${getId('div-vertical-item-tag-', view.id)}`);
    viewVisibility(`rectangle-vertical-box-border-${getId('div-vertical-item-tag-', view.id)}`, 'table');
}

function modelItemVerticalBackgroundVisibility(view) {
    arrowImageStatus(`arrow-vertical-item-model-${getId('div-vertical-item-model-', view.id)}`);
    viewVisibility(`table-model-${getId('div-vertical-item-model-', view.id)}`, 'table');
}

function closeDialog(id) {
    let viewClickedId = id,
        isClickedCommonAuthDialog = viewClickedId === 'closeCommonAuthDialog',
        dialog = document.getElementById(`authDialog-${getId('closeAuthDialog-', viewClickedId)}`);


    if (isClickedCommonAuthDialog)
        dialog = document.getElementById('commonAuthDialog');


    dialog.close();
    document.body.style.overflow = 'auto';
}

function openDialog(id) {
    let viewClickedId = id,
        dialog = document.getElementById(`authDialog-${getId('openAuthDialog-', viewClickedId)}`),
        isClickedCommonAuthDialog = viewClickedId === 'openCommonAuthDialog';


    if (isClickedCommonAuthDialog)
        dialog = document.getElementById('commonAuthDialog');


    dialog.showModal();
    document.body.style.overflow = 'hidden';
}