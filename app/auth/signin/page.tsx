import MainFooter from "@/frontend/components/main/footer";
import MainHeader from "@/frontend/components/main/header";
import SignInForm from "@/frontend/components/signin_form";
export default async function Page() {
    return (
        <>
            <MainHeader />
            <div className="flex-1 flex flex-col justify-center items-center min-h-[400px] md:min-h-[600px]">
                <h1 className="text-3xl font-bold mb-6">로그인</h1>
                <SignInForm />
            </div>
            <MainFooter />
        </>
    );
}
