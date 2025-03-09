import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography, Snackbar, CardContent, styled, Card } from "@mui/material";
import { getLocalStorage, handleHttpRequest } from "../api/utility/Utility";
import { useNavigate } from "react-router-dom";

const FormContainer = styled(Box)({
  padding: '24px',
  backgroundColor: 'white',
  borderRadius: '8px',
});
const StyledCard = styled(Card)({
  maxWidth: 600,
  margin: '32px auto',
  backgroundColor: '#f8fafc',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  borderRadius: '12px',
});
const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    '&:hover fieldset': {
      borderColor: '#3f51b5',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3f51b5',
    },
  },
});


const UserModal = ({ userData = {}, onSubmit, onCancel, isEditMode = false }) => {
  const [formData, setFormData] = useState({
    id: userData.id || null,
    email: userData.email || "",
    password: userData.password || "",
    role: userData.role || ""
  });
  let [toastBar,setToastBar] = useState({"val":0,"status":false});
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      id: userData.id || `user-${Date.now()}`, 
      ...formData 
    });
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
    <StyledCard sx={{ m: 0, width: '100%' }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ 
          bgcolor: '#3f51b5', 
          color: 'white', 
          p: 3, 
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px'
        }}>
          <Typography variant="h5">{isEditMode ? 'Edit User' : 'Add New User'}</Typography>
        </Box>

        <FormContainer>
           <form onSubmit={handleSubmit}>
           {isEditMode && (
              <StyledTextField
                fullWidth
                label="User ID"
                name="id"
                value={userData.id || ''}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ 
                  mb: 3,
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#666",
                  }
                }}
                disabled
              />
            )}

            <StyledTextField
              fullWidth
              label="User Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />
             <StyledTextField
              fullWidth
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
             <Button
                            variant="outlined"
                            onClick={onCancel}
                            sx={{
                              color: '#3f51b5',
                              borderColor: '#3f51b5',
                              '&:hover': {
                                borderColor: '#303f9f',
                                backgroundColor: 'rgba(63, 81, 181, 0.04)',
                              },
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{
                              bgcolor: '#3f51b5',
                              '&:hover': {
                                bgcolor: '#303f9f',
                              },
                            }}
                          >
                            {isEditMode ? 'Update User' : 'Add User'}
                          </Button>
          </Box>
        </form>
        </FormContainer>
      </CardContent>
    </StyledCard>
    </>
  );
};

export default UserModal;