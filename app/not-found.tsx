import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className=" max-w-[1000px] mx-auto flex flex-col justify-center items-center">
      <Card className="w-80 flex flex-col justify-center items-center min-h-[400px] mt-10 max-sm:w-64  ">
        <h1 className=" text-xl font-semibold text-center">
          Please Login or Register to
          <br className=" max-sm:hidden" /> access this feature
        </h1>
        <div className=" flex flex-col w-72 max-sm:w-56 gap-y-4 mt-6">
          <Button variant={"secondary"} asChild>
            <RegisterLink>Sign up</RegisterLink>
          </Button>
          <Button asChild>
            <LoginLink>Log in</LoginLink>
          </Button>
        </div>
        <p className=" font-medium">
          or return to{" "}
          <Link href={"/"} className=" text-blue-500 font-medium">
            homepage.
          </Link>
        </p>
      </Card>
    </div>
  );
}
