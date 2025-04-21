import { useState } from 'react';

interface SheetDBOptions {
  sheet?: string;
}

export interface SheetDBResponse {
  created?: boolean;
  updated?: boolean;
  deleted?: boolean;
  data?: any;
}

export function useSheetDB() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = "https://sheetdb.io/api/v1/j1gquxx0sghmg";

  const getRecords = async (options: SheetDBOptions = {}) => {
    setLoading(true);
    setError(null);

    try {
      const sheetParam = options.sheet ? `/sheet=${options.sheet}` : '';
      const response = await fetch(`${BASE_URL}${sheetParam}`);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      console.error("Failed to fetch records:", err);
      setError(err.message || "Failed to fetch records");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createRecord = async (data: any, options: SheetDBOptions = {}) => {
    setLoading(true);
    setError(null);

    try {
      if (!data.CreatedAt) {
        data.CreatedAt = new Date().toISOString();
      }

      if (options.sheet === 'Customers' && !data.CustomerID) {
        data.CustomerID = `CUST-${Date.now()}`;
      } else if (options.sheet === 'Bookings' && !data.BookingID) {
        data.BookingID = `BOOK-${Date.now()}`;
      } else if (options.sheet === 'Payments' && !data.PaymentID) {
        data.PaymentID = `PAY-${Date.now()}`;
      } else if (options.sheet === 'Appointments' && !data.AppointmentID) {
        data.AppointmentID = `APPT-${Date.now()}`;
      } else if (options.sheet === 'Enquiries' && !data.EnquiryID) {
        data.EnquiryID = `ENQ-${Date.now()}`;
      } else if (options.sheet === 'Plans' && !data.PlanID) {
        data.PlanID = `PLAN-${Date.now()}`;
      }

      const sheetParam = options.sheet ? `/sheet=${options.sheet}` : '';
      const response = await fetch(`${BASE_URL}${sheetParam}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return { created: true, data: result };
    } catch (err: any) {
      console.error("Failed to create record:", err);
      setError(err.message || "Failed to create record");
      return { created: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateRecord = async (id: string, data: any, options: SheetDBOptions = {}) => {
    setLoading(true);
    setError(null);

    try {
      const idField = getIdFieldName(options.sheet);
      const sheetParam = options.sheet ? `/sheet=${options.sheet}` : '';
      const response = await fetch(`${BASE_URL}${sheetParam}/${idField}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return { updated: true, data: result };
    } catch (err: any) {
      console.error("Failed to update record:", err);
      setError(err.message || "Failed to update record");
      return { updated: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id: string, options: SheetDBOptions = {}) => {
    setLoading(true);
    setError(null);

    try {
      const idField = getIdFieldName(options.sheet);
      const sheetParam = options.sheet ? `/sheet=${options.sheet}` : '';
      const response = await fetch(`${BASE_URL}${sheetParam}/${idField}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return { deleted: true, data: result };
    } catch (err: any) {
      console.error("Failed to delete record:", err);
      setError(err.message || "Failed to delete record");
      return { deleted: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const getIdFieldName = (sheet?: string): string => {
    switch (sheet) {
      case 'Customers':
        return 'CustomerID';
      case 'Bookings':
        return 'BookingID';
      case 'Payments':
        return 'PaymentID';
      case 'Appointments':
        return 'AppointmentID';
      case 'Enquiries':
        return 'EnquiryID';
      case 'Plans':
        return 'PlanID';
      default:
        return 'id';
    }
  };

  return {
    getRecords,
    createRecord,
    updateRecord,
    deleteRecord,
    loading,
    error
  };
}
