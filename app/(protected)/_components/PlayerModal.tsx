"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { JsonValue } from "@prisma/client/runtime/library";
import { Thumbnail } from "@remotion/player";
import { Player } from "@remotion/player";
import { RemotionVideo } from "./RemotionVideo";

interface iAppsProps {
  video: {
    id?: string;
    caption?: JsonValue;
    script?: JsonValue;
    audioUrl?: string;
    imageList?: string[];
  };
  createdBy?: string;
}

export default function PlayerModal({ video }: iAppsProps) {
  const [durationFrame, setDurationFrame] = useState(100);
  return (
    <Dialog key={video.id}>
      <DialogTrigger>
        <Thumbnail
          key={video.id}
          className="border rounded-md hover:scale-110 transition-all animate- hover:rotate-2 cursor-pointer"
          component={RemotionVideo}
          compositionWidth={200}
          compositionHeight={150}
          frameToDisplay={30}
          durationInFrames={120}
          fps={30}
          inputProps={{
            ...video,
          }}
        />
      </DialogTrigger>
      <DialogContent>
        <Player
          className="mx-auto"
          component={RemotionVideo}
          durationInFrames={Number(Math.ceil(durationFrame))}
          compositionWidth={300}
          compositionHeight={450}
          fps={30}
          controls
          inputProps={{
            ...video,
            setDurationFrame: (frameValue: number) =>
              setDurationFrame(frameValue),
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
