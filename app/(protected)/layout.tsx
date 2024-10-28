"use client";
import React from "react";
import { Header } from "./_components/Header";
import { Loader } from "@/components/ui/loader";
import { useLoadingStore } from "../store/loading";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading } = useLoadingStore();
  return (
    <div className="min-h-screen w-full-[280px_fr]">
      <Header />
      <div className="w-full">
        <div className="p-5 w-full lg:w-1/2 mx-auto">{children}</div>
      </div>
      <Loader loading={loading} />
    </div>
  );
}

export default DashboardLayout;
