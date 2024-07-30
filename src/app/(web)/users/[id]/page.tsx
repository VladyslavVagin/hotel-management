"use client";

import { getUserBookings } from "@/libs/apis";
import useSWR from "swr";

const UserDetails = (props: { params: { id: string } }) => {
  const {
    params: { id: userId },
  } = props;

  const fetchUserBooking = async () => getUserBookings(userId);

  const {
    data: userBookings,
    error,
    isLoading,
  } = useSWR("/api/userbooking", fetchUserBooking);

  if (error) throw new Error("Failed to load rooms");
  if (typeof room === "undefined" && !isLoading)
    throw new Error("Failed to load rooms");

  return <div>UserDetails</div>;
};

export default UserDetails;
