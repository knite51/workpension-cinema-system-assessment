import SeatReservationService from "../../../src/thirdparty/seatbooking/SeatReservationService.js";

describe("SeatReservationService", () => {
  let reservationService;

  beforeEach(() => {
    reservationService = new SeatReservationService();
  });

  it("should not throw an error for valid inputs", () => {
    expect(() => {
      reservationService.reserveSeat(1, 5);
    }).not.toThrow();
  });

  it("should throw a TypeError if accountId is not an integer", () => {
    expect(() => {
      reservationService.reserveSeat("1", 5);
    }).toThrow(TypeError);
    expect(() => {
      reservationService.reserveSeat(1.5, 5);
    }).toThrow(TypeError);
    expect(() => {
      reservationService.reserveSeat(null, 5);
    }).toThrow(TypeError);
    expect(() => {
      reservationService.reserveSeat(undefined, 5);
    }).toThrow(TypeError);
  });

  it("should throw a TypeError if totalSeatsToAllocate is not an integer", () => {
    expect(() => {
      reservationService.reserveSeat(1, "5");
    }).toThrow(TypeError);
    expect(() => {
      reservationService.reserveSeat(1, 4.5);
    }).toThrow(TypeError);
    expect(() => {
      reservationService.reserveSeat(1, null);
    }).toThrow(TypeError);
    expect(() => {
      reservationService.reserveSeat(1, undefined);
    }).toThrow(TypeError);
  });
});
