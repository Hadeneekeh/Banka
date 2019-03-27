let createAcct = document.getElementById('createAcct');
let close = document.getElementById('close');

function acctCreated () {
    document.getElementById('successMessage').style.display = 'block';
}

function closeMessage () {
    document.getElementById('successMessage').style.display = 'none';
}

createAcct.onclick = function() {
    acctCreated();
}

close.onclick = function() {
    closeMessage();
}