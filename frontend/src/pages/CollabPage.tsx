import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  Typography,
  Chip,
} from "@mui/material";
import PageHeader from "../features/user/PageHeader";
import UseCollabSession from "../hooks/useCollabSession";
import CollabPanel from "../features/user/CollabPanel";
import CodeIcon from "@mui/icons-material/Code";
import ChatIcon from "@mui/icons-material/Chat";
import ArticleIcon from "@mui/icons-material/Article";
import { red, pink, cyan, blue, green, orange } from "@mui/material/colors";
import { Editor } from "@monaco-editor/react";

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
          gridTemplateColumns: "44% calc(56% - 12px)",
          gridTemplateRows: "1fr 1fr",
          gap: 1.5,
          p: 1.5,
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <Box sx={{ gridRow: "1 / 2", gridColumn: "1 /2", height: "100%" }}>
          <CollabPanel
            title="Question"
            Icon={<ArticleIcon sx={{ color: blue["A400"] }} />}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Maximum Depth of Binary Tree
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Chip
                  variant="outlined"
                  label="Sorting & Searching Algorithms"
                  size="small"
                  sx={{
                    borderColor: pink[400],
                    bgcolor: pink[50],
                    color: pink[400],
                  }}
                />
                <Chip
                  variant="outlined"
                  label="Medium"
                  size="small"
                  sx={{
                    borderColor: cyan[400],
                    bgcolor: cyan[50],
                    color: cyan[400],
                  }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {question?.description ?? "Loading..."}
                Given an array of integers nums and an integer target, return
                indices of the two numbers such that they add up to target. You
                may assume that each input would have exactly one solution, and
                you may not use the same element twice.
              </Typography>
            </Box>
          </CollabPanel>
        </Box>

        <Box sx={{ gridRow: "1 / 3", gridColumn: "2 / 3", height: "100%" }}>
          <CollabPanel
            title="Code Editor"
            Icon={<CodeIcon sx={{ color: green[500] }} />}
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
            <Editor
              height="100%"
              language="python"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: "on",
              }}
            />
          </CollabPanel>
        </Box>

        <Box sx={{ gridRow: "2 / 3", gridColumn: "1 / 2", height: "100%" }}>
          <CollabPanel
            title="Communication"
            Icon={<ChatIcon sx={{ color: orange[400] }} />}
          >
            {/* chat / video goes here */}
          </CollabPanel>
        </Box>
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
