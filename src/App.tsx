import { Button } from "@mui/material";
import CreateBarChart from "./components/forms/CreateBarChart";
import useDialog from "./components/hooks/useDialog";


function App() {
  const {open,handleClickOpen,handleClose}=useDialog()


  return (
    <div className="App">
      <Button onClick={handleClickOpen}>Create BarChart</Button>
      <CreateBarChart open={open} onClose={handleClose}/>
    </div>
  );
}

export default App;
