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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TestForm from "./testform";
import VendorForm from "./VendorForm";
import Sidebar from "./sidebar";
import Swal from "sweetalert2";
import { getLocalStorage, handleHttpRequest } from "../api/utility/Utility";
import { addTest, deleteTest, getAllTest, getAllVendor, updateTest } from "../api/const/api-url";
import { useNavigate } from "react-router-dom";

const Test = () => {
  let [tests, setTests] = useState([]);
  let [vendors, setVendors] = useState([]);
  let [open, setOpen] = useState(false);
  let [isVendorFormOpen, setIsVendorFormOpen] = useState(false);
  let [editingTest, setEditingTest] = useState(null);
  let [sidebarOpen, setSidebarOpen] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    
    const fetchData = async () => {
      try{
        const token = getLocalStorage();
        if(token === null){
          navigate("/")
        }
        const response = await handleHttpRequest("GET",getAllTest, "", true,token);
        if(response.status === 202){
          setTests(tests=response.data);
          console.log(tests)
        }else{
          console.log('------------Error----------');
        }
      }catch(error){
        console.log(error);
      }
    };
    fetchData();
    const fetchDataClient = async () => {
          try{
            const token = getLocalStorage();
            if(token === null){
              navigate("/")
            }
            const response = await handleHttpRequest("GET",getAllVendor, "", true,token);
            if(response.status === 202){
              // console.log(response.data)
              setVendors(response.data);
              // console.log(vendors);
            }else{
              console.log('------------Error----------');
            }
          }catch(error){
            console.log(error);
          }
        };
        fetchDataClient();
  }, []);

  const handleOpen = (test = null) => {
    console.log(test);
    setEditingTest(test);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTest(null);
  };

  const handleSubmit = (data) => {
    if (editingTest) {
      const updateEntity = async(data)=>{
      const token = getLocalStorage();
            if (token === null) {
              navigate("/")
            } else {
              const response = await handleHttpRequest("PUT", updateTest, data, true, token);
              if (response.status === 202) {
                alert("Client Updated Succesfully.")
              } else {
                alert("Something went wrong. ")
              }
            }
          }
          updateEntity(data)
    } else {
      const addEntity = async(data) =>{
        const token = getLocalStorage();
              if (token === null) {
                navigate("/")
              } else {
                console.log(data);
                const response = await handleHttpRequest("POST", addTest, data, true, token)
                // const response = 202;
                if (response.status === 202) {
                  alert("Client added Successfully.")
                } else {
                  alert("Something went wrong.")
                }
              }
      }
      addEntity(data);
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
        // setTests(tests.filter((test) => test.t_id !== id));
        // Swal.fire(
        //   'Deleted!',
        //   'Your test has been deleted.',
        //   'success'
        // );
        const deleteTests = async(id)=>{
          const token = getLocalStorage();
          const response = await handleHttpRequest("DELETE",deleteTest,{id:id},true,token);
          // console.log(response);
          if(response.status===202){
            alert("Test Deleted Successfully.")
          }else{
            alert("Something wen wrong.")
          }
        }
          deleteTests(id);
      }
    });
  };

  const handleOpenVendorForm = () => {
    setIsVendorFormOpen(true);
  };

  const handleCloseVendorForm = () => {
    setIsVendorFormOpen(false);
  };

  const handleVendorFormSubmit = (newVendor) => {
    // Here you would save the new vendor to your backend
    // and then update your local state with the new vendor
    console.log('New vendor created:', newVendor);
    setVendors([...vendors, newVendor]);
    setIsVendorFormOpen(false);
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
          <Typography variant="h6">All Tests</Typography>
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
            ADD NEW TEST
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#eeeeee" }}>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Test Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Protocol</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Masked Report</TableCell>
                <TableCell>Vendor Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.map((test, index) => (
                <TableRow key={test.t_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{test.t_id}</TableCell>
                  <TableCell>{test.t_name}</TableCell>
                  <TableCell>{test.t_status}</TableCell>
                  <TableCell>{test.t_protocol}</TableCell>
                  <TableCell>{test.t_update}</TableCell>
                  {/* <TableCell>{test.t_masked_report}</TableCell> */}
                  <TableCell>{test.vendor.v_name}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <EditIcon
                        sx={{ cursor: "pointer", color: "#2196f3" }}
                        onClick={() => handleOpen(test)}
                      />
                      <DeleteIcon
                        sx={{ cursor: "pointer", color: "#f44336" }}
                        onClick={() => handleDelete(test.t_id)}
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
          <TestForm
            testData={editingTest || {}}
            onSubmit={handleSubmit}
            onCancel={handleClose}
            isEditMode={!!editingTest}
            vendors={vendors}
            setVendors
          />
        </Box>
      </Modal>

      <Modal
        open={isVendorFormOpen}
        onClose={handleCloseVendorForm}
        aria-labelledby="vendor-form-modal"
        aria-describedby="add-new-vendor-form"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 0,
          borderRadius: '12px',
          outline: 'none',
        }}>
          <VendorForm 
            onSubmit={handleVendorFormSubmit}
            onCancel={handleCloseVendorForm}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Test;