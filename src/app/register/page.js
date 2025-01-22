"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react"; // Import the signIn function from NextAuth

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name,email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }

  // Handle Google login for registration
  async function handleGoogleLogin() {
    try {
      // Use the NextAuth signIn method for Google OAuth
      await signIn("google", { callbackUrl: "/" }); // Redirects to the homepage after successful login
    } catch (error) {
      console.error("Google login failed", error);
    }
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl pb-4">Register</h1>
      {userCreated && (
        <div className="text-center my-4">
          User created successfully,
          <br />
          Now you can{""}
          <Link className="underline" href={"/login"}>
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An error has occurred.
          <br />
          Please try again later...
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="name"
          placeholder="name"
          value={name}
          disabled={creatingUser}
          onChange={(ev) => setName(ev.target.value)}
        />

        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={creatingUser}
          onChange={(ev) => setEmail(ev.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          disabled={creatingUser}
          onChange={(ev) => setPassword(ev.target.value)}
        />

        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          or <br></br>login with provider
        </div>
        <button
          className="flex gap-10"
          type="button"
          onClick={handleGoogleLogin}
        >
          <Image src={"/googalicon.png"} alt={""} width={"24"} height={"24"} />
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{""}
          <Link className="underline" href={"/login"}>
            Login here &raquo;
          </Link>
        </div>
      </form>

      <div></div>
    </section>
  );
}
