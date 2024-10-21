import InvalidPurchaseException from "../pairtest/lib/InvalidPurchaseException.js";

const invalidRequestExceptions = new InvalidPurchaseException();

export const validateUserInput = (singleTickeInfoArr) => {
  if (singleTickeInfoArr.length !== 2) {
    return invalidRequestExceptions.invalidTicketInputFormatError();
  }
};

export const validateNumberOfTickets = (noOfTickets, maxTicketAllowed = 25) => {
  maxTicketAllowed = maxTicketAllowed - noOfTickets;
  if (maxTicketAllowed < 0) {
    return invalidRequestExceptions.maxedTicketError();
  }
  return;
};

export const validateAdultTicketsIncluded = (hasAdultTicket) => {
  if (hasAdultTicket) return;
  return invalidRequestExceptions.noAdultTicketError();
};

export const validateAccountID = (accountID) => {
  if (accountID > 0) return;
  return invalidRequestExceptions.invalidAccountIdError();
};

export const validatePayment = (message) => {
  if (!message || message !== "payment completed") {
    return invalidRequestExceptions.paymentError();
  }
  return;
};
