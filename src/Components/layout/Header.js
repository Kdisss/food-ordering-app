'use client';
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();  // Get session data

  // Handle logout
  const handleLogout = async () => {
    // Clear localStorage manually to remove session data
    localStorage.removeItem("next-auth.session-token"); // Clear session-token from localStorage
  
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link className="text-primary text-2xl font-semibold" href={'/'}>PIZZERIA</Link>
        <Link href={'/'}>Home</Link>
        <Link href={''}>Menu</Link>
        <Link href={''}>About</Link>
        <Link href={''}>Contact</Link>
      </nav>

      <nav className="flex items-center gap-4">
        {session ? (
          <>
          <span className="text-primary">{session.user.name}</span>
          <button onClick={() => signOut()} className="bg-primary rounded-full text-white px-8 py-2">
            Logout
          </button>
          </>
        ) : (
          // If not logged in, show Login and Register buttons
          <>
            <Link href={'/login'} className="text-gray-500 font-semibold">
              Login
            </Link>
            <Link
              href={"/register"}
              className="bg-primary text-white rounded-full px-8 py-2 font-semibold"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
