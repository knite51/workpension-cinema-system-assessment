import InvalidPurchaseException from "../pairtest/lib/InvalidPurchaseException.js";

const InvalidRequestExceptions = new InvalidPurchaseException();

export const validateUserInput = (singleTickeInfoArr) => {
  if (singleTickeInfoArr.length !== 2) {
    return InvalidRequestExceptions.invalidTicketInputFormatError();
  }
  return;
};

export const validateNumberOfTickets = (noOfTickets, maxTicketAllowed = 25) => {
  maxTicketAllowed = maxTicketAllowed - noOfTickets;
  if (maxTicketAllowed < 0) {
    return InvalidRequestExceptions.maxedTicketError(25);
  }
  return;
};

export const validateAdultTicketsIncluded = (hasAdultTicket) => {
  if (hasAdultTicket) return;
  return InvalidRequestExceptions.noAdultTicketError();
};

export const validateAccountID = (accountID) => {
  if (accountID > 0) return;
  return InvalidRequestExceptions.invalidAccountIdError();
};

export const validatePayment = (message) => {
  if (!message || message !== "payment completed") {
    return InvalidRequestExceptions.paymentError();
  }
  return;
};
