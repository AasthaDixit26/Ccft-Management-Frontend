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
  Modal,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserModal from "./userModal";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./sidebar";
import { getLocalStorage, handleHttpRequest } from "../api/utility/Utility";
import { useNavigate } from "react-router-dom";
import { addUser, deleteUser, getAllUser, updateUser } from "../api/const/api-url";



const User = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);

  const handleOpen = (user = null) => {
    setEditUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getLocalStorage();
        if (token === null) {
          navigate("/");
        }
        const response = await handleHttpRequest("GET", getAllUser, "", true, token);
        if (response.status === 202) {
          setUsers(response.data);
        } else {
          console.log('------------Error----------');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleSubmit = (userData) => {
    if (editUser) {
      // setUsers(users.map((u) => (u.id === editUser.id ? { ...u, ...userData } : 
      // u)));
      const addUsers = async()=>{
        const token=getLocalStorage();
        if(token ===null){
          navigate("/")
        }else{
          const response = await handleHttpRequest("PUT",updateUser,userData,true,token)
          // const response = 202;
          if(response.status===202){
            console.log("update")
          }else{
            console.log("Not update")
          }
        }
        }
        addUsers();
    } else {
      const addUsers = async()=>{
      const token=getLocalStorage();
      if(token ===null){
        navigate("/")
      }else{
        const response = await handleHttpRequest("POST",addUser,userData,true,token)
        // const response = 202;
        if(response.status===202){
          console.log("add")
        }else{
          console.log("Not add")
        }
      }
      }
      addUsers();
    }
    handleClose();
  };

  const handleDelete = (id) => {
    const request = {
      id : id
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // setUsers(users.filter((user) => user.id !== id));
        const deleteUsers=async()=>{
          const token = getLocalStorage();
          if(token === null){
            navigate("/")
          }else{
            console.log(request.id);
            console.log(request);
            const response = await handleHttpRequest("DELETE",deleteUser,request,true,token);
            // console.log(id+ typeof(id));
            if(response){
              console.log("deleted");
            }else{
              console.log("error")
            }
          }
        }
        deleteUsers();
        Swal.fire(
          'Deleted!',
          'Your user has been deleted.',
          'success'
        );

      }
    })
  }
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
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <EditIcon sx={{ cursor: "pointer", color: "#2196f3" }} onClick={() => handleOpen(user)} />
                      <DeleteIcon sx={{ cursor: "pointer", color: "#f44336" }} onClick={() => handleDelete(user.id)} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 600, mx: 2 }}>
        <UserModal  userData={editUser || {}}
            onSubmit={handleSubmit}
            onCancel={handleClose}
            isEditMode={!!editUser} />
        </Box>
      </Modal>
      <ToastContainer />
    </Box>
  );
};
export default User;