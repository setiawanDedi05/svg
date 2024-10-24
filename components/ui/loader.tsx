import React from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import Image from "next/image";

export function Loader({ loading }: { loading: boolean }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="flex flex-col items-center my-10">
        <Image src={"/loading.gif"} alt="Loading" width={100} height={100} />
        <h2>Generating your video... Do not Refresh</h2>
      </AlertDialogContent>
    </AlertDialog>
  );
}
