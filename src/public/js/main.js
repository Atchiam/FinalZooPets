// codigo desde el front JS
if (window.location.pathname === "/chat/") {
    const formChat = document.getElementById("formChat")
    const mensajesChat= document.getElementById("mensajesChat")
    const imputMessage= document.getElementById("message")
    const socket = io()
    //------Chats

    formChat.addEventListener('submit',(event)=>{
        event.preventDefault();
        const info = new FormData(formChat)
        const nuevoMensaje = {}
        info.forEach((value,key)=>{
            nuevoMensaje[key]=value
        })
        socket.emit("message", nuevoMensaje);
        imputMessage.innerHTML=""
    })

    socket.on("allMessages", (messages) =>{
        mensajesChat.innerHTML=""
        messages.forEach(mensajes => {
            mensajesChat.innerHTML+=  
            `
            <li>${mensajes.user}: ${mensajes.message}</li>
            `
        });
    })
}