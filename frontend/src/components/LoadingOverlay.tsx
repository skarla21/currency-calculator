import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

const LoadingOverlay = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)", //subtle overlay for better contrast
      }}
    >
      <Card
        sx={{
          minWidth: 300,
          padding: 4,
          borderRadius: 4,
          backgroundColor: "lightblue",
          boxShadow: 5,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "primary.main", marginBottom: 3 }} />
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            Initial loading may take up to 1 min due to free server instance on
            Render...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoadingOverlay;
