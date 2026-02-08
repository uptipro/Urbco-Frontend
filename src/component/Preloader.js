import { useLottie } from "lottie-react";
import Loading from "../assets/animation_lldie3ks.json";

const style = {
	height: 200,
};

const Preloader = () => {
	const options = {
		animationData: Loading,
		loop: true,
		autoplay: true,
	};

	const { View } = useLottie(options, style);

	return View;
};

export default Preloader;
