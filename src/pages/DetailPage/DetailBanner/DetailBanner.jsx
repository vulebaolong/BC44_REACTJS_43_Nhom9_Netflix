import { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { Progress, Rate, Typography } from "antd";
import Button from "../../../components/Button/Button";
import IconPlay from "../../../components/Icons/IconPlay";
import IconInfo from "../../../components/Icons/IconInfo";
import { useDispatch, useSelector } from "react-redux";
import { getMovieShowtimeMID } from "../../../redux/slices/cinemaSlice";
import { useParams } from "react-router-dom";
import IconUnMute from "../../../components/Icons/IconUnMute";
import IconRotate from "../../../components/Icons/IconRotate";
import IconMute from "../../../components/Icons/IconMute";
const { Paragraph } = Typography;

function DetailBanner() {
	const { movieShowtime } = useSelector((state) => state.cinemaSlice);
	const [playing, setPlaying] = useState(true);
	const [muted, setMuted] = useState(true);
	const playerRef = useRef(null);
	const imgBackgroundBannerRef = useRef(null);
	// const baseUrl = "https://www.youtube.com/embed/";
	// const id2 = "OaDdVqW5CeE";
	const onPause = () => {
		console.log("onPause");
	};
	const onPlay = () => {
		console.log("onPlay");
	};
	const onEnded = () => {
		console.log("onEnded");
	};
	const onProgress = (e) => {
		const duration = playerRef.current.getDuration();
		const timePause = duration - 15;
		const playedSeconds = e.playedSeconds;
		// console.log("playedSeconds", playedSeconds);
		// console.log("timePause", timePause);
		// console.log(playedSeconds > timePause);
		if (playedSeconds > 5) {
			imgBackgroundBannerRef.current.style.opacity = 1;
			setPlaying(false);
			// dispatch(setEndedBannerREDU(true));
		}
	};
	const handlePlayAgain = () => {
		const player = playerRef.current.getInternalPlayer();
		player.seekTo(0);
		setPlaying(true);
		imgBackgroundBannerRef.current.style.opacity = 0;
		// dispatch(setPlayingBannerREDU(true));
		// dispatch(setEndedBannerREDU(false));
		// imgBackgroundBannerRef.current.classList.remove(style.showImg);
	};
	const toggleMute = () => {
		if (playing) {
			setMuted(!muted);
		}
		if (!playing) {
			handlePlayAgain();
		}
	};
	const renderIconVideo = () => {
		if (playing) {
			if (muted) {
				return (
					<IconMute
						className="
                        w-2 h-2
                        sm:w-3 sm:h-3
                        md:w-4 md:h-4
                        lg:w-4 lg:h-4
                        xl:w-5 xl:h-5
                        2xl:w-6 2xl:h-6
                        "
					/>
				);
			}
			if (!muted) {
				return (
					<IconUnMute
						className="
                        w-3 h-3
                        sm:w-3 sm:h-3
                        md:w-4 md:h-4
                        lg:w-4 lg:h-4
                        xl:w-5 xl:h-5
                        2xl:w-6 2xl:h-6
                        "
					/>
				);
			}
		}
		if (!playing) {
			return (
				<IconRotate
					className="
                    w-2 h-2
                    sm:w-3 sm:h-3
                    md:w-4 md:h-4
                    lg:w-4 lg:h-4
                    xl:w-5 xl:h-5
                    2xl:w-6 2xl:h-6
                    "
				/>
			);
		}
	};
	const handleBuyMovie = () => {};
	return (
		<section
			className="banner aspect-[1920/1080] w-full relative bg-backgroundHome
            "
		>
			{/* VIDEO -top-[3.2vw]*/}
			<div className="VIDEO absolute w-full aspect-[1920/1080] overflow-hidden">
				<div className="absolute w-[114%] aspect-[1920/1080] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<ReactPlayer
						onPause={onPause}
						onPlay={onPlay}
						onEnded={onEnded}
						onProgress={onProgress}
						ref={playerRef}
						playing={playing}
						muted={muted}
						// url={`${baseUrl}${id2}`}
						url={`${movieShowtime?.trailer}`}
						width="100%"
						height="100%"
					/>
				</div>
			</div>

			{/* IMG */}
			<div
				className="IMG absolute w-full h-full opacity-0"
				ref={imgBackgroundBannerRef}
				style={{
					transition: "opacity .4s cubic-bezier(.665,.235,.265,.8) 0s",
				}}
			>
				<img
					className=" object-cover w-full h-full"
					src={movieShowtime?.hinhAnh}
					// src="https://occ-0-395-58.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABWOGQnCjGyUCJL7s_b4ZV-dlsvhwFiGXO3qRqpmCxP1aP-2F8QOaEE_qkrdt4Wb3vxSEdUc5YMzjKPhz-yU6HWqfR2zygGZijpYp.webp?r=bcc"
				/>
				<div
					className="FILTER absolute w-full h-full top-0 left-0"
					style={{
						background:
							"linear-gradient( 0deg, rgba(15, 23, 42, 1) 0%, rgba(15, 23, 42, 0.9) 10%, rgba(15, 23, 42, 0.8) 20%, rgba(15, 23, 42, 0.7) 30%, rgba(15, 23, 42, 0.6) 40%, rgba(15, 23, 42, 0.5) 50%, rgba(15, 23, 42, 0) 100% )",
						backdropFilter: "blur(10px)",
						WebkitBackdropFilter: "blur(10px)",
					}}
				></div>
			</div>

			{/* VIGNETTE */}
			<div
				className="VIGNETTE w-full h-full absolute top-0 left-0"
				style={{
					background: "linear-gradient(180deg, rgba(20,20,20,0) 0%, rgba(20,20,20,0) 51%, rgba(20,20,20,0.8) 80%, rgba(20,20,20,1) 100%)",
				}}
			></div>

			{/* TEXT AND SOUND*/}
			<div className="TEXTANDSOUND absolute w-full h-full flex items-center">
				{/* TEXT, HÌNH ẢNH, ĐÁNH GIÁ*/}
				<div
					className="container-home flex items-center gap-7
                    justify-center
                    xl:justify-start
                    "
				>
					{/* HÌNH ẢNH */}
					<div className="w-[18%] flex-shrink-0">
						<img src={movieShowtime.hinhAnh} className="w-full" alt="" />
					</div>

					{/* TEXT AND BUTTON */}
					<div className=" flex-1">
						<h1
							className="font-black truncate leading-none
                            text-base text-center mb-2
                            sm:text-2xl sm:mb-4
                            lg:text-4xl
                            xl:text-start
                            "
						>
							{movieShowtime?.tenPhim}
						</h1>
						<Paragraph
							ellipsis={{ rows: 3 }}
							className="font-medium text-[1.2vw] text-white
                            hidden
                            xl:[display:-webkit-box]
                            "
						>
							{movieShowtime?.moTa}
						</Paragraph>
						<div
							className="flex gap-3
                            mt-3 justify-center
                            xl:mt-0 xl:justify-start
                            "
						>
							<Button
								onClick={() => {
									handleBuyMovie();
								}}
								className="flex items-center
								py-0 px-2 gap-1
                                sm:py-1 sm:px-2 sm:gap-3
                                md:py-2 md:px-3
                                lg:py-2 lg:px-4
                                xl:py-3 xl:px-5
                                2xl:py-3 2xl:px-6
								"
								type="secondary"
							>
								<IconPlay
									className="
                                    w-2 h-2
                                    sm:w-3 sm:h-3
                                    md:w-4 md:h-4
                                    lg:w-4 lg:h-4
                                    xl:w-5 xl:h-5
                                    2xl:w-6 2xl:h-6
                                    "
								/>
								<span
									className=" font-semibold
                                    text-[10px]
                                    sm:text-sm
                                    md:text-sm
                                    lg:text-base
                                    xl:text-2xl
                                    2xl:text-2xl
                                    "
								>
									Mua vé
								</span>
							</Button>
							<Button
								className=" gap-3 items-center
                                hidden
                                xl:flex xl:py-3 xl:px-5
                                2xl:py-3 2xl:px-6
                                "
								type="tertiary"
							>
								<IconInfo width={35} height={35} />
								<span className="text-2xl font-semibold ">Thông tin khác</span>
							</Button>
						</div>
					</div>

					{/* ĐÁNH GIÁ */}
					<div className="space-y-3 w-[18%] flex items-center flex-col flex-shrink-0">
						<Progress strokeColor={"#7ed321"} type="circle" percent={(+movieShowtime.danhGia / 5) * 100} />
						<Rate allowHalf value={+movieShowtime.danhGia} />
					</div>
				</div>

				{/* SOUND */}
				<div className="absolute bottom-[20%] right-0 ">
					<div
						className="flex items-center
                        gap-2
                        sm:gap-2
                        md:gap-3
                        lg:gap-4
                        2xl:gap-5
                        "
					>
						<Button
							onClick={toggleMute}
							type="circle"
							size="p-[0.2rem]
                            sm:p-[0.4rem]
                            md:p-[0.5rem]
                            lg:p-[0.7rem]
                            "
						>
							{renderIconVideo()}
						</Button>
						<div
							className="flex items-center bg-[#333333]/60   border-l-[3px]
                            w-10 py-0 pl-1
                            sm:w-16 sm:py-1 sm:pl-2
                            md:w-20 md:py-2 md:pl-4
                            lg:w-32 lg:py-2 lg:pl-5
                            "
						>
							<span
								className="text-[10px] font-medium
                                sm:text-xs
                                lg:text-base
                                xl:text-xl
                                2xl:text-2xl
                                "
							>
								18+
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
export default DetailBanner;