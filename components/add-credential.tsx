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
import { Input } from "./ui/input";
import axios from "axios";

const AddCredential = () => {
  const [typeDialog, setTypeDialog] = useState(false);
  const [detailDialog, setDetailDialog] = useState(false);
  const [data, setData] = useState<any>({});
  const handleCreateCredentialType = () => {
    setTypeDialog((prev) => !prev);
  };
  const saveCredentialType = () => {
    if (!data?.type) {
      toast.error("Please select a credential type");
      return;
    }
    if (data?.type === "google_sheets") {
      window.open("/api/google/auth", "_blank", "width=500,height=600");
    }
    if (data?.type === "slack") {
      window.open("/api/slack/auth", "_blank", "width=500,height=600");
    }
    if (data?.type === "telegram") {
      setDetailDialog((prev) => !prev);
    }
    setTypeDialog((prev) => !prev);
  };
  const saveCredentialDetail = async () => {
    if (data?.type === "telegram") {
      const response = await axios.post("/api/telegram/bot", {
        accessToken: data?.accessToken,
      });
      console.log(response.data);
    }
    setDetailDialog((prev) => !prev);
    setData({});
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
            <Select
              value={data?.type}
              onValueChange={(value) => setData({ ...data, type: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Credential Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google_sheets">Google Sheets</SelectItem>
                <SelectItem value="slack">Slack</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={saveCredentialType}>Connect</Button>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={detailDialog} onOpenChange={setDetailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Details</DialogTitle>
          </DialogHeader>
          <div>
            {data?.type === "telegram" && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <div>Telegram bot token</div>
                  <Input
                    value={data?.accessToken || ""}
                    onChange={(e) =>
                      setData({ ...data, accessToken: e.target.value })
                    }
                    placeholder="Enter bot token"
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={saveCredentialDetail}>Save</Button>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCredential;
