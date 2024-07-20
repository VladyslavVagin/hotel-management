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
