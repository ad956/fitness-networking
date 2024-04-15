import React from "react";
import { Image, Link } from "@nextui-org/react";

export default function PageNotFound() {
  return (
    <section className="bg-[#f1f5f9] h-screen w-screen grid place-items-center">
      <Link href="/">
        <Image src="https://miro.medium.com/v2/resize:fit:679/1*zBFBJktPD3_z0S_35kO5Hg.gif" />
      </Link>
    </section>
  );
}
