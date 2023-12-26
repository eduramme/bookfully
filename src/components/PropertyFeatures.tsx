import { styled } from "styled-components";

const PropertyFeaturesContainer = styled.div`
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

const DetailText = styled.p`
  color: gray;
  margin: 0;
`;

interface PropertyFeaturesProps {
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

export const PropertyFeatures = ({
  maxGuests,
  bedrooms,
  beds,
  bathrooms,
}: PropertyFeaturesProps) => {
  return (
    <PropertyFeaturesContainer>
      <DetailText>
        <strong>{maxGuests} Guests</strong>
      </DetailText>
      -
      <DetailText>
        <strong>{bedrooms} Bedrooms</strong>
      </DetailText>
      -
      <DetailText>
        <strong>{beds} Beds</strong>
      </DetailText>
      -
      <DetailText>
        <strong>{bathrooms} Bathrooms</strong>
      </DetailText>
    </PropertyFeaturesContainer>
  );
};
