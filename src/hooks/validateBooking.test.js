import { describe, it, expect, vi } from 'vitest';
import moment from 'moment';
import { isDateConflicting } from "../utils/utils";
import { validateBooking } from "./bookingValidation";

// Mock the isDateConflicting function
vi.mock("../utils/utils", () => ({
    isDateConflicting: vi.fn(),
}));

describe("validateBooking", () => {
    const today = new Date();
    const tomorrow = moment(today).add(1, 'days').toDate();
    const dayAfterTomorrow = moment(today).add(2, 'days').toDate();

    it("should validate when all conditions are met", () => {
        isDateConflicting.mockReturnValue(false); // Mocking to assume no date conflict
        const result = validateBooking(today, dayAfterTomorrow, 1, [], undefined);
        expect(result.isValid).toBe(true);
    });

    it("should invalidate if fields are missing or incorrect", () => {
        let result = validateBooking(null, null, -1, [], undefined);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe("Please ensure all fields are filled correctly.");
    });

    it("should invalidate if the start date is before today", () => {
        const yesterday = moment(today).subtract(1, 'days').toDate();
        isDateConflicting.mockReturnValue(false);
        const result = validateBooking(yesterday, tomorrow, 1, [], undefined);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe("The start date cannot be before today.");
    });

    it("should invalidate if the end date is not at least one day after the start date", () => {
        isDateConflicting.mockReturnValue(false);
        const result = validateBooking(today, today, 1, [], undefined);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe("The end date must be at least one day after the start date.");
    });

    it("should invalidate if the selected dates are already booked", () => {
        isDateConflicting.mockReturnValue(true);
        const result = validateBooking(today, dayAfterTomorrow, 1, [], undefined);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe("Selected dates are already booked.");
    });

    it("should invalidate if the propertyId is less than or equal to 0", () => {
        isDateConflicting.mockReturnValue(false);
        const result = validateBooking(today, dayAfterTomorrow, 0, [], undefined);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe("Please ensure all fields are filled correctly.");
    });

    it("should handle different date input formats correctly", () => {
        isDateConflicting.mockReturnValue(false);
        const dateString = "2024-01-01";
        const result = validateBooking(new Date(dateString), new Date(dateString), 1, [], undefined);
        expect(result.isValid).toBe(false); // Because start and end are the same
    });

    it("should invalidate if the booking ends when another starts", () => {
        isDateConflicting.mockReturnValue(true);
        const result = validateBooking(today, tomorrow, 1, [{ startDate: tomorrow, endDate: dayAfterTomorrow }], undefined);
        expect(result.isValid).toBe(false);
    });

    it("should validate correctly when bookingId is undefined", () => {
        isDateConflicting.mockReturnValue(false);
        const result = validateBooking(today, dayAfterTomorrow, 1, [], undefined);
        expect(result.isValid).toBe(true);
    });

    it("should handle large date ranges", () => {
        isDateConflicting.mockReturnValue(false);
        const farFutureDate = moment(today).add(10, 'years').toDate();
        const result = validateBooking(today, farFutureDate, 1, [], undefined);
        expect(result.isValid).toBe(true);
    });

    it("should validate correctly at the boundary of midnight", () => {
        isDateConflicting.mockReturnValue(false);
        const endOfDay = moment(today).endOf('day').toDate();
        const result = validateBooking(today, endOfDay, 1, [], undefined);
        expect(result.isValid).toBe(false);
    });

    it("should invalidate if the dates are not valid", () => {
        isDateConflicting.mockReturnValue(false);
        const result = validateBooking(new Date("invalid date"), new Date("invalid date"), 1, [], undefined);
        expect(result.isValid).toBe(false);
    });

});
