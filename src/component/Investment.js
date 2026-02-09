import React from "react";
import dateFormat from "dateformat";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/currencyFormat";

const Investment = ({ item }) => {
	const navigate = useNavigate();

	return (
		<div className="property-detail">
			<img src={item.property.images[0].url} alt="" />
			<div className="detail">
				<h5>{item.property.name}</h5>
				<div className="list">
					<div className="flx">
						<p className="first">Fractions Bought:</p>
						<p className="last">{item.fractions_bought}</p>
					</div>
					<div className="flx">
						<p className="first">Amount Paid:</p>
						<p className="last">
							₦{formatCurrency(item.amount_paid)}
						</p>
					</div>
					<div className="flx">
						<p className="first">Discount:</p>
						<p className="last">
							₦
							{formatCurrency(
								item.total_amount - item.amount_paid
							)}
						</p>
					</div>
					<div className="flx">
						<p className="last">
							{item.payment_plan === "opbp"
								? "Offline Purchase Bullet Payment"
								: item.payment_plan === "optp"
								? "Offline Purchase Tranche Payment"
								: item.payment_plan === "csp"
								? "Construction Stage Purchase"
								: item.payment_plan}
						</p>
					</div>
					<div className="flx">
						<p className="first">Date:</p>
						<p className="last">
							{dateFormat(item.createdAt, "dd mmmm, yyyy")}
						</p>
					</div>
				</div>

				<div className="status">
					<button
						onClick={() =>
							navigate(`/projects/${item.property.ref}`, {
								state: { property: item.property },
							})
						}
					>
						View
					</button>
					{item.payment_plan === "optp" &&
						item.status === "design" && (
							<button
								onClick={() =>
									navigate(`/checkout`, {
										state: {
											property: {
												...item.property,
												investment: item._id,
												investment_plan:
													item.payment_plan,
												next_payment: "50",
												fractions_bought:
													item.fractions_bought,
											},
										},
									})
								}
							>
								Top Up
							</button>
						)}
				</div>
			</div>
		</div>
	);
};

export default Investment;
