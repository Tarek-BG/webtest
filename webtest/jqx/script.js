console.log("Hello, tarek !");

fetch("https://tarek-bg.github.io/web/webtest/template/Handlebars/data/pets-data1.json").then
(function(res){
    console.log(res.json());
});