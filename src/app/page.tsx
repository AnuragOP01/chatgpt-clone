import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth"

async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
}

export default async function Home() {
  const session = await getUser();

  return (
    <div className=" flex flex-col justify-evenly">
      {/* <ThemeToggle/> */}
      {JSON.stringify(session)}
    </div>
  );
}