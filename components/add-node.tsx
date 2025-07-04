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
import { Node } from "@xyflow/react";
import { nodes } from "@/data/nodes";
import { Button } from "@/components/ui/button";

interface AddNodeProps {
  handleAddNode: (node: Node) => void;
}

const AddNode = ({ handleAddNode }: AddNodeProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Node</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Node</DialogTitle>
          <div className="flex flex-wrap gap-2  ">
            {nodes.map((node) => (
              <Button
                key={node.type}
                onClick={() => {
                  handleAddNode({
                    ...node,
                    id: new Date().getTime().toString(),
                  });
                  setOpen(false);
                }}
                className="px-4 py-2 rounded border"
              >
                {node.data.label}
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
