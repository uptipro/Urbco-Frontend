import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import PropertyDetail from "./pages/PropertyDetail";
import Services from "./pages/Services";
import OwnFraction from "./pages/OwnFraction";
import { useDispatch } from "react-redux";
import {
	listProperties,
	listTypes,
	loadSettings,
} from "./redux/basic/basicSlice";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import FAQ from "./pages/FAQ";
import Policy from "./pages/Policy";
import ForgotPassword from "./pages/ForgotPassword";

const AppRoutes = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadSettings());
		dispatch(listProperties({ status: "", location: "", type: "" }));
		dispatch(listTypes());
	}, []);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="*" element={<NotFound />} />
					<Route path="/" element={<LandingPage />} />
					<Route path="home" element={<Home />} />
					<Route path="about-us" element={<About />} />
					<Route path="projects" element={<Projects />} />
					<Route path="projects/:ref" element={<PropertyDetail />} />
					<Route path="services" element={<Services />} />
					<Route path="own-fraction" element={<OwnFraction />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route
						path="forgot-password"
						element={<ForgotPassword />}
					/>
					<Route path="profile" element={<Profile />} />
					<Route path="checkout" element={<Checkout />} />
					<Route path="privacy-policy" element={<Policy />} />
					<Route path="faq" element={<FAQ />} />
				</Routes>
			</BrowserRouter>
			<Toaster />
		</>
	);
};

export default AppRoutes;
