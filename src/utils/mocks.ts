import { Booking } from "../types/booking";

export interface Property {
  id: number; // Unique identifier for the property
  name: string; // Descriptive name of the property
  description: string; // Detailed information about the property
  pricePerDay: number; // Base cost per day
  taxes: number; // Additional taxes for the property (could also be a percentage)
  address: string; // Full address of the property
  maxGuests: number; // Maximum number of guests allowed
  bedrooms: number; // Number of bedrooms
  beds: number; // Number of beds
  bathrooms: number; // Number of bathrooms
  amenities: string[]; // List of amenities (e.g., WiFi, air conditioning)
  houseRules: string[]; // List of house rules (e.g., no smoking, no pets)
  imageUrls: string[]; // Array of image URLs for the property
}

export const mockProperties: Property[] = [
  {
    id: 2,
    name: "Cozy Villa",
    description:
      "Cozy Villa offers a stunning blend of comfort and style. Featuring spacious rooms with modern decor, each area is designed to provide an inviting atmosphere. Enjoy the fully equipped kitchen, luxurious bathrooms, and cozy bedrooms. Perfect for families or groups seeking a memorable stay.",
    pricePerDay: 235,
    taxes: 22.63,
    address: "1859 Pine Ln",
    maxGuests: 5,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    amenities: [
      "Private Entrance",
      "Kitchen",
      "TV",
      "Heating",
      "WiFi",
      "Air Conditioning",
    ],
    houseRules: ["No pets", "No parties or events"],
    imageUrls: [
      "https://a0.muscache.com/im/pictures/6fa84be7-aefd-4fa3-90d6-a6b99081fdd8.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/0b4e44b1-d684-43a3-b33c-db2e90790069.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/bb5c5984-3703-40e3-a47b-dfec5d84063d.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/0d018781-4dad-4640-aea0-893020d60735.jpg?im_w=1200",
    ],
  },
  {
    id: 3,
    name: "Luxury Condo",
    description:
      "Luxury Condo offers a stunning blend of comfort and style. Featuring spacious rooms with modern decor, each area is designed to provide an inviting atmosphere. Enjoy the fully equipped kitchen, luxurious bathrooms, and cozy bedrooms. Perfect for families or groups seeking a memorable stay.",
    pricePerDay: 160,
    taxes: 22.83,
    address: "6072 Pine Ln",
    maxGuests: 5,
    bedrooms: 3,
    beds: 2,
    bathrooms: 1,
    amenities: [
      "TV",
      "Air Conditioning",
      "Kitchen",
      "Private Entrance",
      "Washer",
      "WiFi",
      "Heating",
    ],
    houseRules: [
      "No smoking",
      "Check out by 11AM",
      "No pets",
      "Check-in is anytime after 3PM",
      "No parties or events",
    ],
    imageUrls: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-46695796/original/a0965aa5-3907-466e-b727-0900e2a7e8c7.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-46695796/original/9bd67185-dc83-4473-a191-9486c62aec66.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/f58c28d5-52d5-4c58-928e-ef00bf7164a3.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-46695796/original/088a6251-1a8c-459c-9f14-6d131fdb1a68.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-46695796/original/6d9909f6-2e1f-4008-af8b-7415d5dfcf1d.jpeg?im_w=1200",
    ],
  },
  {
    id: 4,
    name: "Charming Bungalow",
    description:
      "Charming Bungalow is a delightful retreat with an enchanting garden view. This quaint space features elegant furnishings, a comfortable living area, and a serene bedroom setting. It's the perfect spot for a peaceful and intimate getaway. Enjoy the charm and comfort in every corner.",
    pricePerDay: 195,
    taxes: 18.45,
    address: "442 Maple St",
    maxGuests: 4,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    amenities: ["Garden", "Patio", "WiFi", "Heating"],
    houseRules: ["No smoking", "No pets", "No parties or events"],
    imageUrls: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-41504128/original/57abdcb0-ab9e-4947-9649-dca81117c995.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-41504128/original/05aa766a-0ed3-4fca-87e3-9455e3a9ef21.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-41504128/original/75a0cf43-6075-40e1-993e-e781a1fdab5d.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-41504128/original/117dacea-ce58-402e-bbf9-2ed82d89ab03.jpeg?im_w=1200",
    ],
  },
  {
    id: 5,
    name: "Urban Chic Loft",
    description:
      "Urban Chic Loft stands out with its contemporary design and vibrant city views. This loft offers a sleek, modern kitchen, a spacious living area, and a cozy bedroom loft. It's the perfect blend of comfort and style, ideal for those who love urban living and wish to explore the city.",
    pricePerDay: 210,
    taxes: 20.1,
    address: "588 9th Ave",
    maxGuests: 3,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: ["City View", "Elevator", "WiFi", "Air Conditioning"],
    houseRules: ["No pets", "Check-in is anytime after 3PM"],
    imageUrls: [
      "https://a0.muscache.com/im/pictures/9e2994b7-6b69-4822-b538-b2ab31e34a99.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-39422678/original/d9b929e2-ede6-475e-96d2-12af0bdbc52c.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-39422678/original/57fc93a8-3275-4760-a226-f5b2273b4211.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/d34ae6a3-99ab-46c0-9c58-025aaed5c010.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/c7ef5161-8de7-4bb0-92d7-001587927279.jpg?im_w=720",
    ],
  },
  {
    id: 6,
    name: "Beachfront Getaway",
    description:
      "Beachfront Getaway offers an unforgettable experience with its stunning ocean views and direct beach access. This property features a spacious deck, open-concept living space, and comfortable, airy bedrooms. It's the perfect place for a relaxing vacation by the sea, where the waves are just steps away.",
    pricePerDay: 250,
    taxes: 25.0,
    address: "101 Ocean Blvd",
    maxGuests: 6,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    amenities: ["Beach Access", "Deck", "Grill", "WiFi"],
    houseRules: [
      "No smoking",
      "No parties or events",
      "Pets allowed with restrictions",
    ],
    imageUrls: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-41102670/original/466bc444-eacd-4731-89c4-f4a496503487.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/7b339a9d-5af8-4a8d-897d-748b59d22d00.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/bf76266d-1485-4877-911e-36507aeb1cf8.jpg?im_w=720",
    ],
  },
  {
    id: 7,
    name: "Rustic Studio",
    description:
      "Rustic Studio offers a stunning blend of comfort and style. Featuring spacious rooms with modern decor, each area is designed to provide an inviting atmosphere. Enjoy the fully equipped kitchen, luxurious bathrooms, and cozy bedrooms. Perfect for families or groups seeking a memorable stay.",
    pricePerDay: 226,
    taxes: 22.3,
    address: "9274 Sunset Blvd",
    maxGuests: 5,
    bedrooms: 2,
    beds: 4,
    bathrooms: 2,
    amenities: ["WiFi", "Private Entrance", "Kitchen"],
    houseRules: ["No smoking"],
    imageUrls: [
      "https://a0.muscache.com/im/pictures/bca7e413-4d96-48b3-8ed6-e35d2b8c7c25.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/fb1780e2-ae28-4bc2-83cc-ec222afd1f78.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/c0c73cbd-694c-4f15-9970-03dea6ae45de.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/8380c745-9cfb-492c-b5fe-14fe8ca102a2.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/57e9de9d-2961-4f11-b3db-564248f8c11a.jpg?im_w=720",
    ],
  },
];

export const mockedBooking1: Booking = {
  id: 1,
  startDate: "2023-12-20",
  endDate: "2023-12-25",
  propertyId: 101,
};
export const mockedBooking2: Booking = {
  id: 2,
  startDate: "2024-01-15",
  endDate: "2024-01-20",
  propertyId: 102,
};
export const mockedBooking3: Booking = {
  id: 3,
  startDate: "2023-12-27",
  endDate: "2023-12-30",
  propertyId: 101,
};

export const mockBookings: Booking[] = [
  mockedBooking1,
  mockedBooking2,
  mockedBooking3,
];
