import React from "react";
import "../src/styles/global.css"; // Import global CSS
import AppRouter from "./Router";
import 'bootstrap/dist/css/bootstrap.min.css';
import TimesheetTable from './components/common/TimesheetTable';

function App() {
  return (
    <div>
      <TimesheetTable />
    </div>
  );
}

export default App; 