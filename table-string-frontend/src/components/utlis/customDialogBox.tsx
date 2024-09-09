import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { WarningIcon } from "../../icons/warning";

interface CustomDialogBoxProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  title: string;
}
export default function CustomDialogBox({
  open,
  setOpen,
  handleDelete,
  title,
}: CustomDialogBoxProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent
          sx={{
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              gap: 2,
            }}
          >
            <WarningIcon sx={{ width: "30px", height: "auto" }} />
            <Typography sx={{ fontWeight: 700, fontSize: "20px" }}>
              {title}
            </Typography>
          </Box>
          <Typography sx={{ p: 2 }}>
            Are you sure you want to {title}?
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 3,
            mb: 3,
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={handleClose}
            sx={{
              textTransform: "none",

              px: 1,
              borderRadius: 5,
              color: "#767676",
              borderColor: "#767676",
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            variant="outlined"
            type="submit"
            autoFocus
            sx={{
              textTransform: "none",

              px: 1,
              borderRadius: 5,
              background: "#662671",
              color: "white",
              cursor: "pointer",
            }}
            onClick={handleDelete}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
