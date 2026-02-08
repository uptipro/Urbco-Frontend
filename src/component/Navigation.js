import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import MenuBtn from "../assets/menu-dark.svg";
import Menu from "./Menu";
import { Link } from "react-router-dom";

const Navigation = () => {
	const [openMenu, setOpenMenu] = useState(false);

	useEffect(() => {
		if (openMenu) {
			document.body.classList.add("noscroll");
		} else {
			document.body.classList.remove("noscroll");
		}
	}, [openMenu]);
	return (
		<div className="navigation container">
			<div className="nav">
				<Link to="/">
					<img src={Logo} alt="Logo" />
				</Link>
				<button className="mobile" onClick={() => setOpenMenu(true)}>
					<img src={MenuBtn} alt="menu" />
				</button>
			</div>
			{openMenu && <Menu close={() => setOpenMenu(false)} />}
		</div>
	);
};

export default Navigation;
