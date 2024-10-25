"use client";
import React from "react";
import { Header } from "./_components/Header";
import { SideNav } from "./_components/SideNav";
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
      <div className="w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <SideNav />
        <div className="p-5">{children}</div>
      </div>
      <Loader loading={loading} />
    </div>
  );
}

export default DashboardLayout;
