import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import SupplyOrderDialogBox from "./SupplyOrderDialog";
import { labelMap } from "../utilities/shared";

interface Data {
  name: string;
  location: string;
  order: string;
  created: string;
  desiredDate: string;
  status: string;
}

interface EmployeeData {
  employeeId: string;
  employeeName: string;
  position: string;
  department: string;
  email: string;
  phone: string;
}

function createOrderData(
  name: string,
  location: string,
  order: string,
  created: string,
  desiredDate: string,
  status: string
): Data {
  return {
    name,
    location,
    order,
    created,
    desiredDate,
    status,
  };
}

function createEmployeeData(
  employeeId: string,
  employeeName: string,
  position: string,
  department: string,
  email: string,
  phone: string
): EmployeeData {
  return {
    employeeId,
    employeeName,
    position,
    department,
    email,
    phone,
  };
}

const StyledButton = styled(Button)`
  margin-left: 25px;
`;

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  tableData: Data[] | EmployeeData[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const testCells: HeadCell[] = [];
  const firstRow = props.tableData[0];

  //Need to still figure out how to get a decent label - maybe with some data structure like enum?
  Object.keys(firstRow).map((key, i) => {
    testCells.push({
      id: key as keyof Data,
      numeric: i == 0 ? false : true,
      disablePadding: i == 0 ? true : false,
      label: labelMap.get(key),
    });
  });

  return (
    <TableHead>
      <TableRow>
        {testCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  tableType: string;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, tableType } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableType.includes("supplyOrder")
            ? "Supply Orders"
            : tableType.includes("workRequest")
            ? "Work Requests"
            : tableType.includes("employees")
            ? "Employees"
            : ""}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

interface TableProps {
  tableType: string; // workRequest or supplyOrder
  tableData: any[];
}

export default function CustomTable(props: TableProps) {
  const rows: any[] = [];
  const { tableType, tableData } = props;
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("status");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  if (tableType.includes("supplyOrder")) {
    tableData.map((item, i) => {
      rows.push(
        createOrderData(
          item.name,
          item.order,
          item.location,
          item.created,
          item.desiredDate,
          item.status
        )
      );
    });
  } else if (tableType.includes("employee")) {
    tableData.map((item, i) => {
      console.log(">>>>>>>>" + item.employeeName);
      rows.push(
        createEmployeeData(
          item.employeeId,
          item.employeeName,
          item.position,
          item.department,
          item.email,
          item.phone
        )
      );
    });
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const [dialogVisible, setDialogVisible] = useState(false);

  const displayDialog = () => setDialogVisible(true);
  const cancelDialog = () => setDialogVisible(false);

  return (
    <Box sx={{ width: "100%" }}>
      <SupplyOrderDialogBox open={dialogVisible} onCancel={cancelDialog} />

      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          tableType={tableType}
        />
        <StyledButton variant="contained" onClick={displayDialog}>
          Create New
        </StyledButton>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              tableData={tableData}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  if (tableType.includes("supplyOrder")) {
                    return (
                      <TableRow
                        hover
                        //onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}
                      >
                        {/* for each json object, print out one TableCell per member */}
                        <TableCell padding="normal" component="th" scope="row">
                          order
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.order}</TableCell>
                        <TableCell align="right">{row.location}</TableCell>
                        <TableCell align="right">{row.created}</TableCell>
                        <TableCell align="right">{row.desiredDate}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                      </TableRow>
                    );
                  } else if (tableType.includes("employee")) {
                    return (
                      <TableRow
                        hover
                        //onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}
                      >
                        {/* for each json object, print out one TableCell per member */}
                        <TableCell padding="normal" component="th" scope="row">
                          emplyee
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.order}</TableCell>
                        <TableCell align="right">{row.location}</TableCell>
                        <TableCell align="right">{row.created}</TableCell>
                        <TableCell align="right">{row.desiredDate}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                      </TableRow>
                    );
                  }
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Printer View"
      />
    </Box>
  );
}
