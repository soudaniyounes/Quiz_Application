// Select Element
let Count=document.querySelector(".box-info .count span");
let Question=document.querySelector(".box-question");
let Box=document.querySelector(".box-bullet");
let SpanBox=document.querySelector(".box-bullet .span");
let BoxForm=document.querySelector(".box-form ");
let myButton=document.querySelector(".submit-answer");
let request=document.querySelector(".Request ");
let myRequest=document.querySelector(".Request span");
let myRequestSpan=document.querySelector(".Request .text");
let myCount=document.querySelector(".counter");
//select Option
let counterY=0;
let rightAnswer=0;
let CountInterval;
// Create function
function getObject(){
let request=new XMLHttpRequest();
request.onreadystatechange=function(){
if(this.readyState ===  4 && this.status === 200){
    
let JsonObject=JSON.parse(this.responseText);
let objectNumber=JsonObject.length;
createBullet(objectNumber);
createObject(JsonObject[counterY],objectNumber);
getCounter(10,objectNumber);
myButton.onclick=function(){ 
    let myRightAnswer=JsonObject[counterY].right_answer;
    counterY++;
    getAnswer(myRightAnswer,objectNumber);
    Question.innerHTML="";
    BoxForm.innerHTML="";
   
    createObject(JsonObject[counterY],objectNumber);
    addBullet();   
    Request(objectNumber);
    clearInterval(CountInterval);
    getCounter(10,objectNumber);
}
}

}
request.open("GET","main.json",true);
request.send();
}
getObject();
//create Bullet
function createBullet(num){
    Count.innerHTML=num;
for(let i=0;i<=num;i++){
   
    let span=document.createElement("span");
    if(i===0){
     span.className="on";
    }
    SpanBox.appendChild(span);
}
}
//create Question and Answer
function createObject(obj,num){
if(counterY<num){
    //Create h2
   let question=document.createElement("h2");
   let questionText=document.createTextNode(obj["title"]);
   question.appendChild(questionText);
   Question.appendChild(question);
   //Create input and label
  for(let i=1;i<=4;i++){
    //create input
    let myDiv=document.createElement("div");
    myDiv.className="answer";

    let myInput=document.createElement("input");
    myInput.id=`input_${i}`;
    myInput.type="radio";
    myInput.name="question";
    myInput.dataset.answer=obj[`answer_${i}`];

    myDiv.appendChild(myInput);
    //create label
    let myLabel=document.createElement("label");
    myLabel.htmlFor=`input_${i}`; 

    let myLabelText=document.createTextNode(obj[`answer_${i}`]);

    myLabel.appendChild(myLabelText) ;
    myDiv.appendChild(myLabel) ;
    BoxForm.appendChild(myDiv);

    if(i===1){
        myInput.checked=true;
        }
     }
  }
}
function addBullet(){
    let mySpan=document.querySelectorAll(".box-bullet .span span");

    let SpanArray=Array.from(mySpan);
   
    SpanArray.forEach((span,index)=>{

        if(counterY===index){
            span.className="on";
        }

    });
}
function getAnswer(rightA,num){

if (counterY<=num){

    let Answer=document.getElementsByName("question");
    let choosenA;

    for(i=0;i<Answer.length;i++){

        if(Answer[i].checked){

            choosenA=Answer[i].dataset.answer;

         if(rightA === choosenA){
               rightAnswer++;
           }
        }
     }
  }
}
function Request(num){
if(counterY === num){
//Remove Div
    Question.style.display="none";
    Box.style.display="none";
    BoxForm.style.display="none";
    myButton.style.display="none";
//Add Property
    request.style.padding="20px";
    request.style.margin="20px";
    request.style.backgroundColor="#fff";
    request.style.height="400px";
    request.style.lineHeight="300px";
    request.style.fontSize="40px";
    request.style.borderRadius="10px";
    request.style.textAlign="center";
//Add Request
let observ;
let myceil=Math.ceil(num / 2);
if(rightAnswer > myceil && rightAnswer < num){
    observ="Good";
    myRequest.className="good";
}else if(rightAnswer===num){
    observ="Perfect";
    myRequest.className="perfect";    
}else{
    observ="Bad";
    myRequest.className="bad";   
}
myRequestSpan.innerHTML=`Your Answer ${rightAnswer} From ${num}`;
myRequest.innerHTML=observ;
}

}
function getCounter(duration,num){
    if(counterY < num){
    CountInterval=setInterval(function(){

        let minute=parseInt(duration / 60);
        let second=parseInt(duration % 60);
        minute= minute < 10?`0${minute}`:minute;
        second=second < 10?`0${second}`:second;
        myCount.innerHTML=`${minute} : ${second}`

        if(--duration < 0){
         clearInterval(CountInterval);
         myButton.click();
        }
    },1000)
  }
}