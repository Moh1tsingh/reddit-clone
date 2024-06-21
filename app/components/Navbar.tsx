import RedditText from "@/public/logo-name.svg";
import redditMobile from "@/public/reddit-full.svg";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserDropdown from "./UserDropdown";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="h-[10vh] flex items-center border-b px-5 lg:px-14 justify-between">
      <Link href={"/"} className=" flex items-center gap-x-3">
        <Image
          src={redditMobile}
          alt="reddit mobile icon"
          className=" h-10 w-fit"
        />
        <Image
          src={RedditText}
          alt="Reddit Text"
          className="h-9 hidden lg:block w-fit"
        />
      </Link>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        {user ? (
          <UserDropdown UserImg={user.picture} />
        ) : (
          <div className=" flex gap-x-3 items-center">
            <Button variant={"secondary"} asChild>
              <RegisterLink>Sign up</RegisterLink>
            </Button>
            <Button asChild>
              <LoginLink>Log in</LoginLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
