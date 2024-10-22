import {
  validateAccountID,
  validatePayment,
} from "../middlewares/validation.middleware.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";
import { ExtendedTicketService } from "./ExtendedTicketService.js";

const ticketService = new ExtendedTicketService();
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
