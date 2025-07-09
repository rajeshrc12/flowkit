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
                <SelectItem value="google_sheets">Google Sheets</SelectItem>
                <SelectItem value="slack">Slack</SelectItem>
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
            {type === "google_sheets" && (
              <div>
                <Button
                  onClick={() =>
                    window.open(
                      "/api/google/auth",
                      "_blank",
                      "width=500,height=600"
                    )
                  }
                >
                  Connect with Google
                </Button>
              </div>
            )}
            {type === "slack" && (
              <div>
                <Button
                  onClick={() =>
                    window.open(
                      "/api/slack/auth",
                      "_blank",
                      "width=500,height=600"
                    )
                  }
                >
                  Connect with Slack
                </Button>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={createCredential}>Save</Button>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCredential;
