import { useEffect, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

import { useTopBarProgres } from "../../hooks/useTopBarProgres";

export const TopbarProgresProvider = () => {
	const topBarRef = useRef<LoadingBarRef>(null);
	const topBar = useTopBarProgres();

	useEffect(() => {
		if (topBar.status === "OPEN") {
			topBarRef.current?.continuousStart();
		}
		if (topBar.status === "CLOSE") {
			topBarRef.current?.complete();
		}
	}, [topBar.status]);

	return <LoadingBar color="#3cff64" ref={topBarRef} shadow={true} />;
};
