import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest.js";
import { PaymentReservationService } from "../../src/services/PaymentReservationService.js";

jest.mock("../../src/services/PaymentReservationService.js", () => {
  return {
    PaymentReservationService: jest.fn().mockImplementation(() => {
      return {
        validateAccountID: jest.fn((accountId) => {}),
        processPayment: jest.fn((accountId, ticketRequests) => {
          return { message: "payment completed", neededSeats: 3 };
        }),
        processReservation: jest.fn((accountId, paymentResponse) => {}),
        processPaymentAndReservation: jest.fn(function (
          accountId,
          validatedTickets
        ) {
          this.validateAccountID(accountId);
          const paymentResponse = this.processPayment(
            accountId,
            validatedTickets
          );
          this.processReservation(accountId, paymentResponse);
        }),
      };
    }),
  };
});

describe("PaymentReservationService", () => {
  const accountId = 1;
  const ticketRequests = [
    new TicketTypeRequest("ADULT", 2),
    new TicketTypeRequest("CHILD", 1),
    new TicketTypeRequest("INFANT", 1),
  ];
  let paymentReservationService;

  beforeEach(() => {
    paymentReservationService = new PaymentReservationService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call processPaymentAndReservation method with correct arguments", () => {
    paymentReservationService.processPaymentAndReservation(
      accountId,
      ticketRequests
    );

    expect(
      paymentReservationService.processPaymentAndReservation
    ).toHaveBeenCalledWith(accountId, ticketRequests);
  });

  it("should call steps method in processPaymentAndReservation method", () => {
    paymentReservationService.processPaymentAndReservation(
      accountId,
      ticketRequests
    );
    expect(paymentReservationService.validateAccountID).toHaveBeenCalledWith(
      accountId
    );

    const paymentResponse = paymentReservationService.processPayment(
      accountId,
      ticketRequests
    );

    expect(paymentReservationService.processPayment).toHaveBeenCalledWith(
      accountId,
      ticketRequests
    );

    expect(paymentResponse).toEqual({
      message: "payment completed",
      neededSeats: 3,
    });

    expect(paymentReservationService.processReservation).toHaveBeenCalledWith(
      accountId,
      paymentResponse
    );
  });
});
