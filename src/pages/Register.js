import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { displayError } from "../redux/error";
import basicService from "../redux/basic/basicService";
import { toast } from "react-hot-toast";

const types = [
	{ id: 1, name: "individual" },
	{ id: 2, name: "couple" },
	{ id: 3, name: "business" },
];

const Register = () => {
	const navigate = useNavigate();

	const [step, setStep] = useState(1);
	const [load, setLoad] = useState(false);

	const [searchParams] = useSearchParams();
	const dataState = useLocation().state?.property;
	const query = searchParams.get("property");

	const [userType, setUserType] = useState("business");
	const [businessName, setBusinessName] = useState("");
	const [businessReg, setBusinessReg] = useState("");
	const [businessAddress, setBusinessAddress] = useState("");
	const [businessEmail, setBusinessEmail] = useState("");
	const [businessCountry, setBusinessCountry] = useState("");
	const [businessPhone, setBusinessPhone] = useState("");
	const [dateOfIncoporation, setDateOfIncoporation] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [maritalStatus, setMaritalStatus] = useState("");
	const [address, setAddress] = useState("");
	const [gender, setGender] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [title, setTitle] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
		document.body.classList.remove("noscroll");
	}, []);

	const step1Handler = () => {
		if (userType && password && email) {
			setStep(2);
		} else {
			alert("Please Provide all fields");
		}
	};

	const verifyHandler = () => {
		let data = {
			title,
			user_type: userType,
			first_name: firstName,
			last_name: lastName,
			phone,
			email,
			date_of_birth: dateOfBirth,
			marital_status: maritalStatus,
			gender,
			address,
			business_name: businessName,
			business_reg_no: businessReg,
			business_address: businessAddress,
			date_of_incoporation: dateOfIncoporation,
			business_country: businessCountry,
			business_email: businessEmail,
			business_phone: businessPhone,
			password,
		};

		if (
			userType === "business" &&
			businessName &&
			businessReg &&
			businessAddress &&
			businessEmail &&
			firstName &&
			lastName
		) {
			submitHandler(data);
		} else if (
			userType === "individual" &&
			phone &&
			address &&
			title &&
			firstName &&
			lastName
		) {
			submitHandler(data);
		} else {
			alert("Please Provide required fields");
		}
	};

	const submitHandler = async (data) => {
		try {
			setLoad(true);
			let res = await basicService.registerInvestor(data);
			setLoad(false);
			if (res) {
				toast.success("Registration was successful. Please Login", {
					position: "top-right",
				});
				goToLogin();
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const goToLogin = () => {
		if (query && dataState) {
			navigate(`/login?property=${query}`, {
				state: { property: dataState },
			});
		} else {
			navigate("/login");
		}
	};
	return (
		<div className="auth-screen">
			<div className="container">
				<div className="row justify-content-center">
					<div className={step === 1 ? "col-md-6" : "col-md-8"}>
						<div className="logo">
							<Link to={"/projects"}>
								<img src={Logo} alt="Logo" />
							</Link>
						</div>
						<div className="contact">
							<div className="title">
								<h5>Sign Up</h5>
								<p>Hi, How are you doing?</p>
							</div>
							<div className="form">
								{step === 1 ? (
									<>
										<label>Sign Up as</label>
										<select
											value={userType}
											onChange={(e) =>
												setUserType(e.target.value)
											}
										>
											<option value={"business"}>
												Business
											</option>
											<option value={"individual"}>
												Individual
											</option>
											<option value={"cooperative"}>
												Co-operative
											</option>
											<option value={"couple"}>
												Couple
											</option>
										</select>
										<label>Email Address</label>
										<input
											placeholder=""
											value={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
										/>
										<label>Password</label>
										<div className="pos">
											<input
												type={
													showPassword
														? "text"
														: "password"
												}
												placeholder=""
												value={password}
												onChange={(e) =>
													setPassword(e.target.value)
												}
											/>
											<button
												className="abs"
												onClick={() =>
													setShowPassword(
														!showPassword
													)
												}
											>
												{!showPassword ? (
													<FiEye size={22} />
												) : (
													<FiEyeOff size={22} />
												)}
											</button>
										</div>
										<div className="text-center button">
											<button
												onClick={(e) => {
													e.preventDefault();
													step1Handler();
												}}
											>
												Next
											</button>
										</div>
										<div className="others">
											<p>
												You have an account?{" "}
												<button
													className="link"
													onClick={goToLogin}
												>
													Login
												</button>
											</p>
										</div>
									</>
								) : (
									<>
										<div className="row">
											{(userType === "business" ||
												userType === "cooperative") && (
												<>
													<div className="col-lg-6">
														<label>
															Business
															Registration Number
														</label>
														<input
															placeholder=""
															value={businessReg}
															onChange={(e) =>
																setBusinessReg(
																	e.target
																		.value
																)
															}
															disabled={load}
														/>
													</div>
													<div className="col-lg-6">
														<label>
															Business Name
														</label>
														<input
															placeholder=""
															value={businessName}
															onChange={(e) =>
																setBusinessName(
																	e.target
																		.value
																)
															}
															disabled={load}
															type="text"
														/>
													</div>
													<div className="col-lg-6">
														<label>
															Business Email
														</label>
														<input
															placeholder=""
															value={
																businessEmail
															}
															onChange={(e) =>
																setBusinessEmail(
																	e.target
																		.value
																)
															}
															type="email"
															disabled={load}
														/>
													</div>
													<div className="col-lg-6">
														<label>
															Business Phone
														</label>
														<input
															placeholder=""
															value={
																businessPhone
															}
															onChange={(e) =>
																setBusinessPhone(
																	e.target
																		.value
																)
															}
															type="tel"
															disabled={load}
														/>
													</div>
													<div className="col-lg-6">
														<label>
															Business Country
														</label>
														<input
															placeholder=""
															value={
																businessCountry
															}
															onChange={(e) =>
																setBusinessCountry(
																	e.target
																		.value
																)
															}
															disabled={load}
														/>
													</div>
													<div className="col-lg-6">
														<label>
															Buiness Address
														</label>
														<input
															placeholder=""
															value={
																businessAddress
															}
															onChange={(e) =>
																setBusinessAddress(
																	e.target
																		.value
																)
															}
															disabled={load}
														/>
													</div>
													<div className="col-lg-6">
														<label>
															Date of Incoporation
														</label>
														<input
															placeholder=""
															value={
																dateOfIncoporation
															}
															onChange={(e) =>
																setDateOfIncoporation(
																	e.target
																		.value
																)
															}
															type="date"
															disabled={load}
														/>
													</div>
												</>
											)}
											{userType === "individual" && (
												<>
													<div className="col-lg-6">
														<label>Title</label>
														<select
															value={title}
															onChange={(e) =>
																setTitle(
																	e.target
																		.value
																)
															}
															disabled={load}
														>
															<option value={""}>
																Select One
															</option>
															<option
																value={"mr"}
															>
																Mr
															</option>
															<option
																value={"mrs"}
															>
																Mrs
															</option>
															<option
																value={"miss"}
															>
																Miss
															</option>
														</select>
													</div>
												</>
											)}

											<div className="col-lg-6">
												<label>
													{(userType === "business" ||
														userType ===
															"cooperative") &&
														"Contact"}{" "}
													First Name
												</label>
												<input
													placeholder=""
													value={firstName}
													onChange={(e) =>
														setFirstName(
															e.target.value
														)
													}
													type="text"
													disabled={load}
												/>
											</div>
											<div className="col-lg-6">
												<label>
													{(userType === "business" ||
														userType ===
															"cooperative") &&
														"Contact"}{" "}
													Last Name
												</label>
												<input
													placeholder=""
													value={lastName}
													onChange={(e) =>
														setLastName(
															e.target.value
														)
													}
													type="text"
													disabled={load}
												/>
											</div>
											<div className="col-lg-6">
												<label>
													{(userType === "business" ||
														userType ===
															"cooperative") &&
														"Contact"}{" "}
													Phone
												</label>
												<input
													placeholder=""
													value={phone}
													onChange={(e) =>
														setPhone(e.target.value)
													}
													type="tel"
													disabled={load}
												/>
											</div>
											{userType === "individual" && (
												<>
													<div className="col-lg-6">
														<label className="label">
															Gender
														</label>
														<select
															value={gender}
															onChange={(e) =>
																setGender(
																	e.target
																		.value
																)
															}
															disabled={load}
														>
															<option value={""}>
																Select One
															</option>
															<option
																value={"male"}
															>
																Male
															</option>
															<option
																value={"female"}
															>
																Female
															</option>
														</select>
													</div>
													<div className="col-lg-6">
														<label className="label">
															Marital Status
														</label>
														<select
															value={
																maritalStatus
															}
															onChange={(e) =>
																setMaritalStatus(
																	e.target
																		.value
																)
															}
															disabled={load}
														>
															<option value={""}>
																Select One
															</option>
															<option
																value={"single"}
															>
																Single
															</option>
															<option
																value={
																	"married"
																}
															>
																Married
															</option>
															<option
																value={
																	"divorced"
																}
															>
																Divorced
															</option>
														</select>
													</div>
													<div className="col-lg-6">
														<label>
															Date Of Birth
														</label>
														<input
															value={dateOfBirth}
															onChange={(e) =>
																setDateOfBirth(
																	e.target
																		.value
																)
															}
															type="date"
															disabled={load}
														/>
													</div>
													<div className="col-lg-6">
														<label>Address</label>
														<input
															value={address}
															onChange={(e) =>
																setAddress(
																	e.target
																		.value
																)
															}
															type="text"
															disabled={load}
														/>
													</div>
												</>
											)}
											{userType === "couple" && (
												<>
													<div className="col-lg-6">
														<label>Address</label>
														<input
															value={address}
															onChange={(e) =>
																setAddress(
																	e.target
																		.value
																)
															}
															type="text"
															disabled={load}
														/>
													</div>
												</>
											)}
										</div>
										<div
											className="text-center button"
											onClick={verifyHandler}
										>
											<button disabled={load}>
												{load ? "Hold On..." : "Submit"}
											</button>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
