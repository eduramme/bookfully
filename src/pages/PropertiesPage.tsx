import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { properties } from "../utils/mocks";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { colors } from "../styles/theme";

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

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

const PropertyImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PropertyInfo = styled.div`
  padding: 20px;
`;

const PropertyName = styled.h2`
  margin: 0 0 10px 0;
  color: ${colors.text};
`;

const PropertyDetails = styled.div`
  color: ${colors.text};
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const PricePerDay = styled.div`
  font-weight: bold;
  color: ${colors.text};
`;

function PropertiesPage() {
  const navigate = useNavigate();

  const goToPropertiesDetails = (propertyId: number) => {
    navigate(`/properties/${propertyId}`);
  };

  return (
    <PageContainer>
      <PageHeader title={"Properties"} />

      <PropertyGrid>
        {properties.map((property) => (
          <PropertyCard
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
}

export default PropertiesPage;
