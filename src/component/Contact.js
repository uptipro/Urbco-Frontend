import React, { useEffect, useState } from "react";
import { displayError } from "../redux/error";
import basicService from "../redux/basic/basicService";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Contact = () => {
	const { user_details } = useSelector((state) => state.basic);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [comment, setComment] = useState("");
	const [phone, setPhone] = useState("");
	const [load, setLoad] = useState(false);

	useEffect(() => {
		if (user_details && user_details._id) {
			setName(user_details.first_name + " " + user_details.last_name);
			setEmail(user_details.email);
			setPhone(user_details.phone);
		}
	}, [user_details]);

	const submitHandler = () => {
		if (name && email && phone && comment) {
			try {
				setLoad(true);
				let res = basicService.contactUs({
					name,
					phone,
					message: comment,
					email,
				});
				setLoad(false);
				if (res) {
					toast.success(
						"Your request has been sent. An agent will reach out to you.",
						{ position: "top-right" }
					);
					clearFields();
				}
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		} else {
			alert("All fields are required to proceed");
		}
	};

	const clearFields = () => {
		setName("");
		setEmail("");
		setPhone("");
		setComment("");
	};

	return (
		<div className="contact">
			<div className="title">
				<h5>Let us call you!</h5>
				<p>To help you choose your property</p>
			</div>
			<div className="form">
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Full Name"
					disabled={load}
				/>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					disabled={load}
				/>
				<input
					type="tel"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					placeholder="Phone Number"
					disabled={load}
				/>
				<textarea
					value={comment}
					disabled={load}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Tell us about desired property"
				></textarea>

				<div className="button">
					<button disabled={load} onClick={submitHandler}>
						{load ? "Please Hold..." : "Submit"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Contact;
