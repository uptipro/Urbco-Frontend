import React from "react";
import PropertyImg from "../assets/default-property.png";
import AreaImg from "../assets/area-fit.png";
import { useNavigate } from "react-router-dom";

const Property = ({ item }) => {
	const navigate = useNavigate();

	return (
		<div className="property-detail">
			<img
				src={item.images.length > 0 ? item.images[0].url : PropertyImg}
				alt="Property Image"
				onClick={() =>
					navigate(`/projects/${item.ref}`, {
						state: { property: item },
					})
				}
			/>
			<div className="detail">
				<h5>{item.name}</h5>
				<p>{item.short_description}</p>
				{/* <div
					dangerouslySetInnerHTML={{
						__html: item.description.substring(0, 300),
					}}
				/> */}
				<p className="area">
					<img src={AreaImg} alt="Sq" />
					<span>{item.areaSqm} Sq Ft</span> Area
				</p>
				<div className="status">
					<p>{item.status}</p>
					<button
						onClick={() =>
							navigate(`/projects/${item.ref}`, {
								state: { property: item },
							})
						}
					>
						View
					</button>
				</div>
			</div>
		</div>
	);
};

export default Property;
