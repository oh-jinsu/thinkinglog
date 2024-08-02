import UserHeader from "./user_header";

type Props = {
    userId: string;
    actions?: React.ReactNode;
    children: React.ReactNode;
};

export default async function UserLayout({ userId, actions, children }: Props) {
    return (
        <div className="max-w-[800px] mx-auto">
            <UserHeader userId={userId}>{actions}</UserHeader>
            {children}
        </div>
    );
}
