// Import necessary hooks from React and Redux, moment for date handling, and custom utilities and actions.
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  addBooking,
  editBooking as editBookingAction,
  removeBooking,
} from "../features/bookings/bookingsSlice";
import { notifyError, notifySuccess } from "../utils/utils";
import { Booking } from "../types/booking";
import { validateBooking } from "./bookingValidation";

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

    // Convert dates to moment objects for easy manipulation and comparison.
    const checkin = moment(startDate);
    const checkout = moment(endDate);

    // validate bookings
    const validationResult = validateBooking(
      startDate,
      endDate,
      propertyId,
      currentBookings
    );

    if (!validationResult.isValid) {
      console.error(validationResult.message);
      notifyError(validationResult.message || "Validation failed.");
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
    const checkin = moment(startDate);
    const checkout = moment(endDate);

    // Check for date conflicts, excluding the current booking.
    const validationResult = validateBooking(
      startDate,
      endDate,
      propertyId,
      currentBookings,
      booking.id
    );

    if (!validationResult.isValid) {
      console.error(validationResult.message);
      notifyError(validationResult.message || "Validation failed.");
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

  };

  // Function to handle the removal of a booking.
  const removeBookingById = (bookingId: number) => {
    try {
      dispatch(removeBooking(bookingId)); // Dispatch the action to remove a booking.
      notifySuccess("Booking removed successfully");
    } catch (error) {
      console.error("Failed to remove booking.", error);
      notifyError("Failed to remove booking.");
    }
  };

  // Expose the booking management functions to components that use this hook.
  return { createBooking, editBooking, removeBookingById };
};
