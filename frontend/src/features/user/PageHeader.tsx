import { Box, IconButton, useTheme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../assets/peerprep-logo-nobg.png";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function PageHeader() {
  const theme = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <Box
      sx={{
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "white",
        borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
      }}
    >
      <img
        src={logo}
        alt="logo icon"
        style={{
          width: "100%",
          maxWidth: 150,
          filter: "invert(20%)",
          padding: theme.spacing(0.8, 1, 0.6, 1),
        }}
      />
      <IconButton onClick={handleLogout} sx={{ mr: 1 }} title="Logout">
        <LogoutIcon />
      </IconButton>
    </Box>
  );
}

export default PageHeader;
