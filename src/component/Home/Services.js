import React from "react";
import LayoutHome from "./LayoutHome";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Services = ({ onMove }) => {
	const navigate = useNavigate();
	return (
		<LayoutHome>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 1 }}
				transition={{ duration: 0.7, ease: "easeInOut" }}
				className="content"
			>
				<div className="space-main">
					<h5>Services</h5>
					<p>
						Amet ultrices nulla est maecenas. Est varius interdum
						dignissim scelerisque ullamcorper. Commodo pellentesque
						maecenas amet fringilla. Gravida pharetra rhoncus nibh
						nunc lectus turpis.
					</p>
					<div className="services">
						<div className="row">
							<div className="col-6 mb-3">
								<div className="box">
									<p>Service 1</p>
								</div>
							</div>
							<div className="col-6 mb-3">
								<div className="box">
									<p>Service 2</p>
								</div>
							</div>
							<div className="col-6">
								<div className="box">
									<p>Service 3</p>
								</div>
							</div>
							<div className="col-6">
								<div
									className="box color"
									onClick={() => navigate("/services")}
								>
									<p>View All</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
			<button
				className="click-btn-home first"
				onClick={() => onMove("home")}
			>
				<FiArrowLeft />
			</button>
			<button
				className="click-btn-home"
				onClick={() => onMove("testimonials")}
			>
				<span className="me-2">Testimonials</span>
				<FiArrowRight />
			</button>
		</LayoutHome>
	);
};

export default Services;
