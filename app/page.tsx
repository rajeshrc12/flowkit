import SignIn from "@/components/sign-in";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between p-2">
        <div className="font-bold text-2xl">Flowkit</div>
        <SignIn />
      </div>
      <div className="text-4xl text-center mt-20 font-bold">
        Automate with Agents. Orchestrate Workflows. All in One Kit.
      </div>
    </div>
  );
}
