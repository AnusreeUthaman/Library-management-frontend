import React from 'react';
import Sidebar from '../../../sidebar/Sidebar';
import Inventory from '../../admin/inventory/Inventory';
import UserActivityReport from '../../admin/reports/userActivityReport/UserActvity';
import PopularAuthorsReport from '../../admin/reports/popularAuthorReport/PopularAuthor';
import PopularGenresReport from '../../admin/reports/popularGenreReport/PopularGenre';
import PopularBooksReport from '../../admin/reports/popularBookReport/PopularBook';


const AdminDashboard = () => {

  return (
    <>
    <Sidebar role="admin" />
    <h2 className='text-center text-3xl font-bold font-serif text-blue-950 '>Admin Dashboard</h2>
    <Inventory/>
    <PopularBooksReport/>
    <PopularAuthorsReport/>
    <PopularGenresReport/>
    <UserActivityReport/>
    
    </>
  );
};

export default AdminDashboard;
