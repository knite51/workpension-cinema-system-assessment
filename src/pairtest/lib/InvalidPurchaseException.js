export default class InvalidPurchaseException extends Error {
  invalidTicketInputFormatError() {
    throw new Error(
      "Invalid ticket input format. accepted format: child:3, adult:10, infant:1"
    );
  }

  maxedTicketError() {
    throw new Error(
      "Maximum allowed tickets of 25 reached for a single purchase"
    );
  }

  noAdultTicketError() {
    throw new Error("Adult ticket required");
  }

  invalidAccountIdError() {
    throw new Error("Invalid account id");
  }

  paymentError() {
    throw new Error("Error while processing payment");
  }
}
