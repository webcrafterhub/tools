import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  return <p>Welcome {JSON.stringify(session)}!</p>;
}
