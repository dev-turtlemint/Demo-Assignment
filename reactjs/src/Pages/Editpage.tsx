import { Button, FormLabel, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Sidebar from "./Sidebar";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;


function Editpage() {
    const [loading, setLoading] = useState(false);

    const[searchText, setSearchText] = useState('');

    const [data, setData] = useState({
        id: '',
        name: '',
        location: '',
        age: '',
        sex: '',
        pincode: '',
        address: '',
        prescription: '',
        dose: '',
        visit_date: '',
        next_visit: '',
        phy_id: '',
        phy_name: '',
        phone: '',
        bill: ''
      })

      const handleChange = (key: any, value: any ) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
          }));
      };

      const findpatient = () => {
        getData();
      };

    //   const token = req.headers["x-access-token"];

      const setDataOnPage = (data: { [key: string]: string }) => {
        setLoading(true);
        
        for(const key in data){
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const value = data[key]
                handleChange(key, value)
            }
        }

        setLoading(false);
      }
      

      const handleSubmitDetails = async (e: any) => {
        e.preventDefault();
    
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

      const getData = async () => {
        const req = await fetch(`${REACT_APP_BASE_URL}/api/search`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "searchText": searchText,
            },
        });
        const response = await req.json();
        console.log(response);
        setDataOnPage(response.data);

        if (response.status !== "ok") {
            alert(response.error);
        }
    };


      useEffect(() => {
        if(searchText !== ''){
            console.log(searchText)
        }
      },[searchText])

  return(
    <div className="outerBox">
        <div className="glassDesign">
        {!loading && (
            <div className="box">
                <div>
                    <Sidebar/>
                </div>
                <div className="vertical"></div>

                <div className="formcolumn">
                    <form className="loginForm">
                        <div className="inputrow">
                            <div className="inputgroup">
                                <FormLabel>Search Patient by First Name, Last Name, Phone, E-mail, Location, Address</FormLabel>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <TextField
                                    sx={{ width: '600px', marginRight: "50px"}}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    />
                                    <Button
                                    onClick={findpatient}
                                    >Find</Button>
                                </div>
                            </div>
                        </div>
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
                        <Button style={{
                        marginRight: "90px"}}
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

export default Editpage