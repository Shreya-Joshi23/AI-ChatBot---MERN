import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/Chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { deletechats, getuserchats, sendChatRequest } from "../helpers/api-communicator";
import { useNavigate} from 'react-router-dom'
import { toast } from "react-hot-toast";

type Message={
  role:string;
  content:string;
};

const Chat = () => {
  const auth = useAuth();
  const [chatMessages,setChatMessages]=useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatcontainerRef=useRef<HTMLDivElement | null >(null);
  const [isloading,setisloading]=useState<Boolean>(false)
  const navigate=useNavigate();

  //grab current user chats 
  // and store it as initial chatMessages
  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      console.log("Loading Chats", { id: "loadchats" });
      getuserchats()
        .then((data) => {
          setChatMessages([...data.chats]);
          console.log("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          console.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(()=>{
    if(!auth?.user){
      return navigate("/login");
    }
  },[auth])

  const handleSubmit = async ()=>{
    const content=inputRef.current?.value as string;
    if(content=="")return toast.error("Ask something!");
    if(inputRef && inputRef.current){
      inputRef.current.value="";
    }
    const newMessage:Message={role:"user",content};
    setChatMessages((prev)=>[...prev,newMessage]);
    setisloading(true);
    const chatData=await sendChatRequest(content);
    setisloading(false);
    setChatMessages([...chatData.chats]);
  };

  const handledelete=async ()=>{
    try {
      console.log("Deleting Chats", { id: "deletechats" });
      await deletechats();
      setChatMessages([]);
      console.log("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      // console.log(error);
      console.log("Deleting chats failed", { id: "deletechats" });
    }
  }

  const handleonkeydown=(event:React.KeyboardEvent<HTMLInputElement>)=>{
    if(event.key==='Enter'){
      handleSubmit();
    }
  }

  const scrolltobottom=()=>{
    if (chatcontainerRef.current) {
      chatcontainerRef.current.scrollTop = chatcontainerRef.current.scrollHeight;
    }
  }

  useEffect(()=>{
    scrolltobottom();
  },[chatMessages])

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700
            }}
          >
            {auth?.user?.name[0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a Chatbot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to knowledge, Business,
            Advices,Education etc. But avoid sharing personal information.
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
            onClick={handledelete}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontFamily:"monospace"
          }}
        >
          Let's ChitChat with a Bot🤖
        </Typography>
        <Box
          ref={chatcontainerRef}
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        {
          isloading?(
          <Typography sx={{margin:"10px"}}>Loading...</Typography>):(<></>)
        }
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            marginRight: "auto",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "20px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
            placeholder="How can I assist you today?"
            onKeyDown={handleonkeydown}
          />
          <IconButton onClick={handleSubmit} sx={{ ml: "auto", mx:"1",color: "white" }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
