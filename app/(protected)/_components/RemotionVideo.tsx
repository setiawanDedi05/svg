"use client";

import { JsonValue } from "@prisma/client/runtime/library";
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface iAppsProps {
  id?: string;
  caption?: JsonValue;
  script?: JsonValue;
  audioUrl?: string;
  imageList?: string[];
  createdBy?: string;
  setDurationFrame?: (frameValue: number) => void;
}

interface Caption {
  end: number;
  text: string;
  start: number;
  speaker?: any;
  confidence: number;
}

export function RemotionVideo({
  script,
  imageList,
  audioUrl,
  caption,
  setDurationFrame,
}: iAppsProps) {
  const captions = caption as unknown as Caption[];
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const getDurationFrame = () => {
    const durationFrame = Math.ceil(
      ((captions[captions?.length - 1]?.end + 1000) / 1000) * fps
    );
    setDurationFrame && setDurationFrame(durationFrame);
    return durationFrame;
  };
  const getCurrentCaption = () => {
    const currentTime = (frame / 30) * 1000;
    const currentCaption = captions.find(
      (word) => currentTime >= word.start && currentTime <= word.end
    );
    return currentCaption ? currentCaption.text : "";
  };
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
      }}
    >
      {imageList?.map((item, index) => (
        <>
          <Sequence
            key={index}
            from={(index * getDurationFrame()) / imageList.length}
            durationInFrames={getDurationFrame()}
          >
            <Img
              src={item}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {setDurationFrame && (
              <AbsoluteFill className="mt-80 flex justify-center items-center !h-10">
                {getCurrentCaption() !== "" && (
                  <h2 className="text-white bg-black/30 px-5 py-2">
                    {getCurrentCaption()}
                  </h2>
                )}
              </AbsoluteFill>
            )}
          </Sequence>
        </>
      ))}
      <Audio src={audioUrl} />
    </AbsoluteFill>
  );
}
