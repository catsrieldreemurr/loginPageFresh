import Navbar from "@/components/ui/navbar";
import Typography from "@/components/ui/typography";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-900 h-screen">
      <Navbar></Navbar>

      <div className="text-center flex items-center justify-center content-center h-screen flex-col bg-gray-900">
        <Typography variant="h1" isBold>The Earthmovers could be considered an affront to god.</Typography>
        <Typography variant="h2">They could be the reason god left.</Typography>
      </div>
    </div>
  );
}
