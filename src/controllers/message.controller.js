import { Server} from 'socket.io'
import { findMessage,insertMessage } from '../services/messageService.js'; 
import { server } from '../index.js';

export const messageio = async (req, res, next) => {
    if (req.session.login){
        try {
            //------ServerIO
            const io = new Server(server);
            io.on("connection", async (socket)=>{ 
                //------Mensajes
                    console.log("Cliente conectado");
                    findMessage().then((messages) => {
                        socket.emit("allMessages", messages);
                    });
                
                    socket.on("message", async (info) => {
                        const data = info;
                        data.user = req.session.user.first_name
                        data.email = req.session.user.email
                        await insertMessage([data]).then(() => {
                            findMessage().then((messages) => {
                                socket.emit("allMessages", messages);
                            })
                        })
                    });
                });
        } catch (error) {
            next(error);
        }
    }else{
        console.log("necesitas estar logiado para ingregar al chat");
            //------ServerIO
            const io = new Server(server);
            io.on("connection", async (socket)=>{ 
                //------Mensajes
                    console.log("Cliente conectado");
                    const messages = [{user:"El servidor",email:"s@s.com",message:"Hola, ¡Bienvenido al servidor recorda que tenes que estar logiado para esto mientras te logias podes ver este video explicativo https://www.youtube.com/watch?v=mCdA4bJAGGk"}]
                    socket.emit("allMessages", messages);
                });
    }
};
