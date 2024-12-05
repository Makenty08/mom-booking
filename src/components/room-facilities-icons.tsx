import { FaToilet, FaShower, FaBath, FaSwimmingPool, FaWifi } from 'react-icons/fa';
import { GiConverseShoe, GiHanger, GiWaterBottle, GiClothes } from 'react-icons/gi';
import { BiFridge, BiTable } from 'react-icons/bi';
import { MdOutlineDryCleaning } from 'react-icons/md';
import { FaFan } from 'react-icons/fa';
import { GiToothbrush } from 'react-icons/gi';
import { FaMaskVentilator } from 'react-icons/fa6';
import { TbIroning1 } from 'react-icons/tb';
import { VscServerEnvironment } from 'react-icons/vsc';
import { MdOutlineElectricalServices } from 'react-icons/md';
import { MdMicrowave } from 'react-icons/md';
import { LuSofa } from 'react-icons/lu';

export const RoomFacilitiesIcons = {
  shower: {
    icon: <FaShower size={20} />,
    text: 'Shower',
  },
  bath: {
    icon: <FaBath size={20} />,
    text: 'Bath',
  },
  bathrobe: {
    icon: <GiClothes size={20} />,
    text: 'Bathrobe',
  },
  slippers: {
    icon: <GiConverseShoe size={20} />,
    text: 'Slippers',
  },
  toilet: {
    icon: <FaToilet size={20} />,
    text: 'Toilet',
  },
  towel: {
    icon: <MdOutlineDryCleaning size={20} />,
    text: 'Towel',
  },
  fan: {
    icon: <FaFan size={20} />,
    text: 'Fan',
  },
  toothbrush: {
    icon: <GiToothbrush size={20} />, // Placeholder, replace with actual icon
    text: 'Toothbrush',
  },
  fridge: {
    icon: <BiFridge size={20} />,
    text: 'Fridge',
  },
  table: {
    icon: <BiTable size={20} />,
    text: 'Table',
  },
  microwave: {
    icon: <MdMicrowave size={20} />,
    text: 'Microwave',
  },
  waterbottle: {
    icon: <GiWaterBottle size={20} />,
    text: 'Water Bottle',
  },
  hanger: {
    icon: <GiHanger size={20} />,
    text: 'Hanger',
  },
  wardrobe: {
    icon: <GiClothes size={20} />, // Placeholder, replace with actual icon
    text: 'Wardrobe',
  },
  dryer: {
    icon: <MdOutlineDryCleaning size={20} />,
    text: 'Dryer',
  },
  sofa: {
    icon: <LuSofa size={20} />,
    text: 'Sofa',
  },
  ventilator: {
    icon: <FaMaskVentilator size={20} />,
    text: 'Ventilator',
  },
  iron: {
    icon: <TbIroning1 size={20} />,
    text: 'Iron',
  },
  ironingboard: {
    icon: <VscServerEnvironment size={20} />,
    text: 'Ironing Board',
  },
  jack: {
    icon: <MdOutlineElectricalServices size={20} />, // Placeholder, replace with actual icon
    text: 'Socket near the bed',
  },
};
