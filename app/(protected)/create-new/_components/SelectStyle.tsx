"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useField } from "@conform-to/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ComponentProps = {
  name: string;
  formId: string;
};

export function SelectStyle({ name, formId }: ComponentProps) {
  const [meta] = useField(name, { formId });
  const [styleSelected, setStyleSelected] = useState<string>();
  const styleOptions = [
    {
      id: 1,
      name: "Realistic",
      image: "/realistic.jpg",
    },
    {
      id: 2,
      name: "Cartoon",
      image: "/cartoon.jpg",
    },
    {
      id: 3,
      name: "3D",
      image: "/3d.jpg",
    },
    {
      id: 4,
      name: "Water Color",
      image: "/water-color.jpg",
    },
    {
      id: 5,
      name: "GTA",
      image: "/gta.jpg",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Style</CardTitle>
        <CardDescription className="text-muted-foreground">
          Select your video style
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3">
        <input
          type="hidden"
          name={meta.name}
          form={meta.formId}
          value={styleSelected}
        />
        {styleOptions.map((style) => (
          <div
            key={style.id}
            className={cn(
              "relative hover:scale-105 transition-all animate-in cursor-pointer rounded-xl",
              styleSelected === style.name &&
                "rotate-6 -translate-y-4 border-4 border-primary border-solid"
            )}
            onClick={() => setStyleSelected(style.name)}
          >
            <Image
              key={style.id}
              src={style.image}
              alt={style.name}
              width={100}
              height={100}
              className="h-48 object-cover rounded-lg w-full"
            />
            <h2 className="absolute p-1 bg-primary/50 bottom-0 w-full text-primary-foreground text-center rounded-b-md">
              {style.name}
            </h2>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
