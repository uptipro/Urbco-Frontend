import React from "react";
import Logo from "../assets/white-logo.png";
import MenuOpen from "../assets/menu-open.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Menu = ({ close }) => {
	const { user_details } = useSelector((state) => state.basic);

	const navigate = useNavigate();

	const getInitials = (string) => {
		let names = string.split(" "),
			initials = names[0].substring(0, 1).toUpperCase();

		if (names.length > 1) {
			initials += names[names.length - 1].substring(0, 1).toUpperCase();
		}
		return initials;
	};

	return (
		<motion.div animate="closed" className={`drop-nav`}>
			<div className="container">
				<div className="logo">
					<Link to="/">
						<img src={Logo} alt="Logo" height={"60px"} />
					</Link>
					<button className="mobile" onClick={close}>
						<img src={MenuOpen} alt="menu" />
					</button>
				</div>
				<div className="menus">
					{user_details && user_details._id && (
						<div className="profile">
							<div className="initials">
								{getInitials(
									user_details.user_type === "business"
										? `${user_details.business_name}`
										: `${user_details.first_name} ${user_details.last_name}`
								)}
							</div>
							<p className="title">
								{user_details.user_type === "business"
									? `${user_details.business_name}`
									: `${user_details.first_name} ${user_details.last_name}`}
							</p>
							<button
								onClick={() => {
									navigate("/profile");
									close();
								}}
							>
								View Profile
							</button>
						</div>
					)}
					<ul>
						{/* <li>
							<NavLink to="/" onClick={close}>
								Home
							</NavLink>
						</li> */}
						<li>
							<NavLink to="/projects" onClick={close}>
								Projects
							</NavLink>
						</li>
						<li>
							<NavLink to="/own-fraction" onClick={close}>
								Own-a-Fraction
							</NavLink>
						</li>
						<li>
							<NavLink to="/services" onClick={close}>
								Services
							</NavLink>
						</li>
						<li>
							<NavLink to="/about-us" onClick={close}>
								About Us
							</NavLink>
						</li>
						<li>
							<a href="/" target="_blank">
								Investment Insight
							</a>
						</li>
						{!user_details && (
							<>
								<li>
									<Link
										to="/login"
										className="u-btn login"
										onClick={close}
									>
										Sign In
									</Link>
								</li>
								<li>
									<Link
										to="/register"
										className="u-btn register"
										onClick={close}
									>
										Sign Up
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
				<div className="bottom-content">
					<div className="socials">
						<a href="https://twitter.com" target="_blank">
							<BsTwitter />
						</a>
						<a href="https://facebook.com" target="_blank">
							<BsFacebook />
						</a>
						<a href="https://instagram.com" target="_blank">
							<BsInstagram />
						</a>
					</div>
					<div className="copyright">
						<p>
							Copyright &copy; {new Date().getFullYear()} URBCO
							Ltd.
						</p>
						<p>All Rights Reserved.</p>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Menu;
