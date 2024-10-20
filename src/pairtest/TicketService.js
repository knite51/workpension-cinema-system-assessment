import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";

const paymentService = new TicketPaymentService();
export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    const ticketCost = {
      INFANT: 0,
      CHILD: 15,
      ADULT: 25,
    };

    const { totalTicketCost, neededSeats } = ticketTypeRequests.reduce(
      (acc, currentValue) => {
        if (currentValue.getTicketType() !== "INFANT") {
          acc.totalTicketCost +=
            ticketCost[currentValue.getTicketType()] *
            currentValue.getNoOfTickets();
          acc.neededSeats += currentValue.getNoOfTickets();
        }
        return acc;
      },
      { totalTicketCost: 0, neededSeats: 0 }
    );
    console.log("Cost of Tickets:", totalTicketCost);
    paymentService.makePayment(accountId, totalTicketCost);

    return { message: "payment completed", neededSeats };
  }
}
