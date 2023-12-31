// Import necessary React, Redux, and routing modules.
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import custom hooks, utilities, and components.
import { RootState } from "../../store";
import { PageContainer } from "../../components/PageContainer";
import { PageHeader } from "../../components/PageHeader";
import { mockProperties } from "../../utils/mocks";
import { useBookingProcess } from "../../hooks/useBookingProcess";
import { formatDisplayDate } from "../../utils/utils";

// Styled component for the list of booking cards.
const BookingList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Styled component for individual booking cards with hover effect.
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

// Styled component for the information section of each booking card.
const BookingInfo = styled.div`
  flex-grow: 1;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

// Styled component for the property image in each booking card.
const PropertyImage = styled.img`
  height: 100px;
  width: 150px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 768px) {
    align-self: center;
    width: 100%;
  }
`;

// Styled component for the delete button on each booking card.
const DeleteButton = styled.button`
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  @media (max-width: 768px) {
    align-self: center;
    width: 100%;
  }
`;

// The BookingsPage component displays a list of user bookings and allows navigation and deletion of bookings.
const BookingsPage: React.FC = () => {
  // Retrieves bookings from Redux store.
  const bookings = useSelector((state: RootState) => state.bookings.bookings);
  const navigate = useNavigate();

  // Custom hook providing functionality to remove bookings
  const { removeBookingById } = useBookingProcess();

  // Function to navigate to booking details page when a booking is clicked.
  const goToBookingDetails = (bookingId: number) => {
    navigate(`/bookings/${bookingId}`);
  };

  return (
    <PageContainer>
      <PageHeader title={"Bookings"} />

      <BookingList>
        {bookings.length > 0 ? (
          bookings.map((booking) => {
            const property = mockProperties.find(
              (p) => p.id === booking?.propertyId
            );
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
                  <div>
                    From:{" "}
                    <strong>{formatDisplayDate(booking.startDate)}</strong>
                  </div>
                  <div>
                    To: <strong>{formatDisplayDate(booking.endDate)}</strong>
                  </div>
                  <div>Property: {property?.name}</div>
                  <div>Address: {property?.address}</div>
                </BookingInfo>
                <DeleteButton
                  onClick={(event) => {
                    event.stopPropagation(); // Prevents navigating when clicking on delete
                    removeBookingById(booking.id);
                  }}
                >
                  Delete
                </DeleteButton>
              </BookingCard>
            );
          })
        ) : (
          <p>
            Looks like you haven't made any bookings. Start exploring properties
            and plan your next stay!
          </p>
        )}
      </BookingList>
    </PageContainer>
  );
};

export default BookingsPage;
