import axios from "axios";
import { url } from "../config";
import { authHeader, headers } from "../headers";

const loadSettings = async () => {
	const response = await axios.get(`${url}/settings/website-content`, {
		headers: { "Content-Type": "application/json" },
	});
	if (response.data) {
		return response.data;
	}
};

const loadProperties = async (status, type, location) => {
	const response = await axios.get(
		`${url}/properties?pageNumber=1&status=${status || ""}&type=${
			type || ""
		}&city=${location || ""}`,
		{
			headers: { "Content-Type": "application/json" },
		}
	);
	if (response.data) {
		return response.data;
	}
};

const getPropertyDetails = async (id) => {
	const response = await axios.get(`${url}/properties/${id}`, {
		headers: { "Content-Type": "application/json" },
	});
	if (response.data) {
		return response.data;
	}
};

const registerInvestor = async (data) => {
	const response = await axios.post(`${url}/investor`, data, {
		headers: { "Content-Type": "application/json" },
	});
	if (response.data) {
		return response.data;
	}
};

const loginInvestor = async (data) => {
	const response = await axios.post(`${url}/investor/login`, data, {
		headers: { "Content-Type": "application/json" },
	});
	if (response.data) {
		return response.data;
	}
};

const forgotPassword = async (data) => {
	const response = await axios.post(`${url}/investor/forgot-password`, data, {
		headers: { "Content-Type": "application/json" },
	});
	if (response.data) {
		return response.data;
	}
};

const resetPassword = async (data) => {
	const response = await axios.post(`${url}/investor/reset-password`, data, {
		headers: { "Content-Type": "application/json" },
	});
	if (response.data) {
		return response.data;
	}
};

const getInvestments = async (id) => {
	const response = await axios.get(
		`${url}/payments/investments?investor=${id}`,
		{
			headers: { "Content-Type": "application/json" },
		}
	);
	if (response.data) {
		return response.data;
	}
};

const initiatePayment = async (token, obj) => {
	const { data } = await axios.post(`${url}/payments/initiate`, obj, {
		headers: authHeader(token),
	});
	return data.data;
};

const verifyPayment = async (token, ref) => {
	const { data } = await axios.get(`${url}/payments/verify/${ref}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const getTypes = async () => {
	const response = await axios.get(`${url}/types`, {
		headers: headers,
	});

	return response.data;
};

const contactUs = async (obj) => {
	const response = await axios.post(`${url}/settings/contact-us`, obj, {
		headers: headers,
	});

	return response.data;
};

const basicService = {
	loadSettings,
	getPropertyDetails,
	registerInvestor,
	loginInvestor,
	getInvestments,
	initiatePayment,
	verifyPayment,
	loadProperties,
	getTypes,
	contactUs,
	forgotPassword,
	resetPassword,
};

export default basicService;
