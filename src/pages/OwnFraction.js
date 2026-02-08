import React, { useEffect } from "react";
import Navigation from "../component/Navigation";
import Contact from "../component/Contact";

const OwnFraction = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="cover-page">
			<div className="row">
				<div className="col-lg-8">
					<div className="urb-page">
						<Navigation />
						<div className="content-fill pb-5">
							<div className="container">
								<h5 className="title">Own a fraction</h5>
								<p className="write-up mt-5">
									Real estate fractionalization refers to the
									process of dividing a single property or
									real estate asset into smaller ownership
									shares or fractions. These fractions are
									then sold to multiple investors, allowing
									them to own a portion of the property and
									share in its benefits and potential returns.
									As an example, a studio apartment or a
									student’s hostel room could be divided into
									quarters with four owners, 25% each, who
									then share the returns.
								</p>
								<p className="write-up">
									The major benefit of Fractionalization is
									accessibility and affordability, allowing
									investors to diversify their portfolios and
									potentially generate income from rental or
									resale proceeds.
								</p>
								<p className="write-up">
									Fractionalization provides an opportunity to
									access high-value real estate assets that
									may have otherwise been out of reach. It
									also allows for diversification within the
									real estate sector, as investors can spread
									their investments across multiple properties
									or locations.
								</p>
								<p className="write-up">
									We have developed an ownership model that
									grants security of investment, ensure ease
									of trading property and use as collateral.
								</p>
								<p className="write-up">
									It is time to own a portion and portions of
									Lagos and other cities in Nigeria. Contact
									us for more enquiries.
								</p>
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

export default OwnFraction;
