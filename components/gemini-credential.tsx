"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSWR from "swr";
import { fetcher } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { resetEditNode } from "@/app/slices/editNodeSlice";
import { toast } from "sonner";

const GeminiCredential = () => {
  const { workflowId } = useParams();
  const editNode = useSelector((state: RootState) => state.editNode);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useSWR(`/api/credential/gemini`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0, // No polling
  });
  const [selectedCredential, setSelectedCredential] = useState(
    editNode.credentialId || ""
  );
  useEffect(() => {
    setSelectedCredential(editNode.credentialId || "");
  }, [editNode.credentialId]);

  const onSave = async () => {
    const response = await axios.put("/api/workflow", {
      workflowId,
      credentialId: selectedCredential,
      nodeId: editNode.id,
    });
    if (response.data.result.matchedCount) {
      dispatch(resetEditNode());
      toast("Credential linked successfully");
    }
    console.log(response);
  };
  if (!data || isLoading || !editNode) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error while loading credentials...</p>;
  }
  return (
    <div className="flex flex-col gap-2">
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
      <div className="flex justify-end">
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};

export default GeminiCredential;
