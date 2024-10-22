import { RefineValidateUserInputService } from "../../src/services/RefineValidateUserInputService";
import {
  validateAdultTicketsIncluded,
  validateNumberOfTickets,
  validateUserInput,
} from "../../src/middlewares/validation.middleware";
import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest";

jest.mock("../../src/middlewares/validation.middleware");
jest.mock("../../src/pairtest/lib/TicketTypeRequest");

describe("RefineValidateUserInputService", () => {
  let service;

  beforeEach(() => {
    service = new RefineValidateUserInputService();
    jest.clearAllMocks();
  });

  describe("handleUserInput", () => {
    it("should process a single valid ticket info and return a TicketTypeRequest", () => {
      const ticketInfo = "adult:2";

      TicketTypeRequest.mockImplementation((type, noOfTickets) => {
        return {
          getTicketType: () => type,
          getNoOfTickets: () => noOfTickets,
        };
      });

      const result = service.handleUserInput(ticketInfo);

      expect(validateUserInput).toHaveBeenCalledWith(["adult", "2"]);
      expect(TicketTypeRequest).toHaveBeenCalledWith("ADULT", 2);
      expect(validateNumberOfTickets).toHaveBeenCalledWith(2);
      expect(validateAdultTicketsIncluded).toHaveBeenCalledWith(true);

      expect(result).toHaveLength(1);
      expect(result[0].getTicketType()).toBe("ADULT");
      expect(result[0].getNoOfTickets()).toBe(2);
    });

    it("should process multiple valid ticket info and return an array of TicketTypeRequest", () => {
      const ticketInfo = "adult:2,child:1";

      TicketTypeRequest.mockImplementation((type, noOfTickets) => {
        return {
          getTicketType: () => type,
          getNoOfTickets: () => noOfTickets,
        };
      });

      const result = service.handleUserInput(ticketInfo);

      expect(validateUserInput).toHaveBeenCalledTimes(2);
      expect(validateUserInput).toHaveBeenCalledWith(["adult", "2"]);
      expect(validateUserInput).toHaveBeenCalledWith(["child", "1"]);

      expect(TicketTypeRequest).toHaveBeenCalledWith("ADULT", 2);
      expect(TicketTypeRequest).toHaveBeenCalledWith("CHILD", 1);

      expect(validateNumberOfTickets).toHaveBeenCalledWith(3);
      expect(validateAdultTicketsIncluded).toHaveBeenCalledWith(true);

      expect(result).toHaveLength(2);
      expect(result[0].getTicketType()).toBe("ADULT");
      expect(result[0].getNoOfTickets()).toBe(2);
      expect(result[1].getTicketType()).toBe("CHILD");
      expect(result[1].getNoOfTickets()).toBe(1);
    });

    it("should throw an error if no adult ticket is included", () => {
      const ticketInfo = "child:2";

      TicketTypeRequest.mockImplementation((type, noOfTickets) => {
        return {
          getTicketType: () => type,
          getNoOfTickets: () => noOfTickets,
        };
      });

      validateAdultTicketsIncluded.mockImplementation(() => {
        throw new Error("Adult ticket required");
      });

      expect(() => service.handleUserInput(ticketInfo)).toThrow(
        "Adult ticket required"
      );
      expect(validateAdultTicketsIncluded).toHaveBeenCalledWith(false);
    });

    it("should throw an error if ticketInfo is invalid", () => {
      const invalidTicketInfo = "invalid_ticket_info";

      validateUserInput.mockImplementation(() => {
        throw new Error(
          "Invalid ticket input format. accepted format: child:3, adult:10, infant:1"
        );
      });

      expect(() => service.handleUserInput(invalidTicketInfo)).toThrow(
        "Invalid ticket input format. accepted format: child:3, adult:10, infant:1"
      );
      expect(validateUserInput).toHaveBeenCalled();
    });
  });
});
