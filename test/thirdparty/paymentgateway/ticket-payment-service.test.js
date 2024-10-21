import TicketPaymentService from "../../../src/thirdparty/paymentgateway/TicketPaymentService.js";

describe("TicketPaymentService", () => {
  let paymentService;

  beforeEach(() => {
    paymentService = new TicketPaymentService();
  });

  it("should not throw an error for valid inputs", () => {
    expect(() => {
      paymentService.makePayment(1, 100);
    }).not.toThrow();
  });

  it("should throw a TypeError if accountId is not an integer", () => {
    expect(() => {
      paymentService.makePayment("1", 100);
    }).toThrow(TypeError);
    expect(() => {
      paymentService.makePayment(1.5, 100);
    }).toThrow(TypeError);
    expect(() => {
      paymentService.makePayment(null, 100);
    }).toThrow(TypeError);
    expect(() => {
      paymentService.makePayment(undefined, 100);
    }).toThrow(TypeError);
  });

  it("should throw a TypeError if totalAmountToPay is not an integer", () => {
    expect(() => {
      paymentService.makePayment(1, "100");
    }).toThrow(TypeError);
    expect(() => {
      paymentService.makePayment(1, 99.99);
    }).toThrow(TypeError);
    expect(() => {
      paymentService.makePayment(1, null);
    }).toThrow(TypeError);
    expect(() => {
      paymentService.makePayment(1, undefined);
    }).toThrow(TypeError);
  });
});
