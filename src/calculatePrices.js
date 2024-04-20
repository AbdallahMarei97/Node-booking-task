/**
 * Parses the available dates to compare them easily
 * @param {Object[]} availableDates Array of available dates that the admin adds
 * @returns the available dates parsed to compare them easily
 */
const parseAvailableDates = (availableDates) => (
    availableDates.map((item) => ({
        ...item,
        start_date: new Date(item.start_date),
        end_date: new Date(item.end_date),
    }))
);

/**
 * compare the parsed available dates with the customer dates to get the correct available date
 * @param {String} parsedCustomerStartDate the parsed start date that the customer enters
 * @param {String} parsedCustomerEndDate the parsed end date that the customer enters
 * @param {Object[]} parsedDatesArr Array of parsed available dates that the admin adds
 * @returns the correct available date object that we use the price for
 */
const getAvailableDate = (parsedCustomerStartDate, parsedCustomerEndDate, parsedDatesArr) => {
    let availableDateObject;
    let inRange = false;
    for (let i = 0; i < parsedDatesArr.length; i++) {
        // check if the customer's date is outside the range of the dates inside the array
        if (parsedCustomerEndDate < parsedDatesArr[i].start_date || parsedCustomerStartDate > parsedDatesArr[i].end_date) continue;

        if (parsedCustomerStartDate >= parsedDatesArr[i].start_date && parsedCustomerStartDate <= parsedDatesArr[i].end_date) {
            availableDateObject = parsedDatesArr[i];
        }

        // check if the customer's end date is more than the end date from the array
        if (parsedCustomerEndDate <= parsedDatesArr[i].end_date) inRange = true;
    };

    if (!inRange) return inRange;

    return availableDateObject;
};

/**
 * Calculate the total price for the date that the customer enters
 * @param {String} startDate the start date that the customer enters
 * @param {String} endDate the end date that the customer enters
 * @param {Object[]} availableDates Array of available dates that the admin adds
 * @returns the total price that the customer pays for
 */
const calculatePrices = (startDate, endDate, availableDates) => {
    // parse all dates to compare the date
    const parsedDatesArr = parseAvailableDates(availableDates);
    const parsedCustomerStartDate = new Date(startDate);
    const parsedCustomerEndDate = new Date(endDate);
    let totalPrice = 0;

    // get the difference between the customer's entered days, if the difference is negative then the dates are wrong
    const oneDay = 24 * 60 * 60 * 1000;
    const customerBookingDateDifference = Math.round((parsedCustomerEndDate - parsedCustomerStartDate) / oneDay);
    if (customerBookingDateDifference < 0) return 'Entered dates are wrong'

    // Get the available date from the admin's dates array, if the customer's dates are outside the range of all available dates then return no available date
    let availableDate = getAvailableDate(parsedCustomerStartDate, parsedCustomerEndDate, parsedDatesArr);
    if (!availableDate) return 'No available date'

    for (let i = 0; i <= customerBookingDateDifference; i++) {
        totalPrice += availableDate.price;
        parsedCustomerStartDate.setDate(parsedCustomerStartDate.getDate() + 1);

        availableDate = getAvailableDate(parsedCustomerStartDate, parsedCustomerEndDate, parsedDatesArr);
    }

    return totalPrice;
};

module.exports = {
	calculatePrices,
};