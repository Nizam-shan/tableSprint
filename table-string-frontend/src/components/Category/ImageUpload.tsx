import React from "react";
import { Box, Grid2, Typography } from "@mui/material";
import { UploadImage } from "../../icons/upload";

const ImageUploadComponent = ({
  setFieldValue,
  setImagePreview,
  imagePreview,
  isEditMode,
  image,
  name,
}: any) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFieldValue(name, file);
    }
  };

  return (
    <Grid2 size={{ lg: 5 }} sx={{ display: "flex", gap: 2 }}>
      <Box
        component="fieldset"
        sx={{
          border: 1,
          borderRadius: 3,
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          borderColor: "#9F9F9F",
          width: "50%",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <legend style={{ color: "#000000", padding: "0px 8px" }}>
          Upload Image
        </legend>
        {!imagePreview && !isEditMode ? (
          <Box>Upload to see</Box>
        ) : (
          <img
            src={
              imagePreview ||
              (isEditMode ? `${process.env.REACT_APP_API}${image}` : undefined)
            }
            alt="Uploaded preview"
            style={{ maxWidth: "70%", height: "auto" }}
          />
        )}
        {/* {!imagePreview && !isEditMode && <Box>Upload to see</Box>} */}
      </Box>
      <Box
        sx={{
          border: 1,
          p: 2,
          borderRadius: 3,
          borderStyle: "dashed",
          borderColor: "#9F9F9F",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",
          cursor: "pointer",
        }}
        onClick={() => {
          const fileInput = document.getElementById(
            "category-image-upload"
          ) as HTMLInputElement | null;
          if (fileInput) {
            fileInput.click();
          } else {
            console.log("File input not found");
          }
        }}
      >
        <UploadImage
          sx={{
            width: "55px",
            height: "auto",
          }}
        />
        <input
          name="category_image"
          id="category-image-upload"
          hidden
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <Typography
          sx={{
            whiteSpace: "pre-wrap",
            textAlign: "center",
            p: 2,
          }}
        >
          Upload Maximum allowed file size is 10MB
        </Typography>
      </Box>
    </Grid2>
  );
};

export default ImageUploadComponent;
