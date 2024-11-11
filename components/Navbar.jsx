"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="w-full py-8 flex justify-between">
      <h1 className="text-2xl font-bold">ToDoNext</h1>
      {isLoggedIn ? (
        <div className="flex gap-5 text-lg font-semibold">
            <Link className="hover:border-b-4 ease-in-out transition-all" href="/incomplete">Incomplete</Link>
            <Link className="hover:border-b-4 ease-in-out transition-all" href="/complete">complete</Link>
        </div>
      ) : (
        <button className="px-4 py-2 hover:rounded-3xl transition-all duration-200 ease-in-out border-slate-950 font-semibold text-white bg-black rounded">
          Sign In
        </button>
      )}
    </div>
  );
};

export default Navbar;