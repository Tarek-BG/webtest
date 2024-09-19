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

function outData(val){
    console.log(val);
    let html = '';
    val.forEach((ele,ind) =>{
        console.log(ele);
        html +=`<div>${ind+1}. ${ele.name} ${ele.species}(${ele.id})</div>`;
    })
    html += `<small>${JSON.stringify(val)}</small>`
    output.innerHTML = html;
}