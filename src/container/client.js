import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClientForm from "./ClientForm";
import Sidebar from "./sidebar";
import Swal from "sweetalert2";
import { addClient, deleteClient, getAllClient, updateClient } from "../api/const/api-url";
import { getLocalStorage, handleHttpRequest } from "../api/utility/Utility";
import { useNavigate } from "react-router-dom";

const Client = () => {
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getLocalStorage();
        if (token === null) {
          navigate("/");
        }
        const response = await handleHttpRequest("GET", getAllClient, "", true, token);
        if (response.status === 202) {
          console.log(response.data)
          setClients(response.data);
        } else {
          console.log('------------Error----------');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [navigate]);

  const handleOpen = (client = null) => {
    setEditingClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingClient(null);
  };

  const handleSubmit = async (data) => {
    const token = getLocalStorage();
    let response;

    if (editingClient) {
      // If editing, send a PUT request
      const token = getLocalStorage();
      if (token === null) {
        navigate("/")
      } else {
        response = await handleHttpRequest("PUT", updateClient, data, true, token);
        if (response.status === 202) {
          alert("Client Updated Succesfully.")
        } else {
          alert("Something went wrong. ")
        }
      }
    } else {
      const token = getLocalStorage();
      if (token === null) {
        navigate("/")
      } else {
        const response = await handleHttpRequest("POST", addClient, data, true, token)
        // const response = 202;
        if (response.status === 202) {
          alert("Client added Successfully.")
        } else {
          alert("Something went wrong.")
        }
      }

    }


    handleClose();
  };

  const handleDelete = async (id) => {
    // alert(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const request = {
          id: id
        }
        const deleteUsers = async () => {
          const token = getLocalStorage();
          if (token === null) {
            navigate("/")
          } else {
            const response = await handleHttpRequest("DELETE", deleteClient, request, true, token);
            // console.log(id+ typeof(id));
            if (response) {
              Swal.fire(
                'Deleted!',
                'Your Client has been deleted.',
                'success'
              );
            } else {
              Swal.fire(
                'Deleted!',
                'Something went wrong.',
                'success'
              );
            }
          }
        }
        deleteUsers();
      }
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
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
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6">All Clients</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleOpen()}
            sx={{
              backgroundColor: "#f50057",
              "&:hover": {
                backgroundColor: "#c51162",
              },
              py: 1,
            }}
            size="small"
          >
            ADD NEW CLIENT
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: "#eeeeee" }}>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Client Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>GST</TableCell>
                <TableCell>POC</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Arrival Date</TableCell>
                <TableCell>Delivery Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client, index) => (
                <TableRow key={client.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{client.c_id}</TableCell>
                  <TableCell>{client.c_name}</TableCell>
                  <TableCell>{client.c_full_address}</TableCell>
                  <TableCell>{client.c_gst}</TableCell>
                  <TableCell>{client.c_poc}</TableCell>
                  <TableCell>{client.c_phone_number}</TableCell>
                  <TableCell>{client.c_received_date}</TableCell>
                  <TableCell>{client.c_delivery_date}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        onClick={() => handleOpen(client)}
                        aria-label="edit"
                        sx={{ color: "#2196f3", p: 0.5 }}
                        size="small"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(client.c_id)}
                        aria-label="delete"
                        sx={{ color: "#f44336", p: 0.5 }}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
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
        <Box sx={{
          width: "100%",
          maxWidth: 500,
          mx: 2,
          maxHeight: '80vh',
          outline: 'none'
        }}>
          <ClientForm
            formData={editingClient || {}}
            onSubmit={handleSubmit}
            onCancel={handleClose}
            isEditMode={!!editingClient}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Client;