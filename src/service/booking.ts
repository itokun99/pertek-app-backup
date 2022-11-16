import { ApiProxyEndpoint } from "../config/apiProxyEndpoint";
import { fetchData } from "../lib/dataFetcher";

export interface ICreateBookingPayload {
  facility_id: string;
  contact_id: string;
  property_unit_id: string;
  assistances: string[];
  description: string;
  price: string;
  penalty: number;
  status: string;
  slot_date: string;
  slot: {
    start: string;
    end: string;
  };
}

export interface IUpdateBookingStatePayload {
  booking_id: number;
  status: string;
}

const BOOKING_URL = ApiProxyEndpoint.Booking;

export async function createBooking(payload: ICreateBookingPayload) {
  const { data, error } = await fetchData<{ message: string }>(BOOKING_URL, {
    body: JSON.stringify(payload),
    method: "POST",
  });

  if (error) {
    throw error;
  }

  return data;
}

// create function to cancel a facility booking
export async function cancleBooking(payload: ICreateBookingPayload) {
  const { data, error } = await fetchData<{ message: string }>(BOOKING_URL, {
    body: JSON.stringify(payload),
    method: "PUT",
  });

  if (error) {
    throw error;
  }

  return data;
}

// create function to update the booking
export async function updateBooking(id: number, payload: ICreateBookingPayload) {
  const { data, error } = await fetchData<{ message: string }>(BOOKING_URL, {
    body: JSON.stringify(payload),
    method: "PUT",
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function updateBookingState(id: number, payload: IUpdateBookingStatePayload) {
  const { data, error } = await fetchData<{ message: string }>(`${BOOKING_URL}?status`, {
    body: JSON.stringify(payload),
    method: "PUT",
  });

  if (error) {
    throw error;
  }

  return data;
}

// create function to get facility booking
export async function getBooking(payload: ICreateBookingPayload) {
  const { data, error } = await fetchData<{ message: string }>(BOOKING_URL, {
    body: JSON.stringify(payload),
    method: "GET",
  });

  if (error) {
    throw error;
  }

  return data;
}

// create function to delete booking
export async function deleteBooking(id: number) {
  const { data, error } = await fetchData<{ message: string }>(`${BOOKING_URL}?id=${id}`, {
    method: "DELETE",
  });

  if (error) {
    throw error;
  }

  return data;
}
