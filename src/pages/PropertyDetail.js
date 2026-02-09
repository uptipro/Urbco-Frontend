import React, { useEffect, useRef, useState } from "react";
import Navigation from "../component/Navigation";
import PropertyImg from "../assets/property2.png";
import { FaLandmark } from "react-icons/fa";
import Preloader from "../component/Preloader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import basicService from "../redux/basic/basicService";
import dateFormat from "dateformat";
import { formatCurrency, numberWithCommas } from "../utils/currencyFormat";
import CurrencyInput from "react-currency-input-field";
import { useSelector } from "react-redux";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Tooltip } from "reactstrap";
import OwnFractionImg from "../assets/OwnAFraction.png";

const PropertyDetail = () => {
	const navigate = useNavigate();

	const othersRef = useRef(null);

	const { user_details } = useSelector((state) => state.basic);

	const [load, setLoad] = useState(false);
	const [details, setDetails] = useState({});
	const [currentImage, setCurrentImage] = useState(0);
	const [noOfFractions, setNoOfFractions] = useState(0);
	const [totalInvestment, setTotalInvestment] = useState(0);
	const [returns, setReturns] = useState(0);
	const [purchasePlan, setPurchasePlan] = useState("opbp");
	const [fractionCost, setFractionCost] = useState(0);

	const [opbpTip, setOpbpTip] = useState(false);
	const [optpTip, setOptpTip] = useState(false);
	const [cspTip, setCspTip] = useState(false);
	const [optpsTip, setOptpsTip] = useState(false);
	const [full, setFull] = useState(false);

	const data = useLocation().state;
	const params = useParams();

	useEffect(() => {
		window.scrollTo(0, 0);
		if (data && data.property) {
			setDetails(data.property);
		} else {
			loadDetails();
		}
		setNoOfFractions(1);
	}, [data, loadDetails]);

	useEffect(() => {
		calculatorReturns();
	}, [purchasePlan, noOfFractions, calculatorReturns]);

	const loadDetails = async () => {
		try {
			setLoad(true);
			let res = await basicService.getPropertyDetails(params.ref);
			setLoad(false);
			if (res && res.data) {
				setDetails(res.data);
			}
		} catch (err) {
			setLoad(false);
		}
	};

	const calculatorReturns = () => {
		if (details.optp) {
			let cost;
			if (purchasePlan === "optp") {
				cost =
					details.cost_per_fraction -
					(details.optp.discount * details.cost_per_fraction) / 100;
			} else if (purchasePlan === "opbp") {
				cost =
					details.cost_per_fraction -
					(details.opbp.discount * details.cost_per_fraction) / 100;
			} else if (purchasePlan === "csp") {
				cost =
					details.cost_per_fraction -
					(details.csp.discount * details.cost_per_fraction) / 100;
			} else {
				cost = details.cost_per_fraction;
			}
			setFractionCost(cost);
			getInvestmentReturns(cost);
		}
	};

	const getInvestmentReturns = (val) => {
		let total = noOfFractions * val;
		setTotalInvestment(total);
		let totalPercent =
			details.rentals.annual_yield_percent ||
			0 + details.capital_appreciation_percent ||
			0;
		setReturns(totalPercent > 1 ? (total * totalPercent) / 100 : total);
	};

	const roundPrice = (val) => {
		let result = Intl.NumberFormat("en-US", {
			notation: "compact",
			maximumFractionDigits: 2,
		}).format(val);

		return result;
	};

	const getPercentLeft = () => {
		if (details.total_price) {
			let val =
				(details.total_price - details.investment_available) /
				details.total_price;
			return (val * 100).toFixed(2);
		}
	};

	const listPercentStages = () => {
		if (details.optp.percent) {
			let split = details.optp.percent.split(",");
			if (split.length > 2) {
				return `${split[0]}% ${split[1]}% ${split[2]}%`;
			} else if (split.length === 2) {
				return `${split[0]}% ${split[1]}%`;
			} else {
				return ``;
			}
		}
	};

	const checkoutHandler = () => {
		if (user_details && user_details._id) {
			navigate(`/checkout`, { state: { property: details } });
		} else {
			navigate(`/register?property=${details.ref}`, {
				state: { property: details },
			});
		}
	};

	return (
		<div className="cover-page">
			<Navigation />
			{load ? (
				<div className="preloader">
					<Preloader />
				</div>
			) : (
				details &&
				details._id && (
					<div className="property-page">
						<div className="container">
							<div className="row image-section">
								<div className="col-lg-9 mb-2">
									<div className="view">
										{details.images.length > 0 ? (
											<img
												src={
													details.images[currentImage]
														.url
												}
												alt="Property"
											/>
										) : (
											<img
												src={PropertyImg}
												alt="Property"
											/>
										)}
									</div>
								</div>
								<div className="col-lg-3 mb-2">
									<div className="others" ref={othersRef}>
										{details.images.map((img, i) => (
											<div
												key={img.order}
												className={`${
													currentImage === i
														? "active"
														: ""
												} img-holder`}
												onClick={() => {
													setCurrentImage(i);
													othersRef.current.scrollTo({
														top: i * 100,
														behavior: "smooth",
													});
												}}
											>
												<img
													src={img.url}
													alt="Property"
												/>
											</div>
										))}
									</div>
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-lg-8">
									<div className="box">
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
															{details.areaSqm}
														</strong>
													</div>

													<div className="list">
														<p>Project Status:</p>
														<strong>
															{details.status}
														</strong>
													</div>

													<div className="list">
														<p>
															Construction Start
															Date:
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
															Construction End
															Date:
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
															<p>Investors</p>
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
																Property Value
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
																Percentage Sold
															</p>
															<h1>
																{getPercentLeft()}
																%
															</h1>
														</div>
													</div>
													<div className="col-lg-3 col-6 mb-3">
														<div className="basic-2">
															<p>No of Units</p>
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
																Total Fractions
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
																Fractions Taken
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
									<div className="box">
										<div className="desc">
											<h4 className="title-p">
												Project Description
											</h4>
											<div
												dangerouslySetInnerHTML={{
													__html: details.description,
												}}
											/>
											<div className="main-features row justify-content-center">
												{details.features.map((f) => (
													<div
														className="col-lg-3 col-md-4 col-sm-6 col-6"
														key={f._id}
													>
														<div className="keys">
															{f.image ? (
																<img
																	src={f.image}
																	alt={f.name || "feature"}
																/>
															) : (
																<span>
																	<FaLandmark />
																</span>
															)}
															<p>
																{f.feature &&
																	f.feature
																		.name}
															</p>
														</div>
													</div>
												))}
											</div>
											<div className="info">
												<p>
													Investment value All-in (No
													additional charges or
													payments)
												</p>
												<p>
													Rental rates inclusive of
													Power & Services.
												</p>
											</div>
										</div>
									</div>
									<div className="box">
										<h4 className="title-p">Sales</h4>
										<div className="row mt-3">
											<div className="col-lg-4 col-md-6 mb-3">
												<div className="basic-2 small">
													<p>Value per unit</p>
													<h1>
														₦
														{numberWithCommas(
															details.cost_per_unit
														)}
													</h1>
												</div>
											</div>
											<div className="col-lg-4 col-md-6 mb-3">
												<div className="basic-2 small">
													<p>Value per fraction</p>
													<h1>
														₦
														{numberWithCommas(
															details.cost_per_fraction
														)}
													</h1>
												</div>
											</div>
											<div className="col-lg-4 col-md-6 mb-3">
												<div className="basic-2 small">
													<p>
														Off-plan Bullet Payment{" "}
														<button className="tool-tip">
															<span id="opbp">
																<BsFillInfoCircleFill
																	size={20}
																/>
															</span>
														</button>
														<Tooltip
															placement="top"
															isOpen={opbpTip}
															target="opbp"
															toggle={() =>
																setOpbpTip(
																	!opbpTip
																)
															}
														>
															Explanation of
															Offline Purchase
															Bullet Payment
														</Tooltip>
													</p>
													<h1>
														{details.opbp.discount}%
													</h1>
												</div>
											</div>
											<div className="col-lg-6 mb-3">
												<div className="basic-2 small">
													<p>
														Off-plan Purchase
														Tranche Payment{" "}
														<button className="tool-tip">
															<span id="optp">
																<BsFillInfoCircleFill
																	size={20}
																/>
															</span>
														</button>
														<Tooltip
															placement="top"
															isOpen={optpTip}
															target="optp"
															toggle={() =>
																setOptpTip(
																	!optpTip
																)
															}
														>
															Explanation of
															Offline Purchase
															Tranche Payment
														</Tooltip>
													</p>
													<h1>
														{details.optp.discount}%
													</h1>
												</div>
											</div>
											<div className="col-lg-6 mb-3">
												<div className="basic-2 small">
													<p>
														Construction Stage
														Purchase{" "}
														<button className="tool-tip">
															<span id="csp">
																<BsFillInfoCircleFill
																	size={20}
																/>
															</span>
														</button>
														<Tooltip
															placement="top"
															isOpen={cspTip}
															target="csp"
															toggle={() =>
																setCspTip(
																	!cspTip
																)
															}
														>
															Explanation of
															Construction Stage
															Purchase
														</Tooltip>
													</p>
													<h1>
														{details.csp.discount}%
													</h1>
												</div>
											</div>
											<div className="col-lg-6 mb-3">
												<div className="basic-2 small">
													<p>
														Off-plan Tranche Payment
														Stages{" "}
														<button className="tool-tip">
															<span id="optps">
																<BsFillInfoCircleFill
																	size={20}
																/>
															</span>
														</button>
														<Tooltip
															placement="top"
															isOpen={optpsTip}
															target="optps"
															toggle={() =>
																setOptpsTip(
																	!optpsTip
																)
															}
														>
															Explanation of
															Offline Purchase
															Tranche Payment
															Stages
														</Tooltip>
													</p>
													<h1>
														{details.optp.stages}(
														{listPercentStages()})
													</h1>
												</div>
											</div>
											<div className="col-lg-6 mb-3">
												<div className="basic-2 small">
													<p>
														Off-plan Payment Secured{" "}
														<button className="tool-tip">
															<span id="full">
																<BsFillInfoCircleFill
																	size={20}
																/>
															</span>
														</button>
														<Tooltip
															placement="top"
															isOpen={full}
															target="full"
															toggle={() =>
																setFull(!full)
															}
														>
															Explanation of
															Off-plan Payment
															Secured
														</Tooltip>
													</p>
													<h1>100%</h1>
												</div>
											</div>
										</div>
										<div className="info">
											<p>
												Construction stage payment ends
												at roofing
											</p>
											<p>
												Off-plan Payment secured to
												completion of roofing
											</p>
										</div>
									</div>
									<div className="box">
										<h4 className="title-p">Rentals</h4>
										<div className="row mt-3">
											<div className="col-lg-4 col-md-6 mb-3">
												<div className="basic-2 small">
													<p>
														Rent per Quarter
														(projected)
													</p>
													<h1>
														₦
														{numberWithCommas(
															details.rentals
																.rent_per_quater
														)}
													</h1>
												</div>
											</div>
											<div className="col-lg-4 col-md-6 mb-3">
												<div className="basic-2 small">
													<p>Rental Status</p>
													<h1
														style={{
															textTransform:
																"capitalize",
														}}
													>
														{details.status}
													</h1>
												</div>
											</div>
											<div className="col-lg-4 col-md-6 mb-3">
												<div className="basic-2 small">
													<p>
														Rental Income Frequency
													</p>
													<h1>
														{
															details.rentals
																.rent_frequency
														}
													</h1>
												</div>
											</div>
											<div className="col-lg-4 col-md-6 mb-3">
												<div className="basic-2 small">
													<p>
														Annual Rental Yield
														(projected)
													</p>
													<h1>
														{
															details.rentals
																.annual_yield_percent
														}
														%
													</h1>
												</div>
											</div>
											<div className="col-lg-4 col-md-6 mb-3">
												<div className="basic-2 small">
													<p>
														Rental Yield Assumption
													</p>
													<h1>
														{
															details.rentals
																.yield_assumption_percent
														}
														%
													</h1>
												</div>
											</div>
											<div className="col-lg-4 col-md-6 mb-3">
												<div className="basic-2 small">
													<p>
														Rental Income Guarantee
													</p>
													<h1>Yes</h1>
												</div>
											</div>
										</div>
										<div className="row justify-content-center">
											<div className="col-lg-6 mb-3">
												<div className="basic-2 small">
													<p>First Dividend Date</p>
													<h1>
														{dateFormat(
															details.rentals
																.first_dividend_date,
															"mmmm yyyy"
														)}
													</h1>
												</div>
											</div>
										</div>
										<div className="row justify-content-center">
											<div className="col-lg-6 mb-3">
												<div className="basic-2 small">
													<p>
														Timeline to Rental
														Income Start
													</p>
													<h1>
														Upon Construction
														Completion
													</h1>
												</div>
											</div>
										</div>
									</div>
									<div className="box">
										<h4 className="title-p">
											Investment Returns
										</h4>
										<div className="row mt-5">
											<div className="col-lg-12 mb-3">
												<div className="basic-2 small">
													<p>
														Investment Return
														Sources
													</p>
													<h1>
														Rental Income & Capital
														Appreciation
													</h1>
												</div>
											</div>

											<div className="col-lg-12 mb-3">
												<div className="basic-2 small">
													<p>
														Rental Yield - Annual
														(projected)
													</p>
													<h1>
														{
															details.rentals
																.annual_yield_percent
														}
														%
													</h1>
												</div>
											</div>
											<div className="col-lg-12 mb-3">
												<div className="basic-2 small">
													<p>
														Capital Appreciation -
														Annual (projected)
													</p>
													<h1>
														{
															details.capital_appreciation_percent
														}
														%
													</h1>
												</div>
											</div>
											<div className="col-lg-12 mb-3">
												<div className="basic-2 small">
													<p>
														Investment Returns -
														Annual (projected)
													</p>
													<h1>
														{details.rentals
															.annual_yield_percent +
															details.capital_appreciation_percent}
														%
													</h1>
												</div>
											</div>
										</div>
									</div>
									<div className="calculator-box">
										<h3>Investment Returns Calculator</h3>
										<div className="c-form row">
											<div className="col-lg-6">
												<label>
													No of Fractions Required{" "}
													<span>
														(
														{
															details.total_fractions
														}{" "}
														Available)
													</span>
												</label>
											</div>
											<div className="col-lg-6">
												<input
													type="number"
													max={
														details.total_fractions
													}
													value={noOfFractions}
													onChange={(e) =>
														setNoOfFractions(
															e.target.value
														)
													}
												/>
											</div>
											<div className="col-lg-6">
												<label>
													Purchase Payment Plan Option
												</label>
											</div>
											<div className="col-lg-6">
												<select
													value={purchasePlan}
													onChange={(e) =>
														setPurchasePlan(
															e.target.value
														)
													}
												>
													<option value={"opbp"}>
														Off-plan Purchase Bullet
														Payment
													</option>
													<option value="optp">
														Off-plan Purchase
														Tranche Payment
													</option>
													<option value={"csp"}>
														Construction Stage
														Purchase
													</option>
												</select>
											</div>
											<div className="col-lg-6">
												<label>Cost Per Fraction</label>
											</div>
											<div className="col-lg-6">
												<CurrencyInput
													name="input-name"
													placeholder=""
													value={fractionCost}
													decimalsLimit={2}
													disabled={true}
													prefix={"₦ "}
												/>
											</div>
											<div className="col-lg-6">
												<label>
													Total Investment Amount
												</label>
											</div>
											<div className="col-lg-6">
												<CurrencyInput
													name="input-name"
													placeholder=""
													value={totalInvestment}
													decimalsLimit={2}
													disabled={true}
													prefix={"₦ "}
												/>
											</div>
											<div className="col-lg-6">
												<label>
													Rental Yield - Annual
													<span>(Projected)</span>
												</label>
											</div>
											<div className="col-lg-6">
												<input
													type="text"
													disabled={true}
													value={`${details.rentals.annual_yield_percent}%`}
												/>
											</div>
											<div className="col-lg-6">
												<label>
													Capital Appreciation -
													Annual
													<span>(Projected)</span>
												</label>
											</div>
											<div className="col-lg-6">
												<input
													type="text"
													disabled={true}
													value={`${details.capital_appreciation_percent}%`}
												/>
											</div>
											<div className="col-lg-6">
												<label>
													Investment Returns - Annual
													<span>(Projected)</span>
												</label>
											</div>
											<div className="col-lg-6">
												<CurrencyInput
													name="input-name"
													placeholder=""
													value={returns}
													decimalsLimit={2}
													disabled={true}
													prefix={"₦ "}
												/>
											</div>
										</div>
										<p>
											This calculator displays a range of
											projected investment outcomes based
											on the inputs you have provided. The
											actual investment outcomes will
											depend on a multitude of factors and
											cannot be determined in advance of
											the end of the investment period.
											Historical performance is not
											entirely indicative of future
											results.
										</p>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="login-box">
										<div className="dark-box">
											<div className="flx">
												<h2>
													₦
													{numberWithCommas(
														details.investment_available
													)}
												</h2>
												<p>AVAILABLE</p>
											</div>
											<button onClick={checkoutHandler}>
												{user_details &&
												user_details._id
													? "Invest Now"
													: "Sign Up to Invest"}
											</button>
										</div>
										<div className="light-box">
											<p>
												{details.investors_count}{" "}
												Investor
												{details.investors_count > 1 &&
													"s"}
											</p>
											<p>
												{Math.round(getPercentLeft())}%
												Funded
											</p>
										</div>
										<div className="progress-b">
											<div
												style={{
													width: `${Math.round(
														getPercentLeft()
													)}%`,
												}}
												className="line"
											></div>
										</div>
										<div className="claimed">
											<p>
												₦
												{formatCurrency(
													details.discount_claimed
												)}{" "}
												{`(${Math.floor(
													(details.discount_claimed /
														details.total_discount_claimed) *
														100
												)}%)`}{" "}
												<span>Discount Claimed</span>
											</p>
										</div>
										<div className="progress-b">
											<div
												style={{
													width: `${Math.round(
														Math.floor(
															(details.discount_claimed /
																details.total_discount_claimed) *
																100
														)
													)}%`,
												}}
												className="line dark"
											></div>
										</div>
										<div className="own-fraction">
											<button onClick={checkoutHandler}>
												<img
													src={OwnFractionImg}
													alt="Own Fraction"
												/>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			)}
		</div>
	);
};

export default PropertyDetail;
