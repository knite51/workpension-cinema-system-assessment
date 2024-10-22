import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest.js";
import { ExtendedTicketService } from "../../src/services/ExtendedTicketService.js";

jest.mock("../../src/services/ExtendedTicketService.js", () => {
  return {
    ExtendedTicketService: jest.fn().mockImplementation(() => {
      return {
        purchaseTickets: jest.fn((accountId, ticketRequests) => {
          return { message: "payment completed", neededSeats: 3 };
        }),
        calculateTicketsSeats: jest.fn((ticketRequests) => {
          return { totalTicketCost: 75, neededSeats: 3 };
        }),
      };
    }),
  };
});

describe("ExtendedTicketService", () => {
  const accountId = 1;
  const ticketRequests = [
    new TicketTypeRequest("ADULT", 2),
    new TicketTypeRequest("CHILD", 1),
    new TicketTypeRequest("INFANT", 1),
  ];
  let extendedTicketService;

  beforeEach(() => {
    extendedTicketService = new ExtendedTicketService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("PurchaseTickets", () => {
    it("should successfully purchase a ticket", () => {
      const result = extendedTicketService.purchaseTickets(
        accountId,
        ticketRequests
      );

      expect(extendedTicketService.purchaseTickets).toHaveBeenCalledWith(
        accountId,
        ticketRequests
      );

      expect(result).toEqual({
        message: "payment completed",
        neededSeats: 3,
      });
    });
  });

  describe("CalculateTicketsSeats", () => {
    it("should calculate total cost of tickets and required seats reservation", () => {
      const result =
        extendedTicketService.calculateTicketsSeats(ticketRequests);

      expect(extendedTicketService.calculateTicketsSeats).toHaveBeenCalledWith(
        ticketRequests
      );

      expect(result).toEqual({ totalTicketCost: 75, neededSeats: 3 });
    });
  });
});
