const express = require("express");
const { google } = require('googleapis');

const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 1337;


app.use(cors());
app.use(express.json());


const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT, OAuth2 } = require('google-auth-library');



const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
    ],
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);



(async function() {
    await serviceAccountAuth;
    await doc.loadInfo(); // loads document properties and worksheets
    await doc.updateProperties({ title: 'Assignment' });

}());

app.post("/api/add", async (req, res) => {
  try {
    const id = req.body.data.id;
    const name = req.body.data.name;
    const location = req.body.data.location;
    const age = req.body.data.age;
    const sex = req.body.data.sex;
    const pincode = req.body.data.pincode;
    const address = req.body.data.address;
    const prescription = req.body.data.prescription;
    const dose = req.body.data.dose;
    const visit_date = req.body.data.visit_date;
    const next_visit = req.body.data.next_visit;
    const phy_id = req.body.data.phy_id;
    const phy_name = req.body.data.phy_name;
    const phone = req.body.data.phone;
    const bill = req.body.data.bill;
    const email = req.body.data.email;
    const aud = req.body.data.aud;
    const jti = req.body.data.jti;
    // console.log(next_visit, 'working')

    const auth = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID
    });

    console.log(auth)
    
    auth.setCredentials({ access_token: jti });
    const sheets = google.sheets({ version: 'v4', auth });
    console.log(sheets)

    const spreadsheet = {
      properties: {
        title: 'My New Spreadsheet'
      }
    };
    
    sheets.spreadsheets.create({
      resource: spreadsheet
    }, (err, res) => {
      if (err) {
        console.error('Error creating spreadsheet:', err);
        return;
      }
    
      console.log('Spreadsheet created:', res.data.spreadsheetId);
    });



    await serviceAccountAuth.authorize();

    const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`

    let rows = await sheet.getRows();
    maxid = 1.0
    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        // console.log(rows[index], 'working')
        if (phone == row._rawData[13]) {
            // console.log(index)
            
            await rows[index].delete(); // delete a row
            break;
        }
    };

    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        if(Number(row._rawData[0]) > maxid){
            maxid = Number(row._rawData[0])
        }
    };


    const addnewrow = await sheet.addRow({
            id: (maxid + 1.0),
            name: name,
            location: location,
            age: age,
            sex: sex, 
            pincode: pincode, 
            address: address,
            prescription: prescription, 
            dose: dose,
            visit_date: visit_date,
            next_visit: next_visit,
            phy_id: phy_id,
            phy_name: phy_name,
            phone: phone,
            bill: bill,
            email: email,
            aud: aud,
            jti: jti
        });

    // console.log(addnewrow)

    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      error: "Something went wrong, try again later!",
    });
  }
});

app.get("/api/search", async (req, res) => {
  try {
    const searchtext = req.headers.searchtext;
    // console.log(req.headers.searchtext)
    await serviceAccountAuth.authorize();

    const sheet = doc.sheetsByIndex[0];

    let rows = await sheet.getRows();
    reqrow = -1
    finalans = {}
    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        for (const value of row._rawData) {
            if (value.includes(searchtext)) {
                for (let i = 0; i < row._rawData.length; i++) {
                    finalans[row._worksheet._headerValues[i]] = row._rawData[i];
                }
                reqrow = 1;
                break;
            }
        }
    };



    if(reqrow == -1){
        res.json({
            status: "error",
            error: "Patient not found!"
        })
    }
    else {
        res.json({
            status: "ok",
            data: finalans,
        })
    }

    return res;
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Data not found!" });
  }
});

app.post("/api/update", async (req, res) => {
    try {
  
    //   const isPasswordValid = await bcrypt.compare(
    //     req.body.password,
    //     user.password
    //   );
    const searchText = req.headers["searchText"];
    await serviceAccountAuth.authorize();

    const sheet = doc.sheetsByIndex[0];
    
    let rows = await sheet.getRows();

    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        if (row[keyValue] === oldValue) {
            rows[index][keyValue] = newValue;
            await rows[index].save();
            break; 
        }
    };
      
    } catch (error) {
      console.log(error);
    }
  });

app.listen(1337, () => {
  console.log("Server has started on 1337");
});


// app.post("/api/register", async (req, res) => {
//   try {
//     const newPassword = await bcrypt.hash(req.body.password, 10);
//     const user = await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: newPassword,
//     });
//     res.json({ status: "ok" });
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "error", error: "Duplicate email" });
//   }
// });




// https://www.googleapis.com/auth/drive.appdata
// https://www.googleapis.com/auth/drive.appfolder	
// https://www.googleapis.com/auth/drive.install	
// https://www.googleapis.com/auth/drive.file
// https://www.googleapis.com/auth/drive.resource