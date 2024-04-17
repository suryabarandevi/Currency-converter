const BASE="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


for(let select of dropdowns){
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        select.append(newOption);
        if(select.name==="from" && currcode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currcode==="INR"){ 
            newOption.selected="selected";
        }
    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}

const updateflag=(element)=>{
      let currcode=element.value;
    //   console.log(currcode);
    let countrycode=countryList[currcode];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}


const updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    // console.log(fromcurr.value,tocurr.value);
    const URL=`${BASE}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    // console.log(response);
    let data=await response.json();
    console.log(data);
    let rate=data[tocurr.value.toLowerCase()];
    console.log(rate);
    let finalamount=amtval*rate;
    console.log(finalamount);
     msg.innerText=`${amtval} ${fromcurr.value}=${finalamount} ${tocurr.value}`;
}

window.addEventListener("load",async()=>{
    updateExchangeRate();
   });

   
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
     updateExchangeRate();
});