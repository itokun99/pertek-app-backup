import { ApiProxyEndpoint } from '../config/apiProxyEndpoint';
import { fetchData } from '../lib/dataFetcher';

export interface ICreateBookingPayload {
  facility_id: number;
  facility_category_id: number;
  tenant_profile_id: number;
  property_id: number;
  property_unit_id: number;
  duration: number;
  facility_assistance_id?: number[];
  description?: string;
  slot_date: Date;
}

const BOOKING_URL = ApiProxyEndpoint.Booking;

export async function createBooking(payload: ICreateBookingPayload) {
  const { data, error } = await fetchData<{ message: string }>(BOOKING_URL, {
    body: JSON.stringify(payload),
    method: 'POST',
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
    method: 'PUT',
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
    method: 'PUT',
  });
}

// create function to get facility booking
export async function getBooking(payload: ICreateBookingPayload) {
  const { data, error } = await fetchData<{ message: string }>(BOOKING_URL, {
    body: JSON.stringify(payload),
    method: 'GET',
  });

  if (error) {
    throw error;
  }

  return data;
}

// create function to delete booking
export async function deleteBooking(id: number) {
  const { data, error } = await fetchData<{ message: string }>(BOOKING_URL, {
    method: 'DELETE',
  });

  if (error) {
    throw error;
  }

  return data;
}
