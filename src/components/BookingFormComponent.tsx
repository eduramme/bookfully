import React from "react";
import styled from "styled-components";
import DatePickerComponent from "../components/DatePicker";
import { Booking } from "../types/booking";
import moment from "moment";
import { colors } from "../styles/theme";

interface BookingFormComponentProps {
  title: string;
  buttonText: string;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    startDate: Date | null,
    endDate: Date | null,
    propertyId: number,
    currentBookings: Booking[]
  ) => void;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  propertyId: number;
  currentBookings: Booking[];
  propertyPricePerDay: number;
  propertyTaxes: number;
  ignoredBookingId?: number;
}

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
  const today = new Date();
  const dif =
    endDate && startDate
      ? moment(endDate).diff(moment(startDate), "days")
      : null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e, startDate, endDate, propertyId, currentBookings);
  };

  const propeyBookings = currentBookings.filter(
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
              maxDate={endDate}
              selected={startDate}
              onChange={setStartDate}
              shouldCloseOnSelect={true}
            />
          </DateContainer>
          <DateContainer>
            Checkout:
            <DatePickerComponent
              minDate={startDate}
              selected={endDate}
              onChange={setEndDate}
              shouldCloseOnSelect={true}
            />
          </DateContainer>
        </div>
        <PriceItem>
          <strong>
            ${propertyPricePerDay} {dif ? ` x ${dif} nights` : ""}
          </strong>
          {dif ? `$${dif * propertyPricePerDay}` : "---"}
        </PriceItem>
        <PriceItem>
          <strong>Tax price</strong>${propertyTaxes}
        </PriceItem>
        <PriceItem>
          <strong>Total</strong>
          <strong>
            {dif ? `$${propertyTaxes + dif * propertyPricePerDay}` : "---"}
          </strong>
        </PriceItem>
        <SubmitButton type="submit">{buttonText}</SubmitButton>
        {propeyBookings.length > 1 ||
          (propeyBookings.length === 1 &&
            propeyBookings[0].id !== ignoredBookingId && (
              <BookedDatesContainer>
                <h4>Already Booked Dates:</h4>
                {propeyBookings.map(
                  (booking, index) =>
                    ignoredBookingId !== booking.id &&
                    propertyId === booking?.propertyId && (
                      <BookedDate key={index}>
                        {moment(booking.startDate).format("MMMM Do YYYY")} -{" "}
                        {moment(booking.endDate).format("MMMM Do YYYY")}
                      </BookedDate>
                    )
                )}
              </BookedDatesContainer>
            ))}
      </BookingForm>
    </FormContainer>
  );
};

export default BookingFormComponent;
