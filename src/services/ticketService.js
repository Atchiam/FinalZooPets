import ticketModel from "../models/MongoDB/ticketModel.js";
import CustomError from "../utils/customError.js";
import EErrors from "../utils/enums.js";

export const findTicketByCode = async (code) => {
    try{
        const ticket = await ticketModel.findOne({code: code})
        return ticket
    }catch(error){
        CustomError.createError({
            name:"Nombre generico de Error de DB",
            cause: error.message,
            message: "Error al encontrar el Ticket",
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const findTicketByPurchaser = async (userEmail) => {
    try{
        const ticket = await ticketModel.find({purchaser: userEmail})
        return ticket
    }catch(error){
        CustomError.createError({
            name:"Nombre generico de Error de DB",
            cause: error.message,
            message: "Error al encontrar el comprador del Ticket",
            code: EErrors.DATABASE_ERROR
        })
    }
}
export const createTicket = async (ticket) => {
    try{
        console.log("no");
        const newTicket = await ticketModel.create(ticket)
        console.log("o si");
        return newTicket
    }catch(error){
        CustomError.createError({
            name:"Nombre generico de Error de DB",
            cause: error.message,
            message: "Error al crear el Ticket",
            code: EErrors.DATABASE_ERROR
        })
    }
}