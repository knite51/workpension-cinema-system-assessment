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

    const totalTicketCost = ticketTypeRequests.reduce((acc, currentValue) => {
      if (currentValue.getTicketType() !== "INFANT") {
        acc +=
          ticketCost[currentValue.getTicketType()] *
          currentValue.getNoOfTickets();
      }
      return acc;
    }, 0);
    console.log("Cost of Tickets:", totalTicketCost);
    paymentService.makePayment(accountId, totalTicketCost);

    return { msg: "payment completed" };
  }
}
