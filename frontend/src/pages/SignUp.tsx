import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import robot from "../assets/robot.webp";
import CustomizedInput from "../components/shared/CustomizedInput";
import { CiLogin } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      navigate("/chat")
    }
  }, [auth, navigate])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Signing Up", { id: "signup" })
      await auth?.signup(name, email, password)
      toast.success("Signed Up successfully", { id: "signup" })
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signing Up Failed", { id: "signup" })
    }
  };

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent="center"
      alignItems="center"
    >
      <Box padding={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src={robot} alt="Robot" style={{ width: "350px" }} />
      </Box>
      <Box
        display="flex"
        flex={1}
        justifyContent="center"
        alignItems="center"
        padding={2}
        // mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "400px",
            margin: "auto",
            padding: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            borderRadius: "10px",
            backgroundColor: "#1a1a1a",
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            padding={2}
            fontWeight={600}
            color="#fff"
          >
            SignUp
          </Typography>
          <CustomizedInput type="text" name="name" label="Name" />
          <CustomizedInput type="email" name="email" label="Email" />
          <CustomizedInput type="password" name="password" label="Password" />
          <Button
            type="submit"
            sx={{
              px: 2,
              py: 1,
              mt: 2,
              width: "100%",
              borderRadius: 2,
              background: "linear-gradient(45deg, #00fffc, #00aaff)",
              ":hover": {
                background: "linear-gradient(45deg, #00aaff, #00fffc)",
                color: "#fff",
              },
            }}
            endIcon={<CiLogin />}
          >
            SignUp
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
