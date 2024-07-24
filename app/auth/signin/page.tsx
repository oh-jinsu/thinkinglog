import SignInForm from "@/frontend/components/signin_form";

export default async function Page() {
    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-6">로그인</h1>
            <SignInForm />
        </div>
    );
}
