import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  styled,
} from '@mui/material';

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

const VendorForm = ({ vendorData = {}, onSubmit, onCancel, isEditMode = false }) => {
  const [formData, setFormData] = useState({
    v_id : vendorData.v_id || null,
    v_name: vendorData.v_name || '',
    v_poc: vendorData.v_poc || '',
    v_add: vendorData.v_add || '',
    phone: vendorData.phone || '',
    v_gst: vendorData.v_gst || '',
    v_date_added: vendorData.v_date_added || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      v_id: vendorData.v_id || null, 
      ...formData 
    });
  };

  return (
    <StyledCard sx={{ m: 0, width: '100%' }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ 
          bgcolor: '#3f51b5', 
          color: 'white', 
          p: 3, 
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px'
        }}>
          <Typography variant="h5">{isEditMode ? 'Edit Vendor' : 'Add New Vendor'}</Typography>
        </Box>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            {isEditMode && (
              <StyledTextField
                fullWidth
                label="Vendor ID"
                name="v_id"
                value={vendorData.v_id || ''}
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
              label="Vendor Name"
              name="v_name"
              value={formData.v_name}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Point of Contact"
              name="v_poc"
              value={formData.v_poc}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Address"
              name="v_add"
              value={formData.v_add}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="GST"
              name="v_gst"
              value={formData.v_gst}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

            <Box sx={{ 
              display: "flex", 
              justifyContent: "flex-end", 
              gap: 2, 
              mt: 4 
            }}>
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
                {isEditMode ? 'Update Vendor' : 'Add Vendor'}
              </Button>
            </Box>
          </form>
        </FormContainer>
      </CardContent>
    </StyledCard>
  );
};

export default VendorForm;