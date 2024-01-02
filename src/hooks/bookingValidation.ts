import moment from "moment";
import { Booking } from "../types/booking";
import { isDateConflicting } from "../utils/utils";

interface ValidationResult {
    isValid: boolean;
    message?: string;
}

export const validateBooking = (
    startDate: Date | null,
    endDate: Date | null,
    propertyId: number,
    currentBookings: Booking[],
    bookingId: number | undefined = undefined
): ValidationResult => {

    if (!startDate || !endDate || propertyId <= 0) {
        return { isValid: false, message: "Please ensure all fields are filled correctly." };
    }

    const checkin = moment(startDate).startOf('day');
    const checkout = moment(endDate).startOf('day');
    const today = moment().startOf('day');

    // Checking if the startDate is before today
    if (checkin.isBefore(today)) {
        return { isValid: false, message: "The start date cannot be before today." };
    }

    // Checking if the endDate is at least one day after the startDate
    if (!checkout.isAfter(checkin)) {
        return { isValid: false, message: "The end date must be at least one day after the start date." };
    }

    if (isDateConflicting(checkin, checkout, currentBookings, propertyId, bookingId)) {
        return { isValid: false, message: "Selected dates are already booked for this property." };
    }

    return { isValid: true };
};
