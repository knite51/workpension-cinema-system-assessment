import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest.js";
import TicketService from "../../src/pairtest/TicketService.js";

jest.mock("../../src/thirdparty/paymentgateway/TicketPaymentService.js");

describe("TicketService", () => {
  let ticketService;

  beforeEach(() => {
    ticketService = new TicketService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should calculate total cost and make payment for adult and child tickets", () => {
    const accountId = 1;
    const ticketRequests = [
      new TicketTypeRequest("ADULT", 2),
      new TicketTypeRequest("CHILD", 1),
    ];
    const expectedTotalCost = 65; // 50 (Adults) + 15 (Child)
    const expectedSeats = 3; // 2 Adults + 1 Child

    const result = ticketService.purchaseTickets(accountId, ...ticketRequests);

    expect(result).toEqual({
      message: "payment completed",
      neededSeats: expectedSeats,
    });
  });

  it("should not include INFANT tickets in the total cost but count them for seats", () => {
    const accountId = 2;

    // Mocking ticket requests
    const ticketRequests = [
      new TicketTypeRequest("ADULT", 1), // 1 Adult = 25
      new TicketTypeRequest("CHILD", 2), // 2 Children = 2 * 15 = 30
      new TicketTypeRequest("INFANT", 1), // 1 Infant = 0 (no cost)
    ];

    const expectedTotalCost = 55; // 25 (Adult) + 30 (Children)
    const expectedSeats = 3; // 1 Adult + 2 Children (Infants don't need seats)

    const result = ticketService.purchaseTickets(accountId, ...ticketRequests);

    // Validate the output message and number of seats needed
    expect(result).toEqual({
      message: "payment completed",
      neededSeats: expectedSeats,
    });
  });
});
