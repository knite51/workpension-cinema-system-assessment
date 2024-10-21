import {
  validateAdultTicketsIncluded,
  validateNumberOfTickets,
  validateUserInput,
} from "../middlewares/validation.middleware.js";

import TicketTypeRequest from "../pairtest/lib/TicketTypeRequest.js";

export class TicketInformationService {
  #processedInput = [];
  #totalTickets = 0;
  #hasAdultTicket = false;

  constructor() {}

  #isMultipleTickets(ticketInfo) {
    return ticketInfo.includes(",") ? true : false;
  }

  #processSingleTicketInfo(singleTickeInfo) {
    try {
      const singleTickeInfoArr = singleTickeInfo.trim().split(":");
      validateUserInput(singleTickeInfoArr);
      let ticketType = singleTickeInfoArr[0].toUpperCase();
      let noOfTickets = Number(singleTickeInfoArr[1].trim());
      const ticketTypeRequest = new TicketTypeRequest(ticketType, noOfTickets);
      return ticketTypeRequest;
    } catch (error) {
      throw error;
    }
  }

  refineValidatedTicketInput(ticketInfo) {
    try {
      if (this.#isMultipleTickets(ticketInfo)) {
        const tickeInfoArr = ticketInfo.split(",");
        for (let i = 0; i < tickeInfoArr.length; i++) {
          let refinedInput = this.#processSingleTicketInfo(tickeInfoArr[i]);
          this.#totalTickets += refinedInput.getNoOfTickets();
          refinedInput.getTicketType() === "ADULT"
            ? (this.#hasAdultTicket = true)
            : null;
          this.#processedInput.push(refinedInput);
        }
      } else {
        let refinedInput = this.#processSingleTicketInfo(ticketInfo);
        this.#totalTickets += refinedInput.getNoOfTickets();
        this.#hasAdultTicket =
          refinedInput.getTicketType() === "ADULT" ? true : false;
        this.#processedInput.push(refinedInput);
      }
      validateNumberOfTickets(this.#totalTickets);
      validateAdultTicketsIncluded(this.#hasAdultTicket);
      return this.#processedInput;
    } catch (error) {
      throw error;
    }
  }
}
