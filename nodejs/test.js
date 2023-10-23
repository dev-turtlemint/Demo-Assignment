const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./index");
const expect = chai.expect;
const fs = require('fs');
const path = require('path');

chai.use(chaiHttp);

describe("API Test Cases", function () {
  before(async function () {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      require('dotenv').config({ path: envPath });
    }
  });

  it("should add a new patient", async function () {
    const patientData = {
        id: "123",
        name: "John Doe",
        location: "New York",
        age: 30,
        sex: "Male",
        pincode: '247001', 
        address: 'A 303 Casa Amora',
        prescription: 'Drink 2 glasses of water every day', 
        dose: '2 glasses',
        visit_date: '22/08/2023',
        next_visit: '22/10/2023',
        phy_id: '143432',
        phy_name: 'Dev Singh',
        phone: '7070707070',
        bill: '2000'
    };

    const response = await chai
      .request(app)
      .post("/api/add")
      .send({ data: patientData });

    expect(response).to.have.status(200);
    expect(response.body.status).to.equal("ok");
  });

  it("should search for a patient", async function () {
    const searchtext = "Dev";
    const response = await chai
      .request(app)
      .get("/api/search")
      .set("searchtext", searchtext);

    expect(response).to.have.status(200);
    expect(response.body.status).to.equal("ok");
    expect(response.body.data).to.be.an("object");
  });

  it("should not find a non-existent patient", async function () {
    const searchtext = "Manoj";
    const response = await chai
      .request(app)
      .get("/api/search")
      .set("searchtext", searchtext);

    expect(response).to.have.status(200);
    expect(response.body.status).to.equal("error");
    expect(response.body.error).to.equal("Patient not found");
  });

  it("should update a patient's information", async function () {
    const searchText = "Dev";
    const keyValue = "Devansh";
    const oldValue = "Dev";
    const newValue = "Devansh";

    const response = await chai
      .request(app)
      .post("/api/update")
      .set("searchText", searchText)
      .send({ keyValue, oldValue, newValue });

    expect(response).to.have.status(200);
    expect(response.body.status).to.equal("ok");
  });

});
