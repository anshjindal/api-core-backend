const mongoose = require("mongoose");
const fs = require("fs");

// Import models
const Address = require("../models/address");
const Department = require("../models/department");
const Designation = require("../models/designation");
const Employee = require("../models/employee");
const Role = require("../models/roles");

// Load test data from JSON files
let addressData, departmentData, designationData, employeeData, roleData;

try {
  addressData = JSON.parse(fs.readFileSync("tests/WOUESSITESTDATA/Wouessi.address.json"));
  departmentData = JSON.parse(fs.readFileSync("tests/WOUESSITESTDATA/Wouessi.departments.json"));
  designationData = JSON.parse(fs.readFileSync("tests/WOUESSITESTDATA/Wouessi.designations.json"));
  employeeData = JSON.parse(fs.readFileSync("tests/WOUESSITESTDATA/Wouessi.employees.json"));
  roleData = JSON.parse(fs.readFileSync("tests/WOUESSITESTDATA/Wouessi.roles.json"));
} catch (err) {
  console.error("❌ Error reading test data files:", err);
  process.exit(1); 
}

// Deep conversion helper to handle $oid and $date conversion recursively
function deepConvert(obj) {
  if (Array.isArray(obj)) {
    return obj.map(deepConvert);
  } else if (obj !== null && typeof obj === "object") {
    if ("$oid" in obj) {
      return mongoose.Types.ObjectId.createFromTime(Number(obj["$oid"])); // Ensure the value is numeric
    }
    if ("$date" in obj) {
      return new Date(obj["$date"]);
    }
    const newObj = {};
    for (const key in obj) {
      newObj[key] = deepConvert(obj[key]);
    }
    return newObj;
  }
  return obj;
}

// Ensure unique _id values for the entry
function ensureUniqueIds(data) {
  const seenIds = new Set();
  return data.map(entry => {
    let newEntry = { ...entry };

    if (!newEntry._id || seenIds.has(newEntry._id.toString())) {
      newEntry._id = new mongoose.Types.ObjectId();  
    }

    seenIds.add(newEntry._id.toString());
    return newEntry;
  });
}

// Apply deep conversion and ensure unique _id for all entries
function formatData(data) {
  return ensureUniqueIds(data.map(entry => deepConvert(entry)));
}

const formattedAddressData = formatData(addressData);
const formattedDepartmentData = formatData(departmentData);
const formattedDesignationData = formatData(designationData);
const formattedEmployeeData = formatData(employeeData);
const formattedRoleData = formatData(roleData);

// Generic function to insert or update test data using upsert
async function insertOrUpdate(Model, data, queryField = "_id") {
  for (const entry of data) {
    entry.testData = true; // Mark as test data
    
    // Remove the _id to let MongoDB auto-generate it
    delete entry._id; 
    
    await Model.updateOne(
      { [queryField]: entry[queryField] },
      { $set: entry },
      { upsert: true }
    );
  }
}

// Generic verification function to check if a record exists
async function verify(Model, query, successMessage, failureMessage) {
  const result = await Model.findOne(query);
  if (result) {
    console.log(`✅ PASS: ${successMessage}`);
  } else {
    console.log(`❌ FAIL: ${failureMessage}`);
  }
}

// Cleanup function t0 remove test data after tests
async function cleanup() {
  await Address.deleteMany({ testData: true });  
  await Department.deleteMany({ testData: true });
  await Designation.deleteMany({ testData: true });
  await Employee.deleteMany({ testData: true });
  await Role.deleteMany({ testData: true });

  console.log("✅ Test data cleaned up: Only test objects removed");
}

// runTests function – note that we do not attempt to connect again if already connected.
async function runTests() {
  try {
    // Only connect if not already connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect("mongodb://localhost:27017/Wouessi");
      console.log("✅ Connected to the database for test setup");
    }

    // Insert/Update test data for each model
    await insertOrUpdate(Address, formattedAddressData, "_id");
    await insertOrUpdate(Department, formattedDepartmentData, "departmentId");
    await insertOrUpdate(Designation, formattedDesignationData, "designationId");
    await insertOrUpdate(Employee, formattedEmployeeData, "empId");
    await insertOrUpdate(Role, formattedRoleData, "roleName");

    console.log("✅ Test data inserted/updated successfully!");

    // Verification tests (adjust query values as needed)
    await verify(Address, { pincode: "90001" }, "Address record found", "Address record not found");
    await verify(Department, { departmentId: "DEPT001" }, "Department record found", "Department record not found");
    await verify(Designation, { designationId: "DESGN001" }, "Designation record found", "Designation record not found");
    await verify(Employee, { empId: "EMPLOYEE00002" }, "Employee record found", "Employee record not found");
    await verify(Role, { roleName: "Developer" }, "Role record found", "Role record not found");

  } catch (err) {
    console.error("❌ Error in test setup:", err);
  } finally {
    await cleanup();
  }
}

module.exports = { runTests };
