"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setUpProviders();
  }, []);

  return (
    <div className="w-full p-11 flex justify-between">
      <h1 className="text-2xl font-bold">ToDoNext</h1>
      {session ? (
        <div className="flex gap-5 text-lg font-semibold">
          {/* <Link
            className="hover:border-b-4 ease-in-out transition-all"
            href="/incomplete"
          >
            Incomplete
          </Link>
          <Link
            className="hover:border-b-4 ease-in-out transition-all"
            href="/complete"
          >
            Complete
          </Link> */}

          {/* <button className="hover:border-b-4 ease-in-out transition-all text-white">Add Task</button> */}
          <Link
            href="#"
            onClick={() => signOut()}
            className="hover:border-b-4 ease-in-out transition-all text-gray-500"
          >
            sign out
          </Link>
          <div className="border-4 rounded-full border-gray-600 hover:border-white">
          <Image
                src={session?.user.image}
                width={30}
                height={30}
                className="rounded-full"
                alt="profile"
              />
          </div>
          
        </div>
      ) : (
        providers && (
          <button
            onClick={() => signIn(providers.google.id)}
            className="px-4 py-2 hover:rounded-3xl transition-all duration-200 ease-in-out border-slate-950 text-black font-bold bg-white rounded"
          >
            Sign In
          </button>
        )
      )}
    </div>
  );
};

export default Navbar;
