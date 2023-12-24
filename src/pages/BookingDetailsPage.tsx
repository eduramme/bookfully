import DatePickerComponent from "../components/DatePciker";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { PageTitle } from "../components/PageTitle";

const BookingDetailsPage: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Booking </PageTitle>
      </PageHeader>

      <DatePickerComponent />
    </PageContainer>
  );
};

export default BookingDetailsPage;
