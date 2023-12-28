// Import necessary hooks from React and Redux, moment for date handling, and custom utilities and actions.
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

// useBookingProcess is a custom hook that wraps up Redux actions for managing bookings.
export const useBookingProcess = () => {
  // Hook to dispatch actions to the Redux store.
  const dispatch = useDispatch();
  // Hook to programmatically navigate between routes.
  const navigate = useNavigate();

  // Function to handle the creation of a new booking.
  const createBooking = async (
    event: React.FormEvent<HTMLFormElement>,
    startDate: Date | null,
    endDate: Date | null,
    propertyId: number,
    currentBookings: Booking[]
  ) => {
    event.preventDefault(); // Prevent default form submission behavior.
    // Validation for required fields.
    if (!startDate || !endDate || !propertyId) {
      console.error("Missing start date, end date, or property ID");
      notifyError("Please ensure all fields are filled correctly.");
      return;
    }

    // Convert dates to moment objects for easy manipulation and comparison.
    const checkin = moment(startDate);
    const checkout = moment(endDate);

    // Check for date conflicts with existing bookings.
    if (isDateConflicting(checkin, checkout, currentBookings, propertyId)) {
      notifyError("Selected dates are already booked for this property.");
      return;
    }

    // Attempt to dispatch the action to add a new booking.
    try {
      await dispatch(
        addBooking({
          id: Date.now(), // Using current timestamp as a makeshift ID.
          startDate: checkin.toISOString(),
          endDate: checkout.toISOString(),
          propertyId: propertyId,
        })
      );
      notifySuccess("Booking created successfully");
      navigate("/"); // Navigate to the homepage on successful booking creation.
    } catch (error) {
      console.error("Failed to create booking.", error);
      notifyError(
        typeof error === "string" ? error : "An unexpected error occurred."
      );
    }
  };

  // Function to handle the editing of an existing booking.
  const editBooking = async (
    event: React.FormEvent<HTMLFormElement>,
    booking: Booking,
    startDate: Date | null,
    endDate: Date | null,
    propertyId: number,
    currentBookings: Booking[]
  ) => {
    event.preventDefault(); // Prevent default form submission behavior.
    // Ensure required data is available.
    if (startDate && endDate && booking.id) {
      const checkin = moment(startDate);
      const checkout = moment(endDate);

      // Check for date conflicts, excluding the current booking.
      if (
        isDateConflicting(
          checkin,
          checkout,
          currentBookings,
          propertyId,
          booking.id
        )
      ) {
        notifyError("Selected dates are already booked for this property.");
        return;
      }

      // Attempt to dispatch the action to edit an existing booking.
      try {
        await dispatch(
          editBookingAction({
            ...booking,
            startDate: checkin.toISOString(),
            endDate: checkout.toISOString(),
          })
        );
        notifySuccess("Booking updated successfully");
        navigate("/bookings"); // Navigate to the bookings page on successful edit.
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

  // Function to handle the removal of a booking.
  const removeBookingById = (bookingId: number) => {
    try {
      dispatch(removeBooking(bookingId)); // Dispatch the action to remove a booking.
      notifySuccess("Booking removed successfully");
      // navigate("/bookings"); // Uncomment if you want to navigate to the bookings page after deletion.
    } catch (error) {
      console.error("Failed to remove booking.", error);
      notifyError("Failed to remove booking.");
    }
  };

  // Expose the booking management functions to components that use this hook.
  return { createBooking, editBooking, removeBookingById };
};
