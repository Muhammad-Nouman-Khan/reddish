import { currentUser } from "@clerk/nextjs/server";
import { sanityFetch } from "../live";
import { defineQuery } from "groq";
import { addUser } from "./addUser";
interface UserResult {
  _id: string;
  username: string;
  imageUrl: string;
  email: string;
}

const parseUsername = (username: string) => {
  // remove whitespace and capitalize first letter of each word with random number to avoid duplicates
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return (
    username
      .replace(/\s+(.)/g, (_, char) => char.toUpperCase())
      .replace(/\s+/g, "") + randomNum
  );
};

export async function getUser(): Promise<UserResult | { error: string }> {
  try {
    console.log("Getting current user from Clerk");
    const loggedInUser = await currentUser();

    if (!loggedInUser) {
      console.log("No user logged in");
      return { error: "User not found" };
    }

    const getExistingUser = defineQuery(`*[_type == "user" && _id == $id][0]`);
    console.log("Checking if user exists in Sanity");

    const existingUser = await sanityFetch({
      query: getExistingUser,
      params: { id: loggedInUser.id },
    });

    if (existingUser.data?._id) {
      console.log(`User found in database with ID: ${existingUser.data._id}`);
      const user = {
        _id: existingUser.data._id,
        username: existingUser.data.username!,
        imageUrl: existingUser.data.imageUrl!,
        email: existingUser.data.email!,
      };
      return user;
    }

    console.log("User not found in database, creating new user");
    const newUser = await addUser({
      id: loggedInUser.id,
      username: parseUsername(loggedInUser.fullName!),
      email:
        loggedInUser.primaryEmailAddress?.emailAddress ||
        loggedInUser.emailAddresses[0].emailAddress,
      imageUrl: loggedInUser.imageUrl,
    });

    console.log("New user created in database with ID: ", newUser._id);
    const user = {
      _id: newUser._id,
      username: newUser.username!, // ! means that the username is not null
      imageUrl: newUser.imageUrl,
      email: newUser.email,
    };
    return user;
  } catch (error) {
    console.error("Error in getUser:", error);
    return { error: "Failed to get user" };
  }
}
