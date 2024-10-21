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

const options = `What tickets are you buying? Format -> ticket_type:no_of_tickets. Example -> adult:2, child:1, infant:1 ... `;

const askQuestion = () => {
  rl.question(options, (userResponse) => {
    try {
      const validatedTickets =
        ticketInformationService.refineValidatedTicketInput(userResponse);
      paymentReservationService.processPaymentAndReservation(
        accountID,
        validatedTickets
      );
      rl.close();
    } catch (error) {
      // prevent noise in terminal and re-prompt user
      console.log(`ERROR!!! ${error.message}. "Kindly Retry"`);

      askQuestion();
    }
  });
};

askQuestion();
