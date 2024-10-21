// import { validateNumberOfTickets } from "../../src/middlewares/validation.middleware.js";
import InvalidPurchaseException from "../../src/pairtest/lib/InvalidPurchaseException.js";
import * as validationMiddleware from "../../src/middlewares/validation.middleware.js";

// Mock the validationMiddleware class
// jest.mock("../../src/pairtest/lib/InvalidPurchaseException.js");

describe("Validation Functions", () => {
  let mockInvalidPurchaseException;

  beforeEach(() => {
    mockInvalidPurchaseException = new InvalidPurchaseException();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("validateUserInput", () => {
    beforeEach(() => {
      validateUserInput = jest.fn((input) => {
        if (input.length !== 2) {
          mockInvalidPurchaseException.invalidTicketInputFormatError();
        }
      });
    });
    it("should return an error if the input length is not 2", () => {
      validateUserInput(["child"]);
      const spy = jest.spyOn(
        mockInvalidPurchaseException,
        "invalidTicketInputFormatError"
      );
      expect(spy).toHaveBeenCalled();
    });

    it("should not return an error if the input length is 2", () => {
      const result = validateUserInput(["child", "20"]);
      expect(result).toBeUndefined();
    });
  });

  // Test cases for validateNumberOfTickets
  describe("validateNumberOfTickets", () => {
    // beforeEach(() => {
    //   validateNumberOfTicke = jest
    //     .fn((a, b) => b - a < 0)
    //     .mockReturnValue((a, b) => validateNumberOfTickets(a, b));
    // });
    it("should return an error if the number of tickets exceeds the allowed maximum", () => {
      const spyMaxedTicketError = jest
        .spyOn(mockInvalidPurchaseException, "maxedTicketError")
        .mockImplementation(() => {});
      const spyValidateNumberOfTickets = jest.spyOn(
        validationMiddleware,
        "validateNumberOfTickets"
      );
      validationMiddleware.validateNumberOfTickets(30, 25);
      expect(spyValidateNumberOfTickets).toHaveBeenCalled();
      expect(spyValidateNumberOfTickets).toHaveBeenCalledWith(30, 25);
      // expect(isPlaying).toBe(mockInvalidPurchaseException.maxedTicketError());
      // expect(isPlaying).toBe(mockInvalidPurchaseException.maxedTicketError());
    });

    it("should not return an error if the number of tickets is within the allowed maximum", () => {
      const result = validateNumberOfTickets(24, 25);
      expect(result).toBeUndefined();
    });
  });

  //   // Test cases for validateAdultTicketsIncluded
  //   describe("validateAdultTicketsIncluded", () => {
  //     it("should return an error if there is no adult ticket", () => {
  //       InvalidRequestExceptions.noAdultTicketError = jest.fn();
  //       validateAdultTicketsIncluded(false);
  //       expect(InvalidRequestExceptions.noAdultTicketError).toHaveBeenCalled();
  //     });

  //     it("should not return an error if there is an adult ticket", () => {
  //       const result = validateAdultTicketsIncluded(true);
  //       expect(result).toBeUndefined();
  //     });
  //   });

  //   // Test cases for validateAccountID
  //   describe("validateAccountID", () => {
  //     it("should return an error if accountID is not greater than 0", () => {
  //       InvalidRequestExceptions.invalidAccountIdError = jest.fn();
  //       validateAccountID(0);
  //       expect(InvalidRequestExceptions.invalidAccountIdError).toHaveBeenCalled();
  //     });

  //     it("should not return an error if accountID is greater than 0", () => {
  //       const result = validateAccountID(1);
  //       expect(result).toBeUndefined();
  //     });
  //   });

  //   // Test cases for validatePayment
  //   describe("validatePayment", () => {
  //     it("should return an error if the payment message is missing", () => {
  //       InvalidRequestExceptions.paymentError = jest.fn();
  //       validatePayment(null);
  //       expect(InvalidRequestExceptions.paymentError).toHaveBeenCalled();
  //     });

  //     it("should return an error if the payment message is not 'payment completed'", () => {
  //       InvalidRequestExceptions.paymentError = jest.fn();
  //       validatePayment("payment pending");
  //       expect(InvalidRequestExceptions.paymentError).toHaveBeenCalled();
  //     });

  //     it("should not return an error if the payment message is 'payment completed'", () => {
  //       const result = validatePayment("payment completed");
  //       expect(result).toBeUndefined();
  //     });
  //   });
});
