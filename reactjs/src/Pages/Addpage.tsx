import { Button, FormLabel, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../App.css";
import Sidebar from "./Sidebar";

// import jwt from "jsonwebtoken";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

function Addpage() {
  const [loading, setLoading] = useState(true);

  const state: any = useSelector((state) => state);


//   const [data, setData] = useState({
//     id: '',
//     name: '',
//     location: '',
//     age: '',
//     sex: '',
//     pincode: '',
//     address: '',
//     prescription: '',
//     dose: '',
//     visit_date: '',
//     next_visit: '',
//     phy_id: '',
//     phy_name: '',
//     phone: '',
//     bill: '',
//     email: '',
//     aud: '',
//     jti: ''
//   })

//   For testing purposes
  const [data, setData] = useState({
    id: '1',
    name: 'Dev',
    location: 'Goa',
    age: '25',
    sex: 'Male',
    pincode: '403110',
    address: 'A 303 Casa Amora',
    prescription: '1 Pizza a day',
    dose: 'once a day',
    visit_date: '10/10/2023',
    next_visit: '10/11/2023',
    phy_id: '132334',
    phy_name: 'Rishabh Singh',
    phone: '9373869815',
    bill: '2000',
    email: '',
    aud: '',
    jti: ''
  })

  const handleChange = (key: any, value: any ) => {
    setData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
  };



  const handleSubmitDetails = async (e: any) => {
    e.preventDefault();
    console.log(state);

    const req = await fetch(`${REACT_APP_BASE_URL}/api/add`, {
        
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        // "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
            data: data,
        }),
    });
    const response = await req.json();
    if (response.status === "ok") {
        alert("Patient added Successfully!");
    } else {
        alert(response.error);
    }
  };


//   const checkIfVacant = (seat, date) => {
//     if (finalData[date - dd][Number(seat) - 1] === undefined) {
//       return [true, finalData[date - dd][Number(seat) - 1]];
//     } else {
//       return [false, finalData[date - dd][Number(seat) - 1]];
//     }
//   };

//   const checkIfAllowed = () => {
//     for (let i = 0; i < 8; i++) {
//       if (finalData[date - dd][i] === name) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const checkInput = (event) => {
//     if (seat === undefined || date === undefined) {
//       alert("Please enter the Date and Seat No !");
//     } else {
//       handleSubmitDetails(event);
//     }
//   };


//   const getToken = async () => {
//     const token = await localStorage.getItem("token");
//     if (token) {
//       const user = jwt.decode(token);
//       setEmail(user.email);
//       setName(user.name);
//       if (!user) {
//         localStorage.removeItem("token");
//         navigate("/login", { replace: true });
//       }
//     }
//   };

  useEffect(() => {
    if(state.user.email != ''){
        handleChange('email', state.user.email);
        handleChange('aud', state.user.aud);
        handleChange('jti', state.user.jti);
    }
  },[state])

  return (
    <div className="outerBox">
      <div className="glassDesign">
        {loading && (
        
        <div className="box">
            <div>
                <Sidebar/>
            </div>
            <div className="vertical"></div>

            <div className="formcolumn">
                <form className="loginForm">
                    <div className="inputrow">
                        <div className="inputgroup">
                            <FormLabel>Patient ID</FormLabel>
                            <TextField
                            defaultValue={"Auto Generated"}
                            // value={data.id}
                            // onChange={(e) => handleChange('id', e.target.value)}
                            />
                        </div>
                        <div className="inputgroup">
                            <FormLabel>Patient Name (First, Last Name)</FormLabel>
                            <TextField
                            value={data.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            />
                        </div>
                        <div className="inputgroup">
                            <FormLabel>Location</FormLabel>
                            <TextField
                            value={data.location}
                            onChange={(e) => handleChange('location', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="inputrow">
                        <div className="inputgroup">
                            <FormLabel>Age</FormLabel>
                            <TextField
                            value={data.age}
                            onChange={(e) => handleChange('age', e.target.value)}
                            />
                        </div>
                        <div className="inputgroup">
                            <FormLabel>Sex</FormLabel>
                            <TextField
                            value={data.sex}
                            onChange={(e) => handleChange('sex', e.target.value)}
                            />
                        </div>
                        <div className="inputgroup">
                            <FormLabel>Pincode</FormLabel>
                            <TextField
                            value={data.pincode}
                            onChange={(e) => handleChange('pincode', e.target.value)}
                            />
                        </div>
                        <div className="inputgroup">
                            <FormLabel>Address</FormLabel>
                            <TextField
                            value={data.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            />
                        </div>
                    </div>
                    <hr style={{color: "lightgray", backgroundColor: "gray", border: "none", height: "5px", marginTop: "20px", marginRight: "50px"}}/>
                    <div className="inputrow">
                        <div className="inputgroup">
                            <FormLabel >Prescription</FormLabel>
                            <TextField
                            sx={{ width: '300px' }}
                            value={data.prescription}
                            onChange={(e) => handleChange('prescription', e.target.value)}
                            />
                        </div>
                        <div className="inputgroup">
                            <FormLabel >Dose</FormLabel>
                            <TextField
                            sx={{ width: '300px' }}
                            value={data.dose}
                            onChange={(e) => handleChange('dose', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="inputrow">
                        <div className="inputgroup">
                            <FormLabel>Visit Date</FormLabel>
                            <TextField
                            value={data.visit_date}
                            onChange={(e) => handleChange('visit_date', e.target.value)}
                            >
                            <IconButton
                                aria-label="Date"
                                edge="end"
                                />
                            </TextField>
                        </div>
                        <div className="inputgroup">
                            <FormLabel>Next Visit</FormLabel>
                            <TextField 
                            value={data.next_visit}
                            onChange={(e) => handleChange('next_visit', e.target.value)}
                            />
                        </div>
                    </div>
                    <hr style={{color: "lightgray", backgroundColor: "gray", border: "none", height: "5px", marginTop: "20px", marginRight: "50px"}}/>

                    <div className="inputrow">
                        <div className="inputgroup">
                            <FormLabel>Physician ID</FormLabel>
                            <TextField
                            sx={{ width: '300px' }}
                            value={data.phy_id}
                            onChange={(e) => handleChange('phy_id', e.target.value)}
                            />
                        </div>
                        <div className="inputgroup">
                            <FormLabel>Physician Name (First, Last Name)</FormLabel>
                            <TextField
                            sx={{ width: '300px' }}
                            value={data.phy_name}
                            onChange={(e) => handleChange('phy_name', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="inputrow">
                        <div className="inputgroup">
                            <FormLabel>Phone</FormLabel>
                            <TextField
                            value={data.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            />
                        </div>
                        <div className="inputgroup">
                            <FormLabel>Bill</FormLabel>
                            <TextField
                            value={data.bill}
                            onChange={(e) => handleChange('bill', e.target.value)}
                            />
                        </div>
                    </div>
                    <hr style={{color: "lightgray", backgroundColor: "gray", border: "none", height: "5px", marginTop: "20px", marginRight: "50px"}}/>
                </form>
                <div style={{justifySelf: "flex-end", alignSelf: "flex-end"}}>
                        <Button
                        style={{ marginRight: "90px"}}
                        onClick = {e => handleSubmitDetails(e)}
                        >
                        Submit
                        </Button>
                    </div>
                </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default Addpage;
