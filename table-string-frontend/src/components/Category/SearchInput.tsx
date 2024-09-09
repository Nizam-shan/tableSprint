import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import { TfiSearch } from "react-icons/tfi";

const SearchComponent: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
      <TextField
        id="table-search-users"
        placeholder=""
        variant="outlined"
        size="small"
        fullWidth
        sx={{
          backgroundColor: "white",

          borderRadius: 2,
          width: { md: "500px", lg: "800px" },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TfiSearch />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchComponent;
