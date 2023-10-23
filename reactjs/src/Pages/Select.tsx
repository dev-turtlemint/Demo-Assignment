import { Button, FormLabel, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../App.css";
import Sidebar from "./Sidebar";

function Select() {
    const [loading, setLoading] = useState(true);


  return (
    <div className="outerBox">
        <div className="glassDesign">
        {loading && (
            <div className="box">
                <div>
                    <Sidebar/>
                </div>
                <div className="vertical"></div>
                    <div style={{justifySelf: "center", alignSelf: "center"}}>
                    <Button style={{ marginRight: "35vw"}}>
                    Login
                    </Button>
                </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default Select