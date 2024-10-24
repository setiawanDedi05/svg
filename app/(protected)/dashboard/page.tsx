"use client";

import { ButtonLink } from "@/components/ui/buttonLink";
import { PlusCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { EmptyState } from "../_components/EmptyState";

function Dashboard() {
  const [myVideo, setMyVideo] = useState([]);
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl text-primary">Dashboard</h2>
        <ButtonLink
          href="/create-new"
          icon={<PlusCircleIcon />}
          label="Create New"
        />
      </div>
      {myVideo.length ? <div>ada video</div> : <EmptyState />}
    </div>
  );
}

export default Dashboard;
