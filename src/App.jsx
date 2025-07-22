import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectRoute';
import AdminRegister from './pages/signUp/adminRegister/AdminRegister';
import StaffRegister from './pages/signUp/staffRegister/StaffRegister';
import UserRegister from './pages/signUp/userRegister/UserRegister';
import Login from './pages/signIn/Login';
import StaffDashboard from './pages/dashboard/staffDashboard/StaffDashboard';
import Sidebar from './sidebar/Sidebar';
import CreateAuthor from './pages/book/createAuthor/createAuthor';
import CreateGenre from './pages/book/createGenre/createGenre';
import BookCreate from './pages/book/bookCreate/BookCreate';
import BookEdit from './pages/book/bookUpdate/BookUpdate';
import BookDetail from './pages/book/bookDetail/BookDetail';
import Layout from './Layout/Layout';
import StaffList from './pages/staffs/staffList/staffList';
import BookList from './pages/book/bookList/BookList';
import AdminDashboard from './pages/dashboard/adminDashboard/AdminDashboard';
import UserDashboard from './pages/dashboard/userDashboard/UserDashboard';
import UserLayout from './Layout/UserLayout';
import UserBookList from './pages/user/userBookList/UserBookLIst';
import ChangePassword from './pages/password/changePassword/ChangePassword';
import ForgotPassword from './pages/password/forgotPassword/ForgotPassword';
import VerifyOtp from './pages/password/otpVerify/VerifyOtp';
import ResetPassword from './pages/password/resetPassword/ResetPassword';
import UsersList from './pages/user/userList/UserSList';
import UserBookingHistory from './pages/user/userBooking/UserBookingHistory';
import BookingList from './pages/admin/bookingList/BookingList';
import Inventory from './pages/admin/inventory/Inventory';
import Notification from './pages/notification/Notification';
import StaffBorrowingList from './pages/staffs/borrowingList/StaffBorrowingList';
import BookReturn from './pages/staffs/bookReturn/BookReturn';
import BorrowingHistory from './pages/user/borrowingHistory/BorrowingHistory';
import UserBookingList from './pages/user/userBookList/UserBookLIst';
import UserProfile from './pages/user/userProfile/UserProfile';
import BookingListWithIssue from './pages/staffs/bookIssueList/BookingIssueList';
import AdminBookingList from './pages/admin/bookingList/BookingList';
import BorrowingList from './pages/admin/borrowingList/BorrowingList';
import ReturnBook from './pages/staffs/bookReturn/BookReturn';
import OverdueBooks from './pages/admin/overdueBooks/OverdueBooks';
import FlaggedBooks from './pages/admin/flaggedBooks/FlaggedBooks';
import StaffProfile from './pages/staffs/staffProfile/StaffProfile';
import PenaltyReport from './pages/admin/penaltyReport/PenaltyReport';
import PopularBooksReport from './pages/admin/reports/popularBookReport/PopularBook';
import PopularAuthorsReport from './pages/admin/reports/popularAuthorReport/PopularAuthor';
import UserActivityReport from './pages/admin/reports/userActivityReport/UserActvity';
import PopularGenresReport from './pages/admin/reports/popularGenreReport/PopularGenre';
import StaffLayout from './Layout/StaffLayout';
import AdminRoute from './pages/admin/adminRoute/AdminRoute';
import GenresList from './pages/book/genresList/GenresList';
import AuthorsList from './pages/book/authorsList/AuthorsList';

function App() {

  return (
    <>
      <div>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin/register" element={<AdminRegister />} />
          </Route>
          
          <Route path='/user/register' element={<UserRegister />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path='/sidebar' element={<Sidebar />} />

          {/* Admin Dashboard*/}
        <Route element={<Layout />}>
          <Route path="/admin/dashboard" element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>}/>
          <Route path='/staff/register' element={<ProtectedRoute><StaffRegister /> </ProtectedRoute>} />
          <Route path="/add/author" element={<ProtectedRoute><CreateAuthor /> </ProtectedRoute>} />
          <Route path="/authors" element={ <ProtectedRoute><AuthorsList/> </ProtectedRoute>} />
          <Route path="/add/genre" element={<ProtectedRoute> <CreateGenre /> </ProtectedRoute>} />
          <Route path="/genres" element={ <ProtectedRoute><GenresList/> </ProtectedRoute>} />
          <Route path="/add/book" element={<ProtectedRoute> <BookCreate /> </ProtectedRoute>} />
          <Route path="/list" element={<ProtectedRoute> <BookList /> </ProtectedRoute>} />
          <Route path="/edit/book/:id" element={<ProtectedRoute> <BookEdit /> </ProtectedRoute>} />    
          <Route path='/staffs/list' element={<ProtectedRoute> <StaffList /> </ProtectedRoute>} />
          <Route path='/change/password' element={<ProtectedRoute> <ChangePassword/> </ProtectedRoute>}/>
          <Route path="/users/list" element={<ProtectedRoute> <UsersList /> </ProtectedRoute>} />    
          <Route path="/booking/list" element={<ProtectedRoute><AdminBookingList /> </ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute> <Inventory/> </ProtectedRoute>} />
          <Route path="/borrowing/list" element={<ProtectedRoute> <BorrowingList/> </ProtectedRoute>} />
          <Route path="/overdue/books" element={<ProtectedRoute> <OverdueBooks /></ProtectedRoute>} />
          <Route path="/flagged/books" element={<ProtectedRoute> <FlaggedBooks /> </ProtectedRoute>} />
          <Route path="/penalty/report" element={<ProtectedRoute> <PenaltyReport /> </ProtectedRoute>} />
          <Route path="/popular/books" element={<ProtectedRoute> <PopularBooksReport /> </ProtectedRoute>} />
          <Route path="/popular/genres" element={<ProtectedRoute><PopularGenresReport/></ProtectedRoute>} />
          <Route path="/popular/authors" element={<ProtectedRoute><PopularAuthorsReport /></ProtectedRoute>} />
          <Route path="/user/activity" element={<ProtectedRoute> <UserActivityReport/> </ProtectedRoute>} />
        </Route>

        {/* staff */}
        <Route element={<StaffLayout />}>
            <Route path="/staff/dashboard" element={<ProtectedRoute><StaffDashboard /></ProtectedRoute>} />
            <Route path="/staff/profile" element={<ProtectedRoute><StaffProfile /></ProtectedRoute>} />
            <Route path="/borrowing/return" element={<ProtectedRoute><ReturnBook /></ProtectedRoute>} />
            <Route path='/staff/borrowing/list' element={<ProtectedRoute><StaffBorrowingList/></ProtectedRoute>}/>
            <Route path='/staff/issue/book' element={<ProtectedRoute><BookingListWithIssue/></ProtectedRoute>}/>
            <Route path='/staff/change/password' element={<ProtectedRoute><ChangePassword/></ProtectedRoute>}/>  
        </Route>

          {/* User */}
         <Route path="/user" element={<ProtectedRoute> <UserLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>}/>
          <Route path='change/password' element={<ProtectedRoute><ChangePassword/></ProtectedRoute>}/>
          <Route path="book/detail/:id" element={<ProtectedRoute><BookDetail /></ProtectedRoute>} />
          <Route path='booking/list' element={<ProtectedRoute><UserBookingHistory/></ProtectedRoute>}/>
          <Route path="inbox" element={<ProtectedRoute><Notification /></ProtectedRoute>} />
          <Route path="borrowing/history" element={<ProtectedRoute><BorrowingHistory /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} /> 
        </Route>
    
        <Route path='/forgot/password' element={<ForgotPassword/>}/>
        <Route path='/verify/otp/:userId' element={<VerifyOtp/>}/>   
        <Route path='/reset/password/:userId' element={<ResetPassword/>}/> 

        <Route path="/booking/list" element={<ProtectedRoute><BookingList /></ProtectedRoute>} />   
        </Routes>
      </div>
    </>
  );
};

export default App;
