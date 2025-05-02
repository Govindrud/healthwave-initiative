
import { queryClient } from '@/hooks/useFetch';
import { toast } from 'sonner';
import AppConfig from '@/config/app-config';

const API_BASE_URL = AppConfig.api.baseUrl;

// Utility function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `Error ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return response.json();
}

// Generic fetch function with authorization
async function fetchWithAuth<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get token from storage
  const token = localStorage.getItem('auth_token');
  
  // Add authorization header if token exists
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    return handleResponse<T>(response);
  } catch (error) {
    console.error(`API error for ${endpoint}:`, error);
    throw error;
  }
}

// Products
export async function getProducts(category?: string) {
  const queryParams = category ? `?category=${category}` : '';
  return fetchWithAuth<any[]>(`/products${queryParams}`);
}

export async function getProductById(id: string) {
  return fetchWithAuth<any>(`/products/${id}`);
}

// Doctors
export async function getDoctors(specialty?: string) {
  const queryParams = specialty ? `?specialty=${specialty}` : '';
  return fetchWithAuth<any[]>(`/doctors${queryParams}`);
}

export async function getDoctorById(id: string) {
  return fetchWithAuth<any>(`/doctors/${id}`);
}

// Bookings
export async function createBooking(bookingData: any) {
  return fetchWithAuth<any>('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });
}

export async function getUserBookings() {
  return fetchWithAuth<any[]>('/bookings/user');
}

// Invalidate cache when data changes
export function invalidateProductsCache() {
  queryClient.invalidateQueries({ queryKey: ['products'] });
}

export function invalidateDoctorsCache() {
  queryClient.invalidateQueries({ queryKey: ['doctors'] });
}

export function invalidateBookingsCache() {
  queryClient.invalidateQueries({ queryKey: ['bookings'] });
}

export default {
  getProducts,
  getProductById,
  getDoctors,
  getDoctorById,
  createBooking,
  getUserBookings,
  invalidateProductsCache,
  invalidateDoctorsCache,
  invalidateBookingsCache,
};
