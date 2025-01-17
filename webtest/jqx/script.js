console.log("Hello, tarek ! freejqGrid_fetch_script ");
export default data;
fetch("https://tarek-bg.github.io/web/webtest/jqx/fetches.json").then
(function(res){
    return res.json();    
}).then(function(data){
    console.log("data in script");
    console.log(data);

});
