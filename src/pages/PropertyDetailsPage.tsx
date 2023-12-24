import DatePickerComponent from "../components/DatePciker";
import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { PageTitle } from "../components/PageTitle";
import { useParams } from "react-router-dom";

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams();

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Property {id}</PageTitle>
      </PageHeader>

      <DatePickerComponent />
    </PageContainer>
  );
};

export default PropertyDetailsPage;
