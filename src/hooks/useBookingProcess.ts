import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  addBooking,
  editBooking as editBookingAction,
  removeBooking,
} from "../features/bookings/bookingsSlice";
import { isDateConflicting, notifyError, notifySuccess } from "../utils/utils";
import { Booking } from "../types/booking";

export const useBookingProcess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createBooking = async (
    event: React.FormEvent<HTMLFormElement>,
    startDate: Date | null,
    endDate: Date | null,
    propertyId: number,
    currentBookings: Booking[]
  ) => {
    event.preventDefault();
    if (!startDate || !endDate || !propertyId) {
      console.error("Missing start date, end date, or property ID");
      notifyError("Please ensure all fields are filled correctly.");
      return;
    }

    const checkin = moment(startDate);
    const checkout = moment(endDate);

    if (isDateConflicting(checkin, checkout, currentBookings, propertyId)) {
      notifyError("Selected dates are already booked for this property.");
      return;
    }

    try {
      await dispatch(
        addBooking({
          id: Date.now(),
          startDate: checkin.toISOString(),
          endDate: checkout.toISOString(),
          propertyId: propertyId,
        })
      );
      notifySuccess("Booking created successfully");
      navigate("/");
    } catch (error) {
      console.error("Failed to create booking.", error);
      notifyError(
        typeof error === "string" ? error : "An unexpected error occurred."
      );
    }
  };

  const editBooking = async (
    event: React.FormEvent<HTMLFormElement>,
    booking: Booking,
    startDate: Date | null,
    endDate: Date | null
  ) => {
    event.preventDefault();
    if (startDate && endDate && booking.id) {
      const checkin = moment(startDate);
      const checkout = moment(endDate);

      try {
        await dispatch(
          editBookingAction({
            ...booking,
            startDate: checkin.toISOString(),
            endDate: checkout.toISOString(),
          })
        );
        notifySuccess("Booking updated successfully");
        navigate("/bookings");
      } catch (error) {
        console.error("Failed to update booking.", error);
        notifyError("Failed to update booking.");
      }
    } else {
      notifyError(
        "Please ensure all dates are selected and the booking exists."
      );
    }
  };

  const removeBookingById = (bookingId: number) => {
    try {
      dispatch(removeBooking(bookingId));
      notifySuccess("Booking removed successfully");
      // navigate("/bookings");
    } catch (error) {
      console.error("Failed to remove booking.", error);
      notifyError("Failed to remove booking.");
    }
  };

  return { createBooking, editBooking, removeBookingById };
};
