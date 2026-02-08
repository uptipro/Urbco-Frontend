import React from "react";
import LayoutHome from "./LayoutHome";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const Main = ({ onMove }) => {
	return (
		<>
			<LayoutHome>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 1 }}
					transition={{ duration: 0.7, ease: "easeInOut" }}
					className="content"
				>
					<div className="space">
						<p>
							We are a fast-growing PropTech Company with 245
							years of cumulative experience in various fields,
							enabling us to deliver richer experiences and
							top-notch products to our clients.
						</p>
					</div>
				</motion.div>
				<button
					className="click-btn-home"
					onClick={() => onMove("services")}
				>
					<span className="me-2">Services</span>
					<FiArrowRight />
				</button>
			</LayoutHome>
		</>
	);
};

export default Main;
