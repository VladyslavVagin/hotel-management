"use client";

import { getRoom } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";

const RoomDetails = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  const fetchRoom = async () => getRoom(slug);

  const { data: room, error, isLoading } = useSWR("/api/room", fetchRoom);
  if (error) throw new Error("Failed to load rooms");
  if (typeof room === "undefined" && !isLoading)
    throw new Error("Failed to load rooms");

  if (!room) {
    return <LoadingSpinner />;
  }

  console.log(room);

  return <div>RoomDetails</div>;
};

export default RoomDetails;
