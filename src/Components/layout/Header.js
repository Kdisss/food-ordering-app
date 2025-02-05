'use client';
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();  // Get session data

  // Handle logout
  const handleLogout = async () => {
    // Clear localStorage manually to remove session data
    localStorage.removeItem("next-auth.session-token"); // Clear session-token from localStorage
  
    await signOut({callbackUrl: '/register'});
  };

  return (
    <header className="flex p-4 bg-white shadow-md">
      

      <nav className="flex items-center gap-4">
        {session ? (
          <>
          <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link className="text-primary text-2xl font-semibold" href={'/'}>PIZZERIA</Link>
        <Link href={'/'}>Home</Link>
        <Link href={''}>Menu</Link>
        <Link href={''}>About</Link>
        <Link href={''}>Contact</Link>
        </nav>
          <div className="flex gap-5">
          <span className="text-primary ml-40">Welcome! {session.user.name}</span>
          <button onClick={() => handleLogout()} className="bg-primary rounded-full text-white px-8 py-2 ">
            Logout
          </button>
          </div>
          </>
        ) : (
          // If not logged in, show Login and Register buttons
          <>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => window.location.href = '/login'}
              className="text-gray-500 font-semibold hover:text-primary transition duration-200 ease-in-out border border-gray-300 px-6 py-2 rounded-full"
            >
              Login
            </button>
            <button
              onClick={() => window.location.href = '/register'}
              className="bg-primary text-white rounded-full px-8 py-2 font-semibold hover:bg-primary-dark transition duration-200 ease-in-out"
            >
              Register
            </button>
          </div>

          </>
        )}
      </nav>
    </header>
  );
}
