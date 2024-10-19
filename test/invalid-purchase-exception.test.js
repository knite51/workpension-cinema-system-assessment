import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException";

describe("InvalidPurchaseException", () => {
  let invalidPurchaseException;

  beforeEach(() => {
    invalidPurchaseException = new InvalidPurchaseException();
  });

  // Test maxedTicketError method
  it("should throw an error with the correct message for maxedTicketError", () => {
    const noOfTickets = 5;
    expect(() => {
      invalidPurchaseException.maxedTicketError(noOfTickets);
    }).toThrow(
      `Maximum Tickets Reached For a Single Purchase of ${noOfTickets}`
    );
  });

  // Test noAdultTicketError method
  it("should throw an error with the correct message for noAdultTicketError", () => {
    expect(() => {
      invalidPurchaseException.noAdultTicketError();
    }).toThrow(`Adult ticket required`);
  });

  // Test invalidAccountIdError method
  it("should throw an error with the correct message for invalidAccountIdError", () => {
    expect(() => {
      invalidPurchaseException.invalidAccountIdError();
    }).toThrow(`Invalid account id`);
  });
});
