import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './admin/views/AdminDashboard';
import LeftSidebar from "./admin/common/LeftSidebar";
import FaultManagementWindow from "./admin/views/FaultManagementWindow";
import UserManagementWindow from "./admin/views/UserManagementWindow";
import ShopManagementWindow from "./admin/views/ShopManagementWindow";
import SubscriptionPlansManagementWindow from "./admin/views/SubscriptionPlansManagamentWindow";
import AdminHomePage from "./admin/views/AdminHomePage";
import AdminProfileWindow from "./admin/views/AdminprofileWindow";
import AccountSettingWindow from "./admin/views/AccountSettingWindow";
import ChatSettingWindow from "./admin/views/ChatSettingWindow";
import AddFault from "./admin/views/Fault/BikeModel";
import BikeCompany from "./admin/views/Fault/BikeCompany";
import FaultSection from "./admin/views/Fault/FaultSection/FaultSection";
import BikeModel from "./admin/views/Fault/BikeModel";
import ShopDetailsWindow from "./admin/views/ShopDetailsWindow";
import CustomerDetailsWindow from "./admin/views/CustomerDetailsWindow";
import AdminManagementWindow from "./admin/views/AdminManagementWindow";
import AdminDetailsWindow from "./admin/views/AdminDetailsWindow";
import PaymentManagementWindow from "./admin/views/PaymentManagementWindow"


const App = () =>{
  return(
   <Router>
      <Routes>
        <Route path="/" element={<AdminHomePage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard  />} />
        <Route path="/" element={<LeftSidebar />} />
        <Route path="/fault-management" element={<FaultManagementWindow />} />
        <Route path="/user-management" element={<UserManagementWindow />} />
        <Route path="/shop-management" element={<ShopManagementWindow />} />
        <Route path="/payment-management" element={<PaymentManagementWindow />} />
        <Route path="/subscription-plans" element={<SubscriptionPlansManagementWindow />} />
        <Route path="/profile" element={<AdminProfileWindow />} />
        <Route path="/account-setting" element={<AccountSettingWindow />} />
        <Route path="/chat-setting" element={<ChatSettingWindow />} />
        <Route path="/bikemodel" element={<BikeModel />} />
        <Route path="/bikecompany" element={<BikeCompany />} />
        <Route path="/faultsection" element={<FaultSection />} />

        <Route path="/ShopDetails" element={<ShopDetailsWindow/>}/>
        <Route path="/CustomerDetails" element={<CustomerDetailsWindow/>}/>
        <Route path="/AdminManagementWindow" element={<AdminManagementWindow/>}/>
        <Route path="/AdminDetailsWindow" element={<AdminDetailsWindow/>}/>
        
       
      </Routes>
    </Router>

  );
}

export default App;

