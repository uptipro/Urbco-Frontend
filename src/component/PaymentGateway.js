import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { environment } from "../redux/config";
import basicService from "../redux/basic/basicService";
import { displayError } from "../redux/error";
import { formatCurrency } from "../utils/currencyFormat";
import Preloader from "./Preloader";

const PaymentGateway = ({ onComplete, onCancel, initiate }) => {
	const [load, setLoad] = useState(false);
	const [error, setError] = useState(false);
	const [completed, setCompleted] = useState(false);

	const navigate = useNavigate();

	const { user_details } = useSelector((state) => state.basic);

	const config = {
		publicKey:
			environment === "development"
				? "pk_test_b9d43f9158dbf4f6d599ea21698a961deb33774f"
				: "pk_test_b9d43f9158dbf4f6d599ea21698a961deb33774f",
		reference: initiate.tx_ref,
		amount: initiate.amount * 1,
		email: user_details.email,
		name: user_details.first_name,
		channels: ["card"],
	};

	const initializePayment = usePaystackPayment(config);

	const onSuccess = (reference) => {
		completeHandler(reference.reference);
	};

	const onClose = () => {
		console.log("Closed");
	};

	const completeHandler = async (ref) => {
		try {
			setLoad(true);
			let res = await basicService.verifyPayment(
				user_details.access_token,
				ref
			);
			setLoad(false);
			if (res) {
				setError(false);
				setCompleted(true);
			}
		} catch (err) {
			setError(true);
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div className="payment mt-3">
			{initiate.tx_ref ? (
				<>
					{load ? (
						<>
							<Preloader />
							<p className="text-center">
								Please hold while we verify your payment...
							</p>
						</>
					) : error ? (
						<div>
							<p>
								There's an issue with your payment. Please
								contact Admin
							</p>
							<div className="gateway">
								<button
									onClick={() => {
										navigate("/profile");
										onComplete();
									}}
									disabled={load ? true : false}
									className="main-btn"
								>
									View Investments
								</button>
							</div>
						</div>
					) : !completed ? (
						<>
							<p>You are about to make the following Payment</p>
							<div className="cost">
								<p>Cost: ₦ {formatCurrency(initiate.amount)}</p>
								<p>Fee: ₦ {formatCurrency(initiate.fee)}</p>
							</div>
							<button
								onClick={() => {
									initializePayment(onSuccess, onClose);
								}}
								disabled={load ? true : false}
								className="main-btn"
							>
								Proceed
							</button>
							<button className="cancel" onClick={onCancel}>
								Cancel
							</button>
						</>
					) : (
						<>
							<div className="mb-3">
								<p>Congrats!!</p>
								<p>Your payment has been confirmed.</p>
							</div>
							<div className="gateway">
								<button
									onClick={() => {
										navigate("/profile");
										onComplete();
									}}
									disabled={load ? true : false}
									className="main-btn"
								>
									View Investments
								</button>
							</div>
						</>
					)}
				</>
			) : (
				<p>
					We couldn't find a transaction reference. Please contact
					Admin or try another payment option.
				</p>
			)}
		</div>
	);
};

export default PaymentGateway;
