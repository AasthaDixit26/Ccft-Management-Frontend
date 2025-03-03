import { TextField, Button, Box, Paper, Snackbar } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import {handleHttpRequest, storeLocalStorage } from "../api/utility/Utility";
import { loginUser } from "../api/const/api-url";
import { useState } from "react";

const LoginContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
  width: "100vw",
  backgroundColor: "#f5f5f5",
  padding: "20px", 
});

const LoginBox = styled(Paper)({
  width: "100%",
  maxWidth: "400px", 
  padding: "20px",
  textAlign: "center",
  borderRadius: "8px",
  "@media (min-width: 768px)": {
    maxWidth: "600px", 
  },
});

const Header = styled(Box)({
  backgroundColor: "#f8d7da",
  padding: "10px",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "18px",
});

const SubmitButton = styled(Button)({
  backgroundColor: "#ff9800",
  color: "white",
  "&:hover": {
    backgroundColor: "#e68900",
  },
  marginTop: "10px",
});


const LoginPage = () => {
  const navigate = useNavigate();
  let [formData, setFormData] = useState({
    "email":"",
    "password":""
  })
  let [toastBar,setToastBar] = useState({"val":0,"status":false});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }; 
  const delay = (ms) => new Promise((resolve, reject) => {
    return setTimeout(resolve,ms);
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await handleHttpRequest("POST",loginUser, formData, false);
      if(response.status === 200){
        setToastBar({
          "val":1,
          "status":true
        })
        storeLocalStorage(response.data.id);
       // console.log(response.data.id);
        await delay(2000);
        navigate("/dashboard")
      }else{
        console.log('------------Error----------');
      }
    }catch(error){
      setToastBar({
        "val":-1,
        "status":true
      })
      console.log(error);
    }
  };
  return (
    <>
    {
      toastBar.val === 1 ? <Snackbar
          open={toastBar.status}
          autoHideDuration={3000}
          onClose={() => setToastBar(false)}
          message="Successfully Logged In"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        /> : 
        <Snackbar
          open={toastBar.status}
          autoHideDuration={3000}
          onClose={() => setToastBar(false)}
          message="Invalid Username or password"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      }
    <LoginContainer>
      <LoginBox elevation={3}>
        <Header >Login</Header>
        <Box display="flex" flexDirection="column" alignItems="center" padding="20px">
          <TextField label="User Name" variant="outlined" size="small" fullWidth margin="dense" onChange={handleChange} value={formData.email} name="email"/>
          <TextField label="Password" type="password" variant="outlined" size="small" fullWidth margin="dense" onChange={handleChange} value={formData.pasword} name="password"/>
          <SubmitButton variant="contained" fullWidth onClick={handleSubmit}>
            Submit
          </SubmitButton>
        </Box>
      </LoginBox>
    </LoginContainer>
    </>
  );
};

export default LoginPage;