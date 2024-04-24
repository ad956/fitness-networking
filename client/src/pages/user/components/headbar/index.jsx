import { Image, Input, User, Link } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import React from "react";
import { BiBell } from "react-icons/bi";
import { IoAddOutline } from "react-icons/io5";
import { fitness } from "@images";

export default function Headbar() {
  return (
    <section className="w-full flex flex-row justify-between items-center gap-5 px-5">
      <div className="flex gap-10 items-center">
        <Image src={fitness} alt="brand-logo" height={80} width={50} />

        <Input
          label="Search"
          isClearable
          radius="lg"
          className="max-w-xs"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Type to search..."
          startContent={
            <CiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>

      <div className="flex gap-5 items-center">
        <div className="flex gap-2">
          <BiBell size={20} />
          <IoAddOutline size={20} />
        </div>
        <User
          name="Anand Suthar"
          description={
            <Link href="https://twitter.com/jrgarciadev" size="sm" isExternal>
              @ad956
            </Link>
          }
          avatarProps={{
            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
            radius: "sm",
          }}
        />

        <Image
          src="https://cdn-icons-png.flaticon.com/512/3909/3909444.png"
          className="max-h-8 max-w-8"
          radius="full"
        />
      </div>
    </section>
  );
}
