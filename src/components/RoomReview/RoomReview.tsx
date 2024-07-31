"use client";

import { FC } from "react";
import axios from "axios";
import useSWR from "swr";
import { Review } from "@/models/review";
import Rating from "../Rating/Rating";

const RoomReview: FC<{ roomId: string }> = ({ roomId }) => {
  const fetchRoomReview = async () => {
    const { data } = await axios.get<Review[]>(`/api/room-reviews/${roomId}`);
    return data;
  };

  const {
    data: roomReviews,
    error,
    isLoading,
  } = useSWR("/api/room-reviews", fetchRoomReview);

  if (error) throw new Error("Failed to load room reviews");
  if (typeof roomReviews === "undefined" && !isLoading)
    throw new Error("Failed to load room reviews");

  return (
    <>
      {roomReviews &&
        roomReviews.map((review) => (
          <div
            className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg"
            key={review._id}
          >
            <div className="font-semibold mb-2 flex">
              <p>{review.user.name}</p>
              <div className="ml-4 flex items-center text-tertiary-light text-lg">
                <Rating rating={review.userRating} />
              </div>
            </div>

            <p>{review.text}</p>
          </div>
        ))}
    </>
  );
};

export default RoomReview;
