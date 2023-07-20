import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useRef } from "react";
import Button from "../../../components/Button/Button";
import { useDispatch} from "react-redux";
import { playAgain, setModalMovieActive, setPlayingModalMovie } from "../../../redux/slices/modalMovieSlice";
import { showImgModalMovie } from "../../../helpers/modalMovieHelper";
import { setPlayingBannerREDU } from "../../../redux/slices/bannerHomeSlice";
import PropTypes from "prop-types";


function Slider({ listMovie }) {

	const dispatch = useDispatch();

	const swiperRef = useRef();
	const navigationPrevRef = useRef(null);
	const btnPrevRef = useRef(null);
	const navigationNextRef = useRef(null);

	const handleClickPrev = () => {
		swiperRef.current?.slidePrev();
	};

	const handleClickNext = () => {
		const btnPrevEl = btnPrevRef.current;

		if (btnPrevEl.classList.contains("hidden")) {
			btnPrevEl.classList.remove("hidden");
			btnPrevEl.classList.add("flex");
		}
		swiperRef.current?.slideNext();
	};

	const locationViewModalMovie = (e) => {
		// modalMovieEl là modal sở popup khi hover
		// movieEl là từng movie nằm trong slide
		const modalMovieEl = document.querySelector(".modalMovie");
		const movieEl = e.target;
		modalMovieEl.style.display = "block";

		// viewport tới đỉnh của trang web
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

		// VIEW PORT
		const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
		// const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

		// MOVIE
		const rectMovie = movieEl.getBoundingClientRect();
		const top = rectMovie.top;
		const left = rectMovie.left;
		const right = rectMovie.right;
		const widthMovieEl = rectMovie.width;
		// const heightMovieEl = rectMovie.height;

		// SET CHIEEUF CAO CHO MODAL MOVIE
		modalMovieEl.style.width = `${widthMovieEl}px`;

		// MODAL MOVIE
		const rectModalMovie = modalMovieEl.getBoundingClientRect();
		const widthModalMovieEl = rectModalMovie.width;
		// const heightModalMovieEl = rectModalMovie.height;

		// TÍNH RA PHẦN TRĂM
		// const topPercentage = (top / viewportHeight) * 100;
		const leftPercentage = Math.round((left / viewportWidth) * 100);

		// await wait(500);
		// Hiện modal movie
		modalMovieEl.style.transform = "scale(1.5)";

		// PHẢI
		if (leftPercentage > 75) {
			// modalMovieEl.style.top = `${top + scrollTop + heightMovieEl / 2 - heightModalMovieEl / 2}px`;
			modalMovieEl.style.top = `${top + scrollTop}px`;
			modalMovieEl.style.left = `${right - widthModalMovieEl}px`;
			modalMovieEl.style.width = `${widthMovieEl}px`;
			modalMovieEl.style.transformOrigin = "center right";
		}

		// TRÁI
		if (leftPercentage < 10) {
			// modalMovieEl.style.top = `${top + scrollTop + heightMovieEl / 2 - heightModalMovieEl / 2}px`;
			modalMovieEl.style.top = `${top + scrollTop}px`;
			modalMovieEl.style.left = `${left}px`;
			modalMovieEl.style.width = `${widthMovieEl}px`;
			modalMovieEl.style.transformOrigin = "center left";
		}

		// GIỮA
		if (!(leftPercentage < 10) && !(leftPercentage > 75)) {
			// modalMovieEl.style.top = `${top + scrollTop + heightMovieEl / 2 - heightModalMovieEl / 2}px`;
			modalMovieEl.style.top = `${top + scrollTop}px`;
			modalMovieEl.style.left = `${left + widthMovieEl / 2 - widthModalMovieEl / 2}px`;
			modalMovieEl.style.transformOrigin = "center center";
			console.log("top", top);
			console.log("left", left);
			console.log("widthModalMovieEl", widthModalMovieEl);
			console.log("widthMovieEl", widthMovieEl);
		}
	};

	let hoverTimeout;

	const handleMouseEnter = (e, movie) => {
		clearTimeout(hoverTimeout);

		hoverTimeout = setTimeout(() => {
			showImgModalMovie("opacity 0s")

			dispatch(setModalMovieActive(movie));
			dispatch(playAgain());
			dispatch(setPlayingModalMovie(true));
			dispatch(setPlayingBannerREDU(false));
			locationViewModalMovie(e);
		}, 500);
	};

	const handleMouseLeave = () => {
		clearTimeout(hoverTimeout);
	};

	const renderSwiper = () => {
		if (listMovie.length > 0) {
			return (
				<Swiper
					effect="slide" // Sử dụng hiệu ứng trượt
					speed={1100}
					slidesPerView={2}
					spaceBetween={2}
					slidesPerGroup={2}
					zoom={true}
					modules={[Navigation, Pagination, A11y]}
					navigation={{
						prevEl: navigationPrevRef.current,
						nextEl: navigationNextRef.current,
					}}
					pagination={{ clickable: true }}
					loop={true}
					className="mySwiper"
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
					breakpoints={{
						640: {
							slidesPerView: 3,
							spaceBetween: 3,
							slidesPerGroup: 3,
						},
						768: {
							slidesPerView: 4,
							spaceBetween: 4,
							slidesPerGroup: 4,
						},
						1024: {
							slidesPerView: 5,
							spaceBetween: 5,
							slidesPerGroup: 5,
						},
						1280: {
							slidesPerView: 5,
							spaceBetween: 5,
							slidesPerGroup: 5,
						},
						1536: {
							slidesPerView: 6,
							spaceBetween: 8,
							slidesPerGroup: 6,
						},
					}}
				>
					{listMovie.map((movie, i) => {
						return (
							<SwiperSlide
								key={i}
								className="
								aspect-[341/192]
								relative
								"
							>
								{
									<div
										className="movie w-full h-full relative group/SwiperSlide cursor-pointer"
										onMouseEnter={(e) => {
											handleMouseEnter(e, movie);
										}}
										onMouseLeave={handleMouseLeave}
									>
										<div className="absolute w-full h-full overflow-hidden rounded-[0.2vw]">
											<img src={movie.hinhAnh} />
										</div>
									</div>
								}
							</SwiperSlide>
						);
					})}
				</Swiper>
			);
		}
	};

	return (
		<div className="relative group/swiper">
			<Button
				className="btnPrev hidden absolute group-hover/swiper:bg-[#141414]/70 bg-[#141414]/50 top-0 left-0 h-full z-10 w-[4%] 2xl:w-[60px] justify-center items-center rounded-r-[0.2vw]"
				type="navigattion"
				onClick={handleClickPrev}
				ref={btnPrevRef}
			>
				<FaAngleLeft
					className="
					text-[10px]
					sm:text-sm
					md:text-xl
					lg:text-3xl
					xl:text-4xl
					"
					// text-4xl
				/>
			</Button>
			{renderSwiper()}
			<Button
				className="btnNext absolute group-hover/swiper:bg-[#141414]/70 bg-[#141414]/50 top-0 right-0 h-full z-10 w-[4%] 2xl:w-[60px] flex justify-center items-center rounded-r-[0.2vw]"
				type="navigattion"
				onClick={handleClickNext}
			>
				<FaAngleRight
					className="
					text-[10px]
					sm:text-sm
					md:text-xl
					lg:text-3xl
					xl:text-4xl
					"
					// text-4xl
				/>
			</Button>
		</div>
	);
}

Slider.propTypes = {
	listMovie: PropTypes.any,
};

export default Slider;
