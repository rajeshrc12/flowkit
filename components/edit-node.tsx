"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { setEditNode } from "@/app/slices/editNodeSlice";
import GeminiCredential from "@/components/gemini-credential";

const EditNode = () => {
  const editNode = useSelector((state: RootState) => state.editNode);
  const dispatch = useDispatch();
  console.log(editNode);
  if (!!editNode?.type)
    return (
      <Dialog
        open={!!editNode?.type}
        onOpenChange={(value) => dispatch(setEditNode({ type: value }))}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {(editNode.type as string)?.toUpperCase()} Credential
            </DialogTitle>
          </DialogHeader>
          {editNode.type === "gemini" && <GeminiCredential />}
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
};

export default EditNode;
