console.log("Hello, tarek ! freejqGrid_fetch_script ");

fetch("https://tarek-bg.github.io/web/webtest/template/Handlebars/data/pets-data1.json").then
(function(res){
    return res.json();    
}).then(function(data){
    console.log(data);

    
});