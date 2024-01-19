var iframes = document.getElementsByTagName('iframe');
var classToHide = 'flip-entry-title';
for (var i = 0; i < iframes.length; i++) {

try {
var iframeDocument = iframes[i].contentDocument || iframes[i].contentWindow.document;
if (iframeDocument) {
var elements = iframeDocument.getElementsByClassName(classToHide);
for (var j = 0; j < elements.length; j++) {
elements[j].style.display = 'none';
}
}
} catch (e) {
console.error('Error accessing iframe content:', e);
}
}