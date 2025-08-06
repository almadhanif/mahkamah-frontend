import { AuthenticationForm } from "@/components/ui/login";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">
        Welcome to Krakatau Steel
      </h1>
      <AuthenticationForm />
    </main>
  );
}
