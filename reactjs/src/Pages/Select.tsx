import { Button, FormLabel, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../App.css";
import Sidebar from "./Sidebar";
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin, hasGrantedAllScopesGoogle, TokenResponse, CodeResponse } from '@react-oauth/google';
import { useSelector, useDispatch } from "react-redux";
import { setEmail, setAud, setJti} from '../actions';







function Select() {
    const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const [tokenResponse, setTokenResponse] = useState<any>();

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    // console.log(state)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const hasAccess = hasGrantedAllScopesGoogle(
            tokenResponse,
            'https://www.googleapis.com/auth/drive', // Scope for accessing Google Drive
            'https://www.googleapis.com/auth/spreadsheets' // Scope for creating spreadsheets
        );
        console.log(hasAccess);
    },[tokenResponse])

    useEffect(()=> {
        console.log(state)
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
                    <div style={{justifySelf: "center", alignSelf: "center", marginRight: "35vw"}}>

                    <GoogleOAuthProvider clientId={`${REACT_APP_CLIENT_ID}`}>
                        <GoogleLogin

                            // onSuccess={(  credentialResponse: any) => {
                            onSuccess={(  response: TokenResponse|CodeResponse|any) => {
                            // const credential: any = jwt_decode(response.credential);
                            // console.log(credential);

                            // dispatch(setEmail(credential.email));
                            // dispatch(setAud(credential.aud));
                            // dispatch(setJti(credential.jti));

                            setTokenResponse(response)
                            console.log(response)
                            // console.log(state);
                            

                            }}
                            onError={() => {
                            console.log('Login Failed');
                            }}
                            // scope = {[
                            // 'https://www.googleapis.com/auth/drive', // Scope for accessing Google Drive
                            // 'https://www.googleapis.com/auth/spreadsheets' // Scope for creating spreadsheets
                            // ]}
                            
                        />
                    </GoogleOAuthProvider>
                    {/* <Button>
                        Select File from Drive
                    </Button> */}
                </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default Select