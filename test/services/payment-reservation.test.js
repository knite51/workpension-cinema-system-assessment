import {
  validateAccountID,
  validatePayment,
} from "../../src/middlewares/validation.middleware.js";
import TicketService from "../../src/pairtest/TicketService.js";
import { PaymentReservationService } from "../../src/services/payment-reservation.service.js";
import SeatReservationService from "../../src/thirdparty/seatbooking/SeatReservationService.js";

// Mock the dependencies
// jest.mock("../../src/middlewares/validation.middleware.js");
// jest.mock("../../src/pairtest/TicketService.js");
// jest.mock("../../src/thirdparty/seatbooking/SeatReservationService.js");

describe("PaymentReservationService", () => {
  let paymentReservationService;
  let mockTicketService;
  let mockReservationService;

  beforeEach(() => {
    mockTicketService = new TicketService();
    mockReservationService = new SeatReservationService();

    // Instantiate the service we're testing
    paymentReservationService = new PaymentReservationService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("processPaymentAndReservation", () => {
    it("should validate the accountID, process payment, and process reservation", () => {
      const accountID = 12345;
      const validatedTickets = [{ type: "ADULT", noOfTickets: 2 }];
      const paymentResponse = { message: "payment completed", neededSeats: 2 };

      const validateAccountID = jest.fn(accountID);

      //   // Mock validation and service methods
      //   validateAccountID.mockImplementation(() => {});
      //   validatePayment.mockImplementation(() => {});
      //   mockTicketService.purchaseTickets.mockReturnValue(paymentResponse);
      //   mockReservationService.reserveSeat.mockImplementation(() => {});

      // Call the method to test
      paymentReservationService.processPaymentAndReservation(
        accountID,
        validatedTickets
      );

      // Assertions
      expect(validateAccountID).toHaveBeenCalledWith(accountID);
      //   expect(mockTicketService.purchaseTickets).toHaveBeenCalledWith(
      //     accountID,
      //     ...validatedTickets
      //   );
      //   expect(validatePayment).toHaveBeenCalledWith(paymentResponse.message);
      //   expect(mockReservationService.reserveSeat).toHaveBeenCalledWith(
      //     accountID,
      //     paymentResponse.neededSeats
      //   );
    });

    // it("should throw an error if accountID is invalid", () => {
    //   const accountID = -1; // Invalid accountID
    //   const validatedTickets = [{ type: "ADULT", noOfTickets: 2 }];

    //   // Mock validation to throw an error
    //   validateAccountID.mockImplementation(() => {
    //     throw new Error("Invalid account id");
    //   });

    //   // Expecting an error to be thrown when the invalid accountID is provided
    //   expect(() =>
    //     paymentReservationService.processPaymentAndReservation(
    //       accountID,
    //       validatedTickets
    //     )
    //   ).toThrow("Invalid account id");

    //   // Assert that payment or reservation was never called
    //   expect(mockTicketService.purchaseTickets).not.toHaveBeenCalled();
    //   expect(mockReservationService.reserveSeat).not.toHaveBeenCalled();
    // });

    // it("should throw an error if payment validation fails", () => {
    //   const accountID = 12345;
    //   const validatedTickets = [{ type: "ADULT", noOfTickets: 2 }];
    //   const paymentResponse = { message: "payment failed", neededSeats: 2 };

    //   // Mock successful account validation and ticket purchase
    //   validateAccountID.mockImplementation(() => {});
    //   mockTicketService.purchaseTickets.mockReturnValue(paymentResponse);

    //   // Mock payment validation to throw an error
    //   validatePayment.mockImplementation(() => {
    //     throw new Error("Payment error");
    //   });

    //   // Expecting an error to be thrown when payment fails
    //   expect(() =>
    //     paymentReservationService.processPaymentAndReservation(
    //       accountID,
    //       validatedTickets
    //     )
    //   ).toThrow("Payment error");

    //   // Assert that reservation was never called
    //   expect(mockReservationService.reserveSeat).not.toHaveBeenCalled();
    // });
  });
});
