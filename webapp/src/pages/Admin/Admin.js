import React, { useState, useEffect } from "react";
import AdminPanel from "../../components/AdminPanel/AdminPanel";
import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import ProblemListItem from "../../components/ProblemListItem/ProblemListItem";
import axios from "axios";
import "./Admin.css";
import data from "../../leetcode_challenges.json";
import AddModal from "../../components/AddModal/AddModal";
import WarningModal from "../../components/WarningModal/WarningModal";

function Admin() {
  //We set this state from getting data from the API
  const [itemsToAdd, setItemsToAdd] = useState([]);
  //We set this state when one of the items in the list changes (removing from DB)
  const [itemsToRemove, setItemsToRemove] = useState([]);

  const [open, setOpen] = useState(false); // State to manage modal open/close

  const [openWarning, setOpenWarning] = useState(false); // State to manage modal open/close

  const [itemToRemove, setItemToRemove] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://codecrew-leetcode-api.onrender.com/problems"
        );
        setItemsToAdd();
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log("itemsToAdd:", itemsToAdd);

  const handleRemoveItem = (item) => {};
  const handleAddItem = () => {
    setOpen(true); // Set open state to true to show the modal
  };

  const handleClose = () => {
    setOpen(false); // Set open state to false to hide the modal
  };
  const handleWarningPopup = (item) => {
    setItemToRemove(item); // Set the item to remove
    setOpenWarning(true); // Open the warning modal
  };

  const handleConfirmRemove = () => {
    // Perform item removal logic based on itemToRemove
    // For example:
    const updatedItemsToRemove = itemsToRemove.filter(
      (item) => item.id !== itemToRemove.id
    );
    setItemsToRemove(updatedItemsToRemove);

    // Close the warning modal
    setOpenWarning(false);
  };
  const handleCloseWarningModal = () => {
    setOpenWarning(false);
  };

  return (
    <div className="adminPage">
      <div className="contentContainer">
        <div className="addProblemButtonContainer">
          <button onClick={handleAddItem} className="addProblemButton">
            <h1>Add Problem</h1>
          </button>
        </div>
        <AddModal
          open={open}
          handleOpen={handleAddItem}
          handleClose={handleClose}
        ></AddModal>
        <WarningModal
          open={openWarning} 
          handleClose={handleCloseWarningModal} 
          handleConfirm={handleConfirmRemove} 
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <AdminPanel id="addProblem" className="AdminPanel">
              <List>
                {data.map((item) => (
                  <ListItem key={item.questionFrontendId}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      {/* Content on the left */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <IconButton aria-label="add">
                          <AddCircleIcon />
                        </IconButton>
                        <ProblemListItem title={item.title} />
                      </div>
                      {/* Delete icon on the right */}
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleWarningPopup(item)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </ListItem>
                ))}
              </List>
            </AdminPanel>
          </Grid>
          <Grid item xs={6}>
            <AdminPanel id="removeProblem" className="AdminPanel">
              <List>
                {itemsToRemove.map((item) => (
                  <ListItem key={item.questionFrontendId}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                      <ProblemListItem title={item.title} />
                    </div>
                  </ListItem>
                ))}
              </List>
            </AdminPanel>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default Admin;