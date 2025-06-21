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
        message:
          "An account with this email already exists. Please sign in instead.",
      };
    }
    return {
      success: false,
      message: "Failed to create account. Please try again.",
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
    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    console.error("Error signing in", error);
    return {
      success: false,
      message: "Failed to sign in. Please try again.",
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

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true); //true is for checking the session cookie is valid
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;
    return {
      ...userRecord.data(),
      id: userRecord.id,
    };
  } catch (error) {
    console.error("Error verifying session cookie", error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user; // user ? -> first ! -> false -> second ! -> return true
  // no user ? -> first ! -> true -> second ! -> return false
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  return {
    success: true,
    message: "Signed out successfully",
  };
}
