import { LoginForm } from "./form";

export default function LoginPage() {
  return (
    <>
      {/* <Header /> */}
      <section className="bg-ct-blue-600 min-h-screen pt-20 w-full">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="w-full px-8 py-10 ">
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
}
