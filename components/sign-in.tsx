import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function SignIn({ label }: { label: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/workflow" });
      }}
    >
      <Button
        size="lg"
        className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        {label}
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
}
