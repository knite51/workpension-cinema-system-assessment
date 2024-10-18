import InvalidPurchaseException from "./pairtest/lib/InvalidPurchaseException.js";
import TicketTypeRequest from "./pairtest/lib/TicketTypeRequest.js";
import TicketService from "./pairtest/TicketService.js";
import SeatReservationService from "./thirdparty/seatbooking/SeatReservationService.js";
import { generateRandomPurchaseOrder } from "./utilities/utilities.js";

const InvalidRequestExceptions = new InvalidPurchaseException();
const ticketService = new TicketService();
const reservationService = new SeatReservationService();
const accountID = 1;

const handleRequest = () => {
  const purchaseDetails = generateRandomPurchaseOrder(
    ["ADULT", "CHILD", "INFANT"],
    4,
    25
  );
  //   console.log(purchaseDetails, "purchaseDetails");
  let validateNoOfTickets = purchaseDetails.find((el) => el.noOfTickets > 25);
  let validateAdultTicketsIncluded = purchaseDetails.find(
    (el) => el.ticketType === "ADULT"
  );

  if (validateNoOfTickets) {
    return InvalidRequestExceptions.maxedTicketError(
      validateNoOfTickets.noOfTickets
    );
  }

  if (!validateAdultTicketsIncluded) {
    return InvalidRequestExceptions.noAdultTicketError();
  }

  const ticketRequests = purchaseDetails
    .map(({ noOfTickets, ticketType }) => {
      try {
        return new TicketTypeRequest(ticketType, noOfTickets);
      } catch (error) {
        console.error("Error:", error.message);
        return null;
      }
    })
    .filter((request) => request !== null);

  console.log(purchaseDetails, "purchaseDetails");

  if (accountID > 0) {
    // make a purchase
    const result = ticketService.purchaseTickets(accountID, ...ticketRequests);

    // make reservation
    if ((result.msg = "payment completed")) {
      let numberOfSeatRequired = purchaseDetails
        .filter((el) => el.ticketType !== "INFANT")
        .reduce((acc, currentValue) => (acc += currentValue.noOfTickets), 0);

      console.log("Seats Required: ", numberOfSeatRequired);
      reservationService.reserveSeat(accountID, numberOfSeatRequired);

      console.log("RESERVATION COMPLETED");
    }
  } else {
    return InvalidRequestExceptions.invalidAccountIdError();
  }
};

handleRequest();
