import React, { useEffect, useState } from "react";
import Navigation from "../component/Navigation";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import Contact from "../component/Contact";

const contents = [
	{
		id: 1,
		head: "What is real estate investment?",
		body: "Real estate investment involves purchasing properties with the intention of generating income or capital appreciation. It can include various property types such as residential, commercial, industrial, and land.",
	},
	{
		id: 2,
		head: "How do I get started in real estate investment?",
		body: "Start by researching the market, understanding your investment goals, and learning about financing options. You might consider starting with Islet Majaroh or other projects Urbco will develop.",
	},
	{
		id: 3,
		head: "What are the different types of real estate investments?",
		body: "There are various types, including residential properties (single-family homes, apartments), commercial properties (office buildings, retail centers), industrial properties (warehouses, factories), and land.",
	},
	{
		id: 4,
		head: "How do I start Real Estate Investment?",
		body: "You can start with fractional investment. Build up a portfolio re-invest the proceeds and increase your investment.",
	},
	{
		id: 5,
		head: "What are the possible risks of real estate investment?",
		body: "Risks include property market fluctuations, tenant vacancies, maintenance costs, economic downturns, and unexpected repairs.",
	},
	{
		id: 6,
		head: "Where is Islet Majoro?",
		body: "Islet Majoro is located on Majoro Street, Onike Yaba via Unilag Second Gate.",
	},
	{
		id: 7,
		head: "Why should I invest in Islet Majaro?",
		body: "Real estate can offer a steady stream of rental income, potential tax benefits, diversification of investment portfolio, and the possibility of long-term appreciation.",
	},
	{
		id: 8,
		head: "What type of title does Islet Majoro have on the land?",
		body: "A certificate is issued to investors based on the number of units/fractions an individual purchases.",
	},
	{
		id: 9,
		head: "Do buyers get individual certificates when they invest in Islet?",
		body: "As mentioned above, each buyer gets a certificate of investment covered by a general certificate of Occupancy.",
	},
	{
		id: 10,
		head: "Who will be responsible for the management of the estate?",
		body: "The facility management subsidiary will be saddled with the task of estate management.",
	},
	{
		id: 11,
		head: "Are there discounts for bulk buyers",
		body: "Yes! There is a discount for purchases. Check it out on the description page for Islet.",
	},
	{
		id: 12,
		head: "How early will dividends be paid?",
		body: "Dividends will be paid from January 2025",
	},
	{
		id: 13,
		head: "Can I move into a piece of property that is equivalent in the worth of my investment?",
		body: "Yes, you can but Terms and Conditions apply",
	},
	{
		id: 14,
		head: "Are there other payments I have to make apart from the payment for housing units?",
		body: "No! Your payment is all inclusive",
	},
	{
		id: 15,
		head: "Can the approved layout be verified?",
		body: "Yes",
	},
	{
		id: 16,
		head: "How soon will construction be completed?",
		body: "Construction will be completed in Sept. 2024.",
	},
	{
		id: 17,
		head: "Do you have other projects like 1-bedroom, 2-bedroom?",
		body: "Yes, subsequent projects will contain 1-bedroom, 2-bedroom",
	},
	{
		id: 18,
		head: "Is there any provision for boys quarters?",
		body: "This will be considered for our subsequent projects. Keep checking our website",
	},
	{
		id: 19,
		head: "Will I be allowed to modify the structure other than the prototype of the estate?",
		body: "No",
	},
	{
		id: 20,
		head: "What is the quality of the material used in the building?",
		body: "All materials used for all Islet projects are of high quality. The building material was all vetted and passed the safety test of our trusted professionals.",
	},
	{
		id: 21,
		head: "Can I be allowed to provide a customized kitchen cabinet of my choice and other extra fittings?",
		body: "No. Islet Majarohs is fully fitted with high-quality kitchen furniture, refrigerators, a cooker& and a washing machine.",
	},
	{
		id: 22,
		head: "Can I have more explanation on the payment plan and the investment alternative?",
		body: "Yes",
	},
	{
		id: 23,
		head: "Can my investment be sold when I want it?",
		body: "Yes, your investment can be sold. How fast it is sold, however, depends on the forces in the marketplace.",
	},
	{
		id: 24,
		head: "What is the payment term?",
		body: "For off-takers, 25% on subscription, 50% at the roofing stage, and 25% at the completion stage.",
	},
	{
		id: 25,
		head: "What is a rental property?",
		body: "A rental property is one that you own and lease out to tenants. You earn rental income, which can help cover expenses and potentially provide profit.",
	},
	{
		id: 26,
		head: "What is Fractional Real Estate Investment?",
		body: `Fractional Ownership in real estate speaks to a shared ownership structure. A situation where multiple persons own part of a property. Each owner buys a fraction of the property. Instead of saving for several years to buy a property an individual given high inflation rates, these individual buys a fraction and reaps the same benefits as other members of the fractional ownership community. \n \n Fractional Ownership unlocks the power of community, It says to investors, dont do life alone, do it in a community, reap better benefits and minimize your risks. \n \n Fractional ownership provides investors with the power to own assets at various locations and also varies the property type. For instance, you can have a mix of Student Hostel, Shortlet, Beach Houses, Storage/Warehouses, and Co-working sites. \n \n Based on the shared ownership structure, risks, and rewards are shared, and investor/user rights are up to the extent of your investment. You get a legal document detailing how many shares you own, rights and responsibilities, and rewards. \n \n Urbco Fractional Ownership is crafted to grant access, birth opportunities and unlock a fresh vista in Real Estate Investment. Why watch Lagos Bridge, come own a piece of Lagos and a part of Naija.`,
	},
	{
		id: 27,
		head: "Who can invest in fractional ownership?",
		body: "Anyone 18 years and above can invest in fractional ownership. However, parents and guardians can invest on behalf of their dependents and children",
	},
	{
		id: 28,
		head: "What documents are required to invest in Islet fractional ownership?",
		body: "For Individual buyer, you need Identity Card, NIN and Utility Bill. For Corporate Buyer, you need Name of Corporate organization, Company Registration Number, Date of Incorporation, Country of Incorporation, Corporate address, Office telephone number, Office email address, Contact person's Name,  Contact person's email address",
	},
	{
		id: 29,
		head: "How is a property shortlisted for investment?",
		body: "We identify Assets based on customer/investment needs and market trends. We then do due diligence and painstakingly sort the type of investment it is best suited for. All the processes engaged are customer-centric, geared towards making sure our investors get the most ROI per project. However, Urbco prioritizes Prime spots vis-à-vis popular & and premium locations. We are open to premium spot development if we are called upon for it.",
	},
	{
		id: 30,
		head: "Is it necessary to engage with a lawyer?",
		body: "Yes, you should consult your lawyer and a financial expert.",
	},
	{
		id: 31,
		head: "How do you keep my personal information safe?",
		body: `<p>Please check our <a href="${window.location.origin}/privacy-policy">Privacy Policies</a></p>`,
		html: true,
	},
];

const FAQ = () => {
	const [activeTab, setActiveTab] = useState(1);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	console.log(window.location);

	return (
		<div className="cover-page">
			<div className="row">
				<div className="col-lg-8">
					<div className="urb-page">
						<Navigation />
						<div className="content-fill">
							<div className="container">
								<h5 className="title">
									Frequently Asked Questions
								</h5>
								<div className="urb-accordion">
									{contents.slice(0, 5).map((c) => (
										<div className="tb" key={c.id}>
											<div
												className="head"
												onClick={() =>
													setActiveTab(c.id)
												}
											>
												<p>{c.head}</p>
												{activeTab === c.id ? (
													<FaAngleDown />
												) : (
													<FaAngleRight />
												)}
											</div>
											{activeTab === c.id && (
												<div className="body">
													<p>{c.body}</p>
												</div>
											)}
										</div>
									))}
									<h6>ISLET</h6>
									{contents.slice(6, 24).map((c) => (
										<div className="tb" key={c.id}>
											<div
												className="head"
												onClick={() =>
													setActiveTab(c.id)
												}
											>
												<p>{c.head}</p>
												{activeTab === c.id ? (
													<FaAngleDown />
												) : (
													<FaAngleRight />
												)}
											</div>
											{activeTab === c.id && (
												<div className="body">
													<p>{c.body}</p>
												</div>
											)}
										</div>
									))}
									<h6>RENTAL INCOME</h6>
									{contents.slice(25, 26).map((c) => (
										<div className="tb" key={c.id}>
											<div
												className="head"
												onClick={() =>
													setActiveTab(c.id)
												}
											>
												<p>{c.head}</p>
												{activeTab === c.id ? (
													<FaAngleDown />
												) : (
													<FaAngleRight />
												)}
											</div>
											{activeTab === c.id && (
												<div className="body">
													<p>{c.body}</p>
												</div>
											)}
										</div>
									))}
									<h6>FRACTIONAL OWNERSHIP</h6>
									{contents.slice(27, 31).map((c) => (
										<div className="tb" key={c.id}>
											<div
												className="head"
												onClick={() =>
													setActiveTab(c.id)
												}
											>
												<p>{c.head}</p>
												{activeTab === c.id ? (
													<FaAngleDown />
												) : (
													<FaAngleRight />
												)}
											</div>
											{activeTab === c.id && (
												<div className="body">
													{c.html ? (
														<div
															dangerouslySetInnerHTML={{
																__html: c.body,
															}}
														/>
													) : (
														<p>{c.body}</p>
													)}
												</div>
											)}
										</div>
									))}
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

export default FAQ;
