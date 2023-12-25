import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { PageTitle } from "../components/PageTitle";
import styled from "styled-components";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeBooking } from "../features/bookings/bookingsSlice";

const BookingList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BookingCard = styled.li`
  background-color: white;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
`;

const BookingInfo = styled.div`
  /* Add styles for your booking info such as layout, spacing, typography */
`;

const BookingsPage: React.FC = () => {
  const bookings = useSelector((state: RootState) => state.bookings.bookings);
  const dispatch = useDispatch();

  const handleRemoveBooking = (bookingId: number) => {
    dispatch(removeBooking(bookingId));
    console.log("Removed booking with ID:", bookingId);
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Bookings</PageTitle>
      </PageHeader>
      <BookingList>
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            onClick={() => handleRemoveBooking(booking.id)} // Change to appropriate handler
          >
            <BookingInfo>
              <div>Booking ID: {booking.id}</div>
              <div>Start Date: {booking.startDate}</div>
              <div>End Date: {booking.endDate}</div>
              <div>Property ID: {booking.propertyId}</div>
            </BookingInfo>
          </BookingCard>
        ))}
      </BookingList>
    </PageContainer>
  );
};

export default BookingsPage;
