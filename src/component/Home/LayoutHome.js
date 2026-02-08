import React, { useState } from "react";
import Logo from "../../assets/logo.svg";
import MenuBtn from "../../assets/menu-dark.svg";
import Menu from "../Menu";
import { FiArrowRight } from "react-icons/fi";

const LayoutHome = ({ children }) => {
	const [openMenu, setOpenMenu] = useState(false);
	return (
		<div className="home-area">
			<div className="nav">
				<div />
				<img src={Logo} alt="Logo" />
				<button className="mobile" onClick={() => setOpenMenu(true)}>
					<img src={MenuBtn} alt="menu" />
				</button>
				<button className="desktop" onClick={() => setOpenMenu(true)}>
					<span>m</span>
					<span>e</span>
					<span>n</span>
					<span>u</span>
				</button>
			</div>
			{children}
			<div className="bottom-div"></div>
			<Menu open={openMenu} close={() => setOpenMenu(false)} />
		</div>
	);
};

export default LayoutHome;
