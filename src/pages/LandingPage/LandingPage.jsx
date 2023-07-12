import Banner from "./Banner/Banner";
import Children from "./Children/Children";
import Download from "./Download/Download";
import EveryWhere from "./EveryWhere/EveryWhere";
import Tv from "./Tv/Tv";

function LandingPage() {
	return (
		<div className="divide-y-8 divide-[#232323]">
			<Banner />
			<Tv />
			<Download />
			<EveryWhere />
			<Children />
		</div>
	);
}
export default LandingPage;
