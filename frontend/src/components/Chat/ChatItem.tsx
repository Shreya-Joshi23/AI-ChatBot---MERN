import { Avatar, Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import robot from "../../assets/robot.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function extractCodefromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("(") ||
    str.includes(")") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

const ChatItem = ({ content, role }: { content: string; role: string }) => {
  const messageBlocks = extractCodefromString(content);
  const auth = useAuth();
  return role === "model" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        borderRadius: 2,
        bgcolor: "#004d5612",
        my: 1,
        gap: 2,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src={robot} alt="chatbot" width={"30px"} />
      </Avatar>
      <Box>
        {/* <Typography fontSize={"20px"}>{content}</Typography> */}
        {!messageBlocks && (
          // <Typography sx={{ fontSize: "20px" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          // </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block,index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                style={coldarkDark}
                language={messageBlocks[0]}
                key={index}
              >
                {block}
              </SyntaxHighlighter>
            ) : (

            <ReactMarkdown remarkPlugins={[remarkGfm]} key={index}>{block}</ReactMarkdown>      
                )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        borderRadius: 2,
        p: 2,
        bgcolor: "#004d56",
        my: 2,
        gap: 2,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "blueviolet", color: "white" }}>
        {auth?.user?.name[0]}
        {/* {auth?.user?.name.split(" ")[1][0]} */}
      </Avatar>
      <Box>
        {!messageBlocks && (
          // <Typography sx={{ fontSize: "20px" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          // </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
          // <Typography sx={{ fontSize: "20px" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{block}</ReactMarkdown>
          // </Typography>   
           )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
