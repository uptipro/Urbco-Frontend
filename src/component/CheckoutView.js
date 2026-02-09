import React, { useEffect, useState } from "react";
import { formatCurrency } from "../utils/currencyFormat";
import basicService from "../redux/basic/basicService";
import { useSelector } from "react-redux";
import { displayError } from "../redux/error";

const CheckoutView = ({ propertyDetail, onComplete }) => {
	const { user_details } = useSelector((state) => state.basic);

	const [noOfFractions, setNoOfFractions] = useState(1);
	const [plan, setPlan] = useState("");
	const [discount, setDiscount] = useState(0);
	const [percentage, setPercentage] = useState("");
	const [amount, setAmount] = useState(0);
	const [load, setLoad] = useState(false);
	const [available, setAvailable] = useState(
		propertyDetail.total_fractions - propertyDetail.fractions_taken
	);

	useEffect(() => {
		if (plan) {
			getAmountToPay();
			getAvailableBalance();
		}
	}, [noOfFractions, plan, percentage, getAmountToPay]);

	useEffect(() => {
		if (
			propertyDetail.investment_plan === "optp" &&
			propertyDetail.investment
		) {
			setPlan("optp");
			setPercentage(propertyDetail.next_payment);
			setNoOfFractions(propertyDetail.fractions_bought);
		}
	}, [propertyDetail.fractions_bought]);

	const getAvailableBalance = () => {
		if (plan) {
			let availableFractions = Math.round(
				propertyDetail.total_fractions *
					(propertyDetail[plan].volume_available / 100)
			);
			setAvailable(
				availableFractions - propertyDetail[plan].fractions_taken
			);
		}
	};

	const getAmountToPay = () => {
		let totalAmount = propertyDetail.cost_per_fraction * noOfFractions;
		let amountPaid;
		if (plan === "csp") {
			setDiscount(propertyDetail.csp.discount);
			amountPaid =
				totalAmount - (propertyDetail.csp.discount * totalAmount) / 100;
		} else if (plan === "opbp") {
			setDiscount(propertyDetail.opbp.discount);
			amountPaid =
				totalAmount -
				(propertyDetail.opbp.discount * totalAmount) / 100;
		} else if (plan === "optp") {
			setDiscount(propertyDetail.optp.discount);
			if (propertyDetail.optp.percent.includes(`${percentage}`)) {
				let total =
					totalAmount -
					(propertyDetail.optp.discount * totalAmount) / 100;
				amountPaid = (percentage * total) / 100;
			} else {
				amountPaid = 0;
			}
		} else {
			amountPaid = totalAmount;
		}
		setAmount(amountPaid);
	};

	const initiatePayment = async () => {
		if (amount > 0) {
			if (noOfFractions > available) {
				alert("Available fractions for the selected plan exceeded.");
			} else {
				try {
					setLoad(true);
					let data = {
						property: propertyDetail._id,
						investor: user_details._id,
						payment_plan: plan,
						optp_percent: Number(percentage),
						fractions_bought: noOfFractions,
						investment: propertyDetail.investment,
					};
					let res = await basicService.initiatePayment(
						user_details.access_token,
						data
					);
					if (res && res.transaction_ref) {
						onComplete({
							tx_ref: res.transaction_ref,
							amount: res.amount,
						});
					} else {
						alert("Something went wrong");
					}
					setLoad(false);
				} catch (err) {
					setLoad(false);
					displayError(err, true);
				}
			}
		} else {
			alert("Amount must be greater than 0");
		}
	};

	return (
		<div className="contact">
			<h2 className="tit">Checkout</h2>
			<div className="form pb-5">
				<label>Number of Fractions</label>
				<input
					type="number"
					value={noOfFractions}
					disabled={propertyDetail.investment ? true : load}
					onChange={(e) => setNoOfFractions(e.target.value)}
					className="no-m"
				/>
				<div className="right-btm">Available: {available}</div>
				<label>Select Plan</label>
				<select
					value={plan}
					onChange={(e) => setPlan(e.target.value)}
					disabled={propertyDetail.investment ? true : load}
				>
					<option value={""}>Select One</option>
					{propertyDetail && propertyDetail.status === "design" && (
						<>
							<option value="opbp">
								Offline Purchase Bullet Payment
							</option>
							<option value="optp">
								Off-plan Purchase Tranche Payment
							</option>
						</>
					)}
					{propertyDetail &&
						propertyDetail.status === "construction" && (
							<option value="csp">
								Construction Stage Purchase
							</option>
						)}
				</select>
				{plan === "optp" && (
					<>
						<label>Percentage</label>
						<select
							value={percentage}
							onChange={(e) => setPercentage(e.target.value)}
							disabled={load}
						>
							<option value="">Select</option>
							{propertyDetail.optp.percent
								.split(",")
								.map((o, i) => (
									<option value={o} key={i + 0}>
										{o}%
									</option>
								))}
						</select>
					</>
				)}
				<div className="input">
					<div className="first">Discount</div>
					<div className="second">{discount}%</div>
				</div>
				<div className="cost">
					<h2>₦{formatCurrency(amount)}</h2>
					<p>Total Cost</p>
				</div>
				<div
					className="text-center button mt-5"
					onClick={initiatePayment}
				>
					<button className="main-btn" disabled={load}>
						{load ? "Please Hold..." : "Make Payment"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CheckoutView;
