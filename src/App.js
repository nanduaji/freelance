import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Payment from "./components/Payment";
import RoomBooking from "./components/RoomBooking";
import Invoice from "./components/Invoice";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roombooking" element={<RoomBooking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/invoice" element={<Invoice/>} />
      </Routes>
    </Router>
  );
}

export default App;
