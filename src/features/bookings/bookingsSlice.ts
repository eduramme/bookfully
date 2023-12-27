import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Booking, BookingsState } from "../../types/booking";

const initialState: BookingsState = {
  bookings: [],
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  // NOTE: In a real-world application, these actions would likely trigger an
  // asynchronous call to an API to CRUD the booking on the server. Here,
  // we're directly updating the state to simulate the CRUD for the purposes
  // of a front-end challenge.
  reducers: {
    setBookings(state, action: PayloadAction<Booking[]>) {
      state.bookings = action.payload;
    },
    addBooking(state, action: PayloadAction<Booking>) {
      state.bookings.push(action.payload);
    },
    removeBooking(state, action: PayloadAction<number>) {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload
      );
    },
    editBooking: (state, action: PayloadAction<Booking>) => {
      const index = state.bookings.findIndex(
        (booking) => booking.id === action.payload.id
      );
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
  },
});

export const { setBookings, addBooking, removeBooking, editBooking } =
  bookingsSlice.actions;
export default bookingsSlice.reducer;
