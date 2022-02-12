import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, loadUsers } from "../redux/actions";
import { history } from "../index";

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

const Home = () => {
  let dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleEdit = (userDeleted) => {
    history.push({
      pathname: `/edit/${user.id}`,
      state: {
        user: user,
      }
    })
  }

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
              <StyledTableCell align="center">Phone Number</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Job Title</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">View</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell scope="row">
                    <input type="checkbox"></input>
                  </StyledTableCell>
                  <StyledTableCell align="center">{user.id}</StyledTableCell>
                  <StyledTableCell align="center">{user.name}</StyledTableCell>
                  <StyledTableCell align="center">{user.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {user.address}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.phoneNumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.jobTitle}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button color="primary" variant="contained" onClick={() => handleEdit(user.id)}>
                      EDIT
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => handleDelete(user.id)}
                    >
                      DELETE
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
