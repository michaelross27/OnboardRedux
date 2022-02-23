import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Fab, Tooltip, Dialog, DialogContent } from "@mui/material";
import { Add, Logout } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useSelector, useDispatch } from "react-redux";
import { initialize, reset } from "redux-form";
import { useNavigate, Navigate } from "react-router-dom";
import {
  Container,
  FloatingActionButtonContainer,
  FloatingButtonSpacer,
} from "../features/styled-components";
import { useActions } from "../redux/useActions";
import UserForm from "./UserForm";

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

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.users);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isEditing, setIsEditing] = useState(false);
  const { isSignedIn } = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);

  const {
    deleteUser,
  loadUsers,
  updateUser,
  addUser,
  setUserDetails,
  cleanUserDetails,
  cleanUser,
  login,
  logout,
  } = useActions();

  const form = {
    open: () => setOpen(true),
    close: () => {
      dispatch(reset("userForm"));
      setOpen(false);
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
    create: () => {
      setIsEditing(false);
      dispatch(initialize("userForm", {}));
      form.open();
    },
    edit: (user) => {
      setIsEditing(true);
      dispatch(initialize("userForm", user));
      form.open();
    },
    view: {
      open: (user) => {
        setUserDetails(user);
      },
      close: () => cleanUserDetails(),
    },
    delete: (userIds) => {
      deleteUser(userIds);
    },
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
        loadUsers();
    }
    return () => {
        mounted = false;
        cleanUser();
    };
}, [loadUsers, cleanUser]);
if (!isSignedIn) {
    return <Navigate to="/" />;
}



  const handleDelete = (user) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(user));
    }
  };

  const handleLogout = () => logout(navigate);

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
                <input type="checkbox"></input>
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
              <StyledTableRow key={user.id}>
                <StyledTableCell scope="row">
                  <input type="checkbox"></input>
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
      <FloatingActionButtonContainer>
        <FloatingButtonSpacer>
          <Tooltip title="Add new contact">
            <Fab color="primary" onClick={actions.create}>
              <Add />
            </Fab>
          </Tooltip>
        </FloatingButtonSpacer>
        <FloatingButtonSpacer>
          <Tooltip title="Logout">
            <Fab color="secondary" onClick={handleLogout}>
              <Logout />
            </Fab>
          </Tooltip>
        </FloatingButtonSpacer>
      </FloatingActionButtonContainer>
      <UserForm open={open} onClose={form.close} onSubmit={actions.submit} />
      {/* {contactDetails !== null && (
                <ContactPreview
                    open={contactDetails !== null}
                    onClose={actions.view.close}
                    contacts={contactDetails}
                />
            )} */}
    </div>
  );
};

export default Home;
