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

const DetailItem = styled.div`
  margin-bottom: 10px;
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

const HouseRulesList = styled(AmenitiesList)``;
const HouseRuleItem = styled(AmenityItem)``;

const ImageGallery = styled.div`
  display: flex;
  overflow-x: auto;
  margin-top: 20px;
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

  const handleBooking = (event: React.FormEvent) => {
    event.preventDefault();
    if (startDate && endDate && id) {
      try {
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
        navigate("/");
      } catch (error) {
        console.log("Failed to update booking.", error);
      }
    } else {
      console.error("Missing start date, end date, or property ID");
    }
  };

  const today = new Date();

  const property = properties.filter(
    (prop) => prop.id === parseInt(id ?? "0")
  )[0];

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
        <h2>Property Details</h2>
        <DetailItem>
          <strong>Description:</strong> {property.description}
        </DetailItem>
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
          <strong>Max Guests:</strong> {property.maxGuests}
        </DetailItem>
        <DetailItem>
          <strong>Bedrooms:</strong> {property.bedrooms}
        </DetailItem>
        <DetailItem>
          <strong>Beds:</strong> {property.beds}
        </DetailItem>
        <DetailItem>
          <strong>Bathrooms:</strong> {property.bathrooms}
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
