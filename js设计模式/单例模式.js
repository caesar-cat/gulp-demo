var createIframe = (function() {
    var iframe;
    return function() {
        if(!iframe) {
            iframe = document.createElement("iframe");
            iframe.style.display = "none";
            document.body.appendChild(iframe)
        }
        return iframe
    }
})

function getInstance(fn) {
    var result;
    return function() {
        return result || (result = fn.call(this, arguments));
    }
}

var iframe = getInstance(createIframe);