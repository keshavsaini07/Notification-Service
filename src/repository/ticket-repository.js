const CrudRepository = require("./crud-repository");
const { Ticket } = require("../models");

const { Enums } = require("../utils/common");
const { PENDING } = Enums.BOOKING_STATUS;

class TicketRepository extends CrudRepository {
  constructor() {
    super(Ticket);
  }

  async getPendingTickets(){
    const response = await Ticket.findAll({
        where:{
            status: PENDING,
        }
    })
    return response; 
  }
}

module.exports = TicketRepository;
