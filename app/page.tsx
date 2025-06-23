import SignIn from "@/components/sign-in";
import { auth } from "@/auth";
import SignOut from "@/components/sign-out";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <div>
      {session ? <SignOut /> : <SignIn />}
      <div>{session?.user?.name}</div>
    </div>
  );
}
