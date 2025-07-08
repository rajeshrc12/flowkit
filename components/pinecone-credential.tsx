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
import { geminiModels } from "@/data/models";
import { Label } from "@/components/ui/label";

const PineconeCredential = () => {
  const { workflowId } = useParams();
  const editNode = useSelector((state: RootState) => state.editNode);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useSWR(
    `/api/credential/pinecone`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0, // No polling
    }
  );
  const {
    data: indexData,
    error: indexError,
    isLoading: indexLoading,
  } = useSWR(`/api/pinecone`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0, // No polling
  });
  const [selectedCredential, setSelectedCredential] = useState(
    editNode.credentialId || ""
  );
  const [selectedIndex, setSelectedIndex] = useState(editNode.modelId || "");
  useEffect(() => {
    setSelectedCredential(editNode.credentialId || "");
    setSelectedIndex(editNode.modelId || "");
  }, [editNode.credentialId, editNode.modelId]);

  const onSave = async () => {
    const response1 = await axios.put("/api/workflow", {
      workflowId,
      credentialKey: "credentialId",
      credentialValue: selectedCredential,
      nodeId: editNode.id,
    });
    const response2 = await axios.put("/api/workflow", {
      workflowId,
      credentialKey: "index",
      credentialValue: selectedIndex,
      nodeId: editNode.id,
    });
    dispatch(resetEditNode());
    // console.log(response1.data, response2.data);
  };
  if (!data || isLoading || !editNode || !indexData || indexLoading) {
    return <p>Loading...</p>;
  }

  if (error || indexError) {
    return <p>Error while loading credentials...</p>;
  }
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="credential">Credential</Label>
      <Select value={selectedCredential} onValueChange={setSelectedCredential}>
        <SelectTrigger id="credential" className="w-full">
          <SelectValue placeholder="Select pinecone credential" />
        </SelectTrigger>
        <SelectContent>
          {data?.credentials?.map((credential: any) => (
            <SelectItem key={credential.id} value={credential.id}>
              {credential.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Label htmlFor="index">Index</Label>
      <Select value={selectedIndex} onValueChange={setSelectedIndex}>
        <SelectTrigger id="index" className="w-full">
          <SelectValue placeholder="Select pinecone index" />
        </SelectTrigger>
        <SelectContent>
          {indexData?.indexList?.indexes?.map((index: any) => (
            <SelectItem key={index.name} value={index.name}>
              {index.name}
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

export default PineconeCredential;
