import { Typography } from "@mui/material";

const FormHeading = ({ heading }: { heading: string }) => {
  return (
    <Typography
      variant="h3"
      paddingBottom="0.8rem"
      marginBottom="1rem"
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

export default FormHeading;
