// a function set element text content as data in json format
function setElementTextContent(element, data) {
    element.textContent = JSON.stringify(data, null, 2);
}