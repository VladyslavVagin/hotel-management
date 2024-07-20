"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { getRooms } from "@/libs/apis";
import { Room } from "@/models/room";

const Rooms = () => {
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [searchQueryValue, setSearchQueryValue] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get("searchQuery");
    const roomType = searchParams.get("roomType");

    if (roomType) setRoomTypeFilter(roomType);
    if (searchQuery) setSearchQueryValue(searchQuery);
  }, []);

  async function fetchData() {
    return getRooms();
  }

  const { data, error, isLoading } = useSWR("get/hotelRooms", fetchData);
  if (error) throw new Error("Failed to load rooms");
  if (typeof data === "undefined" && !isLoading)
    throw new Error("Failed to load rooms");

  const filterRooms = (rooms: Room[]) => {
    return rooms.filter((room) => {
      // Apply room type filter
      if (
        roomTypeFilter &&
        roomTypeFilter.toLowerCase() !== "all" &&
        room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
      ) {
        return false;
      }

      // Apply search query filter
      if (
        searchQueryValue &&
        !room.name.toLowerCase().includes(searchQueryValue.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  };

  const filteredRooms = filterRooms(data || []);
  console.log(filteredRooms);

  return <div>Rooms</div>;
};

export default Rooms;
