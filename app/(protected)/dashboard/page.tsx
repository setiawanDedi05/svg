import { ButtonLink } from "@/components/ui/buttonLink";
import { PlusCircleIcon } from "lucide-react";
import React from "react";
import { EmptyState } from "../_components/EmptyState";
import { db } from "@/app/server/db";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RemotionVideo } from "../_components/RemotionVideo";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PlayerModal from "../_components/PlayerModal";

const getData = async (userId: string) => {
  const data = await db.videoData.findMany({
    where: {
      createdBy: userId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
};

async function Dashboard() {
  const { userId } = await auth();
  const data = await getData(userId as string);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <ButtonLink
          href="/create-new"
          icon={<PlusCircleIcon />}
          label="Create New"
        />
      </div>
      {data.length ? (
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>List Video</CardTitle>
          </CardHeader>
          <CardContent className="w-full grid grid-cols-2 gap-2">
            {data.map((video) => (
              <PlayerModal key={video.id} video={video} />
            ))}
          </CardContent>
        </Card>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

export default Dashboard;
