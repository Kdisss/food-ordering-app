"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState(null);


  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    // Attempt to sign in
    const result = await signIn("credentials", {
      email,
      password,
      status,
      redirect: false, // Disable automatic redirect to allow custom error handling
    });

    setLoginInProgress(false);

    if (result?.error) {
      setError(result.error);
    } else {
      // Redirect or handle successful login
      window.location.href = "/"; // Replace with your desired path
    }
  }

  return (
    <div>
      <section className="mt-8">
        <h1 className="text-center text-primary text-4xl pb-4 mb-4">Login</h1>
        <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            disabled={loginInProgress}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            disabled={loginInProgress}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button disabled={loginInProgress} type="submit">
            {loginInProgress ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="my-4 text-center text-gray-500">
            or <br />
            login with provider
          </div>
          <button onClick={()=>signIn('google', {callbackUrl: '/'})} 
                  className="flex gap-10 justify-center">
            <Image src={"/googalicon.png"} alt="" width="24" height="24" />
            Login with Google
          </button>
        </form>
      </section>
    </div>
  );
}
