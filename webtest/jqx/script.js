console.log("Hello, tarek ! freejqGrid_fetch_script ");

fetch("https://tarek-bg.github.io/web/webtest/jqx/fetch.json").then
(function(res){
    return res.json();    
}).then(function(xdata){
    console.log(xdata);


});