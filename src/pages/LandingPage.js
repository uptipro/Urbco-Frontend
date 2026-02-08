import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import MenuClose from "../assets/menu-close.svg";
import { TfiAngleDoubleRight } from "react-icons/tfi";
import Menu from "../component/Menu";
import MobileHome from "../component/MobileHome";
import { useSelector } from "react-redux";
import { FaAngleDown } from "react-icons/fa";

const LandingPage = () => {
	const navigate = useNavigate();

	const [openMenu, setOpenMenu] = useState(false);
	const [showDropDown, setShowDropDown] = useState(false);

	const { settings } = useSelector((state) => state.basic);

	useEffect(() => {
		document.body.classList.remove("noscroll");
	}, []);

	return (
		<>
			<div className="landing-page">
				<div className="left-corner">
					<div className="nav-menu">
						<div
							className="desktop"
							onMouseLeave={() => setShowDropDown(false)}
						>
							<ul>
								<li>
									<Link to="/own-fraction">
										Own-a-Fraction
									</Link>
								</li>
								<li>
									<Link to="/services">Services</Link>
								</li>

								<li>
									<Link to="/projects">Projects</Link>
								</li>

								<li
									className="drop"
									onMouseEnter={() => setShowDropDown(true)}
								>
									<a
										href="#/"
										onClick={(e) => {
											e.preventDefault();
											setShowDropDown(true);
										}}
									>
										About <FaAngleDown />
									</a>
									{showDropDown && (
										<ul className="drop-list">
											<li>
												<Link to="/about-us">
													About Urbco
												</Link>
												<Link to="/faq">FAQ</Link>
												<Link to="/privacy-policy">
													Privacy Policy
												</Link>
											</li>
										</ul>
									)}
								</li>
								<li>
									<a href="/" target="_blank">
										Investment Insight
									</a>
								</li>
							</ul>
						</div>
						<div className="mobile">
							<Link to="/">
								<img src={Logo} alt="Logo" />
							</Link>
							<button onClick={() => setOpenMenu(true)}>
								<img src={MenuClose} alt="menu" />
							</button>
						</div>
					</div>
					<div className="basic-jumbo">
						<div className="content-motto">
							<div className="immg mb-2">
								<img src={Logo} alt="logo" />
							</div>
							<div className="motto">
								<h2 className="first">ACCESS</h2>
								<h2>OPPORTUNITY</h2>
								<h2 className="last">WEALTH</h2>
								<motion.button
									animate={{
										scale: [1, 2, 2, 1, 1],
									}}
									// whileHover={{ scale: 0.6 }}
									// whileTap={{ scale: 0.3 }}
									onClick={() => navigate("/projects")}
								>
									<TfiAngleDoubleRight
										size={80}
										color="#fff"
									/>
								</motion.button>
							</div>
						</div>
					</div>
					{openMenu && <Menu close={() => setOpenMenu(false)} />}
					<div className="quote">
						<marquee behavior="scroll" direction="left">
							{settings && settings.quote
								? `"${settings.quote}"`
								: `“Real estate is aN imperishable asset, ever
							increasing in value. It is the most solid security
							that human ingenuity has devised. It is the basis of
							all security and about the only indestructible
							security.”`}
						</marquee>
					</div>
				</div>
			</div>
			<MobileHome />
		</>
	);
};

export default LandingPage;
