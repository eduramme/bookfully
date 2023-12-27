import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "../../components/PageContainer";
import { PageHeader } from "../../components/PageHeader";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { mockProperties } from "../../utils/mocks";
import { useBookingProcess } from "../../hooks/useBookingProcess";
import { PropertyFeatures } from "../../components/PropertyFeatures";
import PropertyDetailComponent from "../../components/PropertyDetailComponent";
import BookingFormComponent from "../../components/BookingFormComponent";
import { formatDisplayDate } from "../../utils/utils";

const PropertyDetail = styled.div`
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PropertyImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;

const ContentContainer = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
  }
`;

const PropertyContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PreviousBookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid lightgray;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const BookingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const booking = useSelector((state: RootState) =>
    state.bookings.bookings.find((b) => b.id === parseInt(id || "0"))
  );

  const [property, setProperty] = useState(
    mockProperties.find((p) => p.id === booking?.propertyId)
  );

  const currentBookings = useSelector(
    (state: RootState) => state.bookings.bookings
  );

  useEffect(() => {
    if (!booking) {
      navigate("/404");
    } else {
      setStartDate(new Date(booking.startDate));
      setEndDate(new Date(booking.endDate));
      setProperty(mockProperties.find((p) => p.id === booking?.propertyId));
    }
  }, [booking, navigate]);

  const { editBooking } = useBookingProcess();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (booking && startDate && endDate) {
      editBooking(
        event,
        booking,
        startDate,
        endDate,
        booking.propertyId,
        currentBookings
      );
    } else {
      console.error("No booking found with the specified ID");
    }
  };

  return (
    <PageContainer>
      <PageHeader title={`Booking ${id}`} />

      {property && booking && (
        <>
          <PropertyDetail>
            <PropertyImage
              src={property.imageUrls[0] || "defaultImage.jpg"}
              alt={property.name}
            />

            <ContentContainer>
              <PropertyContentContainer>
                <PreviousBookingContainer>
                  <h2>Booking details</h2>
                  <p>Checkin: {formatDisplayDate(booking?.startDate)}</p>
                  <p>Checkout: {formatDisplayDate(booking?.endDate)}</p>
                </PreviousBookingContainer>

                <PropertyFeatures
                  maxGuests={property.maxGuests}
                  bedrooms={property.bedrooms}
                  beds={property.beds}
                  bathrooms={property.bathrooms}
                />
                <PropertyDetailComponent
                  description={property.description}
                  pricePerDay={property.pricePerDay}
                  taxes={property.taxes}
                  address={property.address}
                  amenities={property.amenities}
                  houseRules={property.houseRules}
                />
              </PropertyContentContainer>
              <BookingFormComponent
                title="Edit Booking"
                buttonText="Edit Booking"
                onSubmit={handleSubmit}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                propertyId={property.id}
                currentBookings={currentBookings}
                propertyPricePerDay={property.pricePerDay}
                propertyTaxes={property.taxes}
                ignoredBookingId={booking?.id}
              />
            </ContentContainer>
          </PropertyDetail>
        </>
      )}
    </PageContainer>
  );
};

export default BookingDetailsPage;
