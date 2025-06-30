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
  const [selectedModel, setSelectedModel] = useState(editNode.modelId || "");
  useEffect(() => {
    setSelectedCredential(editNode.credentialId || "");
  }, [editNode.credentialId]);

  const onSave = async () => {
    const response1 = await axios.put("/api/workflow", {
      workflowId,
      credentialKey: "credentialId",
      credentialValue: selectedCredential,
      nodeId: editNode.id,
    });
    const response2 = await axios.put("/api/workflow", {
      workflowId,
      credentialKey: "modelId",
      credentialValue: selectedModel,
      nodeId: editNode.id,
    });
    dispatch(resetEditNode());
    console.log(response1.data, response2.data);
  };
  if (!data || isLoading || !editNode) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error while loading credentials...</p>;
  }
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="credential">Credential</Label>
      <Select value={selectedCredential} onValueChange={setSelectedCredential}>
        <SelectTrigger id="credential" className="w-full">
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
      <Label htmlFor="model">Model</Label>
      <Select value={selectedModel} onValueChange={setSelectedModel}>
        <SelectTrigger id="model" className="w-full">
          <SelectValue placeholder="Select gemini model" />
        </SelectTrigger>
        <SelectContent>
          {geminiModels.map((model: any) => (
            <SelectItem key={model.id} value={model.id}>
              {model.name}
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
