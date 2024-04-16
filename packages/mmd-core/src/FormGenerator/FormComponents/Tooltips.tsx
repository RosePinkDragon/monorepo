import { Icon, Tooltip } from "@mui/material";
import TooltipList from "./TooltipList";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Tooltips = ({ tooltips }: { tooltips: string[] }) => {
  return (
    <Tooltip placement="top" title={<TooltipList tooltips={tooltips} />}>
      <Icon sx={{ fontSize: 20 }}>
        <AiOutlineInfoCircle />
      </Icon>
    </Tooltip>
  );
};

export default Tooltips;
