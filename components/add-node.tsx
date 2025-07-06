import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { nodes } from "@/data/nodes";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { setAddNodeModal } from "@/app/slices/nodeSlice";
import { Node } from "@/types/node";

interface AddNodeProps {
  handleAddNode: (node: Node) => void;
}

const AddNode = ({ handleAddNode }: AddNodeProps) => {
  const addNodeModal = useSelector(
    (state: RootState) => state.node.addNodeModal
  );
  const dispatch = useDispatch();
  const setOpen = (open: boolean) => {
    dispatch(setAddNodeModal(open));
  };
  if (!addNodeModal) return;
  return (
    <Dialog open={!!addNodeModal} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Node</DialogTitle>
          <div className="flex flex-wrap gap-2  ">
            {nodes.map((node: Node) => (
              <Button
                key={node.id}
                onClick={() => {
                  handleAddNode(node);
                  setOpen(false);
                }}
                className="px-4 py-2 rounded border"
              >
                {node.label}
              </Button>
            ))}
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNode;
