import { ButtonLink } from "@/components/ui/buttonLink";
import React from "react";

export function EmptyState() {
  return (
    <div className="border border-dashed border-primary rounded-md flex flex-col justify-center h-60 items-center mt-10 gap-3">
      <span className="text-primary">You dont have any video created</span>
      <ButtonLink href="/create-new" label="Create new short video" />
    </div>
  );
}
