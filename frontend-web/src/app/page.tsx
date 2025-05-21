'use client'

import { useState } from "react";
import useFetchUser from '../hooks/users/useFetchUser';

import { Card } from "@/components/Card/Card.";
import NavBar from "@/components/NavBar/Navbar";
import { Overlay } from "@/components/Overlay/Overlay";

export default function Home() {
  const [openOverlay, setOpenOverlay] = useState(false);
  const { users } = useFetchUser();

  return (
    <div className="relative">
      <NavBar setOpenOverlay={setOpenOverlay} />
      <div className="flex justify-center mt-5">
        <ul className="flex gap-5">
          {users.map((user) => (
            <li key={user._id} className="bg-blue-900 p-1.5 rounded">
              <p>{user.name}: R$ {user.amountTotal}</p>
            </li>
          ))}
        </ul>
      </div>
      <Card />
      {openOverlay && <Overlay setOpenOverlay={setOpenOverlay} />}
    </div>
  );
}
