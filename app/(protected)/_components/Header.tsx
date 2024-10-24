import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

export function Header() {
  return (
    <div className="flex justify-between px-10 py-5 border-b bg-muted/40">
      <div className="flex gap-5 items-center justify-center">
        <Image src={"/logo.svg"} width={30} height={30} alt="logo" />
        <h2 className="text-2xl text-primary">
          S<span className="text-muted-foreground/30">hort</span> V
          <span className="text-muted-foreground/30">ideo</span> G
          <span className="text-muted-foreground/30">enerator</span>
        </h2>
      </div>
      <UserButton />
    </div>
  );
}
