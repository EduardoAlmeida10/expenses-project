'use client'

import {useState} from "react";

import { Card } from "@/components/Card/Card.";
import NavBar from "@/components/NavBar/Navbar";
import { Overlay } from "@/components/Overlay/Overlay";

export default function Home() {
  const [openOverlay, setOpenOverlay] = useState(false);

  return (
    <div className="relative">
      <NavBar setOpenOverlay={setOpenOverlay} />
      <Card />
      {openOverlay && <Overlay setOpenOverlay={setOpenOverlay} />}
    </div>
  );
}
