import React, { useEffect, useState } from "react";
import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import Logo from "../assets/logo.svg";
import { displayError } from "../redux/error";
import basicService from "../redux/basic/basicService";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginInvestor } from "../redux/basic/basicSlice";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user_details, loading } = useSelector((state) => state.basic);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [searchParams] = useSearchParams();
	const dataState = useLocation().state?.property;
	const query = searchParams.get("property");

	useEffect(() => {
		if (user_details && user_details._id) {
			if (query && dataState) {
				navigate("/checkout", { state: { property: dataState } });
			} else {
				navigate("/profile");
			}
		}
	}, [user_details]);

	const submitHandler = async () => {
		if (email && password) {
			dispatch(loginInvestor({ email, password }));
		} else {
			alert("Please provide your Email and Password");
		}
	};

	return (
		<div className="auth-screen">
			{!user_details && (
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-6">
							<div className="logo">
								<Link to={"/projects"}>
									<img src={Logo} alt="Logo" />
								</Link>
							</div>
							<div className="contact">
								<div className="title">
									<h5>Let's Sign you In</h5>
									<p>Welcome Back You've been missed</p>
								</div>
								<div className="form">
									<input
										type="text"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										placeholder="Email"
										disabled={loading}
									/>
									<div className="pos">
										<input
											type={
												showPassword
													? "text"
													: "password"
											}
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
											placeholder="Password"
											disabled={loading}
										/>
										<button
											className="rel"
											onClick={(e) => {
												e.preventDefault();
												setShowPassword(!showPassword);
											}}
										>
											{!showPassword ? (
												<FiEye size={22} />
											) : (
												<FiEyeOff size={22} />
											)}
										</button>
									</div>
									<div className="info">
										<div className="keep">
											<input type="checkbox" />
											<span>Keep me Signed In</span>
										</div>
										<Link to={"/forgot-password"}>
											Forgot Password?
										</Link>
									</div>
									<div className="text-center button">
										<button
											disabled={loading}
											onClick={submitHandler}
										>
											{loading ? "Hold On..." : "Submit"}
										</button>
									</div>
									<div className="others">
										<p>
											You don't have an account?{" "}
											<Link to="/register">Sign Up</Link>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Login;
