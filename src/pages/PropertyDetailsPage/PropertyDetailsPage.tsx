// Import necessary modules and components from React, Redux, and local files.
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

// Import UI components and styles.
import { PageContainer } from "../../components/PageContainer";
import { PageHeader } from "../../components/PageHeader";
import { PropertyFeatures } from "../../components/PropertyFeatures";
import BookingFormComponent from "../../components/BookingFormComponent";
import PropertyDetailComponent from "../../components/PropertyDetailComponent";
import { colors } from "../../styles/theme";

// Import utilities and custom hooks.
import { mockProperties } from "../../utils/mocks";
import { RootState } from "../../store";
import { useBookingProcess } from "../../hooks/useBookingProcess";

// Styled component for property details section with responsive design.
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

// Styled component for the content container holding property details and booking form.
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

// Styled component for the container specifically holding property content.
const PropertyContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Styled component for the property features container.
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

// Styled component for the image gallery with custom scrollbar.
const ImageGallery = styled.div`
  display: flex;
  overflow-x: auto;
  margin-top: 20px;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.lightgray};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.primary};
    border-radius: 10px;

    &:hover {
      background: darken(${colors.primary}, 10%);
    }
  }
`;

// Styled component for individual property images.
const PropertyImage = styled.img`
  height: 200px;
  margin-right: 10px;
  border-radius: 8px;
`;

// The PropertyDetailsPage component displays detailed information about a specific property.
const PropertyDetailsPage: React.FC = () => {
  // Retrieve the property ID from the URL parameters.
  const propertyId = parseInt(useParams().id || "0");

  // State hooks for managing booking date range.
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Redux selector to access the current bookings from the store.
  const currentBookings = useSelector(
    (state: RootState) => state.bookings.bookings
  );

  // Custom hook to handle the booking process.
  const bookingProcess = useBookingProcess();

  // Retrieve the specific property details using the property ID.
  const property = mockProperties.filter((prop) => prop.id === propertyId)[0];

  return (
    <PageContainer>
      <PageHeader title={property.name} />

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
          <PropertyContentContainer>
            <PropertyFeatures
              maxGuests={property.maxGuests}
              bedrooms={property.bedrooms}
              beds={property.beds}
              bathrooms={property.bathrooms}
            />
            <PropertyDetailComponent
              description={property.description}
              pricePerDay={property.pricePerDay}
              taxes={property.taxes}
              address={property.address}
              amenities={property.amenities}
              houseRules={property.houseRules}
            />
          </PropertyContentContainer>
          <BookingFormComponent
            title={`$${property.pricePerDay} night`}
            buttonText="Book Now"
            onSubmit={bookingProcess.createBooking}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            propertyId={propertyId}
            currentBookings={currentBookings}
            propertyPricePerDay={property.pricePerDay}
            propertyTaxes={property.taxes}
          />
        </ContentContainer>
      </PropertyDetail>
    </PageContainer>
  );
};

export default PropertyDetailsPage;
