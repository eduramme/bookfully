import DatePickerComponent from "../components/DatePciker";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { PageTitle } from "../components/PageTitle";
import styled from "styled-components";

interface Booking {
  id: number;
  startDate: string; // ISO date string format (e.g., "2023-01-01")
  endDate: string;
  propertyId: number;
}

const bookings: Booking[] = [
  {
    id: 1,
    startDate: "2023-12-20",
    endDate: "2023-12-27",
    propertyId: 101,
  },
  {
    id: 2,
    startDate: "2023-12-15",
    endDate: "2023-12-22",
    propertyId: 102,
  },
];

const BookingList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BookingCard = styled.li`
  background-color: white;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
`;

const BookingInfo = styled.div`
  /* Add styles for your booking info such as layout, spacing, typography */
`;

const BookingsPage: React.FC = () => {
  const handleBookingClick = (bookingId: number) => {
    console.log("Clicked booking with ID:", bookingId);
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Bookings</PageTitle>
      </PageHeader>
      <BookingList>
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            onClick={() => handleBookingClick(booking.id)}
          >
            <BookingInfo>
              <div>Booking ID: {booking.id}</div>
              <div>Start Date: {booking.startDate}</div>
              <div>End Date: {booking.endDate}</div>
              <div>Property ID: {booking.propertyId}</div>
            </BookingInfo>
          </BookingCard>
        ))}
      </BookingList>
      <DatePickerComponent />
    </PageContainer>
  );
};

export default BookingsPage;
