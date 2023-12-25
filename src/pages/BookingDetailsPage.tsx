import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { PageTitle } from "../components/PageTitle";
import styled from "styled-components";
import DatePickerComponent from "../components/DatePicker";
import { colors } from "../styles/theme";
import { useSelector, useDispatch } from "react-redux";
import { editBooking } from "../features/bookings/bookingsSlice";
import { RootState } from "../store";

const BookingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const BookingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const booking = useSelector((state: RootState) =>
    state.bookings.bookings.find(
      (booking) => booking.id === parseInt(id || "0")
    )
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!booking) {
      navigate("/404");
    }
    if (booking) {
      setStartDate(new Date(booking.startDate));
      setEndDate(new Date(booking.endDate));
    }
  }, [booking, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (booking && startDate && endDate) {
      // Note: In a real application, this would likely involve an API call
      // to update the booking on the server. For this challenge, we're directly
      // dispatching the editBooking action to update the state locally.
      try {
        dispatch(
          editBooking({
            ...booking,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          })
        );
        navigate("/bookings");
      } catch (error) {
        console.log("Failed to update booking.");
      }
    }
  };

  const today = new Date();

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Booking {id}</PageTitle>
      </PageHeader>

      <PropertyDetail>
        <h2>Property Details</h2>
        <p>Description of Property {booking?.propertyId}</p>
      </PropertyDetail>

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
    </PageContainer>
  );
};

export default BookingDetailsPage;
