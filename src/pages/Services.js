import React, { useEffect } from "react";
import Navigation from "../component/Navigation";
import ServiceImg from "../assets/service.png";
import Contact from "../component/Contact";

const Services = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="cover-page">
			<div className="row">
				<div className="col-lg-8">
					<div className="urb-page">
						<Navigation />
						<div className="content-fill">
							<div className="container">
								<h5 className="title">Our Services</h5>
								<div className="row mt-5">
									<div className="col-md-6 mb-3">
										<img
											src={ServiceImg}
											alt="Service"
											className="img-fluid"
										/>
									</div>
									<div className="col-md-6">
										<h6 className="title">
											Property Management
										</h6>
										<p className="writeup">
											We have distilled Urbco's impressive
											ethos into a neat package. Our
											process begins with creating a
											mutually beneficial agreement
											between you and your tenants, whom
											we view as important stakeholders in
											your investment. Following that, we
											handle renter relations, financial
											management, facility management,
											legal and compliance matters,
											marketing, and sales. Be assured
											that Urbco Limited is dedicated to
											serving your best interests and
											achieving high ROI through our
											management of your landed
											properties. In addition to the
											above, we provide regular reports,
											comply with all applicable laws, and
											facilitate intelligent information
											sharing. To get started on the right
											track, <a href="#">download</a> our
											guide on effective tenant
											management.
										</p>
									</div>
								</div>
								<div className="row mt-2">
									<div className="col-md-6 mb-3">
										<img
											src={ServiceImg}
											alt="Service"
											className="img-fluid"
										/>
									</div>
									<div className="col-md-6">
										<h6 className="title">
											Property Development
										</h6>
										<p className="writeup">
											In this age of technology, property
											development should be seen as a
											housing product. This ensures that
											we are on a path of constant and
											never-ending improvement through
											incremental additions and new
											product infusions.
										</p>
										<p className="writup">
											We have simplified the process,
											using technology to achieve
											transparency and ease of reporting
											to our investors. From building/site
											acquisition, through planning and
											design, to construction and
											post-construction, our investors are
											kept up to date so they can see
											exactly where their money is going.
											We have created a system that
											ensures quality assurance, ease of
											execution and detailed plans and
											specifications. By digitizing the
											process, the devil is taken out of
											the details while delivering
											outstanding projects.
										</p>
									</div>
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

export default Services;
