"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from "react";
import Image from 'next/image';

export const RegisterForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/profile";
    
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("")
        // setFormValues({ firstName: "", lastName: "", email: "", password: "" });

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setLoading(false);
            if (!res.ok) {
                setError((await res.json()).message);
                return;
            }
            //login with the newly created credentials
            const { email, password } = formValues;
            // console.log(email, password)
            const signInRes = await signIn("credentials", {
                redirect: true,
                callbackUrl: "http://localhost:3000/about/",
                email,
                password,
            });
            if (signInRes?.error) {
                setError(signInRes.error);
                return;
            }

        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const input_style =
        "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

    return (
        <form
            className="w-full max-w-md mx-auto"
            onSubmit={onSubmit}>
            {error && (
                <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
            )}
            <div className="mb-6">
                <input
                    required
                    type="name"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className={`${input_style}`}
                />
            </div>
            <div className="mb-6">
                <input
                    required
                    type="name"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className={`${input_style}`}
                />
            </div>
            <div className="mb-6">
                <input
                    required
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={`${input_style}`}
                />
            </div>
            <div className="mb-6">
                <input
                    required
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`${input_style}`}
                />
            </div>

            <div className='flex flex-col justify-between gap-4 flex-auto '>
            <button
                type="submit"
                className=" inline-block px-7 py-4 bg-red-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full disabled:bg-gray-400"
                disabled={loading}
            >
                {loading ? "loading..." : "Sign Up"}
            </button>

            <a
                className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                style={{ backgroundColor: "#3b5998" }}
                onClick={() => signIn("google", { callbackUrl })}
                role="button"
            >
                <Image
                    className="pr-2"
                    src="/images/google.svg"
                    alt=""
                    width={60}
                    height={60}
                />
                Continue with Google
                </a>
            </div>

        </form>
    );
};
