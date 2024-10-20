import InvalidPurchaseException from "../pairtest/lib/InvalidPurchaseException.js";
import TicketTypeRequest from "../pairtest/lib/TicketTypeRequest.js";
import TicketService from "../pairtest/TicketService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";

const ticketService = new TicketService();
const reservationService = new SeatReservationService();
const InvalidRequestExceptions = new InvalidPurchaseException();

const processSingleTicketInfo = (singleTickeInfo) => {
  const singleTickeInfoArr = singleTickeInfo.trim().split(":");
  if (singleTickeInfoArr.length === 2) {
    let ticketType = singleTickeInfoArr[0].toUpperCase();
    let noOfTickets = Number(singleTickeInfoArr[1].trim());
    const ticketTypeRequest = new TicketTypeRequest(ticketType, noOfTickets);
    return ticketTypeRequest;
  }
  return InvalidRequestExceptions.invalidTicketInputFormatError();
};

const validateNumberOfTickets = (noOfTickets, maxTicketAllowed = 25) => {
  maxTicketAllowed = maxTicketAllowed - noOfTickets;
  if (maxTicketAllowed < 0) {
    return InvalidRequestExceptions.maxedTicketError(25);
  }
  return;
};

const validateAdultTicketsIncluded = (hasAdultTicket) => {
  if (hasAdultTicket) return;
  return InvalidRequestExceptions.noAdultTicketError();
};

export const isMultipleTickets = (ticketInfo) => {
  return ticketInfo.includes(",") ? true : false;
};

export const validateAccountID = (accountID) => {
  if (accountID > 0) return;
  return InvalidRequestExceptions.invalidAccountIdError();
};

export const processTicketInformation = (ticketInfo) => {
  let processedInput = [];
  let totalTickets = 0;
  let hasAdultTicket = false;

  if (isMultipleTickets(ticketInfo)) {
    const tickeInfoArr = ticketInfo.split(",");
    for (let i = 0; i < tickeInfoArr.length; i++) {
      let refinedInput = processSingleTicketInfo(tickeInfoArr[i]);
      totalTickets += refinedInput.getNoOfTickets();
      refinedInput.getTicketType() === "ADULT" ? (hasAdultTicket = true) : null;
      processedInput.push(refinedInput);
    }
  } else {
    let refinedInput = processSingleTicketInfo(ticketInfo);
    totalTickets += refinedInput.getNoOfTickets();
    hasAdultTicket = refinedInput.getTicketType() === "ADULT" ? true : false;
    processedInput.push(refinedInput);
  }
  validateNumberOfTickets(totalTickets);
  validateAdultTicketsIncluded(hasAdultTicket);
  return processedInput;
};

export const processPayment = (accountID, ticketRequests) => {
  return ticketService.purchaseTickets(accountID, ...ticketRequests);
};

export const processReservation = (accountID, { message, neededSeats }) => {
  if (message === "payment completed") {
    reservationService.reserveSeat(accountID, neededSeats);
    console.log(`Reservation completed, ${neededSeats} Seats Reserved`);
  }
  return InvalidRequestExceptions.paymentError();
};
