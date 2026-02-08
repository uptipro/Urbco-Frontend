import React from "react";
import Property from "./Property";
import Contact from "./Contact";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileHome = () => {
	const navigate = useNavigate();

	const { projects, settings } = useSelector((state) => state.basic);

	return (
		<div className="mobile-home">
			<div className="properties">
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
							<Property key={p._id} item={p} />
						))}
					<div className="button-all">
						<button onClick={() => navigate("/projects")}>
							View All
						</button>
					</div>
				</div>
			</div>
			<div className="services">
				<h5>Services</h5>
				<p>
					We have distilled Urbco's impressive ethos into a neat
					package. Our process begins with creating a mutually
					beneficial agreement between you and your tenants, whom we
					view as important stakeholders in your investment. Following
					that, we handle renter relations, financial management,
					facility management, legal and compliance matters,
					marketing, and sales. Be assured that Urbco Limited is
					dedicated to serving your best interests and achieving high
					ROI through our management of your landed properties. In
					addition to the above, we provide regular reports, comply
					with all applicable laws, and facilitate intelligent
					information sharing.
				</p>
			</div>
			<div className="testimonial">
				<h5>Testimonials</h5>
				<div className="testimonies">
					{settings &&
						Array.isArray(settings.testimonials) &&
						settings.testimonials.map((t, i) => (
							<div className="box" key={i + 1}>
								<h6>{t.user}</h6>
								<p>{t.message}</p>
							</div>
						))}
				</div>
			</div>
			<div className="contacts">
				<Contact />
			</div>
			<div className="mobile-footer">
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
						Copyright &copy; {new Date().getFullYear()} URBCO Ltd.
					</p>
					<p>All Rights Reserved.</p>
				</div>
			</div>
		</div>
	);
};

export default MobileHome;
