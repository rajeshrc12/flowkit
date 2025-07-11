import React from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setAddNodeModal } from "@/app/slices/nodeSlice";

const withBottomConnector = (WrappedComponent: React.ComponentType) => {
  const ComponentWithConnector = (props: any) => {
    const dispatch = useDispatch();
    const handleAddNode = () => {
      dispatch(setAddNodeModal(true));
    };
    return (
      <div>
        <div className="flex flex-col items-center py-2">
          <div className="h-[30px] border-l border-primary" />
        </div>
        <WrappedComponent {...props} />
        <div className="flex flex-col items-center gap-2">
          <div className="h-[30px] border-l border-primary" />
          <FiPlus
            size={25}
            onClick={handleAddNode}
            className="cursor-pointer"
          />
        </div>
      </div>
    );
  };

  return ComponentWithConnector;
};

export default withBottomConnector;
