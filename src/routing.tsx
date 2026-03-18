import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookDetailsPage from "./pages/BookDetailsPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminPage from "./pages/AdminPage";
import ReadingListPage from "./pages/ReadingListPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <RegisterPage />
            },
            {
                path: "/mypage",
                element: (
                    <ProtectedRoute>
                        <MyPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "/readinglist",
                element: (
                    <ProtectedRoute>
                        <ReadingListPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "/books/:id",
                element: <BookDetailsPage />
            },
            {
                path: "/search",
                element: <SearchResultsPage />
            },
            {
                path: "*",
                element: <NotFoundPage />
            },
            {
                path: "/admin",
                element: (
                    <AdminRoute>
                        <AdminPage />
                    </AdminRoute>
                )
            }
        ]
    }
])

export default router;