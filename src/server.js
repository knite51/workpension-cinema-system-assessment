import readline from "node:readline";
import { TicketInformationService } from "./services/ticket-information.service.js";
import { PaymentReservationService } from "./services/payment-reservation.service.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const ticketInformationService = new TicketInformationService();
const paymentReservationService = new PaymentReservationService();
const accountID = 1;

rl.question(
  `What's tickets are you buying(adult:2, child:1, infant:1)?`,
  (ticketInfo) => {
    const validatedTickets =
      ticketInformationService.refineValidatedTicketInput(ticketInfo);
    paymentReservationService.processPaymentReservation(
      accountID,
      validatedTickets
    );
    rl.close();
  }
);
