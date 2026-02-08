import React from "react";
import LayoutHome from "./LayoutHome";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const testimonies = [
	{
		id: 1,
		user: "John Bassey",
		content:
			"Amet ultrices nulla est maecenas. Est varius interdum dignissim scelerisque ullamcorper.",
	},
	{
		id: 2,
		user: "John Bassey",
		content:
			"Amet ultrices nulla est maecenas. Est varius interdum dignissim scelerisque ullamcorper.",
	},
	{
		id: 3,
		user: "John Bassey",
		content:
			"Amet ultrices nulla est maecenas. Est varius interdum dignissim scelerisque ullamcorper.",
	},
];

const Testimonials = ({ onMove }) => {
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
					<h5>Testimonials</h5>
					<div className="testimonies">
						{testimonies.map((t) => (
							<div className="box" key={t.id}>
								<h6>{t.user}</h6>
								<p>{t.content}</p>
							</div>
						))}
					</div>
				</div>
			</motion.div>
			<button
				className="click-btn-home"
				onClick={() => onMove("services")}
			>
				<FiArrowLeft />
				<span className="ms-2">Services</span>
			</button>
		</LayoutHome>
	);
};

export default Testimonials;
