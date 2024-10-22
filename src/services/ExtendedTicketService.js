import TicketService from "./../pairtest/TicketService.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";

const paymentService = new TicketPaymentService();

export class ExtendedTicketService extends TicketService {
  #ticketCost = {
    INFANT: 0,
    CHILD: 15,
    ADULT: 25,
  };

  #calculateTicketsSeats(ticketTypeRequests) {
    return ticketTypeRequests.reduce(
      (acc, currentValue) => {
        if (currentValue.getTicketType() !== "INFANT") {
          acc.totalTicketCost +=
            this.#ticketCost[currentValue.getTicketType()] *
            currentValue.getNoOfTickets();
          acc.neededSeats += currentValue.getNoOfTickets();
        }
        return acc;
      },
      { totalTicketCost: 0, neededSeats: 0 }
    );
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    const { totalTicketCost, neededSeats } =
      this.#calculateTicketsSeats(ticketTypeRequests);
    console.log("Cost of Tickets:", totalTicketCost);
    paymentService.makePayment(accountId, totalTicketCost);

    return { message: "payment completed", neededSeats };
  }
}
