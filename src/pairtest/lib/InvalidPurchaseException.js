export default class InvalidPurchaseException extends Error {
  maxedTicketError(noOfTickets) {
    throw new Error(
      `Maximum Tickets Reached For a Single Purchase of ${noOfTickets}`
    );
  }

  noAdultTicketError() {
    throw new Error(`Adult ticket required`);
  }

  invalidAccountIdError() {
    throw new Error(`Invalid account id`);
  }
}
