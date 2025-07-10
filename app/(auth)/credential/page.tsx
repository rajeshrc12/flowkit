"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/api";
import { Credential } from "@prisma/client";
import AddCredential from "@/components/add-credential";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CiMenuKebab } from "react-icons/ci";
import { SiGooglesheets } from "react-icons/si";
import { FiSlack } from "react-icons/fi";
import { Skeleton } from "@/components/ui/skeleton";
import NodeIcon from "@/components/node-icon";

const CredentialPage = () => {
  const { data, isLoading, mutate } = useSWR(`/api/credential`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0, // No polling
  });

  return (
    <div className="p-16 flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="font-bold text-2xl">App Connections</div>
        <AddCredential mutate={mutate} />
      </div>
      <div className="flex justify-end">
        <div>
          <Input placeholder="Search" />
        </div>
      </div>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>App</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <div className="flex flex-col gap-2">
                        <Skeleton className="w-32 h-4" />
                        <Skeleton className="w-24 h-3" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Skeleton className="w-20 h-4" />
                  </TableCell>
                  <TableCell className="py-4">
                    <Skeleton className="w-28 h-4" />
                  </TableCell>
                  <TableCell className="py-4">
                    <Skeleton className="w-6 h-4" />
                  </TableCell>
                </TableRow>
              ))
            : data?.credentials?.map(
                (credential: Credential & { data: any }) => (
                  <TableRow key={credential.id}>
                    <TableCell className="flex gap-4 m-2">
                      <span>
                        <NodeIcon name={credential.type} size={30} />
                      </span>
                      <span className="flex flex-col gap-1">
                        <span>{credential.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {credential.data?.email || "email not available"}
                        </span>
                      </span>
                    </TableCell>
                    <TableCell>{credential.type}</TableCell>
                    <TableCell>{new Date().toLocaleString()}</TableCell>
                    <TableCell>
                      <CiMenuKebab />
                    </TableCell>
                  </TableRow>
                )
              )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CredentialPage;
