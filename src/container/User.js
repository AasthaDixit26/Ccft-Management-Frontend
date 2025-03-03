import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserModal from "./userModal";
// import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./sidebar";
import { getLocalStorage, handleHttpRequest } from "../api/utility/Utility";
import { useNavigate } from "react-router-dom";
import { getAllUser } from "../api/const/api-url";

const User = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState([
  ]);

  const handleOpen = (user = null) => {
    setEditUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditUser(null);
  };

  useEffect(()=>{
    const fetchUser = async() =>{ 
        try{
          const token = getLocalStorage();
          if(token === null){
            navigate("/")
          }
          const response = await handleHttpRequest("GET",getAllUser, "", true,token);
          if(response.status === 202){
            setUsers(response.data);
          }else{
            console.log('------------Error----------');
          }
        }catch(error){
          console.log(error);
        }
    }
    fetchUser();
  })



  const handleUserSubmit = (userData) => {
    if (editUser) {
      setUsers(users.map((u) => (u.id === editUser.id ? { ...u, ...userData } : u)));
    } else {
      const newId = Math.floor(Math.random() * 900) + 100;
      setUsers([...users, { ...userData, id: newId, joined: new Date().toISOString().split("T")[0] }]);
    }
    handleClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: "margin 0.3s",
          marginLeft: sidebarOpen ? "200px" : "60px",
          padding: "10px",
          width: `calc(100% - ${sidebarOpen ? "200px" : "60px"})`,
          overflowX: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#3f51b5",
            color: "white",
            p: 4,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6">User Management</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleOpen()}
            sx={{ backgroundColor: "#f50057", "&:hover": { backgroundColor: "#c51162" } }}
          >
            ADD USER
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#eeeeee" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                {/* <TableCell>Name</TableCell> */}
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                {/* <TableCell>Status</TableCell>
                <TableCell>Joined Date</TableCell> */}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  {/* <TableCell>{user.name}</TableCell> */}
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  {/* <TableCell>{user.status}</TableCell>
                  <TableCell>{user.joined}</TableCell> */}
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <EditIcon sx={{ cursor: "pointer", color: "#2196f3" }} onClick={() => handleOpen(user)} />
                      <DeleteIcon sx={{ cursor: "pointer", color: "#f44336" }} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <UserModal open={open} handleClose={handleClose} user={editUser} handleUserSubmit={handleUserSubmit} />
      <ToastContainer />
    </Box>
  );
};

export default User;