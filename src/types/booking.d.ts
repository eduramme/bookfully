export interface Booking {
  id: number;
  startDate: string;
  endDate: string;
  propertyId: number;
}

export interface BookingsState {
  bookings: Booking[];
  editLoading: boolean;
  editError: string | null;
}
