import { Booking } from "../types/booking";
import moment from "moment";
import toast from "react-hot-toast";

export const isDateConflicting = (
  newStartDate: moment.Moment,
  newEndDate: moment.Moment,
  currentBookings: Booking[],
  ignoredBookingId?: number
) => {
  return currentBookings.some((booking: Booking) => {
    if (ignoredBookingId && booking.id === ignoredBookingId) {
      return false;
    }

    const existingStart = moment(booking.startDate);
    const existingEnd = moment(booking.endDate);
    return (
      newStartDate.isBefore(existingEnd, "day") &&
      newEndDate.isAfter(existingStart, "day") 
    );
  });
};

export const calculateTotalPrice = (
  days: number,
  pricePerDay: number,
  tax: number
) => {
  return tax + days * pricePerDay;
};

export const formatDisplayDate = (date: string) => {
  return moment(date).format("MMMM Do YYYY");
};

export const notifySuccess = (message: string) => {
  toast.success(message, {
    style: {
      border: "1px solid green",
      padding: "16px",
      color: "green",
    },
    iconTheme: {
      primary: "green",
      secondary: "#FFFAEE",
    },
  });
};

export const notifyError = (message: string) =>
  toast.error(message || "Booking could not be created.");
