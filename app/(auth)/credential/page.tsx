"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/api";
import { Credential } from "@prisma/client";
import AddCredential from "@/components/add-credential";

const CredentialPage = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/credential`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0, // No polling
    }
  );

  if (!data || isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error while loading credentials...</p>;
  }

  return (
    <div className="pt-10 px-2">
      <div className="flex justify-between">
        <div className="font-bold text-2xl"></div>
        <AddCredential mutate={mutate} />
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {data?.credentials?.map((credential: Credential) => (
          <div
            className="border p-2 flex justify-between rounded-md"
            key={credential.id}
          >
            <div>{credential.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CredentialPage;
