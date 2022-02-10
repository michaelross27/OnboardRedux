import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { loadUsers } from '../redux/actions';

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const Home = () => {
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUsers())
    }, []);

  return (
    <div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
       {/*  <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell scope="row">
                <input type="checkbox"></input>
              </StyledTableCell>
              <StyledTableCell>{post.id}</StyledTableCell>
              <StyledTableCell>{post.name}</StyledTableCell>
              <StyledTableCell>{post.email}</StyledTableCell>
              <StyledTableCell>{post.address}</StyledTableCell>
              <StyledTableCell>{post.phoneNumber}</StyledTableCell>
              <StyledTableCell>{post.jobTitle}</StyledTableCell>
              <StyledTableCell>
                <button
                  color="primary"
                  variant="outlined"
                  onClick={handleEdit}
                >
                  EDIT
                </button>
              </StyledTableCell>
              <StyledTableCell>
                <button
                  color="primary"
                  variant="contained"
                  onClick={() => this.handleEdit.bind(this)}
                >
                  VIEW
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
    </div>
  )
}

export default Home