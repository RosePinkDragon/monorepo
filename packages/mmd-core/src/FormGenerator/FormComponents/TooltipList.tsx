import { Box, Typography } from "@mui/material";

const TooltipList = ({ tooltips }: { tooltips: string[] }) => {
  return (
    <Box>
      {tooltips.map((tooltip) => {
        return <Typography key={tooltip}>{tooltip}</Typography>;
      })}
    </Box>
  );
};

export default TooltipList;
