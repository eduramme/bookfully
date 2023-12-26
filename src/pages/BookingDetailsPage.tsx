import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import styled from "styled-components";
import DatePickerComponent from "../components/DatePicker";
import { colors } from "../styles/theme";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { properties } from "../utils/mocks";
import { useBookingProcess } from "../hooks/useBookingProcess";

const BookingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: ${colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  text-transform: uppercase;
`;

const PropertyDetail = styled.div`
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PropertyImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;

const DetailItem = styled.div`
  margin-bottom: 10px;
`;

const BookingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const booking = useSelector((state: RootState) =>
    state.bookings.bookings.find((b) => b.id === parseInt(id || "0"))
  );

  const [property, setProperty] = useState(
    properties.find((p) => p.id === booking?.propertyId)
  );

  const currentBookings = useSelector(
    (state: RootState) => state.bookings.bookings
  );

  useEffect(() => {
    if (!booking) {
      navigate("/404");
    } else {
      setStartDate(new Date(booking.startDate));
      setEndDate(new Date(booking.endDate));
      setProperty(properties.find((p) => p.id === booking?.propertyId));
    }
  }, [booking, navigate]);

  const { editBooking } = useBookingProcess();

  const today = new Date();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (booking && startDate && endDate) {
      editBooking(
        event,
        booking,
        startDate,
        endDate,
        booking.propertyId,
        currentBookings
      );
    } else {
      console.error("No booking found with the specified ID");
    }
  };

  return (
    <PageContainer>
      <PageHeader title={`Booking ${id}`} />

      <BookingForm onSubmit={handleSubmit}>
        <h3>Edit Booking</h3>
        <DateContainer>
          Start Date:
          <DatePickerComponent
            minDate={today}
            maxDate={endDate}
            selected={startDate}
            onChange={setStartDate}
            shouldCloseOnSelect={true}
          />
        </DateContainer>

        <DateContainer>
          End Date:
          <DatePickerComponent
            minDate={startDate}
            selected={endDate}
            onChange={setEndDate}
            shouldCloseOnSelect={true}
          />
        </DateContainer>
        <SubmitButton type="submit">Edit Booking</SubmitButton>
      </BookingForm>

      {property && (
        <PropertyDetail>
          <PropertyImage
            src={property.imageUrls[0] || "defaultImage.jpg"}
            alt={property.name}
          />
          <h2>{property.name}</h2>
          <DetailItem>
            <strong>Description:</strong> {property.description}
          </DetailItem>
          <DetailItem>
            <strong>Address:</strong> {property.address}
          </DetailItem>
          <DetailItem>
            <strong>Price Per Day:</strong> ${property.pricePerDay.toFixed(2)}
          </DetailItem>
        </PropertyDetail>
      )}
    </PageContainer>
  );
};

export default BookingDetailsPage;
