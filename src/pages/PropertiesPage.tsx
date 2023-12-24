import styled from "styled-components";
import { colors } from "./../styles/theme.ts";

const Container = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  color: ${colors.text};
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${colors.background};
`;

const Header = styled.header`
  color: ${colors.primary};
  margin-bottom: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

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

const AppWrapper = styled.div`
  width: 100%;
  background-color: ${colors.background};
  height: 100%;
`;

// Sample data for bookings
const bookings = [
  { id: 1, name: "Ocean View Apartment", date: "2023-12-24" },
  { id: 2, name: "Cozy Mountain Cabin", date: "2023-12-25" },
];

function PropertiesPage() {
  return (
    <AppWrapper>
      <Container>
        <Header>
          <Title>Bookings</Title>
        </Header>
        <BookingGrid>
          {bookings.map((booking) => (
            <BookingCard key={booking.id}>
              <BookingInfo>
                <BookingName>{booking.name}</BookingName>
                <BookingDate>{booking.date}</BookingDate>
              </BookingInfo>
            </BookingCard>
          ))}
        </BookingGrid>
      </Container>
    </AppWrapper>
  );
}

export default PropertiesPage;
