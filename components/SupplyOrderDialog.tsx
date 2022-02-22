import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";

interface OpenProps {
  open: boolean;
  onCancel: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function SupplyOrderDialogBox(props: OpenProps) {
  const [location, setLocation] = React.useState("fb");

  const handleLocationChange = (event) => {
    setLocation(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  return (
    <React.Fragment>
      <Dialog fullWidth={true} open={props.open} onClose={props.onCancel}>
        <DialogTitle>Create New Supply Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out all required information.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="location">Location</InputLabel>
              <Select
                autoFocus
                value={location}
                onChange={handleLocationChange}
                label="location"
                inputProps={{
                  name: "location",
                  id: "location",
                }}
              >
                <MenuItem value="fb">Faculty Building</MenuItem>
                <MenuItem value="dm">Dormatory</MenuItem>
                <MenuItem value="gm">Gymnasium</MenuItem>
                <MenuItem value="ff">Football Field</MenuItem>
                <MenuItem value="mh">Math Hall</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export function ExistingRequestDialogBox(props: OpenProps) {
  const [location, setLocation] = React.useState("fb");

  const handleLocationChange = (event) => {
    setLocation(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  return (
    <React.Fragment>
      <Dialog fullWidth={true} open={props.open} onClose={props.onCancel}>
        <DialogTitle>Create New Work Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out all required information.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="location">Location</InputLabel>
              <Select
                autoFocus
                value={location}
                onChange={handleLocationChange}
                label="location"
                inputProps={{
                  name: "location",
                  id: "location",
                }}
              >
                <MenuItem value="fb">Faculty Building</MenuItem>
                <MenuItem value="dm">Dormatory</MenuItem>
                <MenuItem value="gm">Gymnasium</MenuItem>
                <MenuItem value="ff">Football Field</MenuItem>
                <MenuItem value="mh">Math Hall</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
