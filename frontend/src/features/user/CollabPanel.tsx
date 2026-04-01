import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { SvgIconComponent } from "@mui/icons-material";

interface CollabPanelProps {
  title: string;
  Icon: SvgIconComponent;
  children?: ReactNode;
  headerActions?: ReactNode;
}

function CollabPanel({
  title,
  Icon,
  children = null,
  headerActions,
}: CollabPanelProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        bgcolor: "white",
        border: "1px solid",
        borderColor: "grey.400",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1,
          bgcolor: "grey.300",
          borderBottom: "1px solid",
          borderColor: "grey.300",
          flexShrink: 0,
        }}
      >
        <Icon sx={{ fontSize: 18, color: "grey.600" }} />
        <Typography
          variant="body2"
          fontWeight={600}
          color="grey.700"
          sx={{ flexGrow: 1 }}
        >
          {title}
        </Typography>
        {headerActions}
      </Box>

      {/* Content */}
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>{children}</Box>
    </Box>
  );
}

export default CollabPanel;
