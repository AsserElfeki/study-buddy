import { RegisterForm } from "./form";

export default function RegisterPage() {
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen pt-20 min-w-full">
        <div className="container mx-auto px-6 py-12 h-full flex flex-col justify-center items-center w-full">
          <div className="w-full px-8 py-10">
            <RegisterForm />
          </div>
          {/* <HaveAccount /> */}
        </div>
      </section>
    </>
  );
}
