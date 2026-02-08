import React, { useEffect, useRef } from "react";
import Navigation from "../component/Navigation";
import Team from "../assets/team.png";
import Contact from "../component/Contact";
import Member1 from "../assets/teams/ede.jpeg";
import Member2 from "../assets/teams/yemi.jpeg";
import Member3 from "../assets/teams/kunle.jpeg";
import Member4 from "../assets/teams/ojo.jpeg";
import Member5 from "../assets/teams/dayo.jpeg";
import Member6 from "../assets/teams/dapo.jpeg";
import Member7 from "../assets/teams/soye.jpeg";
import Member8 from "../assets/teams/kayode.jpeg";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const About = () => {
	const scrollRef = useRef();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const scroll = (scrollOffset) => {
		scrollRef.current.scrollLeft += scrollOffset;
	};

	return (
		<div className="cover-page">
			<div className="row">
				<div className="col-lg-8">
					<div className="urb-page">
						<Navigation />
						<div className="content-fill">
							<div className="container">
								<h5 className="title">About Us</h5>
								<p className="write-up">
									The deficit in the housing market in Nigeria
									is arguably abysmal and Lagos is the worst
									off. Housing is clearly a basic need and is
									well situated on the lowest rung of Maslow's
									hierarchy of needs. Conversely, the price of
									housing is consistently rising making it
									difficult for the generality of people to
									afford decent living.
								</p>
								<p className="write-up">
									Urbco Limited is therefore positioned to
									make qualitative housing affordable for the
									middle-income and upper-lower class in
									society. Our aim is to deconstruct the
									Nigerian housing market by creating access
									and granting opportunities for most people
									to have a stake in the industry. This is
									possible by providing fractional ownership
									of spaces. Days, when people saved endlessly
									to have a piece of the Real Estate pie, are
									well over.
								</p>
								<p className="write-up">
									We are a fast-growing PropTech Company with
									245 years of cumulative experience in
									various fields, enabling us to deliver
									richer experiences and top-notch products to
									our clients. Some say the future of housing
									is going up, we say the future of housing is
									deconstructed reality. This is borne largely
									on the hardback of technology. Urbco
									Limited: Access. Opportunity. Wealth
								</p>
								<div className="values mt-5">
									<h5 className="title">Our Values</h5>
									<div className="row mt-3">
										<div className="col-lg-6 mb-3">
											<div className="value-div">
												<h6>Integrity</h6>
												<p className="write-up">
													Our clients’ interests come
													first. We keep open
													communication, minimize
													risk, and offer unbiased
													opinions to build long-term
													relationships of honesty and
													trust.
												</p>
											</div>
										</div>
										<div className="col-lg-6 mb-3">
											<div className="value-div">
												<h6>Commitment</h6>
												<p className="write-up">
													We are relentless in guiding
													you through every step of
													your real estate transaction
													by offering insights and
													tools to make the right
													decisions with the utmost
													confidence.
												</p>
											</div>
										</div>
										<div className="col-lg-6 mb-3">
											<div className="value-div">
												<h6>Passion</h6>
												<p className="write-up">
													We are passionate about
													results aligned with our
													clients’ success and are
													committed to the highest
													level of professionalism and
													standards in everything we
													do.
												</p>
											</div>
										</div>
										<div className="col-lg-6 mb-3">
											<div className="value-div">
												<h6>Collaboration</h6>
												<p className="write-up">
													We work together as one
													team—both with each other
													and our clients—to direct
													our collective energy toward
													achieving something
													extraordinary.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="team mt-5">
									<h5 className="title">Our Team</h5>
									<div className="members" ref={scrollRef}>
										<div className="member">
											<img src={Member1} alt="Member" />
											<p>Ede Dafinone</p>
											<p>Chairman</p>
										</div>
										<div className="member">
											<img src={Member4} alt="Member" />
											<p>Olujide Ojo</p>
											<p>Chief Executive Officer</p>
										</div>
										<div className="member">
											<img src={Member3} alt="Member" />
											<p>Olakule Popoola</p>
											<p>Chief Operations Officer</p>
										</div>
										<div className="member">
											<img src={Member2} alt="Member" />
											<p>Yemi Omolade</p>
											<p>Chief Co-Ordination Officer</p>
										</div>
										<div className="member">
											<img src={Member5} alt="Member" />
											<p>Oludayo Usansohia</p>
											<p>Chief Build Officer</p>
										</div>
										<div className="member">
											<img src={Member8} alt="Member" />
											<p>Kayode Oluwasegun Ojo</p>
											<p>Director</p>
										</div>
										<div className="member">
											<img src={Member7} alt="Member" />
											<p>Soye Olatunji</p>
											<p>Director</p>
										</div>
										<div className="member">
											<img src={Member6} alt="Member" />
											<p>Dapo Akinosun</p>
											<p>Director</p>
										</div>
										<div className="member">
											<img src={Team} alt="Member" />
											<p>Yinka Adewuyi</p>
											<p>Director</p>
										</div>
									</div>
									<div className="team--arrows">
										<button onClick={() => scroll(-300)}>
											<FaAngleLeft />
										</button>
										<button onClick={() => scroll(300)}>
											<FaAngleRight />
										</button>
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

export default About;
