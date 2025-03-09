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
import AddIcon from "@mui/icons-material/Add";
import VendorForm from "./VendorForm";
import Sidebar from "./sidebar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { addVendor, deleteVendor, getAllVendor, updateVendor } from "../api/const/api-url";
import { getLocalStorage, handleHttpRequest } from "../api/utility/Utility";

const Vendor = () => {
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const token = getLocalStorage();
        if(token === null){
          navigate("/")
        }
        const response = await handleHttpRequest("GET",getAllVendor, "", true,token);
        if(response.status === 202){
          setVendors(response.data);
        }else{
          console.log('------------Error----------');
        }
      }catch(error){
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleOpen = (vendor = null) => {
    setEditingVendor(vendor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingVendor(null);
  };

  const handleSubmit = (data) => {
    if (editingVendor) {
      const addUsers = async()=>{
        const token=getLocalStorage();
        if(token ===null){
          navigate("/")
        }else{
          const response = await handleHttpRequest("PUT",updateVendor,data,true,token)
          if(response.status===202){
           alert("Vendor updated Successfully.")
          }else{
            alert("Something went wrong.")
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
              const response = await handleHttpRequest("POST",addVendor,data,true,token)
              // const response = 202;
              if(response.status===202){
                alert("Vendor added Successfully.")
              }else{
                alert("Something went wrong.")
              }
            }
            }
            addUsers();
    }
    handleClose();
  };

  const handleDelete = (id) => {
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
        const request = {
          id : id
        }
        const deleteUsers=async()=>{
                  const token = getLocalStorage();
                  if(token === null){
                    navigate("/")
                  }else{
                    const response = await handleHttpRequest("DELETE",deleteVendor,request,true,token);
                    // console.log(id+ typeof(id));
                    if(response){
                      Swal.fire(
                        'Deleted!',
                        'Your vendor has been deleted.',
                        'success'
                      );
                    }else{
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
            p: 4,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6">All Vendors</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleOpen()}
            sx={{
              backgroundColor: "#f50057",
              "&:hover": {
                backgroundColor: "#c51162",
              },
            }}
          >
            ADD NEW VENDOR
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#eeeeee" }}>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Vendor Name</TableCell>
                <TableCell>Point of Contact</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>GST</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors.map((vendor, index) => (
                <TableRow key={vendor.v_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{vendor.v_id}</TableCell>
                  <TableCell>{vendor.v_name}</TableCell>
                  <TableCell>{vendor.v_poc}</TableCell>
                  <TableCell>{vendor.v_add}</TableCell>
                  <TableCell>{vendor.phone}</TableCell>
                  <TableCell>{vendor.v_gst}</TableCell>
                  <TableCell>{vendor.v_date_added}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <EditIcon
                        sx={{ cursor: "pointer", color: "#2196f3" }}
                        onClick={() => handleOpen(vendor)}
                      />
                      <DeleteIcon
                        sx={{ cursor: "pointer", color: "#f44336" }}
                        onClick={() => handleDelete(vendor.v_id)}
                      />
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
          <VendorForm
            vendorData={editingVendor || {}}
            onSubmit={handleSubmit}
            onCancel={handleClose}
            isEditMode={!!editingVendor}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Vendor;