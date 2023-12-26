import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { PageTitle } from "../components/PageTitle";
import styled from "styled-components";
import DatePickerComponent from "../components/DatePicker";
import { colors } from "../styles/theme";
import { useDispatch } from "react-redux";
import { addBooking } from "../features/bookings/bookingsSlice";
import { properties } from "../utils/properties";
import moment from "moment";
import toast from "react-hot-toast";
import { Booking } from "../types/booking";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const notify = () => {
  toast.success("Booking created successfully (:", {
    style: {
      border: "1px solid green",
      padding: "16px",
      color: "green",
    },
    iconTheme: {
      primary: "green",
      secondary: "#FFFAEE",
    },
  });
};

const notifyError = (message: string) =>
  toast.error(message || "Booking could not be created.");

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

const FormContainer = styled.div`
  width: calc(40% - 60px);

  @media (max-width: 768px) {
    width: calc(100% - 60px);
    padding: 20px 10px;
  }
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

const PropertyDetail = styled.div`
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DetailItem = styled.div`
  margin-bottom: 10px;
`;

const PriceItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailText = styled.p`
  color: gray;
  margin: 0;
`;

const AmenitiesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AmenityItem = styled.li`
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 15px;
  background: ${colors.lightgray};
  padding: 5px 10px;
  border-radius: 15px;
`;

const ContentContainer = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const PropertyFeaturesContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0.9em;
  color: #333;

  @media (max-width: 768px) {
    margin-top: 20px;
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

const HouseRulesList = styled(AmenitiesList)``;
const HouseRuleItem = styled(AmenityItem)``;

const ImageGallery = styled.div`
  display: flex;
  overflow-x: auto;
  margin-top: 20px;

  &::-webkit-scrollbar {
    height: 6px; // Adjust the height of the scrollbar
  }

  &::-webkit-scrollbar-track {
    background: ${colors.lightgray}; // Use a light color that matches your theme
    border-radius: 10px; // Optional: round the corners of the track
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.primary}; // Use a color that matches your primary theme
    border-radius: 10px; // Optional: round the corners of the thumb

    &:hover {
      background: darken(
        ${colors.primary},
        10%
      ); // Slightly darken the thumb on hover
    }
  }
`;

const PropertyImage = styled.img`
  height: 200px;
  margin-right: 10px;
  border-radius: 8px;
`;

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const currentBookings = useSelector(
    (state: RootState) => state.bookings.bookings
  );

  const isDateConflicting = (
    newStartDate: moment.Moment,
    newEndDate: moment.Moment
  ) => {
    return currentBookings.some((booking: Booking) => {
      const existingStart = moment(booking.startDate);
      const existingEnd = moment(booking.endDate);
      return (
        newStartDate.isBefore(existingEnd, "day") &&
        newEndDate.isAfter(existingStart, "day") &&
        booking.propertyId === parseInt(id || "0")
      );
    });
  };

  const propertyBookings = currentBookings.filter(
    (booking: Booking) => booking.propertyId === parseInt(id || "0")
  );

  const handleBooking = (event: React.FormEvent) => {
    event.preventDefault();
    if (startDate && endDate && id) {
      const checkin = moment(startDate);
      const checkout = moment(endDate);

      if (!isDateConflicting(checkin, checkout)) {
        try {
          dispatch(
            addBooking({
              id: Date.now(),
              startDate: checkin.toISOString(),
              endDate: checkout.toISOString(),
              propertyId: parseInt(id),
            })
          );
          notify();
          navigate("/");
        } catch (error) {
          console.error("Failed to update booking.", error);
          notifyError(
            typeof error === "string" ? error : "An unexpected error occurred."
          );
        }
      } else {
        notifyError("Selected dates are already booked for this property.");
      }
    } else {
      console.error("Missing start date, end date, or property ID");
      notifyError("Please ensure all fields are filled correctly.");
    }
  };

  const today = new Date();

  const property = properties.filter(
    (prop) => prop.id === parseInt(id ?? "0")
  )[0];

  const checkin = moment(startDate);
  const checkout = moment(endDate);
  const dif = checkout.diff(checkin, "days");

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>{property.name}</PageTitle>
      </PageHeader>

      <PropertyDetail>
        <ImageGallery>
          {property.imageUrls.map((url, index) => (
            <PropertyImage
              key={index}
              src={url}
              alt={`Property Image ${index + 1}`}
            />
          ))}
        </ImageGallery>
        <ContentContainer>
          <TextContainer>
            <PropertyFeaturesContainer>
              <DetailText>
                <strong>{property.maxGuests} Guests</strong>
              </DetailText>
              -
              <DetailText>
                <strong>{property.bedrooms} Bedrooms</strong>
              </DetailText>
              -
              <DetailText>
                <strong>{property.beds} Beds</strong>
              </DetailText>
              -
              <DetailText>
                <strong>{property.bathrooms} Bathrooms</strong>
              </DetailText>
            </PropertyFeaturesContainer>

            <h2>Property Details</h2>
            <DetailItem>{property.description}</DetailItem>
            <DetailItem>
              <strong>Price Per Day:</strong> ${property.pricePerDay.toFixed(2)}
            </DetailItem>
            <DetailItem>
              <strong>Taxes:</strong> ${property.taxes.toFixed(2)}
            </DetailItem>
            <DetailItem>
              <strong>Address:</strong> {property.address}
            </DetailItem>
            <DetailItem>
              <strong>Amenities:</strong>
              <AmenitiesList>
                {property.amenities.map((amenity, index) => (
                  <AmenityItem key={index}>{amenity}</AmenityItem>
                ))}
              </AmenitiesList>
            </DetailItem>
            <DetailItem>
              <strong>House Rules:</strong>
              <HouseRulesList>
                {property.houseRules.map((rule, index) => (
                  <HouseRuleItem key={index}>{rule}</HouseRuleItem>
                ))}
              </HouseRulesList>
            </DetailItem>
          </TextContainer>
          <FormContainer>
            <BookingForm onSubmit={handleBooking}>
              <h2>${property.pricePerDay} night</h2>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                }}
              >
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
                  ${property.pricePerDay} {dif ? " x " + dif + " nights" : ""}
                </strong>
                {dif ? "$" + dif * property.pricePerDay : "---"}
              </PriceItem>
              <PriceItem>
                <strong>Tax price</strong>
                {property.taxes}
              </PriceItem>
              <PriceItem>
                <strong>Total</strong>
                <strong>
                  {dif ? property.taxes + dif * property.pricePerDay : "---"}
                </strong>
              </PriceItem>
              <SubmitButton type="submit">Book Now</SubmitButton>
              {propertyBookings.length > 0 && (
                <BookedDatesContainer>
                  <h4>Already Booked Dates:</h4>
                  {propertyBookings.map((booking, index) => (
                    <BookedDate key={index}>
                      {moment(booking.startDate).format("MMMM Do YYYY")} -{" "}
                      {moment(booking.endDate).format("MMMM Do YYYY")}
                    </BookedDate>
                  ))}
                </BookedDatesContainer>
              )}
            </BookingForm>
          </FormContainer>
        </ContentContainer>
      </PropertyDetail>
    </PageContainer>
  );
};

export default PropertyDetailsPage;
