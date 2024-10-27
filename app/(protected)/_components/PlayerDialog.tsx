"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import { RemotionVideo } from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/app/server/db";
import { JsonValue } from "@prisma/client/runtime/library";

interface iAppProps {
  playVideo: boolean;
  videoId: string;
}

interface VideoDataScript {
  id: string;
  script: JsonValue;
  audioUrl: string;
  caption: JsonValue;
  imageList: string[];
  createdBy: string;
}
export default function PlayerDialog({ playVideo, videoId }: iAppProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState<VideoDataScript | null>();

  useEffect(() => {
    setOpenDialog(playVideo);
    async () => {
        getData();
    }
  }, [playVideo]);

  const getData = async () => {
    const result = await db.videoData.findUnique({
      where: {
        id: videoId,
      },
    });
    console.log({ result });
    setData(result);
  };

  return (
    <Dialog open={openDialog}>
      <DialogContent className="flex flex-col justify-center items-center gap-5">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Generated Video!
          </DialogTitle>
          <DialogDescription>
            {JSON.stringify(data)}
            {/* <Player
              component={RemotionVideo}
              durationInFrames={120}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
            /> */}
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full items-center justify-between px-5">
          <Button variant="ghost">Cancel</Button>
          <Button>Export</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
