// Import necessary React module, styled-components, date picker, types, and utilities.
import React from "react";
import styled from "styled-components";
import DatePickerComponent from "../components/DatePicker";
import { Booking } from "../types/booking";
import moment from "moment";
import { colors } from "../styles/theme";

// Define the props for the BookingFormComponent with detailed types and descriptions.
interface BookingFormComponentProps {
  title: string; // Title of the form.
  buttonText: string; // Text for the form's submit button.
  onSubmit: (
    // Function to handle form submission.
    event: React.FormEvent<HTMLFormElement>,
    startDate: Date | null,
    endDate: Date | null,
    propertyId: number,
    currentBookings: Booking[]
  ) => void;
  startDate: Date | null; // Currently selected start date.
  endDate: Date | null; // Currently selected end date.
  setStartDate: (date: Date | null) => void; // Function to update the start date.
  setEndDate: (date: Date | null) => void; // Function to update the end date.
  propertyId: number; // ID of the property being booked.
  currentBookings: Booking[]; // Array of current bookings.
  propertyPricePerDay: number; // Price per day for the property.
  propertyTaxes: number; // Tax rate for the property.
  ignoredBookingId?: number; // ID of booking to ignore (useful for editing existing bookings).
}

// Styled components for styling various parts of the booking form.
const FormContainer = styled.div`
  width: calc(40% - 60px);

  @media (max-width: 768px) {
    width: calc(100% - 60px);
    padding: 20px 10px;
  }
`;

const BookingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  width: 100%;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PriceItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalPriceItem = styled(PriceItem)`
  border-top: 1px solid lightgray;
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

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const BookedDatesContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: ${colors.lightgray};
  border-radius: 5px;
`;

const BookedDate = styled.div`
  color: black;
  margin-bottom: 5px;
`;

// The BookingFormComponent is responsible for providing a UI to book or edit bookings.
const BookingFormComponent: React.FC<BookingFormComponentProps> = ({
  title,
  buttonText,
  onSubmit,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  propertyId,
  currentBookings,
  propertyPricePerDay,
  propertyTaxes,
  ignoredBookingId,
}) => {
  // Calculate the difference in days between the start and end dates, if both are set.
  const today = new Date();
  const dif =
    endDate && startDate
      ? moment(endDate).diff(moment(startDate), "days")
      : null;

  // Handler for form submission, calls the passed onSubmit function.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e, startDate, endDate, propertyId, currentBookings);
  };

  // Filter bookings for the current property, excluding any booking that should be ignored.
  const propertyBookings = currentBookings.filter(
    (booking) => booking.propertyId === propertyId
  );

  return (
    <FormContainer>
      <BookingForm onSubmit={handleSubmit}>
        <h2>{title}</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <DateContainer>
            Checkin:
            <DatePickerComponent
              minDate={today}
              maxDate={moment(endDate).subtract(1, "days").toDate()}
              selected={startDate}
              onChange={setStartDate}
              shouldCloseOnSelect={true}
            />
          </DateContainer>
          <DateContainer>
            Checkout:
            <DatePickerComponent
              minDate={
                startDate
                  ? moment(startDate).add(1, "days").toDate()
                  : moment(today).add(1, "days").toDate()
              }
              selected={endDate}
              onChange={setEndDate}
              shouldCloseOnSelect={true}
            />
          </DateContainer>
        </div>
        <PriceItem>
          ${propertyPricePerDay} {dif ? ` x ${dif} nights` : ""}
          <strong>{dif ? `$${dif * propertyPricePerDay}` : "---"}</strong>
        </PriceItem>
        <PriceItem>
          Tax price <strong>${propertyTaxes}</strong>
        </PriceItem>
        <TotalPriceItem>
          <h3>Total</h3>
          <strong>
            <h3>
              {dif ? `$${propertyTaxes + dif * propertyPricePerDay}` : "---"}
            </h3>
          </strong>
        </TotalPriceItem>
        <SubmitButton type="submit">{buttonText}</SubmitButton>
        {(propertyBookings.length > 1 ||
          (propertyBookings.length === 1 &&
            propertyBookings[0].id !== ignoredBookingId)) && (
          <BookedDatesContainer>
            <h4>Already Booked Dates:</h4>
            {propertyBookings.map(
              (booking, index) =>
                ignoredBookingId !== booking.id &&
                propertyId === booking?.propertyId && (
                  <BookedDate key={index}>
                    {`${moment(booking.startDate).format("MMMM Do YYYY")} - 
                        ${moment(booking.endDate).format("MMMM Do YYYY")}`}
                  </BookedDate>
                )
            )}
          </BookedDatesContainer>
        )}
      </BookingForm>
    </FormContainer>
  );
};

export default BookingFormComponent;
