export const generateRandomNumbers = (max) => {
  return Math.floor(Math.random() * max);
};

export const generateRandomPurchaseOrder = (
  ticketTypes,
  noOfTicketTypes = 1,
  maxTicketsPerPurchase = 25
) => {
  let results = [];
  for (let i = 0; i < noOfTicketTypes; i++) {
    results.push({
      noOfTickets: generateRandomNumbers(maxTicketsPerPurchase),
      ticketType: ticketTypes[generateRandomNumbers(3)],
    });
  }

  return results;
};
