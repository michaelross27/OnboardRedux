import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initialize, reset } from "redux-form";
import { useActions } from "../redux/useActions";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Checkbox,
  TablePagination,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import _ from "lodash";
import DeleteDrawer from "../features/DeleteDrawer";
import UserForm from "./UserForm";
import ViewUser from "./ViewUser";
import { useTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const UserTable = ({ data, onDelete, customActions }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedData, setSelectedData] = useState([]);
  const { users } = useSelector((state) => state.users);
  const { details: userDetails } = useSelector(
    (state) => state.users
  );

  const isSelected = (id) => selectedData.indexOf(id) !== -1;
  const isIndeterminate = () =>
    selectedData.length > 0 && selectedData.length < data.length;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = (evt) =>
    setSelectedData(evt.target.checked ? data.map(({ id }) => id) : []);

  const handleSelectOne = (evt, id) => {
    const selectedIndex = selectedData.indexOf(id);
    let newSelectedData = [];
    if (selectedIndex === -1) {
      newSelectedData = newSelectedData.concat(selectedData, id);
    } else if (selectedIndex === 0) {
      newSelectedData = newSelectedData.concat(selectedData.slice(1));
    } else if (selectedIndex === selectedData.length - 1) {
      newSelectedData = newSelectedData.concat(selectedData.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedData = newSelectedData.concat(
        selectedData.slice(0, selectedIndex),
        selectedData.slice(selectedIndex + 1)
      );
    }
    setSelectedData(newSelectedData);
  };
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const {
    setUserDetails,
    cleanUserDetails,
    updateUser,
    addUser,
  } = useActions();

  const form = {
    open: () => setOpenForm(true),
    close: () => {
      dispatch(reset("userForm"));
      setOpenForm(false);
    },
  };
  const actions = {
    submit: (formValues) => {
        form.close();
        if (isEditing) {
          updateUser(formValues);
        } else {
          addUser(formValues);
        }
      },
    edit: (user) => {
      setIsEditing(true);
      dispatch(initialize("userForm", user));
      form.open();
    },
    view: {
      open: (user) => {
        setUserDetails(user);
        setOpenView(true);
      },
      close: () => {
          cleanUserDetails();
      setOpenView(false);
    }
    },
  };

  const renderCustomActions = () => {
    let tableEditProps = {
      selected: selectedData,
      onDelete: () => {
        onDelete(selectedData);
        setSelectedData([]);
      },
    };
    if (customActions) {
      tableEditProps = {
        ...tableEditProps,
        customActions: customActions.map((prop) => (
          <Button
            {..._.omit(prop, ["label", "onClick"])}
            onClick={() => prop.onClick(selectedData)}
          >
            {prop.label}
          </Button>
        )),
      };
    }
    return <DeleteDrawer {...tableEditProps} />;
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700, marginTop: 10 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <Checkbox
                  checked={data.length === selectedData.length}
                  color="primary"
                  indeterminate={isIndeterminate()}
                  onChange={handleSelectAll}
                />
              </StyledTableCell>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Phone Number</StyledTableCell>
              <StyledTableCell align="center">Job Title</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">View</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? users.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : users
            ).map((user) => (
              <StyledTableRow key={uuid()} selected={isSelected(user.id)}>
                <StyledTableCell scope="row">
                  <Checkbox
                    checked={isSelected(user.id)}
                    color="primary"
                    onChange={(evt) => handleSelectOne(evt, user.id)}
                    value={isSelected(user.id)}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">{user.id}</StyledTableCell>
                <StyledTableCell align="center">{user.name}</StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">{user.address}</StyledTableCell>
                <StyledTableCell align="center">
                  {user.phoneNumber}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.jobTitle}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => actions.edit(user)}
                    className="btn btn-primary"
                  >
                    EDIT
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => actions.view.open(user)}
                  >
                    VIEW
                  </Button> 
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <UserForm
        open={openForm}
        onClose={form.close}
        onSubmit={actions.submit}
      />
      {userDetails !== null && (
        <ViewUser
          open={userDetails !== null}
          onClose={actions.view.close}
          users={userDetails}
        />
      )}
      {renderCustomActions()}
    </div>
  );
};

UserTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func,
  customActions: PropTypes.arrayOf(
    PropTypes.shape({
      variant: PropTypes.oneOf(["outlined", "contained"]),
      color: PropTypes.oneOf(["primary", "secondary"]),
      startIcon: PropTypes.element,
      onClick: PropTypes.func,
      label: PropTypes.string,
      key: PropTypes.string,
    })
  ),
};

export default UserTable;
