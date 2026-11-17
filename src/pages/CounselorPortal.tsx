import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Calendar as CalendarIcon, Check, Clock3, IndianRupee, LogIn, LogOut, Plus, ShieldCheck, UserRound, Video, Wallet, X } from "lucide-react";
import { format } from "date-fns";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

type CounselorProfile = Database["public"]["Tables"]["counselor_profiles"]["Row"];
type AvailabilitySlot = Database["public"]["Tables"]["counselor_availability"]["Row"];
type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type Payout = Database["public"]["Tables"]["counselor_payouts"]["Row"];

const toLocalDateTime = (value: string) => new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
}).format(new Date(value));

const statusTone = (status: string) => {
  if (status === "confirmed" || status === "paid") return "default" as const;
  if (status === "cancelled" || status === "failed") return "destructive" as const;
  return "secondary" as const;
};

const splitTags = (value: string) => value.split(",").map((item) => item.trim()).filter(Boolean);

const CounselorPortal = () => {
  const { user, isAuthenticated, isProvider, roleCheckLoading, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [workspaceLoading, setWorkspaceLoading] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingSlot, setSavingSlot] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [slotDate, setSlotDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [slotTime, setSlotTime] = useState("10:00");
  const [profile, setProfile] = useState<CounselorProfile | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [specialties, setSpecialties] = useState("");
  const [sessionRate, setSessionRate] = useState("0");
  const [sessionDuration, setSessionDuration] = useState("50");
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);

  const loadWorkspace = useCallback(async () => {
    if (!user?.uid || !isProvider()) return;
    setWorkspaceLoading(true);
    const [profileResult, availabilityResult, bookingResult, payoutResult] = await Promise.all([
      supabase.from("counselor_profiles").select("*").eq("user_id", user.uid).maybeSingle(),
      supabase.from("counselor_availability").select("*").eq("counselor_id", user.uid).order("starts_at", { ascending: true }),
      supabase.from("bookings").select("*").eq("provider_id", user.uid).order("booking_date", { ascending: true }).order("booking_time", { ascending: true }),
      supabase.from("counselor_payouts").select("*").eq("provider_id", user.uid).order("created_at", { ascending: false }).limit(20),
    ]);

    const firstError = profileResult.error || availabilityResult.error || bookingResult.error || payoutResult.error;
    if (firstError) toast.error("We couldn’t load your counselor workspace. Please try again.");

    const loadedProfile = profileResult.data;
    setProfile(loadedProfile);
    setDisplayName(loadedProfile?.display_name || user.displayName || "");
    setBio(loadedProfile?.bio || "");
    setQualifications(loadedProfile?.qualifications?.join(", ") || "");
    setSpecialties(loadedProfile?.specialties?.join(", ") || "");
    setSessionRate(String(loadedProfile?.session_rate ?? 0));
    setSessionDuration(String(loadedProfile?.session_duration_minutes ?? 50));
    setAvailability(availabilityResult.data || []);
    setBookings(bookingResult.data || []);
    setPayouts(payoutResult.data || []);
    setWorkspaceLoading(false);
  }, [isProvider, user]);

  useEffect(() => {
    document.title = "Counselor Portal | MeantToHelp";
  }, []);

  useEffect(() => {
    if (!roleCheckLoading && isProvider()) void loadWorkspace();
  }, [isProvider, loadWorkspace, roleCheckLoading]);

  const selectedDayKey = format(selectedDate, "yyyy-MM-dd");
  const selectedSlots = useMemo(() => availability.filter((slot) => slot.starts_at.slice(0, 10) === selectedDayKey), [availability, selectedDayKey]);
  const selectedBookings = useMemo(() => bookings.filter((booking) => booking.booking_date === selectedDayKey), [bookings, selectedDayKey]);
  const paidGross = bookings.filter((booking) => booking.payment_status === "paid").reduce((sum, booking) => sum + Number(booking.amount || 0), 0);
  const pendingPayoutTotal = payouts.filter((payout) => payout.status === "pending" || payout.status === "processing").reduce((sum, payout) => sum + Number(payout.amount || 0), 0);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginLoading(true);
    const success = await login(email, password);
    if (!success) toast.error("Sign-in failed. Check your email and password.");
    setLoginLoading(false);
  };

  const handleSaveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user?.uid) return;
    const rate = Number(sessionRate);
    const duration = Number(sessionDuration);
    if (!displayName.trim() || !Number.isFinite(rate) || rate < 0 || !Number.isInteger(duration) || duration < 15 || duration > 240) {
      toast.error("Check the name, session fee, and duration fields.");
      return;
    }
    setSavingProfile(true);
    const payload = {
      user_id: user.uid,
      display_name: displayName.trim(),
      bio: bio.trim(),
      qualifications: splitTags(qualifications),
      specialties: splitTags(specialties),
      session_rate: rate,
      session_duration_minutes: duration,
      timezone: "Asia/Kolkata",
    };
    const { data, error } = await supabase.from("counselor_profiles").upsert(payload, { onConflict: "user_id" }).select().single();
    setSavingProfile(false);
    if (error) {
      toast.error("Your profile could not be saved.");
      return;
    }
    setProfile(data);
    toast.success("Counselor profile saved.");
  };

  const handleAddSlot = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user?.uid) return;
    const startsAt = new Date(`${slotDate}T${slotTime}:00`);
    if (!Number.isFinite(startsAt.getTime()) || startsAt <= new Date()) {
      toast.error("Choose a future date and time.");
      return;
    }
    const endAt = new Date(startsAt.getTime() + Number(profile?.session_duration_minutes || sessionDuration || 50) * 60_000);
    setSavingSlot(true);
    const { error } = await supabase.from("counselor_availability").insert({
      counselor_id: user.uid,
      starts_at: startsAt.toISOString(),
      ends_at: endAt.toISOString(),
      availability_status: "available",
    });
    setSavingSlot(false);
    if (error) {
      toast.error(error.code === "23505" ? "That time is already on your calendar." : "Could not add that time.");
      return;
    }
    toast.success("Available time added.");
    await loadWorkspace();
  };

  const handleSlotStatus = async (slot: AvailabilitySlot, status: "available" | "unavailable") => {
    const { error } = await supabase.from("counselor_availability").update({ availability_status: status }).eq("id", slot.id);
    if (error) {
      toast.error("That time could not be updated.");
      return;
    }
    setAvailability((current) => current.map((item) => item.id === slot.id ? { ...item, availability_status: status } : item));
  };

  const handleBookingStatus = async (booking: Booking, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", booking.id).eq("provider_id", user?.uid || "");
    if (error) {
      toast.error("This booking could not be updated.");
      return;
    }
    setBookings((current) => current.map((item) => item.id === booking.id ? { ...item, status } : item));
    toast.success(status === "completed" ? "Session marked complete." : "Booking cancelled.");
  };

  if (!isAuthenticated) {
    return (
      <MainLayout title="Counselor Portal | MeantToHelp">
        <section className="min-h-[70vh] bg-muted/30 px-4 py-14">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <Badge variant="outline" className="mb-5 gap-2"><ShieldCheck className="h-4 w-4" /> Counselor access</Badge>
              <h1 className="max-w-xl text-4xl font-semibold tracking-normal text-foreground">Your practice, in one place.</h1>
              <p className="mt-4 max-w-xl text-muted-foreground">Sign in to manage your sessions, set availability, update your professional profile, and review payment records.</p>
            </div>
            <Card className="border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle>Counselor sign in</CardTitle>
                <CardDescription>Use the account approved for your counselor role.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2"><Label htmlFor="counselor-email">Email</Label><Input id="counselor-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></div>
                  <div className="space-y-2"><Label htmlFor="counselor-password">Password</Label><Input id="counselor-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" /></div>
                  <Button type="submit" className="w-full" disabled={loginLoading}><LogIn className="mr-2 h-4 w-4" />{loginLoading ? "Signing in…" : "Sign in to counselor portal"}</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </MainLayout>
    );
  }

  if (roleCheckLoading) {
    return <MainLayout title="Counselor Portal | MeantToHelp"><div className="mx-auto max-w-4xl px-4 py-24 text-center text-muted-foreground">Verifying counselor access…</div></MainLayout>;
  }

  if (!isProvider()) {
    return (
      <MainLayout title="Counselor Portal | MeantToHelp">
        <section className="mx-auto max-w-2xl px-4 py-20 text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-muted-foreground" />
          <h1 className="mt-5 text-2xl font-semibold">Counselor access isn’t enabled</h1>
          <p className="mt-3 text-muted-foreground">This account does not have an approved counselor role. Contact MeantToHelp to request counselor access.</p>
          <Button variant="outline" className="mt-6" onClick={() => void logout()}><LogOut className="mr-2 h-4 w-4" />Sign out</Button>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Counselor Portal | MeantToHelp">
      <div className="min-h-screen bg-muted/30">
        <header className="border-b bg-background">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
            <div>
              <p className="text-sm font-medium text-primary">Counselor workspace</p>
              <h1 className="mt-1 text-2xl font-semibold">Welcome, {displayName || user?.displayName || "Counselor"}</h1>
              <p className="mt-1 text-sm text-muted-foreground">Your schedule and practice at a glance.</p>
            </div>
            <Button variant="outline" onClick={() => void logout()}><LogOut className="mr-2 h-4 w-4" />Sign out</Button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Practice summary">
            <Card><CardContent className="flex items-center gap-4 p-5"><div className="rounded-md bg-primary/10 p-3 text-primary"><CalendarIcon className="h-5 w-5" /></div><div><p className="text-sm text-muted-foreground">Upcoming sessions</p><p className="text-2xl font-semibold">{bookings.filter((item) => item.status === "confirmed" || item.status === "pending").length}</p></div></CardContent></Card>
            <Card><CardContent className="flex items-center gap-4 p-5"><div className="rounded-md bg-primary/10 p-3 text-primary"><Clock3 className="h-5 w-5" /></div><div><p className="text-sm text-muted-foreground">Open time slots</p><p className="text-2xl font-semibold">{availability.filter((item) => item.availability_status === "available").length}</p></div></CardContent></Card>
            <Card><CardContent className="flex items-center gap-4 p-5"><div className="rounded-md bg-primary/10 p-3 text-primary"><IndianRupee className="h-5 w-5" /></div><div><p className="text-sm text-muted-foreground">Collected session fees</p><p className="text-2xl font-semibold">₹{paidGross.toLocaleString("en-IN")}</p></div></CardContent></Card>
            <Card><CardContent className="flex items-center gap-4 p-5"><div className="rounded-md bg-primary/10 p-3 text-primary"><Wallet className="h-5 w-5" /></div><div><p className="text-sm text-muted-foreground">Pending payout records</p><p className="text-2xl font-semibold">₹{pendingPayoutTotal.toLocaleString("en-IN")}</p></div></CardContent></Card>
          </section>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(330px,0.8fr)]">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><CalendarIcon className="h-5 w-5" />Sessions calendar</CardTitle><CardDescription>Select a day to see assigned bookings and your available hours.</CardDescription></CardHeader>
              <CardContent className="grid gap-6 lg:grid-cols-[300px_1fr]">
                <Calendar mode="single" selected={selectedDate} onSelect={(date) => date && setSelectedDate(date)} className="mx-auto rounded-md border" />
                <div className="space-y-6">
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-3"><h2 className="font-medium">{format(selectedDate, "EEEE, d MMMM")}</h2><Badge variant="outline">{selectedBookings.length} sessions</Badge></div>
                    {selectedBookings.length ? <div className="space-y-3">{selectedBookings.map((booking) => <div key={booking.id} className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 last:border-0"><div><p className="font-medium">{booking.service_name}</p><p className="mt-1 text-sm text-muted-foreground">{booking.booking_time || "Time not set"} · {booking.service_type}</p></div><div className="flex items-center gap-2"><Badge variant={statusTone(booking.status)}>{booking.status}</Badge>{booking.status !== "completed" && booking.status !== "cancelled" && <Button size="sm" variant="outline" onClick={() => void handleBookingStatus(booking, "completed")}>Complete</Button>}{booking.status !== "cancelled" && <Button size="icon" variant="ghost" aria-label="Cancel booking" onClick={() => void handleBookingStatus(booking, "cancelled")}><X className="h-4 w-4" /></Button>}</div></div>)}</div> : <p className="rounded-md bg-muted/50 px-4 py-6 text-sm text-muted-foreground">No sessions assigned for this day.</p>}
                  </div>
                  <div>
                    <h3 className="mb-3 font-medium">Available hours</h3>
                    {selectedSlots.length ? <div className="space-y-2">{selectedSlots.map((slot) => <div key={slot.id} className="flex items-center justify-between gap-3 rounded-md border px-3 py-2"><div><p className="text-sm font-medium">{toLocalDateTime(slot.starts_at)}</p><p className="text-xs text-muted-foreground">{slot.availability_status}</p></div>{slot.availability_status !== "booked" && <Button size="sm" variant="outline" onClick={() => void handleSlotStatus(slot, slot.availability_status === "available" ? "unavailable" : "available")}>{slot.availability_status === "available" ? "Block" : "Reopen"}</Button>}</div>)}</div> : <p className="text-sm text-muted-foreground">No availability added for this day.</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Plus className="h-5 w-5" />Add availability</CardTitle><CardDescription>Set the hours clients can request. Times use India Standard Time.</CardDescription></CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleAddSlot}>
                  <div className="space-y-2"><Label htmlFor="slot-date">Date</Label><Input id="slot-date" type="date" min={format(new Date(), "yyyy-MM-dd")} value={slotDate} onChange={(event) => setSlotDate(event.target.value)} required /></div>
                  <div className="space-y-2"><Label htmlFor="slot-time">Start time</Label><Input id="slot-time" type="time" value={slotTime} onChange={(event) => setSlotTime(event.target.value)} required /></div>
                  <p className="text-sm text-muted-foreground">Session length: {profile?.session_duration_minutes || sessionDuration} minutes</p>
                  <Button className="w-full" type="submit" disabled={savingSlot}><Plus className="mr-2 h-4 w-4" />{savingSlot ? "Adding…" : "Add time"}</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.8fr)]">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><UserRound className="h-5 w-5" />Professional profile</CardTitle><CardDescription>Keep your qualifications and session details current.</CardDescription></CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2"><Label htmlFor="counselor-name">Display name</Label><Input id="counselor-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} required maxLength={120} /></div>
                  <div className="space-y-2"><Label htmlFor="counselor-rate">Session fee (₹)</Label><Input id="counselor-rate" type="number" min="0" step="1" value={sessionRate} onChange={(event) => setSessionRate(event.target.value)} required /></div>
                  <div className="space-y-2"><Label htmlFor="counselor-duration">Session length (minutes)</Label><Input id="counselor-duration" type="number" min="15" max="240" step="5" value={sessionDuration} onChange={(event) => setSessionDuration(event.target.value)} required /></div>
                  <div className="space-y-2"><Label htmlFor="counselor-qualifications">Qualifications</Label><Input id="counselor-qualifications" value={qualifications} onChange={(event) => setQualifications(event.target.value)} placeholder="MA Psychology, RCI license" /></div>
                  <div className="space-y-2 md:col-span-2"><Label htmlFor="counselor-specialties">Specialties</Label><Input id="counselor-specialties" value={specialties} onChange={(event) => setSpecialties(event.target.value)} placeholder="Anxiety, relationships, stress" /></div>
                  <div className="space-y-2 md:col-span-2"><Label htmlFor="counselor-bio">Professional introduction</Label><textarea id="counselor-bio" value={bio} onChange={(event) => setBio(event.target.value)} maxLength={1200} rows={4} className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Share your approach and the support you offer." /></div>
                  <div className="md:col-span-2"><Button type="submit" disabled={savingProfile}>{savingProfile ? "Saving…" : profile ? "Save profile" : "Create counselor profile"}</Button></div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Wallet className="h-5 w-5" />Earnings and payouts</CardTitle><CardDescription>View session fees and payout records.</CardDescription></CardHeader>
              <CardContent className="space-y-5">
                <div className="rounded-md border border-border bg-muted/30 p-4">
                  <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 text-primary" /><div><p className="font-medium">Automatic transfers need Razorpay Route</p><p className="mt-1 text-sm text-muted-foreground">Counselor transfers are not active yet. Route must be enabled for this business and each counselor must complete linked-account onboarding before funds can move.</p></div></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-md border p-4"><p className="text-sm text-muted-foreground">Paid bookings</p><p className="mt-1 text-xl font-semibold">{bookings.filter((booking) => booking.payment_status === "paid").length}</p></div>
                  <div className="rounded-md border p-4"><p className="text-sm text-muted-foreground">Payout records</p><p className="mt-1 text-xl font-semibold">{payouts.length}</p></div>
                </div>
                {payouts.length ? <div className="space-y-3">{payouts.map((payout) => <div key={payout.id} className="flex items-center justify-between border-b pb-3 last:border-0"><div><p className="font-medium">₹{Number(payout.amount).toLocaleString("en-IN")}</p><p className="text-xs text-muted-foreground">{new Date(payout.created_at).toLocaleDateString("en-IN")}</p></div><Badge variant={statusTone(payout.status)}>{payout.status}</Badge></div>)}</div> : <p className="text-sm text-muted-foreground">No payout transfers have been recorded.</p>}
                <p className="text-xs text-muted-foreground">Session fees show customer payments; counselor payout amounts and timing depend on the approved payout setup.</p>
              </CardContent>
            </Card>
          </div>

          {workspaceLoading && <p className="text-center text-sm text-muted-foreground">Refreshing workspace…</p>}
        </main>
      </div>
    </MainLayout>
  );
};

export default CounselorPortal;