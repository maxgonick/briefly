import { Typography, Box } from "@mui/material";

export default function Email(props: {
  emailSubject: string;
  emailBody: string;
}) {
  return (
    <div className="flex flex-col">
      <Typography
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          fontSize: 24,
          textIndent: 1,
          flex: 1,
          padding: 2,
          color: "#362419",
        }}
      >
        Subject:
      </Typography>
      <Box
        sx={{
          margin: 1,
          width: 1,
          backgroundColor: "#FAF9F6",
          borderRadius: 2,
          boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
          flexGrow: 1,
        }}
      >
        <div>
          <Typography
            variant="h6"
            component="div"
            className="break-words"
            sx={{
              flexGrow: 1,
              fontSize: 24,
              textIndent: 1,
              flex: 1,
              padding: 2,
              color: "#362419",
            }}
          >
              {props.emailSubject}
              <br />
          </Typography>
        </div>
      </Box>
      <Typography
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          fontSize: 24,
          textIndent: 1,
          flex: 1,
          padding: 2,
          color: "#362419",
        }}
      >
        Body:
      </Typography>
      <Box
        sx={{
          margin: 1,
          marginTop: 1,
          width: 1,
          backgroundColor: "#FAF9F6",
          borderRadius: 2,
          boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          className="break-words"
          sx={{
            flexGrow: 1,
            fontSize: 24,
            textIndent: 1,
            flex: 1,
            padding: 2,
            color: "#362419",
          }}
        >
            {props.emailBody}
            <br />
        </Typography>
      </Box>
    </div>
  );
}
