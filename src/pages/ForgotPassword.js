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

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user_details } = useSelector((state) => state.basic);

	const [load, setLoad] = useState(false);
	const [token, setToken] = useState("");
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showCPassword, setShowCPassword] = useState(false);
	const [step, setStep] = useState(1);

	useEffect(() => {
		if (user_details && user_details._id) {
			navigate("/profile");
		}
	}, [user_details]);

	const forgotHandler = async () => {
		if (email) {
			try {
				setLoad(true);
				let res = await basicService.forgotPassword({ email });
				setToken(res?.data?.token);
				setLoad(false);
				setStep(2);
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		} else {
			alert("Please provide your Email to proceed");
		}
	};

	const resetHandler = async () => {
		if (password && password === confirmPassword) {
			try {
				setLoad(true);
				let res = await basicService.resetPassword({
					email,
					token,
					otp,
					password,
				});
				setLoad(false);
				if (res) {
					navigate("/login");
					toast.success("Password has been changed", {
						position: "top-right",
					});
				}
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		} else {
			alert("Passwords does not match");
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
									<h5>
										{step === 1 ? "Forgot" : "Reset"}{" "}
										Password
									</h5>
									{step === 1 && (
										<p>
											Please provide your registered email
										</p>
									)}
								</div>
								<div className="form">
									{step === 1 ? (
										<input
											type="text"
											value={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
											placeholder="Email"
											disabled={load}
										/>
									) : (
										<>
											<input
												type="number"
												value={otp}
												onChange={(e) =>
													setOtp(e.target.value)
												}
												placeholder="Enter OTP"
												disabled={load}
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
														setPassword(
															e.target.value
														)
													}
													placeholder="Password"
													disabled={load}
												/>
												<button
													className="rel"
													onClick={(e) => {
														e.preventDefault();
														setShowPassword(
															!showPassword
														);
													}}
												>
													{!showPassword ? (
														<FiEye size={22} />
													) : (
														<FiEyeOff size={22} />
													)}
												</button>
											</div>
											<div className="pos">
												<input
													type={
														showCPassword
															? "text"
															: "password"
													}
													value={confirmPassword}
													onChange={(e) =>
														setConfirmPassword(
															e.target.value
														)
													}
													placeholder="Confirm Password"
													disabled={load}
												/>
												<button
													className="rel"
													onClick={(e) => {
														e.preventDefault();
														setShowCPassword(
															!showCPassword
														);
													}}
												>
													{!showCPassword ? (
														<FiEye size={22} />
													) : (
														<FiEyeOff size={22} />
													)}
												</button>
											</div>
										</>
									)}

									<div className="text-center button">
										<button
											disabled={load}
											onClick={
												step === 1
													? forgotHandler
													: resetHandler
											}
										>
											{load
												? "Hold On..."
												: step === 1
												? "Submit"
												: "Change"}
										</button>
									</div>
									{step === 1 && (
										<div className="others">
											<p>
												Remember your password?{" "}
												<Link to="/login">Sign In</Link>
											</p>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ForgotPassword;
