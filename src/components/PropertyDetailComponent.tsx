import React from "react";
import styled from "styled-components";
import { colors } from "../styles/theme";

interface PropertyDetailProps {
  description: string;
  pricePerDay: number;
  taxes: number;
  address: string;
  amenities: string[];
  houseRules: string[];
}

const DetailSection = styled.section``;

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

const PropertyDetailComponent: React.FC<PropertyDetailProps> = ({
  description,
  pricePerDay,
  taxes,
  address,
  amenities,
  houseRules,
}) => {
  return (
    <DetailSection>
      <h2>Property Details</h2>
      <DetailItem>{description}</DetailItem>
      <DetailItem>
        <strong>Price Per Day:</strong> ${pricePerDay.toFixed(2)}
      </DetailItem>
      <DetailItem>
        <strong>Taxes:</strong> ${taxes.toFixed(2)}
      </DetailItem>
      <DetailItem>
        <strong>Address:</strong> {address}
      </DetailItem>
      <DetailItem>
        <strong>Amenities:</strong>
        <AmenitiesList>
          {amenities.map((amenity, index) => (
            <AmenityItem key={index}>{amenity}</AmenityItem>
          ))}
        </AmenitiesList>
      </DetailItem>
      <DetailItem>
        <strong>House Rules:</strong>
        <HouseRulesList>
          {houseRules.map((rule, index) => (
            <HouseRuleItem key={index}>{rule}</HouseRuleItem>
          ))}
        </HouseRulesList>
      </DetailItem>
    </DetailSection>
  );
};

export default PropertyDetailComponent;
