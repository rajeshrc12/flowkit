"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSWR from "swr";
import { fetcher } from "@/utils/api";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";

const GeminiCredential = () => {
  const { workflowId } = useParams();
  const { data, error, isLoading, mutate } = useSWR(
    `/api/credential/gemini`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0, // No polling
    }
  );
  const [selectedCredential, setSelectedCredential] = useState("");
  if (!data || isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error while loading credentials...</p>;
  }
  const onSave = async () => {
    const axios = require("axios");
    const response = await axios.patch("/api/workflow", {
      id: workflowId,
      credentialId: selectedCredential,
    });
    console.log(response.data);
  };
  return (
    <div>
      <Select value={selectedCredential} onValueChange={setSelectedCredential}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select gemini credential" />
        </SelectTrigger>
        <SelectContent>
          {data?.credentials?.map((credential: any) => (
            <SelectItem key={credential.id} value={credential.id}>
              {credential.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={async () => {}}>Save</Button>
    </div>
  );
};

export default GeminiCredential;
