// Connect to MongoDB with replica set
db = connect("mongodb://localhost:27017/wouessi_ems?replicaSet=rs0");

// Import Addresses
db.addresses.insertMany([
  {
    "_id": ObjectId("67b3ec7153bbea09b5c219ff"),
    "empId": "EMPLOYEE00001",
    "type": "permanent",
    "status": "active",
    "houseNo": "789",
    "street": "Broadway",
    "city": "Chicago downtown",
    "province": "IL",
    "country": "canada",
    "pincode": "60601"
  },
  {
    "_id": ObjectId("67b3ec7153bbea09b5c21a00"),
    "empId": "EMPLOYEE00001",
    "type": "temporary",
    "status": "active",
    "houseNo": "321",
    "street": "Market St",
    "city": "San Francisco ca",
    "province": "CA",
    "country": "canada",
    "pincode": "94105"
  },
  {
    "_id": ObjectId("67ca17a8c9848842242afd47"),
    "empId": "EMPLOYEE00002",
    "type": "permanent",
    "status": "active",
    "houseNo": "137",
    "street": "down king St",
    "city": "New York",
    "province": "NYK",
    "country": "USA",
    "pincode": "10001"
  },
  {
    "_id": ObjectId("67ca17a8c9848842242afd49"),
    "empId": "EMPLOYEE00002",
    "type": "temporary",
    "status": "active",
    "houseNo": "458",
    "street": "2nd Avenue",
    "city": "Los Angeles",
    "province": "CAFN",
    "country": "USA",
    "pincode": "90001"
  },
  {
    "_id": ObjectId("67ca377d31fea95e374c1656"),
    "empId": "EMPLOYEE00003",
    "type": "permanent",
    "status": "active",
    "houseNo": "123",
    "street": "Main St",
    "city": "New York",
    "province": "NY",
    "country": "USA",
    "pincode": "10001"
  },
  {
    "_id": ObjectId("67ca377d31fea95e374c1657"),
    "empId": "EMPLOYEE00003",
    "type": "temporary",
    "status": "active",
    "houseNo": "456",
    "street": "2nd Ave",
    "city": "Los Angeles",
    "province": "CA",
    "country": "USA",
    "pincode": "90001"
  }
]);

// Import Departments
db.departments.insertMany([
  {
    "_id": ObjectId("67cb13e0d621764fbf10b0a1"),
    "departmentId": "DEPT001",
    "departmentName": "Information Technology",
    "departmentAcronym": "IT",
    "description": "Handles all IT infrastructure and development",
    "deptHead": "EMPLOYEE00001",
    "status": "active",
    "logId": "EMPLOYEE00001",
    "createdAt": new Date("2025-03-07T15:42:24.292Z"),
    "updatedAt": new Date("2025-03-07T15:42:24.292Z")
  },
  {
    "_id": ObjectId("67cb1411d621764fbf10b0a5"),
    "departmentId": "DEPT002",
    "departmentName": "Marketing",
    "departmentAcronym": "MRKTNG",
    "description": "Handles all marketing  and development",
    "deptHead": "EMPLOYEE00001",
    "status": "active",
    "logId": "EMPLOYEE00001",
    "createdAt": new Date("2025-03-07T15:43:13.715Z"),
    "updatedAt": new Date("2025-03-07T15:43:13.715Z")
  }
]);

// Import Designations
db.designations.insertMany([
  {
    "_id": ObjectId("67cb2be8cff8d7f961ff8ed7"),
    "designationId": "DESGN001",
    "title": "Senior Software Engineer",
    "departmentId": "DEPT001",
    "reportsTo": "DESGN003",
    "gradeLevel": "L3",
    "salaryRange": "1,00,000 - 1,50,000",
    "status": "active",
    "logId": "LOG987654",
    "createdAt": new Date("2025-03-07T17:24:56.679Z"),
    "updatedAt": new Date("2025-03-07T17:24:56.679Z")
  },
  {
    "_id": ObjectId("67cb2d09f06a49bf502bde28"),
    "designationId": "DESGN002",
    "title": "Senior Software Manager",
    "departmentId": "DEPT001",
    "reportsTo": "DESGN010",
    "gradeLevel": "Manager",
    "salaryRange": "1,80,000 - 2,50,000",
    "status": "active",
    "logId": "EMPLOYEE00001",
    "createdAt": new Date("2025-03-07T17:29:45.912Z"),
    "updatedAt": new Date("2025-03-07T17:29:45.912Z")
  }
]);

// Import Roles
db.roles.insertMany([
  {
    "_id": ObjectId("67cb1b6fdccbd1c10785a66e"),
    "roleName": "Project Manager",
    "description": "Responsible for overseeing project execution and team coordination.",
    "permissions": ["create", "read", "update"],
    "status": "active",
    "logId": "EMPLOYEE00001",
    "createdAt": new Date("2025-03-07T16:14:39.472Z"),
    "updatedAt": new Date("2025-03-07T16:14:39.472Z")
  },
  {
    "_id": ObjectId("67cb1ba3dccbd1c10785a671"),
    "roleName": "Developer",
    "description": "Responsible for overseeing development tasks and  team coordination.",
    "permissions": ["create", "read", "update"],
    "status": "active",
    "logId": "EMPLOYEE00001",
    "createdAt": new Date("2025-03-07T16:15:31.737Z"),
    "updatedAt": new Date("2025-03-07T16:15:31.737Z")
  }
]);

// Import Employees
db.employees.insertMany([
  {
    "_id": ObjectId("67b3ec7153bbea09b5c219fd"),
    "empId": "EMPLOYEE00001",
    "firstName": "Michael",
    "middleName": "smith",
    "lastName": "kumar",
    "email": "michaelsmith@example.com",
    "workMail": "michaelsmith@company.com",
    "contactNumber": "+1987654321",
    "dateOfBirth": new Date("1985-08-23"),
    "gender": "Male",
    "password": "$2b$12$pOilMCSA/hIivykUSqno8.o7TFGC3muJ4ywXwvsCqHSi0dAf63prq",
    "addresses": [
      ObjectId("67b3ec7153bbea09b5c219ff"),
      ObjectId("67b3ec7153bbea09b5c21a00")
    ],
    "bloodGroup": "A-",
    "dateOfJoin": new Date("2024-03-10"),
    "designations": "DESGN001",
    "roleRef": ObjectId("67cb1ba3dccbd1c10785a671"),
    "departmentId": "DEPT001",
    "employmentType": "Part-Time",
    "workLocation": "On-Site",
    "status": "active",
    "accountNumber": "987654321",
    "transitNumber": "87654",
    "institutionNumber": "456",
    "bankName": "Wells Fargo",
    "interacId": "michaelsmith@bank.com",
    "sin": "234-567-890",
    "taxCode": "TX5678",
    "workPermitDetails": "Not Required",
    "prDetails": "PR67890",
    "citizenshipId": "CIT789012",
    "maritalStatus": "Married",
    "emergencyContactName": "Sarah Johnson",
    "emergencyContactNumber": "9988776655",
    "emergencyContactRelation": "Wife",
    "repManagerRef": "65b5f98e8d6a4d3e4aed9876",
    "healthCardNo": "HC567890",
    "familyPractitionerName": "Dr. Emily Brown",
    "practitionerClinicName": "Sunrise Medical Center",
    "practitionerName": "Dr. Robert ",
    "logId": "LOG54784",
    "createdAt": new Date("2025-02-18T02:12:01.272Z"),
    "updatedAt": new Date("2025-02-18T02:12:01.272Z")
  }
]); 