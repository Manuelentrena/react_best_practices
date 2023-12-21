import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

const TopBarProgressByLocation = () => {
	const [progress, setProgress] = useState(false);
	const [prevLoc, setPrevLoc] = useState("");
	const location = useLocation();

	useEffect(() => {
		setPrevLoc(location.pathname);
		setProgress(true);
		if (location.pathname === prevLoc) {
			setPrevLoc("");
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	useEffect(() => {
		setProgress(false);
	}, [prevLoc]);

	if (!progress) {
		return <></>;
	}

	return <TopBarProgress />;
};

export default TopBarProgressByLocation;
