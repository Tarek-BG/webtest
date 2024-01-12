function setup_helper(){
    Handlebars.registerHelper("def",options =>{
        Handlebars.registerPartial(options.hash.name, options.fn());
        return;
    })
}

function init() {
    setup_helper();
    var template= Handlebars.compile(document.querySelector("#template").innerHTML);
    var filled= template({thing:"aaaaaaaaaaaaa"});
    document.querySelector("#output").innerHTML= filled;
}