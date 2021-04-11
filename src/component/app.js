import React, { useMemo,useEffect, useRef, useState } from 'react';

import { getList, setItem } from '../../service/list';
import Table from "./table";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchBar from "material-ui-search-bar";
import Grid from "@material-ui/core/Grid";



function App() {
  const [alert, setAlert] = useState(false);
  const [itemInput, setItemInput] = useState('comma seprated dfdgdgdgddd ');
    const [errorMessage, setErrorMessage] = useState();
      const [trows, setTrows] = useState();
const [open, setOpen] = React.useState(false);
  const [valueofRow, setValueOfRow] = React.useState();


  const [list, setList] = useState([]);
  const mounted = useRef(true);
const result=[] 


  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    mounted.current = true;
    if(list.length && !alert) {
      return;
    }
          validated(items)

    getList()
      .then(items => {
        console.log(items)
        if(mounted.current) {
          setList(items)
          validated(items)
          

        }
      })
    return () => mounted.current = false;
  }, [alert, list])



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
const columns  = useMemo(
    () =>  [{  
      Header: 'ID',  
      accessor: 'id',
     },

{
     Header: 'Type',  
      accessor: 'type',
     }

     ]
);
const validated=(list)=>{

 {list.forEach(function (nextItem, j) {
     result.push(
        <tr key={nextItem.id}>
        <td>{nextItem.id}</td>
              <td>{nextItem.type}</td>
            <td>
{<Button 
        variant="outlined"
        color="primary"
        onClick={() => {
          handleClickOpen(nextItem);
        }}

      >Click to view properties </Button>}

           </td>
            
        </tr>
    )
})}
  console.log("fff")
setTrows(result)
console.log(result)
}

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

    {setValueOfRow(liList)}
    setOpen(true);
  };


 return(
    <div className="app">

   { errorMessage &&
  <h3 className="error"> { errorMessage } </h3> }
     
   <form onSubmit={handleSubmit} >
           <Grid row>

       <label>
         <p>New Item</p>
         <input onChange={event => setItemInput(event.target.value)} value={itemInput} placeholder="Nameas" />
       </label>
       <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
                </Grid>

     </form>



     <h3>Navigation Bar</h3>

       
       <table>
     <thead>
    <tr>
      <th>id</th>
      <th>type</th>
      <th>properties</th>
    </tr>
  </thead>
         <tbody>
                 <tr>
                     {trows}
                </tr>
                </tbody>
       </table>
    

  
   

   <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-apartment"
      >
        <DialogTitle id="edit-apartment">Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>Dialog fired using state</DialogContentText>
           <table>
     <thead>
    <tr>
      <th>id</th>
      <th>type</th>
      <th>properties</th>
    </tr>
  </thead>
         <tbody>
                 <tr>
                     {valueofRow}
                </tr>
                </tbody>
       </table>
          <TextField
            autoFocus
            margin="dense"
            id="field"
            label="some field"
            type="text"
            fullWidth
          />
        </DialogContent>
           <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
        </Dialog>
            </div>
        )
}


export default App;