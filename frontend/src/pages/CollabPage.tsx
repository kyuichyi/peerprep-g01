import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import PageHeader from "../features/user/PageHeader";
import UseCollabSession from "../hooks/useCollabSession";
import CollabPanel from "../features/user/CollabPanel";
import CodeIcon from "@mui/icons-material/Code";
import ChatIcon from "@mui/icons-material/Chat";
import ArticleIcon from "@mui/icons-material/Article";
import { red } from "@mui/material/colors";

function CollabPage() {
  const {
    question,
    partnerStatus,
    language,
    setLanguage,
    handleEditorMount,
    handleLeave,
  } = UseCollabSession();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <PageHeader />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "49% 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 2,
          p: 2,
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <Box sx={{ gridRow: "1 / 2", gridColumn: "1 /2" }}>
          <CollabPanel title="Question" Icon={ArticleIcon}>
            <Box sx={{ p: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {question?.description ?? "Loading..."}
              </Typography>
            </Box>
          </CollabPanel>
        </Box>

        <Box sx={{ gridRow: "1 / 3", height: "100%" }}>
          <CollabPanel
            title="Code Editor"
            Icon={CodeIcon}
            headerActions={
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                size="small"
                sx={{ fontSize: 12, height: 28, bgcolor: "white" }}
              >
                {["javascript", "typescript", "python", "java", "cpp"].map(
                  (lang) => (
                    <MenuItem key={lang} value={lang} sx={{ fontSize: 12 }}>
                      {lang}
                    </MenuItem>
                  ),
                )}
              </Select>
            }
          >
            {/* Monaco editor goes here */}
          </CollabPanel>
        </Box>

        <CollabPanel title="Communication" Icon={ChatIcon}>
          {/* chat / video goes here */}
        </CollabPanel>
      </Box>
      <Container
        maxWidth="sm"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Button
          variant="contained"
          sx={{ marginBottom: 2, bgcolor: red["A400"] }}
        >
          Leave Session
        </Button>
      </Container>
    </Box>
  );
}

export default CollabPage;
