import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { createClient } from "../lib/server";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/admin");
  };

  return (
    <div className="bg-background text-foreground">
      <div className="min-h-screen flex flex-col items-center">
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
          <Link
            href="/"
            className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>{" "}
            Voltar
          </Link>

          <form className="animate-in flex flex-col gap-2 text-foreground shadow-lg p-6 rounded-lg">
            <h1 className="text-center mb-6 text-3xl font-semibold">Login</h1>
            <label className="text-md" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="email"
              placeholder="you@example.com"
              required
            />
            <label className="text-md" htmlFor="password">
              Password
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
            <SubmitButton
              formAction={signIn}
              className="bg-blue-500 rounded-md px-4 py-2 text-foreground mb-2 hover:bg-blue-700"
              pendingText="Entrando..."
            >
              Entrar
            </SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}
