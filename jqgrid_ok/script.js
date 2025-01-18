console.log("Hello, tarek ! freejqGrid_fetch_script ");

fetch("https://tarek-bg.github.io/web/webtest/jqx/fetches.json").then
(function(res){
    return res.json();    
}).then(function(data){
    console.group("data in script fetches.json");
    console.log(data);

});