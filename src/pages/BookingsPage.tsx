import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeBooking } from "../features/bookings/bookingsSlice";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { PageTitle } from "../components/PageTitle";
import { properties } from "../utils/properties";

const BookingList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BookingCard = styled.li`
  background-color: white;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BookingInfo = styled.div`
  flex-grow: 1;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

const PropertyImage = styled.img`
  height: 100px;
  width: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

const DeleteButton = styled.button`
  /* Add your styling for the delete button here */
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const BookingsPage: React.FC = () => {
  const bookings = useSelector((state: RootState) => state.bookings.bookings);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveBooking = (event: React.MouseEvent, bookingId: number) => {
    event.stopPropagation(); // Prevents navigating when clicking on delete
    dispatch(removeBooking(bookingId));
    console.log("Removed booking with ID:", bookingId);
  };

  const goToBookingDetails = (bookingId: number) => {
    navigate(`/bookings/${bookingId}`);
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Bookings</PageTitle>
      </PageHeader>
      <BookingList>
        {bookings.map((booking) => {
          const property = properties.find((p) => p.id === booking?.propertyId);
          return (
            <BookingCard
              key={booking.id}
              onClick={() => goToBookingDetails(booking.id)}
            >
              <PropertyImage
                src={property?.imageUrls[0] || "defaultImage.jpg"}
                alt="Property"
              />
              <BookingInfo>
                <div>Booking ID: {booking.id}</div>
                <div>Property: {property?.name}</div>
                <div>Start Date: {booking.startDate}</div>
                <div>End Date: {booking.endDate}</div>
                <div>Address: {property?.address}</div>
              </BookingInfo>
              <DeleteButton
                onClick={(event) => handleRemoveBooking(event, booking.id)}
              >
                Delete
              </DeleteButton>
            </BookingCard>
          );
        })}
      </BookingList>
    </PageContainer>
  );
};

export default BookingsPage;
