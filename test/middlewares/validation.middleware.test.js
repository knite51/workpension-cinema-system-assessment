import {
  validateUserInput,
  validateNumberOfTickets,
  validateAdultTicketsIncluded,
  validateAccountID,
  validatePayment,
} from "../../src/middlewares/validation.middleware.js";
import InvalidPurchaseException from "../../src/pairtest/lib/InvalidPurchaseException.js";

describe("Validation Functions", () => {
  describe("validateUserInput", () => {
    let mockInvalidTicketInputFormatError;

    beforeEach(() => {
      mockInvalidTicketInputFormatError = jest
        .spyOn(
          InvalidPurchaseException.prototype,
          "invalidTicketInputFormatError"
        )
        .mockImplementation(() => {
          throw new Error("Invalid ticket input format error");
        });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should call invalidTicketInputFormatError when the input array length is not 2", () => {
      const invalidInput = ["child"];

      expect(() => {
        validateUserInput(invalidInput);
      }).toThrow("Invalid ticket input format error");

      expect(mockInvalidTicketInputFormatError).toHaveBeenCalled();
    });

    it("should not call invalidTicketInputFormatError when the input array length is 2", () => {
      const validInput = ["child", "1"];

      const result = validateUserInput(validInput);

      expect(result).toBeUndefined();
      expect(mockInvalidTicketInputFormatError).not.toHaveBeenCalled();
    });
  });

  describe("validateNumberOfTickets", () => {
    let mockMaxedTicketError;

    beforeEach(() => {
      mockMaxedTicketError = jest
        .spyOn(InvalidPurchaseException.prototype, "maxedTicketError")
        .mockImplementation(() => {
          throw new Error(
            "Maximum allowed tickets of 25 reached for a single purchase"
          );
        });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should call maxedTicketError when the noOfTicket is greater than the max allowed", () => {
      const invalidInput = [26, 25];

      expect(() => {
        validateNumberOfTickets(...invalidInput);
      }).toThrow("Maximum allowed tickets of 25 reached for a single purchase");

      expect(mockMaxedTicketError).toHaveBeenCalled();
    });

    it("should not call maxedTicketError when the noOfTicket is less than the max allowed", () => {
      const validInput = [25, 25];

      const result = validateNumberOfTickets(validInput);

      expect(result).toBeUndefined();
      expect(mockMaxedTicketError).not.toHaveBeenCalled();
    });
  });

  describe("validateAdultTicketsIncluded", () => {
    let mockNoAdultTicketError;

    beforeEach(() => {
      mockNoAdultTicketError = jest
        .spyOn(InvalidPurchaseException.prototype, "noAdultTicketError")
        .mockImplementation(() => {
          throw new Error("Adult ticket required");
        });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should call noAdultTicketError when the adult ticket is not added", () => {
      const hasAdultTicket = false;

      expect(() => {
        validateAdultTicketsIncluded(hasAdultTicket);
      }).toThrow("Adult ticket required");

      expect(mockNoAdultTicketError).toHaveBeenCalled();
    });

    it("should not call noAdultTicketError when the adult ticket is not added", () => {
      const hasAdultTicket = true;

      const result = validateAdultTicketsIncluded(hasAdultTicket);

      expect(result).toBeUndefined();
      expect(mockNoAdultTicketError).not.toHaveBeenCalled();
    });
  });

  describe("validateAccountID", () => {
    let mockInvalidAccountIdError;

    beforeEach(() => {
      mockInvalidAccountIdError = jest
        .spyOn(InvalidPurchaseException.prototype, "invalidAccountIdError")
        .mockImplementation(() => {
          throw new Error("Invalid account id");
        });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should call invalidAccountIdError when the accountId is less than zero ", () => {
      const accountId = 0;

      expect(() => {
        validateAccountID(accountId);
      }).toThrow("Invalid account id");

      expect(mockInvalidAccountIdError).toHaveBeenCalled();
    });

    it("should not call invalidAccountIdError when the accountId is greater than zero", () => {
      const accountId = 1;

      const result = validateAccountID(accountId);

      expect(result).toBeUndefined();
      expect(mockInvalidAccountIdError).not.toHaveBeenCalled();
    });
  });

  describe("validatePayment", () => {
    let mockPaymentError;

    beforeEach(() => {
      mockPaymentError = jest
        .spyOn(InvalidPurchaseException.prototype, "paymentError")
        .mockImplementation(() => {
          throw new Error("Error while processing payment");
        });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should call paymentError when the message is undefined or with wrong value", () => {
      const message = undefined || "unknown";

      expect(() => {
        validatePayment(message);
      }).toThrow("Error while processing payment");

      expect(mockPaymentError).toHaveBeenCalled();
    });

    it("should not call paymentError when message is defined with right value", () => {
      const message = "payment completed";

      const result = validatePayment(message);

      expect(result).toBeUndefined();
      expect(mockPaymentError).not.toHaveBeenCalled();
    });
  });
});
