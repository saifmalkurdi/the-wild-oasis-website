"use client";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "@/app/_lib/actions";
import { useOptimistic } from "react";

function ReservationList({ bookings }) {
  // Actual state => While no server action is happening , optimistic state => the state that's gonna be returned in the beganning and also no async action currently runing
  const [optimisticBookings, optimisticDelelte] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handledelete(bookingId) {
    optimisticDelelte(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handledelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
