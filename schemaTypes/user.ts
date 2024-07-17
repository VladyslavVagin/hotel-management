import { defineField } from "sanity";

const user = {
  name: "user",
  title: "user",
  type: "document",
  fields: [
    defineField({
      name: "isAdmin",
      title: "Is Admin",
      type: "boolean",
      description: "Check if user is admin",
      initialValue: false,
      validation: (Rule) => Rule.required(),
      //   readOnly: true,
      //   hidden: true,
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      descriptipn: "Name of the user",
      readOnly: true,
    }),
  ],
};

export default user;
