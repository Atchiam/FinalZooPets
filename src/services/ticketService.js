import ticketModel from "../models/MongoDB/ticketModel.js";

export const findTicketByCode = async (code) => {
    try{
        const ticket = await ticketModel.findOne({code: code})
        return ticket
    }catch{
        throw new Error(error)
    }
}

export const findTicketByPurchaser = async (userEmail) => {
    try{
        const ticket = await ticketModel.find({purchaser: userEmail})
        return ticket
    }catch{
        throw new Error(error)
    }
}
export const createTicket = async (ticket) => {
    try{
        console.log("no");
        const newTicket = await ticketModel.create(ticket)
        console.log("o si");
        return newTicket
    }catch(error){
        throw new Error(error)
    }
}