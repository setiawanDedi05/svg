import Link from "next/link";
import React from "react";

export function ButtonLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon?: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex rounded-md bg-secondary text-secondary-foreground justify-center items-center p-3 gap-2 transition-all hover:bg-primary hover:text-primary-foreground"
    >
      {icon}
      {label}
    </Link>
  );
}
