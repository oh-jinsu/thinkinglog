"use client";

import { cn } from "@/parent/frontend/lib/element";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
    href: string;
    children: React.ReactNode;
};

export default function Tab({ href, children }: Props) {
    const pathname = usePathname();

    const last = pathname.split("/").pop();

    const active = last === href.split("/").pop();

    return (
        <li className="flex-1">
            <Link
                href={href}
                className={cn(
                    "text-center py-4 border-b-2 block w-full h-full hover:bg-gray-100",
                    active ? "border-b-gray-700 text-gray-700" : "text-gray-400",
                )}
            >
                {children}
            </Link>
        </li>
    );
}
