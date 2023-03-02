import React, { Fragment } from "react";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, green } from '@mui/material/colors';

const ModuleCard = () => {
  return (
    <Fragment>
      <div className="w-2/3 flex justify-between px-5 items-center mt-7 bg-white rounded-lg relative left-4">
        <div className="flex justify-center items-center">
          <ViewModuleIcon fontSize="large" color="primary" className="" />
          <span className="pl-5 text-xl font-semibold">Module 1</span>
        </div>

        <div className="w-1/2 flex py-4 text-xl rounded-lg font-semibold justify-end">
          <div className="mr-7 flex justify-center items-center hover:cursor-pointer">
            <AddCircleIcon sx={{ color: green[700] }}/>
            <span className="ml-2 hover:text-green-600">Add Videos</span>
          </div>
          <div className="flex justify-center items-center hover:cursor-pointer">
            <DeleteIcon sx={{ color: red[700] }}/>
            <span className="ml-2 hover:text-red-600">Delete Module</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ModuleCard;
