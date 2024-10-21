import TicketTypeRequest from "../../../src/pairtest/lib/TicketTypeRequest.js";

describe("TicketTypeRequest", () => {
  it("should create an instance with valid inputs", () => {
    const ticketRequest = new TicketTypeRequest("ADULT", 2);
    expect(ticketRequest.getTicketType()).toBe("ADULT");
    expect(ticketRequest.getNoOfTickets()).toBe(2);
  });

  it("should throw a TypeError for an invalid ticket type", () => {
    expect(() => {
      new TicketTypeRequest("SENIOR", 2);
    }).toThrow(TypeError);
    expect(() => {
      new TicketTypeRequest("CHILD", 2);
    }).not.toThrow();
  });

  it("should throw a TypeError if noOfTickets is not an integer", () => {
    expect(() => {
      new TicketTypeRequest("ADULT", 2.5);
    }).toThrow(TypeError);
    expect(() => {
      new TicketTypeRequest("ADULT", "two");
    }).toThrow(TypeError);
    expect(() => {
      new TicketTypeRequest("ADULT", null);
    }).toThrow(TypeError);
    expect(() => {
      new TicketTypeRequest("ADULT", undefined);
    }).toThrow(TypeError);
  });
});
