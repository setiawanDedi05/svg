"use server";

import React from "react";
import { Player } from "@remotion/player";
import { RemotionVideo } from "./RemotionVideo";
import { db } from "@/app/server/db";
import { notFound } from "next/navigation";

const getData = async (videoId: string) => {
  const result = await db.videoData.findUnique({
    where: {
      id: videoId,
    },
  });
  if (!result) {
    return notFound();
  }

  return result;
};

interface iAppProps {
  videoId: string;
}

export default async function PlayerContent({ videoId }: iAppProps) {
  const data = await getData(videoId);
  return (
    <div>
      <Player
        component={RemotionVideo}
        durationInFrames={120}
        compositionWidth={300}
        compositionHeight={450}
        fps={30}
      />
    </div>
  );
}
