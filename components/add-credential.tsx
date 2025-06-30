import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AddCredential = ({ mutate }: { mutate: () => void }) => {
  const [typeDialog, setTypeDialog] = useState(false);
  const [dataDialog, setDataDialog] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState({ apiKey: "" });
  const createCredential = async () => {
    const response = await axios.post("/api/credential", {
      name,
      type,
      data,
    });
    if (response.status === 201) {
      toast.success("Credential created successfully");
    }
    setDataDialog(false);
    setTypeDialog(false);
    setData({ apiKey: "" });
    setType("");
    setName("");
    mutate();
  };
  const handleCreateCredentialType = () => {
    setTypeDialog((prev) => !prev);
  };
  const saveCredentialType = () => {
    if (!type) {
      toast.error("Please select a credential type");
      return;
    }
    setTypeDialog((prev) => !prev);
    setDataDialog((prev) => !prev);
  };
  return (
    <div>
      <Button onClick={handleCreateCredentialType}>Create Credential</Button>
      <Dialog open={typeDialog} onOpenChange={setTypeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Credential</DialogTitle>
          </DialogHeader>
          <div>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Credential Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="gemini">Gemini</SelectItem>
                <SelectItem value="pinecone">Pinecone</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={saveCredentialType}>Next</Button>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={dataDialog} onOpenChange={setDataDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{type.toUpperCase()} </DialogTitle>
            <DialogDescription>Add Account Details</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 w-full">
            <div className="grid items-center gap-3">
              <Label htmlFor="apiKey">Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                placeholder="Name"
              />
            </div>
            <div className="grid items-center gap-3">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                value={data.apiKey}
                onChange={(e) => setData({ ...data, apiKey: e.target.value })}
                type="text"
                id="apiKey"
                placeholder="API Key"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={createCredential}>Create</Button>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCredential;
