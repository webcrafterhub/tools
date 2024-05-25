import Navbar from "./Navbar";
import { auth, signOut } from "@/auth";

export default async function Nav() {
  const session = await auth();
  return <Navbar session={session} />;
}
