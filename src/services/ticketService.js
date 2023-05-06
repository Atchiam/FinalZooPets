import ticketModel from "../models/MongoDB/ticketModel";

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
        const newTicket = await ticketModel.create(ticket)
        return newTicket
    }catch{
        throw new Error(error)
    }
}