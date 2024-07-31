import { groq } from "next-sanity";

export const getFeaturedRoomQuery = groq`*[ _type == "hotelRoom" && isFeatured == true ] [0] {
    _id,
    description,
    discount,
    images,
    name,
    price,
    slug,
    isFeatured,
    coverImage,
}`;

export const getRoomsQuery = groq`*[_type == "hotelRoom"] {
    _id,
    description,
    name,
    price,
    slug,
    isFeatured,
    coverImage,
    dimension,
    isBooked,
    type,
}`;

export const getRoom = groq`*[_type == "hotelRoom" && slug.current == $slug] [0] {
  _id,
  coverImage,
  description,
  dimension,
  discount,
  images,
  isBooked,
  isFeatured,
  name,
  numberOfBeds,
  offeredAmenities,
  price,
  slug,
  type,
  specialNote,
}`;

export const getUserBookingsQuery = groq`*[_type == "booking" && user._ref == $userId] {
  _id,
  hotelRoom -> {
    _id,
    name,
    slug,
    price
  },
  checkinDate,
  checkoutDate,
  numberOfDays,
  adults,
  children,
  totalPrice,
  discount,
}`;

export const getUserDataQuery = groq`*[_type == 'user' && _id == $userId][0] {
  _id,
  name,
  email,
  isAdmin,
  about,
  _createdAt,
  image,
}`;

export const getRoomReviewsQuery = groq`*[_type == "review" && hotelRoom._ref == $roomId] {
  _createdAt,
  _id,
  text,
  user -> {
    name,
    image,
  },
  userRating,
}`;
