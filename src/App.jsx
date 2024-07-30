import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import Main from "./components/dashboard/Main";
import { Routes, Route } from "react-router-dom";
import Portal from "./components/portal/Portal";
import Customers from "./components/sidebar/documents/Customers";
import Dashboard from "./components/dashboard/Dashboard";
import Suppliers from "./components/sidebar/documents/Suppliers";
import Logistic from "./components/sidebar/documents/Logistic";
import { supabase } from './supabaseClient';
import Login from "./components/authUser/Login";
import Register from "./components/authUser/Register";
import UserActivateDeactivate from "./components/sidebar/inventory/UserActivateDeactivate";
import AddUser from "./components/sidebar/inventory/AddUser";
import AssignRepresentative from "./components/sidebar/inventory/AssignRepresentative";
import ItemMaster from "./components/sidebar/inventory/ItemMaster";
import CategoryWithPoints from "./components/sidebar/inventory/CategoryWithPoints";
import SegmentMaster from "./components/sidebar/inventory/SegmentMaster";
import CreditTermMaster from "./components/sidebar/inventory/CreditTermItemMaster";
import AddRetailerStock from "./components/sidebar/inventory/AddRetailerStock";
import PaymentApproval from "./components/sidebar/inventory/PaymentApproval";
import GiftItemMaster from "./components/sidebar/inventory/GiftItemMaster";
import RedeemGiftApproval from "./components/sidebar/inventory/RedeemGiftApproval";
import AllDsrDayKeyRoute from "./components/sidebar/inventory/AllDsrDayKeyRoute";
import ItemRequest from "./components/sidebar/inventory/ItemRequest";
import Visiting from "./components/sidebar/inventory/Visiting";
import PaymentEntry from "./components/sidebar/inventory/PaymentEntry";
import BillingToMechanic from "./components/sidebar/inventory/BillingToMechanic";
import RetailerSummary from "./components/sidebar/inventory/RetailerSummary";

function App() {
  return (
<>
   
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/portal" element={<Portal />}>


        <Route path="dashboard" element={<Main/>} />
        <Route path="customer" element={<Customers/>} />
        <Route path="supplier" element={<Suppliers/>} />
        <Route path="logistic" element={<Logistic/>} />


        <Route path="useractivatedeactivate" element={<UserActivateDeactivate/>} />
        <Route path="adduser" element={<AddUser/>} />
        <Route path="assignrepresentative" element={<AssignRepresentative/>} />
        <Route path="itemmaster" element={<ItemMaster/>} />
        <Route path="categorywithpoints" element={<CategoryWithPoints/>} />
        <Route path="segmentmaster" element={<SegmentMaster/>} />
        <Route path="credittermmaster" element={<CreditTermMaster/>} />
        <Route path="addretailerstock" element={<AddRetailerStock/>} />
        <Route path="paymentapproval" element={<PaymentApproval/>} />
        <Route path="giftitemmaster" element={<GiftItemMaster/>} />
        <Route path="redeemgiftapproval" element={<RedeemGiftApproval/>} />
        <Route path="allDSRdaykeyroute" element={<AllDsrDayKeyRoute/>} />
        <Route path="retailer-summary" element={<RetailerSummary/>} />
        <Route path="itemrequest" element={<ItemRequest/>} />
        <Route path="visiting" element={<Visiting/>} />
        <Route path="paymententry" element={<PaymentEntry/>} />
        <Route path="billingtomechanic" element={<BillingToMechanic/>} />
        
        {/* <Route path="/portal/useractivatedeactivate" element={<SegmentMaster/>} />
        <Route path="/portal/adduser" element={<SegmentMaster/>} />
        <Route path="/portal/assignrepresentative" element={<SegmentMaster/>} />
        <Route path="/portal/itemmaster" element={<SegmentMaster/>} />
        <Route path="/portal/categorywithpoints" element={<SegmentMaster/>} />
        <Route path="/portal/segmentmaster" element={<SegmentMaster/>} />
        <Route path="/portal/credittermmaster" element={<SegmentMaster/>} />
        <Route path="/portal/addretailerstock" element={<SegmentMaster/>} />
        <Route path="/portal/paymentapproval" element={<SegmentMaster/>} />
        <Route path="/portal/giftitemmaster" element={<SegmentMaster/>} />
        <Route path="/portal/redeemgiftapproval" element={<SegmentMaster/>} />
        <Route path="/portal/allDSRdaykeyroute" element={<SegmentMaster/>} />
        <Route path="/portal/itemrequest" element={<SegmentMaster/>} />
        <Route path="/portal/visiting" element={<SegmentMaster/>} />
        <Route path="/portal/paymententry" element={<SegmentMaster/>} />
        <Route path="/portal/billingtomechanic" element={<SegmentMaster/>} /> */}
        
        <Route path="representativelist" element={<Suppliers/>} />
        <Route path="retailerslist" element={<Suppliers/>} />
        <Route path="mechaniclist" element={<Suppliers/>} />
        <Route path="DSRwiseretailersoutstandingreport" element={<Suppliers/>} />
        <Route path="salesreport" element={<Suppliers/>} />
        <Route path="receiptreport" element={<Suppliers/>} />
        <Route path="linesperdealerreport" element={<Suppliers/>} />
        <Route path="retailersaccountstatement" element={<Suppliers/>} />
        <Route path="representativevisitinghistory" element={<Suppliers/>} />
        <Route path="DSRdayreport" element={<Suppliers/>} />
        <Route path="DSRdaywisecollectionreport" element={<Suppliers/>} />
        <Route path="DSRdaywisesalesreport" element={<Suppliers/>} />
        <Route path="retailerrequestreport" element={<Suppliers/>} />
        <Route path="itemwiseretailerrequestreport" element={<Suppliers/>} />
        <Route path="invoicehistory" element={<Suppliers/>} />
        <Route path="paymenthistory" element={<Suppliers/>} />
        <Route path="mechanicsalesreport" element={<Suppliers/>} />
        <Route path="mechanicttemwisesalesreport" element={<Suppliers/>} />
        <Route path="loyaltymechanicsalesreport" element={<Suppliers/>} />
        <Route path="mechanicloyaltyreport" element={<Suppliers/>} />
        

      </Route>
    </Routes>

    </>
  );
}

export default App;
