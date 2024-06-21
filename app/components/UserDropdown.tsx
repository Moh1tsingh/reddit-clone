import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface iAppsProps{
    UserImg: string | null
}

export default function UserDropdown({ UserImg}:iAppsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className=" rounded-xl border p-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className=" size-6 lg:size-5" />
          <img
            src={
              UserImg ??
              "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
            }
            alt="avatar"
            className=" rounded-full size-7 hidden lg:block"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className=" w-[200px]">
        <DropdownMenuItem>
          <Link className="w-full" href={"/r/create"}>
            Create Community
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href={"/create"}>
            Create Post
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href={"/settings"}>
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutLink className=" w-full">Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
