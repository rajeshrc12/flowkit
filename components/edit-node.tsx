"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { resetEditNode } from "@/app/slices/editNodeSlice";
import GeminiCredential from "@/components/gemini-credential";
import PineconeCredential from "@/components/pinecone-credential";
import GeminiEmbeddingCredential from "@/components/gemini-embedding-credential";

const EditNode = () => {
  const editNode = useSelector((state: RootState) => state.editNode);
  const dispatch = useDispatch();
  console.log(editNode);
  if (!!editNode?.type)
    return (
      <Dialog
        open={!!editNode?.type}
        onOpenChange={(value) => {
          console.log("Dialog", value);
          dispatch(resetEditNode());
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {(editNode.type as string)?.toUpperCase()} Credential
            </DialogTitle>
          </DialogHeader>
          {editNode.type === "gemini" && <GeminiCredential />}
          {editNode.type === "geminiEmbedding" && <GeminiEmbeddingCredential />}
          {editNode.type === "pinecone" && <PineconeCredential />}
        </DialogContent>
      </Dialog>
    );
};

export default EditNode;
