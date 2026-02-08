import React, { useEffect, useState } from "react";
import Navigation from "../component/Navigation";
import Property from "../component/Property";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Contact from "../component/Contact";
import { useDispatch, useSelector } from "react-redux";
import SuccessImg from "../assets/success.svg";
import { listProperties } from "../redux/basic/basicSlice";
import { lagosLGAs } from "../utils/cities";

const Projects = () => {
	const dispatch = useDispatch();

	const { projects, types } = useSelector((state) => state.basic);

	const [status, setStatus] = useState("");
	const [location, setLocation] = useState("");
	const [pTypes, setPTypes] = useState("");

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(listProperties({ type: pTypes, status, location }));
	}, [pTypes, location, status]);

	return (
		<div className="cover-page">
			<div className="row">
				<div className="col-lg-8">
					<div className="urb-page">
						<Navigation />
						<div className="property-main pb-5">
							<div className="container">
								<div className="filter">
									<select
										value={status}
										onChange={(e) =>
											setStatus(e.target.value)
										}
									>
										<option value={""}>
											Property Status
										</option>
										<option value={"design"}>Design</option>
										<option value={"construction"}>
											Construction
										</option>
										<option value={"completed"}>
											Completed
										</option>
									</select>
									<select
										value={pTypes}
										onChange={(e) =>
											setPTypes(e.target.value)
										}
									>
										<option value={""}>
											Property Type
										</option>
										{types &&
											Array.isArray(types) &&
											types.map((t) => (
												<option
													key={t._id}
													value={t._id}
												>
													{t.name}
												</option>
											))}
									</select>
									<select
										value={location}
										onChange={(e) =>
											setLocation(e.target.value)
										}
									>
										<option value={""}>Location</option>
										{lagosLGAs.map((l) => (
											<option key={l.id} value={l.name}>
												{l.name}
											</option>
										))}
									</select>
									<button>Search</button>
								</div>
								<div className="list mt-5">
									{projects &&
									projects.properties &&
									projects.properties.length > 0 ? (
										<>
											<div className="row">
												{projects.properties.map(
													(p) => (
														<div
															className="col-lg-6 mb-2"
															key={p._id}
														>
															<Property
																item={p}
															/>
														</div>
													)
												)}
											</div>
											{projects.meta &&
												projects.meta.pages > 1 && (
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
												)}
										</>
									) : (
										<div className="empty-page">
											<img
												src={SuccessImg}
												alt="Welcome"
											/>
											<p>
												Please hold while we load all
												projects...
											</p>
											{projects.properties.length === 0 &&
												(location ||
													status ||
													pTypes) && (
													<p>
														Looks like there are no
														properties for the
														selected filters
													</p>
												)}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="contacts sticky-top">
						<Contact />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Projects;
