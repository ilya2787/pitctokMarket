import { SlBasket, SlSocialInstagram } from "react-icons/sl";
import { BsFillBasket2Fill } from "react-icons/bs";
import { FaHeart, FaTelegramPlane, FaVk, FaRegEye, FaRegEyeSlash, FaCheck } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { BiSearchAlt } from "react-icons/bi";
import { TiArrowSortedDown } from "react-icons/ti";
import { IoClose, IoCloseSharp } from "react-icons/io5";
import { MdDoubleArrow, MdEmail } from "react-icons/md";
import { IoIosSave, IoIosArrowForward } from "react-icons/io";
import { PiArrowsDownUp } from "react-icons/pi";
import { ImFire } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPhoneSquareAlt, FaPencilAlt } from "react-icons/fa";


export const ICON = {
	Basket: <SlBasket />,
	BasketProduct: <BsFillBasket2Fill/>,
	Heart: <FaHeart />,
	User: <FaUserLarge />,
	Vk: <FaVk />,
	Telegram: <FaTelegramPlane />,
	Instagram: <SlSocialInstagram />,
	Search: <BiSearchAlt />,
	ArrowDown: <TiArrowSortedDown />,
	Exit: <IoClose />,
	Eye: <FaRegEye />,
	Eye_Slash: <FaRegEyeSlash />,
	ArrowDoubleRight: <MdDoubleArrow/>,
	Save: <IoIosSave/>,
	ArrowRight: <IoIosArrowForward />,
	UpDownArrow: <PiArrowsDownUp />,
	Fire: <ImFire/>,
	Check: <FaCheck/>,
	Closed: <IoCloseSharp/>,
	DeleteIcons: <RiDeleteBin6Line/>,
	Phone: <FaPhoneSquareAlt />,
	Email: <MdEmail/>,
	Pencil: <FaPencilAlt/>
}