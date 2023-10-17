import React from "react";
import "../styles/Toolbar.scss";
import CreateIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";
import TitleIcon from "@mui/icons-material/Title";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-icons">
        <IconButton aria-label="pencil">
          <CreateIcon />
        </IconButton>
        <IconButton aria-label="text">
          <TitleIcon />
        </IconButton>
        <IconButton color="undo" aria-label="undo an action">
          <UndoIcon />
        </IconButton>
        <IconButton color="redo" aria-label="redo an action">
          <RedoIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Toolbar;
