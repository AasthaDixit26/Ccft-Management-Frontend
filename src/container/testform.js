import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Modal,
  styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VendorForm from './VendorForm';
import { preconnect } from 'react-dom';

const StyledCard = styled(Card)({
  maxWidth: 600,
  margin: '32px auto',
  backgroundColor: '#f8fafc',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  borderRadius: '12px',
});

const FormContainer = styled(Box)({
  padding: '24px',
  backgroundColor: 'white',
  borderRadius: '8px',
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

const TestForm = ({
  testData = {}, // Ensure testData is always an object
  onSubmit,
  onChange,
  onCancel,
  isEditMode = false,
  vendors = [],
  setVendors,
}) => {
  const [isVendorFormOpen, setIsVendorFormOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(testData.vendor != null ? testData.vendor.v_name : '');
  const [localFormData, setLocalFormData] = useState({
    "t_id": testData.t_id || null,
    "t_status": testData.t_status || null,
    "t_name": testData.t_name || null,
    "t_protocol": testData.t_protocol || null,
    "t_update": testData.t_update || null,
    "t_masked_report": null,
    "vendor": testData.vendor || null
  });

  // Handle change event for dropdown
  // const handleChange = (event) => {
  //   setSelectedOption(event.target.value); // Update the state with the selected value
  // };

  const handleChangeText = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.name+"<>"+e.target.value);
    if (name === 'vendor') {
      setLocalFormData(prevData => ({
        ...prevData,
        [name]: vendors.filter((vendor) => vendor.v_name === e.target.value)[0]
      }))
      setSelectedOption(e.target.value)
    }

    else {
      setLocalFormData(prevdata => ({
        ...prevdata,
        [name]: value,
      }));
      // console.log(isEditMode+"<>",localFormData);
    }

    // console.log(localFormData)
    // if (onChange) {
    //   onChange(e);
    // }
  };

  const handleOpenVendorForm = () => {
    setIsVendorFormOpen(true);
  };


  const handleCloseVendorForm = () => {
    setIsVendorFormOpen(false);
  };

  const handleVendorFormSubmit = (newVendor) => {
    setVendors([...vendors, newVendor]);
    setIsVendorFormOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(localFormData);
    // console.log(localFormData);
  };


  return (
    <StyledCard>
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            bgcolor: '#3f51b5',
            color: 'white',
            p: 3,
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
        >
          <Typography variant="h5">
            {isEditMode ? 'Edit Test' : 'Create New Test'}
          </Typography>
        </Box>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            {/* ID field - only visible in edit mode, non-editable */}
            {isEditMode && (
              <StyledTextField
                fullWidth
                label="Test ID"
                name="t_id"
                value={localFormData.t_id || ''}
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
              label="Test Name"
              name="t_name"
              value={localFormData.t_name || ''}
              onChange={handleChangeText}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Status"
              name="t_status"
              value={localFormData.t_status || ''}
              onChange={handleChangeText}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Protocol"
              name="t_protocol"
              value={localFormData.t_protocol || ''}
              onChange={handleChangeText}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Update"
              name="t_update"
              value={localFormData.t_update || ''}
              onChange={handleChangeText}
              sx={{ mb: 3 }}
              required
            />

            {/* <StyledTextField
              fullWidth
              name="t_masked_report"
              type="file"
              onChange={onChange}
              sx={{ mb: 3 }}
              required
            /> */}

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              {/* <FormControl fullWidth>
                <InputLabel>Vendor Name</InputLabel>
                <Select
                  name="vendor_id"
                 value={selectedOption}
                  onChange={handleChange}
                  label="Vendor ID"
                  required
                >
                  {vendors.map((vendor) => (
                    <MenuItem key={vendor.id} value={vendor.id}>
                      {vendor.v_name || vendor.id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <FormControl fullWidth>
                <InputLabel id="vendor-select-label">Select Vendor</InputLabel>

                <Select
                  labelId="vendor-select-label"
                  name="vendor"
                  value={selectedOption}
                  onChange={handleChangeText}
                  label="Select Vendor"
                >
                  {vendors.map((vendor) => (
                    <MenuItem value={vendor.v_name} >
                      {vendor.v_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <p>Selected Vendor ID: {selectedOption}</p> */}
              <IconButton
                color="primary"
                onClick={handleOpenVendorForm}
                sx={{
                  bgcolor: '#3f51b5',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#303f9f',
                  },
                  ml: 2
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 4,
              }}
            >
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
                {isEditMode ? 'Update' : 'Create'}
              </Button>
            </Box>
          </form>
        </FormContainer>
      </CardContent>

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
    </StyledCard>
  );
};

export default TestForm;