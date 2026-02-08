import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../component/Navigation";
import dateFormat from "dateformat";
import CheckoutView from "../component/CheckoutView";
import ModalComponent from "../component/ModalComponent";
import PaymentGateway from "../component/PaymentGateway";

const Checkout = () => {
	const navigate = useNavigate();
	const [details, setDetails] = useState({});
	const [gatewayDetails, setGatewayDetails] = useState({});
	const [openModal, setOpenModal] = useState(false);
	const [showMobile, setShowMobile] = useState(false);

	const data = useLocation().state;

	useEffect(() => {
		window.scrollTo(0, 0);

		if (data && data.property) {
			setDetails(data.property);
		} else {
			navigate("/projects");
		}
	}, []);

	const roundPrice = (val) => {
		if (val >= 1000000) {
			return `${Math.round(val / 1000000)}M`;
		} else if (val >= 100000 && val < 1000000) {
			return `${Math.round(val / 1000)}K`;
		} else {
			return `${Math.round(val)}`;
		}
	};

	const getPercentLeft = () => {
		if (details.total_price) {
			let val =
				(details.total_price - details.investment_available) /
				details.total_price;
			return (val * 100).toFixed(2);
		}
	};

	return (
		<div className="cover-page">
			{details && details._id && (
				<>
					<div className="row">
						<div className="col-lg-8">
							<div className="urb-page">
								<Navigation />
								<div className="property-page checkout-property">
									<div className="container">
										<div className="show-btn">
											<button
												onClick={() =>
													setShowMobile(!showMobile)
												}
											>
												{showMobile ? "Hide" : "View"}{" "}
												Property Details
											</button>
										</div>
										<div
											className={
												showMobile ? "" : "show-p"
											}
										>
											<div className="image-section">
												<div className="view">
													{details.images.length >
														0 && (
														<img
															src={
																details
																	.images[0]
																	.url
															}
															alt="Property"
														/>
													)}
												</div>
											</div>
											<div className="box mt-4">
												<div className="features">
													<h3 className="title">
														{details.name}
													</h3>
													<div className="basic-details">
														<div className="bs">
															<div className="list">
																<p>Units:</p>
																<strong>
																	{
																		details.total_units
																	}
																</strong>
															</div>

															<div className="list">
																<p>SQM:</p>
																<strong>
																	{
																		details.areaSqm
																	}
																</strong>
															</div>

															<div className="list">
																<p>
																	Project
																	Status:
																</p>
																<strong>
																	{
																		details.status
																	}
																</strong>
															</div>

															<div className="list">
																<p>
																	Construction
																	Start Date:
																</p>
																<strong>
																	{details.construction_start_date
																		? dateFormat(
																				details.construction_start_date,
																				"mmmm yyyy"
																		  )
																		: "Pending"}
																</strong>
															</div>

															<div className="list">
																<p>
																	Construction
																	End Date:
																</p>
																<strong>
																	{details.construction_end_date
																		? dateFormat(
																				details.construction_end_date,
																				"mmmm yyyy"
																		  )
																		: "Pending"}
																</strong>
															</div>
														</div>

														<div className="row mt-3">
															<div className="col-lg-3 col-md-4 col-sm-6 col-6 mb-3">
																<div className="basic-2">
																	<p>
																		Investors
																	</p>
																	<h1>
																		{
																			details.investors_count
																		}
																	</h1>
																</div>
															</div>
															<div className="col-lg-3 col-md-4 col-sm-6 col-6 mb-3">
																<div className="basic-2">
																	<p>
																		Property
																		Value
																	</p>
																	<h1>
																		₦
																		{roundPrice(
																			details.total_price
																		)}
																	</h1>
																</div>
															</div>
															<div className="col-lg-3 col-6 mb-3">
																<div className="basic-2">
																	<p>
																		Investment
																		Available
																	</p>
																	<h1>
																		₦
																		{roundPrice(
																			details.investment_available
																		)}
																	</h1>
																</div>
															</div>
															<div className="col-lg-3 col-6 mb-3">
																<div className="basic-2">
																	<p>
																		Percentage
																		Sold
																	</p>
																	<h1>
																		{getPercentLeft()}
																		%
																	</h1>
																</div>
															</div>
															<div className="col-lg-3 col-6 mb-3">
																<div className="basic-2">
																	<p>
																		No of
																		Units
																	</p>
																	<h1>
																		{
																			details.total_units
																		}
																	</h1>
																</div>
															</div>
															<div className="col-lg-3 col-6 mb-3">
																<div className="basic-2">
																	<p>
																		Total
																		Fractions
																	</p>
																	<h1>
																		{
																			details.total_fractions
																		}
																	</h1>
																</div>
															</div>
															<div className="col-lg-3 col-6 mb-3">
																<div className="basic-2">
																	<p>
																		Fractions
																		Taken
																	</p>
																	<h1>
																		{roundPrice(
																			details.fractions_taken
																		)}
																	</h1>
																</div>
															</div>
															<div className="col-lg-3 col-6 mb-3">
																<div className="basic-2">
																	<p>
																		Cost Per
																		Fraction
																	</p>
																	<h1>
																		₦
																		{roundPrice(
																			details.cost_per_fraction
																		)}
																	</h1>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="contacts sticky-top">
								<CheckoutView
									propertyDetail={details}
									onComplete={(res) => {
										setOpenModal(true);
										setGatewayDetails(res);
									}}
								/>
							</div>
						</div>
					</div>
				</>
			)}
			{gatewayDetails && gatewayDetails.tx_ref && (
				<ModalComponent open={true} toggle={() => setOpenModal(false)}>
					<PaymentGateway
						initiate={gatewayDetails}
						onCancel={() => setGatewayDetails({})}
						onComplete={() => setOpenModal(false)}
					/>
				</ModalComponent>
			)}
		</div>
	);
};

export default Checkout;
