import styled from "styled-components";
import { colors } from "./../styles/theme.ts";
import { PageContainer } from "../components/PageContainer.tsx";
import { PageHeader } from "../components/PageHeader.tsx";
import { PageTitle } from "../components/PageTitle.tsx";
import { useNavigate } from "react-router-dom";

const BookingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const BookingCard = styled.div`
  background: ${colors.card};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }
`;

const BookingInfo = styled.div`
  padding: 20px;
`;

const BookingName = styled.h2`
  margin: 0 0 10px 0;
  color: ${colors.text};
`;

const BookingDate = styled.div`
  color: ${colors.text};
  font-size: 0.9rem;
`;

// Sample data for bookings
const properties = [
  { id: 1, name: "Ocean View Apartment", date: "2023-12-24" },
  { id: 2, name: "Cozy Mountain Cabin", date: "2023-12-25" },
  { id: 3, name: "Safe House Apartment", date: "2023-12-25" },
];

function PropertiesPage() {
  const navigate = useNavigate();

  const goToPropertiesDetails = (propertyId: number) => {
    navigate(`/properties/${propertyId}`);
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Properties</PageTitle>
      </PageHeader>
      <BookingGrid>
        {properties.map((property) => (
          <BookingCard
            key={property.id}
            onClick={() => goToPropertiesDetails(property.id)}
          >
            <BookingInfo>
              <BookingName>{property.name}</BookingName>
              <BookingDate>{property.date}</BookingDate>
              <BookingDate>id: {property.id}</BookingDate>
            </BookingInfo>
          </BookingCard>
        ))}
      </BookingGrid>
    </PageContainer>
  );
}

export default PropertiesPage;
