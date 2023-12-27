import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../components/PageContainer";
import { PageHeader } from "../../components/PageHeader";
import { properties } from "../../utils/mocks";
import { useBookingProcess } from "../../hooks/useBookingProcess";
import { formatDisplayDate } from "../../utils/utils";

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

  @media (max-width: 768px) {
    align-self: center;
    width: 100%;
  }
`;

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

const BookingsPage: React.FC = () => {
  const bookings = useSelector((state: RootState) => state.bookings.bookings);
  const navigate = useNavigate();

  const { removeBookingById } = useBookingProcess();

  const goToBookingDetails = (bookingId: number) => {
    navigate(`/bookings/${bookingId}`);
  };

  return (
    <PageContainer>
      <PageHeader title={"Bookings"} />

      <BookingList>
        {bookings.length > 0 ? (
          bookings.map((booking) => {
            const property = properties.find(
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
