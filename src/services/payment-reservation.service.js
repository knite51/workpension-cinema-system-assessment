import {
  validateAccountID,
  validatePayment,
} from "../middlewares/validation.middleware.js";
import TicketService from "../pairtest/TicketService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";

const ticketService = new TicketService();
const reservationService = new SeatReservationService();

export class PaymentReservationService {
  constructor() {}

  #processPayment(accountID, ticketRequests) {
    return ticketService.purchaseTickets(accountID, ...ticketRequests);
  }

  #processReservation(accountID, { message, neededSeats }) {
    validatePayment(message);
    reservationService.reserveSeat(accountID, neededSeats);
    console.log("Seats Reserved:", neededSeats);
    console.log(`Reservation completed. Thank you for your purchase`);
  }

  processPaymentAndReservation(accountID, validatedTickets) {
    validateAccountID(accountID);
    const paymentResponse = this.#processPayment(accountID, validatedTickets);
    this.#processReservation(accountID, paymentResponse);
  }
}
