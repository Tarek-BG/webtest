const btn = document.querySelector('.btn');
const output = document.querySelector('.output');
const url = 'pets-data.json';
btn.onclick = ()=>{
    output.innerHTML = 'Connecting......';
    getdata();
}

function getData(){
    fetch(url)
    .then(rep => rep.json())
    .then(data =>{
        output(data.species)
    })
}