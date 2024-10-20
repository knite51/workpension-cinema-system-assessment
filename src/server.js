import readline from "node:readline";

import {
  processPayment,
  processReservation,
  processTicketInformation,
  validateAccountID,
} from "./services/middlewares.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const accountID = 1;

rl.question(
  `What's tickets are you buying(adult:2, child:1, infant:1)?`,
  (ticketInfo) => {
    const validatedTickets = processTicketInformation(ticketInfo);
    validateAccountID(accountID);
    const paymentResponse = processPayment(accountID, validatedTickets);
    processReservation(accountID, paymentResponse);

    rl.close();
  }
);
