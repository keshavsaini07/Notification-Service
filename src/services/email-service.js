const { TicketRepository } = require("../repository")
const { Mailer } = require('../config')
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const ticketRepository = new TicketRepository();

async function sendEmail(mailFrom, mailTo, subject, text){
    try {
        const response = await Mailer.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text
        })
        return response;
    } catch (error) {
        console.log(error)
        throw new AppError(
          "Something went wrong while sending email",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function createTicket(data){
    try {
        const ticket = await ticketRepository.create(data);
        return ticket;
    } catch (error) {
        console.log(error)
        throw new AppError(
          "Cannot create a new ticket object",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getPendingEmails(){
    try {
        const tickets = await ticketRepository.getPendingTickets();
        return tickets;
    } catch (error) {
        console.log(error)
        throw new AppError(
          "Something went wrong while fetching all pending emails",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    sendEmail,
    createTicket,
    getPendingEmails
}