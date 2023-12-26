import styled from "styled-components";
import { colors } from "./../styles/theme.ts";
import { PageTitle } from "./PageTitle.tsx";

const Container = styled.header`
  color: ${colors.primary};
  margin-bottom: 20px;
  text-align: left;
`;

interface BookingDetailsProps {
  title: string;
}

export const BookingDetails = ({ title }: BookingDetailsProps) => {
  return (
    <Container>
      <PageTitle>{title}</PageTitle>
    </Container>
  );
};
