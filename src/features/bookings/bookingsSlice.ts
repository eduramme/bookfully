import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Booking } from "../../types/booking";

const initialState: { bookings: Booking[] } = {
  bookings: [],
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
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
  },
});

export const { setBookings, addBooking, removeBooking } = bookingsSlice.actions;
export default bookingsSlice.reducer;
