"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import { useMyContext } from "@/context/StoreContext";

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const { setShowCompletedTasks, showCompletedTasks } = useMyContext();
  

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setUpProviders();
  }, []);

  return (
    <div className="w-full p-11 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ToDoNext</h1>
        {session ? (
          <div className="flex gap-5 text-lg font-semibold">
            <Link
              className={
                showCompletedTasks
                  ? "hover:border-b-4 ease-in-out transition-all hide-on-small"
                  : "border-b-4 ease-in-out transition-all hide-on-small"
              }
              href="#"
              onClick={() => setShowCompletedTasks((prev) => !prev)}
            >
              Incomplete
            </Link>
            <Link
              className={
                showCompletedTasks
                  ? "border-b-4 ease-in-out transition-all hide-on-small"
                  : "hover:border-b-4 ease-in-out transition-all hide-on-small"
              }
              href="#"
              onClick={() => setShowCompletedTasks((prev) => !prev)}
            >
              Complete
            </Link>

            <Link
              href="#"
              onClick={() => signOut()}
              className="hover:border-b-8 items-center border-b-4  ease-in-out transition-all text-gray-500"
            >
              sign out
            </Link>
            <div className="border-4 cursor-pointer rounded-full border-gray-600 hover:border-white">
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
              className="px-4 py-2 hover:rounded-3xl items-center transition-all duration-200 ease-in-out border-slate-950 text-black font-bold bg-white rounded"
            >
              Sign In
            </button>
          )
        )}
      </div>
      {session && <hr className="sm:hidden" />}
      { session && <div className="flex sm:hidden  justify-between">
        <Link
          className={
            showCompletedTasks
              ? "hover:border-b-4 ease-in-out transition-all"
              : "border-b-4 ease-in-out transition-all"
          }
          href="#"
          onClick={() => setShowCompletedTasks((prev) => !prev)}
        >
          Incomplete
        </Link>
        <Link
          className={
            showCompletedTasks
              ? "border-b-4 ease-in-out transition-all"
              : "hover:border-b-4 ease-in-out transition-all"
          }
          href="#"
          onClick={() => setShowCompletedTasks((prev) => !prev)}
        >
          Complete
        </Link>
      </div>}
    </div>
  );
};

export default Navbar;
