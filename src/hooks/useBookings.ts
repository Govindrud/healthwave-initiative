import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface Booking {
  id: string;
  service_type: string;
  service_name: string;
  booking_date: string;
  booking_time: string | null;
  status: string;
  notes: string | null;
  amount: number | null;
  created_at: string;
}

export const useBookings = () => {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.uid)
        .order("booking_date", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const createBooking = async (booking: {
    service_type: string;
    service_name: string;
    booking_date: string;
    booking_time?: string;
    notes?: string;
    amount?: number;
  }) => {
    if (!isAuthenticated || !user) {
      toast.error("Please login to make a booking");
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          user_id: user.uid,
          service_type: booking.service_type,
          service_name: booking.service_name,
          booking_date: booking.booking_date,
          booking_time: booking.booking_time || null,
          notes: booking.notes || null,
          amount: booking.amount || null,
          status: "pending",
        })
        .select()
        .single();

      if (error) throw error;
      
      toast.success("Booking created successfully!");
      fetchBookings();
      return data;
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking");
      return null;
    }
  };

  const cancelBooking = async (bookingId: string) => {
    if (!isAuthenticated || !user) {
      toast.error("Please login to cancel booking");
      return false;
    }

    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", bookingId)
        .eq("user_id", user.uid);

      if (error) throw error;
      
      toast.success("Booking cancelled");
      fetchBookings();
      return true;
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking");
      return false;
    }
  };

  return {
    bookings,
    loading,
    createBooking,
    cancelBooking,
    fetchBookings,
  };
};