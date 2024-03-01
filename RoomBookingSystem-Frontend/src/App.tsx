import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import HomePage from "./pages/homepage/HomePage.tsx";
// import HomeNavbar from "./pages/homepage/HomeNavbar.tsx";
// import AdminDashboard from "./pages/Admin/AdminDashboard.tsx";
// import AdminSidebar from "./pages/Admin/AdminSidebar.tsx";
// import UserProfileView from "./pages/UserProfileView/UserProfileView.tsx";
// import CustomerPage from "./pages/Admin/CustomerPage.tsx";
// import ManageCategory from "./pages/Admin/ManageCategory.tsx";
// import ManageRoom from "./pages/Admin/ManageRoom.tsx";
// import OurRoom from "./pages/RoomPage/OurRoom.tsx";
// import EditCategory from "./pages/Admin/EditCategory.tsx";
// import EditRoom from "./pages/Admin/EditRoom.tsx";
// import Login from "./pages/Starting page/Login.tsx";
//
//
//
// const queryClient = new QueryClient();
// function App() {
//   // const [count, setCount] = useState(0)
//
//   return (
//     <>
//         <QueryClientProvider client={queryClient}>
//         <RouterProvider router={createBrowserRouter([
//             {path:"t",element:<HomePage/>},
//             {path:"/navbar",element:<HomeNavbar/>},
//             {path:"/AdminDashboard",element:<AdminDashboard/>},
//             {path:"/AdminSidebar",element:<AdminSidebar/>},
//             {path: "/UserProfileView", element: <UserProfileView/>},
//             {path: "/CustomerPage", element: <CustomerPage/>},
//             {path: "/ManageCategory", element: <ManageCategory/>},
//             {path: "/edit/:pk_id", element: <EditCategory/>},
//             {path: "/editRoom/:pk_id", element: <EditRoom/>},
//             {path: "/ManageRoom", element: <ManageRoom/>},
//             {path: "/OurRoom", element: <OurRoom/>},
//             {path: "/", element: <Login/>},
//             {
//                 path: "/register",
//                 element: <Registration/>
//             },
//
//
//         ])}/>
//         </QueryClientProvider>
//     </>
//   )
// }
//
// export default App

import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import { QueryClient, QueryClientProvider } from 'react-query';

import HomePage from "./pages/homepage/HomePage.tsx";
import HomeNavbar from "./pages/homepage/HomeNavbar.tsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.tsx";
import AdminSidebar from "./pages/Admin/AdminSidebar.tsx";
import UserProfileView from "./pages/UserProfileView/UserProfileView.tsx";
import CustomerPage from "./pages/Admin/CustomerPage.tsx";
import ManageCategory from "./pages/Admin/ManageCategory.tsx";
import ManageRoom from "./pages/Admin/ManageRoom.tsx";
import OurRoom from "./pages/RoomPage/OurRoom.tsx";
import EditCategory from "./pages/Admin/EditCategory.tsx";
import EditRoom from "./pages/Admin/EditRoom.tsx";
import Login from "./pages/Starting page/Login.tsx";
import Start from "./pages/Starting page/Start.tsx";



const router = createBrowserRouter(
    [
            {path:"t",element:<HomePage/>},
            {path:"/navbar",element:<HomeNavbar/>},
            {path:"/AdminDashboard",element:<AdminDashboard/>},
            {path:"/AdminSidebar",element:<AdminSidebar/>},
            {path: "/UserProfileView", element: <UserProfileView/>},
            {path: "/CustomerPage", element: <CustomerPage/>},
            {path: "/ManageCategory", element: <ManageCategory/>},
            {path: "/edit/:pk_id", element: <EditCategory/>},
            {path: "/editRoom/:pk_id", element: <EditRoom/>},
            {path: "/ManageRoom", element: <ManageRoom/>},
            {path: "/OurRoom", element: <OurRoom/>},
            {path: "/", element: <Login/>},
            {path: "start", element: <Start/>},
    ]
)

const queryClient = new QueryClient();

function App() {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </>
    )
}

export default App