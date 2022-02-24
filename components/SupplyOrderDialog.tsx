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
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

interface OpenProps {
  open: boolean;
  onCancel: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function SupplyOrderDialogBox(props: OpenProps) {
  const [part, setPart] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);
  const [location, setLocation] = React.useState("fb");
  const [value, setValue] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const today = new Date();

  const handlePartChange = (event) => {
    setPart(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
    setVisible(true);
  };
  const handleQuantityChange = (event) => {
    setQuantity(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };
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
              gap: "10px",
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
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel htmlFor="part">Parts</InputLabel>
              <Select
                autoFocus
                value={part}
                onChange={handlePartChange}
                label="part"
                inputProps={{
                  name: "part",
                  id: "part",
                }}
              >
                <MenuItem value="tp">Toilet Paper - Large Roll</MenuItem>
                <MenuItem value="pt">Paper Towel</MenuItem>
                <MenuItem value="bc">Bowl Cleaner</MenuItem>
                <MenuItem value="fc">Floor Cleaner</MenuItem>
                <MenuItem value="mh">Mop Head</MenuItem>
              </Select>
            </FormControl>
            {visible ? (
              <div>
                <TextField
                  value={quantity}
                  id="outlined-number"
                  label="Quantity"
                  type="number"
                  onChange={handleQuantityChange}
                  sx={{ maxWidth: "110px" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            ) : (
              <div></div>
            )}

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Desired Date"
                value={value}
                minDate={today}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
