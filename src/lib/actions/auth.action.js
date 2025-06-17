"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function signUp(params) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in instead.",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    console.error("Error creating a user", error);
    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "Email already exists",
      };
    }
    return {
      success: false,
      message: "Failed to create a user",
    };
  }
}

export async function signIn(params) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User not found. Please sign up instead.",
      };
    }
    await setSessionCookie(idToken);
  } catch (error) {
    console.error("Error signing in", error);
    return {
      success: false,
      message: "Failed to sign in",
    };
  }
}

export async function setSessionCookie(idToken) {
  const cookieStore = await cookies(); // used to set the session cookie in the browser
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: 60 * 60 * 24 * 7 * 1000, // 7 days
  });
  cookieStore.set("session", sessionCookie, {
    maxAge: 60 * 60 * 24 * 7 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}
