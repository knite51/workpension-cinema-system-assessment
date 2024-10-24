import readline from "node:readline";
import { RefineValidateUserInputService } from "./services/RefineValidateUserInputService.js";
import { PaymentReservationService } from "./services/PaymentReservationService.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const accountID = 1;

const options = `What tickets are you buying? Format -> ticket_type:no_of_tickets. Example -> adult:2, child:1, infant:1 ... `;

const retryPrompt = () => {
  rl.question(
    "Do you want to purchase another ticket? Yes or No ... ",
    (response) => {
      if (response.toLowerCase() === "yes") {
        return askQuestion();
      }
      rl.close();
    }
  );
};

const askQuestion = () => {
  rl.question(options, (userResponse) => {
    try {
      const refineValidateUserInputService =
        new RefineValidateUserInputService();
      const paymentReservationService = new PaymentReservationService();

      const validatedTickets =
        refineValidateUserInputService.handleUserInput(userResponse);
      paymentReservationService.processPaymentAndReservation(
        accountID,
        validatedTickets
      );
      retryPrompt();
    } catch (error) {
      // prevent noise in terminal and re-prompt user
      console.log(`ERROR!!! ${error.message}. Kindly Retry!`);
      askQuestion();
    }
  });
};

askQuestion();
