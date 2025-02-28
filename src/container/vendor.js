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

const Vendor = () => {
  const [vendors, setVendors] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const vendorResponse = [
        {
          v_id: "aef82a75-ed07-496d-8084-676acd29ae04",
          v_name: "PQR Vendor",
          v_poc: "34567dfghj",
          v_add: "345678fghj",
          phone: "8979003126",
          v_gst: "5678fghjk",
          v_date_added: "32-01-2025",
        },
      ];
      setVendors(vendorResponse);
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
      setVendors(
        vendors.map((v) => (v.v_id === editingVendor.v_id ? { ...v, ...data } : v))
      );
    } else {
      setVendors([...vendors, { v_id: Date.now().toString(), ...data }]);
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
        setVendors(vendors.filter((vendor) => vendor.v_id !== id));
        Swal.fire(
          'Deleted!',
          'Your vendor has been deleted.',
          'success'
        );
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