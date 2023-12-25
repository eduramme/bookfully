import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { PageTitle } from "../components/PageTitle";
import styled from "styled-components";
import DatePickerComponent from "../components/DatePicker";
import { colors } from "../styles/theme";
import { useDispatch } from "react-redux";
import { addBooking } from "../features/bookings/bookingsSlice";

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

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const dispatch = useDispatch(); // Use useDispatch to dispatch actions

  const handleBooking = (event: React.FormEvent) => {
    event.preventDefault();
    if (startDate && endDate && id) {
      dispatch(
        addBooking({
          id: Date.now(), // Temporary way to generate a unique id
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          propertyId: parseInt(id),
        })
      );
      console.log(
        `Booking added for property ${id} from ${startDate} to ${endDate}`
      );
    } else {
      console.error("Missing start date, end date, or property ID");
    }
  };

  const today = new Date();

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Property {id}</PageTitle>
      </PageHeader>

      <PropertyDetail>
        <h2>Property Details</h2>
        <p>Description of Property {id}</p>
      </PropertyDetail>

      <BookingForm onSubmit={handleBooking}>
        <h3>Create a Booking</h3>
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
        <SubmitButton type="submit">Book Now</SubmitButton>
      </BookingForm>
    </PageContainer>
  );
};

export default PropertyDetailsPage;
