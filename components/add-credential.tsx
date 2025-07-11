import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import { FiPlus } from "react-icons/fi";

const AddCredential = ({ mutate }: { mutate: () => void }) => {
  const [typeDialog, setTypeDialog] = useState(false);
  const [type, setType] = useState("");

  const handleCreateCredentialType = () => {
    setTypeDialog((prev) => !prev);
  };
  const saveCredentialType = () => {
    if (!type) {
      toast.error("Please select a credential type");
      return;
    }
    if (type === "google_sheets") {
      window.open("/api/google/auth", "_blank", "width=500,height=600");
    }
    // if (type === "slack") {
    //   window.open("/api/slack/auth", "_blank", "width=500,height=600");
    // }
    setTypeDialog((prev) => !prev);
  };
  return (
    <div>
      <Button onClick={handleCreateCredentialType}>
        <FiPlus />
        Add connection
      </Button>
      <Dialog open={typeDialog} onOpenChange={setTypeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select App</DialogTitle>
          </DialogHeader>
          <div>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Credential Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google_sheets">Google Sheets</SelectItem>
                {/* <SelectItem value="slack">Slack</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={saveCredentialType}>Connect</Button>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCredential;
