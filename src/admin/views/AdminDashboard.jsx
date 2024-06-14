import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import LeftSidebar from '../common/LeftSidebar';
import RightSidebar from '../common/RightSidebar';
import { FaBars } from 'react-icons/fa';
import { Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [totalUsers, setTotalUsers] = useState(150);
  const [totalShops, setTotalShops] = useState(200);
  const [pendingShops, setPendingShops] = useState(30);
  const [incomeData, setIncomeData] = useState([
    { month: 'Jan', income: 0 },
    { month: 'Feb', income: 0 },
    { month: 'Mar', income: 0 },
    { month: 'Apr', income: 0 },
    { month: 'May', income: 0 },
    { month: 'Jun', income: 0 },
    { month: 'Jul', income: 0 },
    { month: 'Aug', income: 0 },
    { month: 'Sep', income: 0 },
    { month: 'Oct', income: 0 },
    { month: 'Nov', income: 0 },
    { month: 'Dec', income: 0 }
  ]);

  const [date, setDate] = useState(new Date());
  const [schedules, setSchedules] = useState([
    { start: new Date(), end: new Date(), title: 'Meeting with team', completed: false },
    { start: new Date(new Date().setDate(new Date().getDate() + 1)), end: new Date(new Date().setDate(new Date().getDate() + 1)), title: 'Client call', completed: false },
    { start: new Date(new Date().setDate(new Date().getDate() + 2)), end: new Date(new Date().setDate(new Date().getDate() + 2)), title: 'Project deadline', completed: false },
  ]);
  const [newSchedule, setNewSchedule] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    fetchFinancialData();

    return () => clearInterval(timer);
  }, []);

  const fetchFinancialData = () => {
    const totalUsers = 150;
    const totalShops = 200;
    const pendingShops = 30;
    const incomeData = [
      { month: 'Jan', income: 10000 },
      { month: 'Feb', income: 15000 },
      // Add more data points for each month
    ];

    setTotalUsers(totalUsers);
    setTotalShops(totalShops);
    setPendingShops(pendingShops);
    setIncomeData(incomeData);
  };

  const calculateTotalIncome = () => {
    return incomeData.reduce((total, data) => total + data.income, 0);
  };

  const calculateNetProfit = () => {
    const totalIncome = calculateTotalIncome();
    const expenses = totalIncome * 0.25;
    return totalIncome - expenses;
  };

  const handleAddSchedule = () => {
    if (newSchedule.trim()) {
      setSchedules([...schedules, { start: date, end: date, title: newSchedule, completed: false }]);
      setNewSchedule('');
    }
  };

  const handleToggleSchedule = (event) => {
    const updatedSchedules = schedules.map(schedule =>
      schedule === event ? { ...schedule, completed: !schedule.completed } : schedule
    );
    setSchedules(updatedSchedules);
  };

  const handleDeleteSchedule = (event) => {
    const updatedSchedules = schedules.filter(schedule => schedule !== event);
    setSchedules(updatedSchedules);
  };

  const renderIncomeChart = () => {
    return (
      <div className="chart-card">
        <h3>Income Over Time</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={incomeData}>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        <p>View Full Report</p>
      </div>
    );
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-dashboard">
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>

      <div className={`left-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <LeftSidebar />
      </div>

      <div className="admin-content">
        <h1>Welcome to Admin Dashboard</h1>
        <div className="real-time">
          {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
        </div>

        <div className="stats-overview">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Total Shops</h3>
            <p>{totalShops}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Shops</h3>
            <p>{pendingShops}</p>
          </div>
          <div className="stat-card">
            <h3>Total Income</h3>
            <p>${calculateTotalIncome()}</p>
            <span>Saved 25%</span>
          </div>
          <div className="stat-card">
            <h3>Net Profit Margin</h3>
            <p>${calculateNetProfit()}</p>
            <span>Saved 65%</span>
          </div>
        </div>

        <div className="charts-overview">
          {renderIncomeChart()}
        </div>

        <div className="calendar-overview">
          <div className="calendar">
            <h2>Calendar Schedule</h2>
            <Calendar
              localizer={localizer}
              events={schedules}
              startAccessor="start"
              endAccessor="end"
              defaultDate={new Date()}
              selectable
              onSelectSlot={(slotInfo) => {
                setDate(slotInfo.start);
                setNewSchedule('');
              }}
              onSelectEvent={(event) => handleToggleSchedule(event)}
              eventPropGetter={(event, start, end, isSelected) => ({
                className: isSelected ? 'selected-event' : ''
              })}
            />
            <div className="schedule">
              <h2>Schedule for {moment(date).format('LL')}</h2>
              <div className="schedule-input">
                <input
                  type="text"
                  value={newSchedule}
                  onChange={(e) => setNewSchedule(e.target.value)}
                  placeholder="Add a new schedule..."
                />
                <button onClick={handleAddSchedule}>Add</button>
              </div>
              <ul className="schedules">
                {schedules.map((schedule, index) => (
                  <li key={index} className={schedule.completed ? 'completed' : ''}>
                    <span onClick={() => handleToggleSchedule(schedule)}>{schedule.title}</span>
                    <button onClick={() => handleDeleteSchedule(schedule)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

      <RightSidebar />
    </div>
  );
};

export default AdminDashboard;
