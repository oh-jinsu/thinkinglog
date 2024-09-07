import MainHeader from "./components/main/header";

type Props = {
    actions?: React.ReactNode;
    children?: React.ReactNode;
};

export default async function UserLayout({ actions, children }: Props) {
    return (
        <>
            <MainHeader>{actions}</MainHeader>
            <main className="max-w-[800px] w-full mx-auto">{children}</main>
        </>
    );
}
