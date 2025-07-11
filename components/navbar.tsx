"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetcher } from "@/utils/api";
import useSWR from "swr";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const Navbar = () => {
  const { data } = useSWR(`/api/me`, fetcher);
  return (
    <div className="flex justify-between border-b p-4">
      <div className="font-bold text-2xl">Flowkit</div>
      <Popover>
        <PopoverTrigger asChild className="cursor-pointer">
          <Avatar>
            <AvatarImage src={data?.image || ""} />
            <AvatarFallback>{data?.name?.split(" ")[0][0]}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={data?.image || ""} />
                <AvatarFallback>{data?.name?.split(" ")[0][0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="font-medium">{data?.name}</div>
                <div className="text-xs text-muted-foreground">
                  {data?.email}
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Navbar;
