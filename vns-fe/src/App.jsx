import { Route, Routes } from "react-router-dom";
import LoginPartner from "./pages/LoginPartner";
import LoginAdmin from "./pages/LoginAdmin";
import "./index.css";
import PartnerService from "./pages/PartnerService";
import Layout from "./components/Layout";
import PartnerFinance from "./pages/PartnerFinance";
import PartnerBooking from "./pages/PartnerBooking";
import RegisterPartner from "./pages/RegisterPartner";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPartner />} />
        <Route path="/LoginPartner" element={<LoginPartner />} />
        <Route path="/RegisterPartner" element={<RegisterPartner />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        <Route element={<Layout />}>
          <Route path="/PartnerService" element={<PartnerService />} />
          <Route path="/PartnerFinance" element={<PartnerFinance />} />
          <Route path="/PartnerBooking" element={<PartnerBooking />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
