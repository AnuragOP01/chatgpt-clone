"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  href: string;
  label: string;
}

export function BackButton({ href, label }: Props) {
  return (
    <Button size="sm" variant="link" className="w-full font-normal" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
