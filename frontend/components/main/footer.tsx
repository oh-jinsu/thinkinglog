import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

export default function MainFooter({ children }: Props) {
    return (
        <div className="text-sm text-center text-gray-400">
            Copyright © {new Date().getFullYear()} Goodvation. All rights reserved.
        </div>
    );
}
