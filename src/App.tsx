import { ThemeProvider } from "@gravity-ui/uikit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage/";
import { CoachesPage } from "./pages/CoachesPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Layout } from "./components/Layout";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from "@/api/queryClient";
import { createContext, useState } from "react";
import { AuthModal } from "./components/AuthModal/AuthModal";
import { TrainerPage } from './pages/TrainerPage/TrainerPage';

export const AuthContext = createContext<{
    setIsAuthModalOpen: (isOpen: boolean) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuth: boolean) => void;
}>({
    setIsAuthModalOpen: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {},
});

const App = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('token')));

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme="light">
                <AuthContext.Provider value={{ setIsAuthModalOpen, isAuthenticated, setIsAuthenticated }}>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={<Layout />}
                            >
                                <Route index element={<MainPage />} />
                                <Route path="main" element={<MainPage />} />
                                <Route path="coaches" element={<CoachesPage />} />
                                <Route path="profile" element={<ProfilePage />} />
                                <Route path="trainer/:id" element={<TrainerPage />} />
                            </Route>
                        </Routes>
                        <AuthModal 
                            isOpen={isAuthModalOpen} 
                            onClose={() => setIsAuthModalOpen(false)} 
                        />
                    </BrowserRouter>
                </AuthContext.Provider>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;
