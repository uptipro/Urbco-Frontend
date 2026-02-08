import React, { useState } from "react";
import Property from "../component/Property";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Contact from "../component/Contact";
import Main from "../component/Home/Main";
import Services from "../component/Home/Services";
import Testimonials from "../component/Home/Testimonials";
import { useSelector } from "react-redux";

const Home = () => {
	const [page, setPage] = useState("home");

	const { projects } = useSelector((state) => state.basic);

	return (
		<div className="desktop-home">
			<div className="row">
				<div className="col-lg-4 g-0 d-lg-block d-none">
					<div className="properties-vary">
						<div className="filter">
							<select>
								<option value={""}>Property Status</option>
							</select>
							<select>
								<option value={""}>Property Type</option>
							</select>
							<select>
								<option value={""}>Location</option>
							</select>
							<button>Search</button>
						</div>
						<div className="list">
							{projects &&
								projects.properties &&
								projects.properties.map((p) => (
									<Property key={p.id} item={p} />
								))}
							<div className="paginate">
								<button>
									<FiArrowLeft />
								</button>
								<div>
									<span className="active" />
									<span />
									<span />
								</div>
								<button>
									<FiArrowRight />
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-4 g-0">
					{page === "services" ? (
						<Services onMove={(val) => setPage(val)} />
					) : page === "testimonials" ? (
						<Testimonials onMove={(val) => setPage(val)} />
					) : (
						<Main onMove={(val) => setPage(val)} />
					)}
				</div>
				<div className="col-lg-4 g-0 d-lg-block d-none">
					<div className="contact-home">
						<Contact />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
