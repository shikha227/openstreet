import React, { useEffect, useRef, useState } from 'react';

import { getList } from '../service/list';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { makeStyles, useTheme ,withStyles} from "@material-ui/core/styles";
import TableHead from '@material-ui/core/TableHead';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
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
    </div>
  );
}


function App() {



const useStyles2 = makeStyles({
  table: {
    minWidth: 500
  }
});


  const [alert, setAlert] = useState(false);
  const [itemInput, setItemInput] = useState('11.3743115256,48.1394041654,11.3757277319,48.139933971');
  const [errorMessage, setErrorMessage] = useState();
  const [open, setOpen] = React.useState(false);
  const [valueofRow, setValueOfRow] = React.useState();
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [list, setList] = useState([]);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, list.length - page * rowsPerPage);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const mounted = useRef(true);


  const handleClose = () => {
    setOpen(false);
  };



  useEffect(() => {
    if(alert) {
      setTimeout(() => {
        if(mounted.current) {
          setAlert(false);
        }
      }, 1000)
    }
  }, [alert])

  const validate=(item)=>{
    if(itemInput){
    var val=itemInput.split(",")
    if (val){
       if(val.length!=4){
        setErrorMessage("4 comma seprated values required from input")
        return false
       }
       return true
    }}
    setErrorMessage("4 comma seprated values required  input")

    return false
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage()
if(!validate(itemInput)){
  console.log("error")
  setList([])
  return
}
    console.log(itemInput)

console.log("test")
    getList(itemInput)
      .then(items => {
        console.log(items)
        if(mounted.current) {
          setList(items)
        }
      })
  };



const handleClickOpen = (value) => {
   var liList=[]
   { liList.push(<thead><tr >
      <td> key</td>
       <td>value</td> 
       </tr></thead>
       )}
    {Object.keys(value.properties).map((kuy) => {
  
      liList.push(<tr >
      <td> {kuy}</td>
       <td>
        { value.properties[kuy] } 
       </td> 
       </tr>
       )


})}

    setValueOfRow(liList)
    setOpen(true);
  };


 return(
    <div >

   { errorMessage && <Alert  data-testid="alertId" severity="error">{ errorMessage }</Alert>}
     
      <h3>Please enter bbox values</h3>
   <form onSubmit={handleSubmit} >
           <Grid row>

       <label>
         <input onChange={event => setItemInput(event.target.value)}
          value={itemInput} placeholder="Nameas" />
       </label>
       <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
                </Grid>

     </form>



    

       
      
<TableContainer component={Paper} data-testid="tableid">
      <Table className={classes.table} aria-label="custom pagination table">
         <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Properties</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : list
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell  align="right">
                {row.type}
              </TableCell>
              <TableCell align="right">
              <Button 
        variant="outlined"
        color="primary"
        onClick={() => {
          handleClickOpen(row);
        }}

      >Click to view properties </Button>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={list.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  

   

   <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-apartment"
      >
        <DialogTitle id="edit-apartment">Properties</DialogTitle>
        <DialogContent>
          <DialogContentText>Details</DialogContentText>
           <table>
     <thead>
    
  </thead>
         <tbody>
                 <tr>
                     {valueofRow}
                </tr>
                </tbody>
       </table>
         
        </DialogContent>
           <DialogActions>
    
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
        </Dialog>
            </div>
        )
}


export default App;