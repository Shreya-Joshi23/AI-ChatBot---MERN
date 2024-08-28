import { Box, useMediaQuery, useTheme } from "@mui/material";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/Footer/Footer";
import robo from "../assets/robo.png"
import chats from "../assets/chats.png"
import ".././index.css"

const Home = () => {

  const theme=useTheme();
  const isBelowMd=useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        mx: "auto",
        mt: 3,
        mb:0
      }}
    >
      <Box>
        <TypingAnim />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { md: "row", xs: "column",sm:"column" },
          gap: 5,
          my: 10,
        }}
      >
        <img src={robo} className="imganimation" alt="robot" style={{ height:"250Spx",width: "200px", margin: "auto" }} />
      </Box>
      <Box sx={{ display: "flex", width: "100%", mx: "auto" }}>
        <img
          src={chats}
          alt="chatbot"
          style={{
            display: "flex",
            margin: "auto",
            width: isBelowMd? "80%":"60%",
            borderRadius: 20,
            boxShadow: "-5px -5px 105px #64f3d5",
            marginTop:20,
            marginBottom:20
          }}
        />
      </Box>
      <Footer/>
    </Box>
  );
};

export default Home;
