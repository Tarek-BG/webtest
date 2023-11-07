//var myTemplate = require("./myTemplate.hbs");

var ourRequest = new XMLHttpRequest();
//ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/pets-data.json');
ourRequest.open('GET', 'https://tarek-bg.github.io/web/webtest/template/Handlebars/data/pets-data.json');
ourRequest.onload = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    var data = JSON.parse(ourRequest.responseText);
    createHTML(data);
  } else {
    console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function() {
  console.log("Connection error");
};

ourRequest.send();

var template = Handlebars.compile(document.queryselector("#template").innerHTML);
var filled = template(data);
document.querySelector("output").innerHTML = filled;

/*
function createHTML(petsData) {
  var petsContainer = document.getElementById("pets-container");
  petsContainer.innerHTML = myTemplate(petsData);
}
*/