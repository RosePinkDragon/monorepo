import { Typography } from "@mui/material";

const SectionHeading = ({ heading }: { heading: string }) => {
  return (
    <Typography
      variant="h4"
      paddingBottom="0.6rem"
      marginBottom="0.4rem"
      sx={{
        position: "relative",
        ":after": {
          content: "''",
          position: "absolute",
          backgroundColor: "yellow.main",
          height: "0.2rem",
          width: "4rem",
          left: 0,
          bottom: 0,
        },
      }}
    >
      {heading}
    </Typography>
  );
};

export default SectionHeading;
