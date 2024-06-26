import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShopManagementWindow.css';
import LeftSidebar from '../common/LeftSidebar';
import RightSidebar from '../common/RightSidebar';
import axios from 'axios';
import ShopDetailsWindow from "./ShopDetailsWindow";
import { FaBars } from 'react-icons/fa';

const ShopManagementWindow = () => {
  const [shops, setShops] = useState([
    { shopId: 1, shopName: 'Shop 1', shopAddress: 'Location 1' },
    { shopId: 2, shopName: 'Shop 2', shopAddress: 'Location 2' },
    { shopId: 3, shopName: 'Shop 3', shopAddress: 'Location 3' },
    { shopId: 4, shopName: 'Shop 4', shopAddress: 'Location 4' },
    { shopId: 5, shopName: 'Shop 5', shopAddress: 'Location 5' },
    { shopId: 6, shopName: 'Shop 6', shopAddress: 'Location 6' },
    { shopId: 7, shopName: 'Shop 7', shopAddress: 'Location 7' },
    { shopId: 8, shopName: 'Shop 8', shopAddress: 'Location 8' },
    { shopId: 9, shopName: 'Shop 9', shopAddress: 'Location 9' },
    { shopId: 10, shopName: 'Shop 10', shopAddress: 'Location 10' },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8095/shop/getShop');
      setShops(response.data);
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  };



  // const [acceptedReservations, setAcceptedReservations] = useState([]);

  // // useEffect to upreservationDate local storage when acceptedReservations changes
  // useEffect(() => {
  //   localStorage.setItem(
  //     "acceptedReservations",
  //     JSON.stringify(acceptedReservations)
  //   );
  //   localStorage.setItem(
  //     "shops",
  //     JSON.stringify(shops)
  //   );
  // }, [acceptedReservations]);





  // const handleAccept = (shopId) => {
  //   const confirmed = window.confirm(
  //     "Are you sure you want to accept this reservation?"
  //   );
  //   if (confirmed) {
  //     const acceptedReservation = reservationRequests.find(
  //       (reservation) => reservation.id === shopId
  //     );
  //     setAcceptedReservations((prevAcceptedReservations) => [
  //       ...prevAcceptedReservations,
  //       acceptedReservation,
  //     ]);
  //     setReservationRequests(
  //       reservationRequests.filter((reservation) => reservation.id !== shopId)
  //     );
  //     console.log(acceptedReservation);
  //   }
  // };

  // const handleDelete = (shopId) => {
  //   const confirmed = window.confirm(
  //     "Are you sure you want to delete this reservation?"
  //   );
  //   if (confirmed) {
  //     setReservationRequests(
  //       reservationRequests.filter((reservation) => reservation.id !== shopId)
  //     );
  //   }
  // };

  const [selectedShopId, setSelectedShopId] = useState(null);

  const handleSelectedShopClick = (shopId) => {
    setSelectedShopId(shopId);
    localStorage.setItem(
      "shops",
      JSON.stringify(shops)
    );
    <Link to={"/ShopDetails"}></Link>;
  };

  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); 
  };

  return (
    <div className="shop-management">
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>

      <div className={`left-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <LeftSidebar />
      </div>

      <div className="shop-management-content-1">
        <h2 className="shop-management-heading-1">Shop Management</h2>

        {selectedShopId ? (
          <div className="component-div">
            <ShopDetailsWindow shopId={selectedShopId} />
          </div>
        ) : (

          shops.length === 0 ? (
            <p className="shop-management-no-shops">No shops found.</p>
          ) : (
            <div className="shop-list">
              {shops.map((shop) => (
                <div key={shop.shopId} className="shop-item">
                  <p>
                    <strong>Shop Name:</strong> {shop.shopName}
                  </p>
                  <p>
                    <strong>Shop Address:</strong> {shop.shopAddress}
                  </p>
                  <div className="button-container">
                    <button className='button-view-shop'
                      onClick={() => handleSelectedShopClick(shop.shopId)}
                    >
                      View Shop
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}


      </div>



      <RightSidebar />
    </div>
  );
};

export default ShopManagementWindow;
