import { describe, expect, it, test } from "vitest";
import { calculateTotalPrice, isDateConflicting } from "./utils";
import moment from "moment";
import { Booking } from "../types/booking";

const mockBookings: Booking[] = [
  {
    id: 1,
    startDate: "2023-12-20",
    endDate: "2023-12-25",
    propertyId: 101,
  },
  {
    id: 2,
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    propertyId: 102,
  },
  {
    id: 3,
    startDate: "2023-12-27",
    endDate: "2023-12-30",
    propertyId: 101,
  },
];

describe("isDateConflicting", () => {
  it("should return true for overlapping dates", () => {
    const currentBookings = mockBookings;
    const newStartDate = moment("2023-12-24");
    const newEndDate = moment("2023-12-28");
    const propertyId = 101;
    expect(
      isDateConflicting(newStartDate, newEndDate, currentBookings, propertyId)
    ).toBe(true);
  });

  it("should return false for no overlapping dates", () => {
    const currentBookings = mockBookings;
    const newStartDate = moment("2024-01-15");
    const newEndDate = moment("2024-01-20");
    const propertyId = 101;
    expect(
      isDateConflicting(newStartDate, newEndDate, currentBookings, propertyId)
    ).toBe(false);
  });

  it("should return false for almost overlapping dates", () => {
    const currentBookings = mockBookings;
    const newStartDate = moment("2023-12-19");
    const newEndDate = moment("2023-12-20");
    const propertyId = 101;
    expect(
      isDateConflicting(newStartDate, newEndDate, currentBookings, propertyId)
    ).toBe(false);
  });

  it("should return true for overlapping date by 1 day", () => {
    const currentBookings = mockBookings;
    const newStartDate = moment("2023-12-19");
    const newEndDate = moment("2023-12-21");
    const propertyId = 101;
    expect(
      isDateConflicting(newStartDate, newEndDate, currentBookings, propertyId)
    ).toBe(true);
  });
});

test("adds 1 + 2 to equal 3", () => {
  expect(calculateTotalPrice(3, 200, 20)).toBe(620);
});
