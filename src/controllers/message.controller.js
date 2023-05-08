import { Server} from 'socket.io'
import { findMessage,insertMessage } from '../services/messageService.js'; 
import { server } from '../index.js';

export const messageio = async (req, res) => {
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
            res.status(400).send(error.message);
        }
    }else{
        return res.send("necesitas estar logiado para ingregar al chat")
    }
};
