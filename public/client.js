const socket = io();

let name;
let textArea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let sound = document.querySelector('#sound')
do{
    name = prompt('Enter your Name: ')

}while(!name)


textArea.addEventListener('keyup',(e)=>{
if(e.key === 'Enter'){
    sendMessage(e.target.value)
   
    textArea.value = " "
   
    scrollBottom()
}
})

function sendMessage(message){
    let msg={
        user: name,
        message: message.trim()
    }
 
    //append
    appendMessage(msg,'outgoing')

    //send to server
    socket.emit('message',msg)
    scrollBottom()
}
function appendMessage(msg,type){
let mainDiv = document.createElement('div')
let className = type

mainDiv.classList.add(className,'message')


let markup = `
<h4>${msg.user}</h4>
<p>${msg.message}</p>`

mainDiv.innerHTML = markup

messageArea.appendChild(mainDiv)
}


//Recieve Message

socket.on('message',(msg)=>{
appendMessage(msg,'incoming')
    scrollBottom()
    sound.play();
})

function scrollBottom(){

    messageArea.scrollTop =messageArea.scrollHeight
}