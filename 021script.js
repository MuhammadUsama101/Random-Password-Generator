let passwordLimit=document.querySelector('.password-limit');
let rangeInput=document.querySelector('.range');
let allCheckBoxes=document.querySelectorAll('.check-box');
let forUppercase=document.querySelector('#uppercase');
let forLowercase=document.querySelector('#lowercase');
let forNumber=document.querySelector('#number');
let forSymbol=document.querySelector('#symbol');
let light=document.querySelector('.light');
let passowrdDisplayer=document.querySelector('.pass')
let teller=document.querySelector('.teller')
let copyButton=document.querySelector('.copy-button')
let generateButton=document.querySelector('.generate-button')
let sym='`!@#$%^&*();:""<>.,/*}{][|?';


let limitValue=10;

function dragHandler(){
    rangeInput.value=limitValue;
    passwordLimit.innerText=limitValue;
    const min=rangeInput.min;
    const max=rangeInput.max;
    rangeInput.style.backgroundSize=((limitValue-min)*100/(max-min)) +'% 100%';
}
rangeInput.addEventListener('input',()=>{
    limitValue = rangeInput.value;
    dragHandler();
})
dragHandler();

function randomValueGenerator(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function uppercaseGenerator(){
    return String.fromCharCode(randomValueGenerator(65,91));
}
function lowercaseGenerator(){
    return String.fromCharCode(randomValueGenerator(97,122));
}
function numberGenerator(){
    return randomValueGenerator(0,9);
}
function symbolGenerator(){
    let value = randomValueGenerator(0,sym.length);
    return sym.charAt(value);
}

function strengthGenerator(){
    let count=0,lower=false,upper=false,number=false,symbol=false;
    if(forSymbol.checked){
        symbol=true;
        count++;
    }
    if(forNumber.checked){
        number=true;
        count++;
    }
    if(forUppercase.checked){
        upper=true;
        count++;
    }
    if(forLowercase.checked){
        lower=true;
        count++;
    }
    if((count>=3&&limitValue>=6)||(count>=2&&limitValue>=10)||(count>=1&&limitValue>=15)){
        light.style.backgroundColor='lightgreen';
    }else{
        light.style.backgroundColor='red';
    }
}

function inputHandler(){
    let count=0;
    allCheckBoxes.forEach((checkbox)=>{
        if(checkbox.checked){
            count++;
        }
        if(count>=limitValue){
            limitValue=count;
            dragHandler();
        }
    })
}
allCheckBoxes.forEach((checkbox)=>{
    checkbox.addEventListener('change',inputHandler);
})

async function copyInput(){
    try{
        await navigator.clipboard.writeText(passowrdDisplayer.value);
        teller.innerText='Copied';
    }catch{
        teller.innerText='Failed';
    }
    teller.classList.add('active');
    setTimeout(()=>{
        teller.classList.remove('active');
        teller.innerText='';
    },1000)
}

copyButton.addEventListener('click',()=>{
    if(passowrdDisplayer.value){
        copyInput();
    }
})

generateButton.addEventListener('click',()=>{
    let Array=[],password='';
    if(forSymbol.checked){
        Array.push(symbolGenerator);
    }
    if(forNumber.checked){
        Array.push(numberGenerator);
    }
    if(forLowercase.checked){
        Array.push(lowercaseGenerator);
    }
    if(forUppercase.checked){
        Array.push(uppercaseGenerator);
    }
    for(let i=0;i<Array.length;i++){
        password+=Array[i]();
    }
    for(let i=0;i<limitValue-Array.length;i++){
        let value=randomValueGenerator(0,Array.length);
        password+=Array[value]();
    }
    passowrdDisplayer.value=password;
    strengthGenerator()
})