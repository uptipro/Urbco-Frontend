import React, { useEffect, useState } from "react";
import Navigation from "../component/Navigation";
import Property from "../component/Property";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotifyIcon from "../assets/notify.svg";
import LogoutIcon from "../assets/logout.svg";
import Investment from "../component/Investment";
import { listInvestments, logout } from "../redux/basic/basicSlice";
import ModalComponent from "../component/ModalComponent";

const Profile = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const [openModal, setOpenModal] = useState(false);

	const { projects } = useSelector((state) => state.basic);

	const { user_details, investments, loading } = useSelector(
		(state) => state.basic
	);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!user_details) {
			navigate("/login");
		} else {
			dispatch(listInvestments({ id: user_details._id }));
		}
	}, [user_details]);

	const getInitials = (string) => {
		let names = string.split(" "),
			initials = names[0].substring(0, 1).toUpperCase();

		if (names.length > 1) {
			initials += names[names.length - 1].substring(0, 1).toUpperCase();
		}
		return initials;
	};

	const logoutHandler = () => {
		if (window.confirm("Are you sure you want to logout?")) {
			dispatch(logout());
		}
	};

	const editHandler = () => {
		// let data = {
		// 	title,
		// 	user_type: userType,
		// 	first_name: firstName,
		// 	last_name: lastName,
		// 	phone,
		// 	email,
		// 	date_of_birth: dateOfBirth,
		// 	marital_status: maritalStatus,
		// 	gender,
		// 	address,
		// 	business_name: businessName,
		// 	business_reg_no: businessReg,
		// 	business_address: businessAddress,
		// 	date_of_incoporation: dateOfIncoporation,
		// 	business_country: businessCountry,
		// 	business_email: businessEmail,
		// 	business_phone: businessPhone,
		// 	password,
		// };
	};

	return (
		<div className="cover-page">
			{user_details && user_details._id && (
				<div className="row">
					<div className="col-lg-8">
						<div className="urb-page">
							<Navigation />
							<div className="app-profile container">
								<div className="details">
									<div className="notify">
										<button className="notify-btn">
											<img
												src={NotifyIcon}
												alt="Notify"
											/>
										</button>
									</div>
									<div className="names">
										<div className="init">
											<p>
												{user_details.business_name ||
													`${user_details.first_name} ${user_details.last_name}`}
											</p>
											<div className="display">
												<button
													className="edit-btn"
													onClick={() =>
														setOpenModal(true)
													}
												>
													Edit Profile
												</button>
												<button
													className="logout-btn"
													onClick={logoutHandler}
												>
													<img
														src={LogoutIcon}
														alt="Notify"
													/>
												</button>
											</div>
										</div>
										<div className="initials">
											{getInitials(
												user_details.user_type ===
													"business"
													? `${user_details.business_name}`
													: `${user_details.first_name} ${user_details.last_name}`
											)}
										</div>
									</div>
								</div>
								<div className="info">
									<div className="line">
										<h5>Investments</h5>
									</div>
									<div className="investments">
										{loading ? (
											<div className="empty">
												<p>Fetching Investments...</p>
											</div>
										) : investments &&
										  investments.investments &&
										  investments.investments.length > 0 ? (
											<div className="row">
												{investments.investments.map(
													(i) => (
														<div
															className="col-lg-6"
															key={i._id}
														>
															<Investment
																item={i}
															/>
														</div>
													)
												)}
											</div>
										) : (
											<div className="empty">
												<p>
													No Investment has been made
												</p>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-4 d-lg-block d-none">
						<div className="properties-vary">
							<div className="filter">
								<h5>Top Projects</h5>
							</div>
							<div className="list">
								{projects &&
									projects.properties &&
									projects.properties.map((p) => (
										<Property key={p.id} item={p} />
									))}
								<div className="paginate">
									<button>
										<FiArrowLeft />
									</button>
									<div>
										<span className="active" />
										<span />
										<span />
									</div>
									<button>
										<FiArrowRight />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<ModalComponent
				open={openModal}
				toggle={() => setOpenModal(!openModal)}
				size={"lg"}
			>
				<div className="edit-profile contact">
					<div className="form">
						<div className="row">
							<div className="col-md-6">
								<label>Contact Phone</label>
								<input />
							</div>
							<div className="col-md-6">
								<label>Contact First Name</label>
								<input />
							</div>
							<div className="col-md-6">
								<label>Contact Last Name</label>
								<input />
							</div>
						</div>
					</div>
				</div>
			</ModalComponent>
		</div>
	);
};

export default Profile;
