// Import necessary modules and components from styled-components, React Router, and local files.
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { mockProperties } from "../../utils/mocks";
import { PageContainer } from "../../components/PageContainer";
import { PageHeader } from "../../components/PageHeader";
import { colors } from "../../styles/theme";

// Styled component for the grid layout of property cards.
const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

// Styled component for individual property cards with hover effect.
const PropertyCard = styled.div`
  background: ${colors.lightgray};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }
`;

// Styled component for the property image.
const PropertyImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

// Styled component for the section containing property information.
const PropertyInfo = styled.div`
  padding: 20px;
`;

// Styled component for the property name heading.
const PropertyName = styled.h2`
  margin: 0 0 10px 0;
  color: ${colors.text};
`;

// Styled component for additional property details.
const PropertyDetails = styled.div`
  color: ${colors.text};
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

// Styled component for displaying the price per day.
const PricePerDay = styled.div`
  font-weight: bold;
  color: ${colors.text};
`;

// The PropertiesPage component displays a list of properties in a grid layout.
const PropertiesPage = () => {
  const navigate = useNavigate();

  // Function to navigate to the property details page when a property is clicked.
  const goToPropertiesDetails = (propertyId: number) => {
    navigate(`/properties/${propertyId}`);
  };

  return (
    <PageContainer>
      <PageHeader title={"Properties"} />

      <PropertyGrid>
        {mockProperties.map((property) => (
          <PropertyCard
            role="article"
            key={property.id}
            onClick={() => goToPropertiesDetails(property.id)}
          >
            {property.imageUrls[0] && (
              <PropertyImage src={property.imageUrls[0]} alt={property.name} />
            )}
            <PropertyInfo>
              <PropertyName>{property.name}</PropertyName>
              <PropertyDetails>{property.description}</PropertyDetails>
              <PropertyDetails>
                Max Guests: {property.maxGuests}
              </PropertyDetails>
              <PropertyDetails>
                Bedrooms: {property.bedrooms} | Beds: {property.beds} |
                Bathrooms: {property.bathrooms}
              </PropertyDetails>
              <PropertyDetails>Address: {property.address}</PropertyDetails>
              <PricePerDay>
                ${property.pricePerDay.toFixed(2)} / night
              </PricePerDay>
            </PropertyInfo>
          </PropertyCard>
        ))}
      </PropertyGrid>
    </PageContainer>
  );
};

export default PropertiesPage;
