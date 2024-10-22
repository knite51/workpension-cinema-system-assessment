import InvalidPurchaseException from "../../../src/pairtest/lib/InvalidPurchaseException";

describe("InvalidPurchaseException", () => {
  let invalidPurchaseException;

  beforeEach(() => {
    invalidPurchaseException = new InvalidPurchaseException();
  });

  it("should throw an error with the correct message for invalidTicketInputFormatError", () => {
    expect(() => {
      invalidPurchaseException.invalidTicketInputFormatError();
    }).toThrow(
      "Invalid ticket input format. accepted format: child:3, adult:10, infant:1"
    );
  });

  it("should throw an error with the correct message for maxedTicketError", () => {
    expect(() => {
      invalidPurchaseException.maxedTicketError();
    }).toThrow("Maximum allowed tickets of 25 reached for a single purchase");
  });

  it("should throw an error with the correct message for noAdultTicketError", () => {
    expect(() => {
      invalidPurchaseException.noAdultTicketError();
    }).toThrow("Adult ticket required");
  });

  it("should throw an error with the correct message for invalidAccountIdError", () => {
    expect(() => {
      invalidPurchaseException.invalidAccountIdError();
    }).toThrow(`Invalid account id`);
  });

  it("should throw an error with the correct message for paymentError", () => {
    expect(() => {
      invalidPurchaseException.paymentError();
    }).toThrow(`Error while processing payment`);
  });
});
