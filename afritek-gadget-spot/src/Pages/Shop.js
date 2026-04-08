import React, { useState, useEffect, useCallback } from "react";
import SearchFilter from "../components/SearchFilter";
import { ShoppingCart } from "lucide-react";
import SumsungAo6 from "../Images/sumsungAo6.webp";
import SumsungAO7 from "../Images/SumsungGalaxyAO7.webp";
import SumsungA11 from "../Images/SumsungGalaxyA11.jpg";
import SumsungA16 from "../Images/SumsungGalaxyA16.jpg";
import SumsungA17 from "../Images/SumsungGalaxyA17.webp";
import SumsungA26 from "../Images/SumsungGalaxyA26.jpg";
import S25Img from "../Images/SumsungGalaxys25ultra.jpg";
import RedmiA5 from "../Images/redmiA5.jpeg";
import Redmi15 from "../Images/Redmi15.webp";
import Redmi15c from "../Images/Redmi15c.webp";
import Redmi15pro from "../Images/Redmi15pro.jpg";
import RedmiNote15 from "../Images/Redminote15.webp";
import RedmiNote15proPlus from "../Images/RedmiNote15pro+.webp";

// OPPO images
import OppoA3x from "../Images/OppoA3x.jpg";
import OppoA6x from "../Images/OppoA6x.jpg";
import OPPOA6Pro from "../Images/OPPOA6Pro.jpg";
import OPPOReno14f5G from "../Images/OPPOReno14f5G.jpg";
import OPPOReno155G from "../Images/OPPOReno155G.jpg";
import OPPOReno5Pro5G from "../Images/OPPOReno5Pro5G.webp";

// Realme images
import RealmeNote60x from "../Images/RealmeNote60x.webp";
import RealmeNote70 from "../Images/RealmeNote70.jpg";
import RealmeC71 from "../Images/Realmec71.webp";
import RealmeC67 from "../Images/RealmeC67.webp";
import RealmeC65 from "../Images/RealmeC65.webp";
import RealmeC75 from "../Images/RealmeC75.jpg";
import RealmeC75x from "../Images/RealmeC75x.jpg";

// TECNO images
import TecnoPop10 from "../Images/TecnoPop10.webp";
import TecnoPop20 from "../Images/TecnoPop20.webp";
import TecnoSpark40 from "../Images/TecnoSpark40.jpg";
import TecnoSpark40Pro from "../Images/TecnoSpark40Pro.jpg";
import TecnoSpark40ProPlus from "../Images/TecnoSpark40Pro+.jpg";
import TecnoCamon40Pro from "../Images/TecnoCamon40Pro.jpg";
import TecnoCamon50Pro from "../Images/TecnoCamon50Pro.webp";
import TecnoSparkSlim from "../Images/TecnoSparkSlim.jpg";
import TecnoMegaPadSE from "../Images/TecnoMegaPadSE.webp";

// INFINIX images
import InfinixNote50Pro from "../Images/InfinixNote50Pro.png";
import InfinixNoteEdge from "../Images/InfinixNoteEdge.webp";
import InfinixHot60i from "../Images/InfinixHot60i.jpg";
import InfinixHot60ProPlus from "../Images/InfinixHot60Pro+.jpg";
import InfinixSmart10 from "../Images/InfinixSmart10.webp";

// ITEL images
import ItelA06 from "../Images/iTelA06.jpg";
import ItelA100c from "../Images/iTelA100c.jpg";
import ItelA90 from "../Images/iTelA90.jpg";
import ItelCity100 from "../Images/iTelCity100.jpg";
import ItelS23Plus from "../Images/iTelS23+.jpg";
import ItelS26Ultra from "../Images/iTelS26Ultra.jpg";
import ItelKidPad from "../Images/iTelKidPad.webp";
import ItelP55Plus from "../Images/iTelP55+.jpeg";
import ItelVistaTab10 from "../Images/iTelVistaTab10.jpeg";

// VIVO images
import VivoY04 from "../Images/VivoY04.webp";
import VivoY21D from "../Images/VivoY21D.jpg";
import VivoY31D from "../Images/VivoY31D.jpg";
import VivoV40Lite from "../Images/VivoV40Lite.jpg";
import VivoV60Lite from "../Images/VivoV60Lite.jpg";
import VivoV60 from "../Images/VivoV60.jpg";
import VivoX300Pro from "../Images/VivoX300Pro.jpg";

// VILLAON images
import VillaonV20 from "../Images/VillaonV20.jpg";
import VillaonV20SE from "../Images/VillaonV20SE.webp";
import VillaonV25 from "../Images/VillaonV25.jpg";
import VillaonV40 from "../Images/VillaonV40.jpg";
import VillaonV40s from "../Images/VillaonV40s.jpg";
import VillaonV45 from "../Images/VillaonV45.webp";
import VillaonV50s from "../Images/VillaonV50s.jpg";

// ELIMU-TAB images
import ElimuET04Pro from "../Images/ElimuTabET04Pro.jpg";
import ElimuET05 from "../Images/ElimuTabET05.jpg";

// BONTEL images
import BontelT1000 from "../Images/BontelLandlineT1000.jpg";

// All 99 Real Products from your inventory
const allProducts = [
  // SAMSUNG
  {
    id: 1,
    name: "Samsung Galaxy A06",
    brand: "Samsung",
    category: "Phones",
    specs: "64GB/4GB RAM",
    price: 12000,
    image: SumsungAo6,
    reviews: 45,
  },
  {
    id: 2,
    name: "Samsung Galaxy A06",
    brand: "Samsung",
    category: "Phones",
    specs: "128GB/4GB 5G",
    price: 14800,
    image: SumsungAo6,
    reviews: 52,
  },
  {
    id: 3,
    name: "Samsung Galaxy A07",
    brand: "Samsung",
    category: "Phones",
    specs: "64GB/4GB RAM",
    price: 13500,
    image: SumsungAO7,
    reviews: 48,
  },
  {
    id: 4,
    name: "Samsung Galaxy A07",
    brand: "Samsung",
    category: "Phones",
    specs: "128GB/4GB RAM",
    price: 14500,
    image: SumsungAO7,
    reviews: 55,
  },
  {
    id: 5,
    name: "Samsung Galaxy A16 `",
    brand: "Samsung",
    category: "Phones",
    specs: "128GB/4GB RAM",
    price: 17000,
    image: SumsungA16,
    reviews: 62,
  },
  {
    id: 6,
    name: "Samsung Galaxy A17",
    brand: "Samsung",
    category: "Phones",
    specs: "128GB/4GB RAM",
    price: 18500,
    image: SumsungA17,
    reviews: 70,
  },
  {
    id: 7,
    name: "Samsung Galaxy A17",
    brand: "Samsung",
    category: "Phones",
    specs: "128GB/6GB RAM",
    price: 21000,
    image: SumsungA17,
    reviews: 78,
  },
  {
    id: 8,
    name: "Samsung Galaxy A17",
    brand: "Samsung",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 27500,
    image: SumsungA17,
    reviews: 85,
  },
  {
    id: 9,
    name: "Samsung Galaxy A26",
    brand: "Samsung",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 34000,
    image: SumsungA26,
    reviews: 92,
  },
  {
    id: 10,
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    category: "Phones",
    specs: "256GB/12GB RAM",
    price: 122000,
    image: S25Img,
    reviews: 180,
  },
  {
    id: 11,
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    category: "Phones",
    specs: "512GB/12GB RAM",
    price: 140000,
    image: S25Img,
    reviews: 190,
  },
  {
    id: 12,
    name: "Samsung Galaxy A11",
    brand: "Samsung",
    category: "Phones",
    specs: "64GB/4GB RAM",
    price: 18000,
    image: SumsungA11,
    reviews: 38,
  },
  // REDMI
  {
    id: 13,
    name: "Redmi A5",
    brand: "Redmi",
    category: "Phones",
    specs: "64GB/3GB RAM",
    price: 11500,
    image: RedmiA5,
    reviews: 42,
  },
  {
    id: 14,
    name: "Redmi 15",
    brand: "Redmi",
    category: "Phones",
    specs: "128GB/6GB RAM",
    price: 19500,
    image: Redmi15,
    reviews: 65,
  },
  {
    id: 15,
    name: "Redmi 15c",
    brand: "Redmi",
    category: "Phones",
    specs: "128GB/4GB RAM",
    price: 14800,
    image: Redmi15c,
    reviews: 52,
  },
  {
    id: 16,
    name: "Redmi 15c",
    brand: "Redmi",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 18800,
    image: Redmi15c,
    reviews: 70,
  },
  {
    id: 17,
    name: "Redmi Note 15",
    brand: "Redmi",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 28000,
    image: RedmiNote15,
    reviews: 88,
  },
  {
    id: 18,
    name: "Redmi Note 15 Pro",
    brand: "Redmi",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 35500,
    image: Redmi15pro,
    reviews: 105,
  },
  {
    id: 19,
    name: "Redmi Note 15 Pro",
    brand: "Redmi",
    category: "Phones",
    specs: "512GB/12GB RAM",
    price: 43500,
    image: Redmi15pro,
    reviews: 120,
  },
  {
    id: 20,
    name: "Redmi Note 15 Pro+",
    brand: "Redmi",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 51500,
    image: RedmiNote15proPlus,
    reviews: 135,
  },
  {
    id: 21,
    name: "Redmi Note 15 Pro+",
    brand: "Redmi",
    category: "Phones",
    specs: "512GB/12GB RAM",
    price: 60500,
    image: RedmiNote15proPlus,
    reviews: 150,
  },
  // OPPO
  {
    id: 22,
    name: "OPPO A3X",
    brand: "OPPO",
    category: "Phones",
    specs: "128GB/4GB RAM",
    price: 16500,
    image: OppoA3x,
    reviews: 58,
  },
  {
    id: 23,
    name: "OPPO A6x",
    brand: "OPPO",
    category: "Phones",
    specs: "64GB/4GB RAM",
    price: 14800,
    image: OppoA6x,
    reviews: 72,
  },
  {
    id: 24,
    name: "OPPO A6x",
    brand: "OPPO",
    category: "Phones",
    specs: "128GB/4GB RAM",
    price: 16600,
    image: OppoA6x,
    reviews: 85,
  },
  {
    id: 25,
    name: "OPPO A6x",
    brand: "OPPO",
    category: "Phones",
    specs: "256GB/4GB RAM",
    price: 20200,
    image: OppoA6x,
    reviews: 95,
  },
  {
    id: 26,
    name: "OPPO A5",
    brand: "OPPO",
    category: "Phones",
    specs: "128GB/6GB RAM",
    price: 21700,
    image: OppoA6x,
    reviews: 102,
  },
  {
    id: 27,
    name: "OPPO A5",
    brand: "OPPO",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 25200,
    image: OppoA6x,
    reviews: 118,
  },
  {
    id: 28,
    name: "OPPO A5 Pro",
    brand: "OPPO",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 29000,
    image: OPPOA6Pro,
    reviews: 125,
  },
  {
    id: 29,
    name: "OPPO A6 Pro",
    brand: "OPPO",
    category: "Phones",
    specs: "256GB/8GB 4G",
    price: 33800,
    image: OPPOA6Pro,
    reviews: 130,
  },
  {
    id: 30,
    name: "OPPO A6 Pro",
    brand: "OPPO",
    category: "Phones",
    specs: "256GB/8GB 5G",
    price: 38800,
    image: OPPOA6Pro,
    reviews: 140,
  },
  {
    id: 31,
    name: "OPPO Reno 14f 5G",
    brand: "OPPO",
    category: "Phones",
    specs: "Advanced 5G",
    price: 53500,
    image: OPPOReno14f5G,
    reviews: 155,
  },
  {
    id: 32,
    name: "OPPO Reno 15f 5G",
    brand: "OPPO",
    category: "Phones",
    specs: "Advanced 5G",
    price: 53500,
    image: OPPOReno155G,
    reviews: 160,
  },
  {
    id: 33,
    name: "OPPO Reno 15 5G",
    brand: "OPPO",
    category: "Phones",
    specs: "Advanced 5G",
    price: 67500,
    image: OPPOReno155G,
    reviews: 170,
  },
  {
    id: 34,
    name: "OPPO Reno 15 Pro 5G",
    brand: "OPPO",
    category: "Phones",
    specs: "Advanced 5G",
    price: 76000,
    image: OPPOReno5Pro5G,
    reviews: 180,
  },
  // REALME
  {
    id: 35,
    name: "Realme Note 60x",
    brand: "Realme",
    category: "Phones",
    specs: "128GB/4GB RAM",
    price: 12800,
    image: RealmeNote60x,
    reviews: 50,
  },
  {
    id: 36,
    name: "Realme Note 70",
    brand: "Realme",
    category: "Phones",
    specs: "128GB/4GB RAM",
    price: 14800,
    image: RealmeNote70,
    reviews: 62,
  },
  {
    id: 37,
    name: "Realme C71",
    brand: "Realme",
    category: "Phones",
    specs: "128GB/8GB RAM",
    price: 17000,
    image: RealmeC71,
    reviews: 75,
  },
  {
    id: 38,
    name: "Realme C71",
    brand: "Realme",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 19000,
    image: RealmeC71,
    reviews: 88,
  },
  {
    id: 39,
    name: "Realme C67",
    brand: "Realme",
    category: "Phones",
    specs: "128GB/6GB Warranty",
    price: 14000,
    image: RealmeC67,
    reviews: 82,
  },
  {
    id: 40,
    name: "Realme C67",
    brand: "Realme",
    category: "Phones",
    specs: "256GB/8GB Warranty",
    price: 18000,
    image: RealmeC67,
    reviews: 95,
  },
  {
    id: 41,
    name: "Realme C65",
    brand: "Realme",
    category: "Phones",
    specs: "256GB/8GB Warranty",
    price: 17000,
    image: RealmeC65,
    reviews: 80,
  },
  {
    id: 42,
    name: "Realme C75x",
    brand: "Realme",
    category: "Phones",
    specs: "128GB/6GB RAM",
    price: 18200,
    image: RealmeC75x,
    reviews: 88,
  },
  {
    id: 43,
    name: "Realme C75x",
    brand: "Realme",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 20400,
    image: RealmeC75x,
    reviews: 102,
  },
  {
    id: 44,
    name: "Realme C75",
    brand: "Realme",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 23600,
    image: RealmeC75,
    reviews: 110,
  },
  {
    id: 45,
    name: "Realme C75",
    brand: "Realme",
    category: "Phones",
    specs: "512GB/8GB RAM",
    price: 27200,
    image: RealmeC75,
    reviews: 125,
  },
  // TECNO
  {
    id: 46,
    name: "Tecno Pop 10",
    brand: "Tecno",
    category: "Phones",
    specs: "64GB/3GB RAM",
    price: 12000,
    image: TecnoPop10,
    reviews: 45,
  },
  {
    id: 47,
    name: "Tecno Pop 20",
    brand: "Tecno",
    category: "Phones",
    specs: "64GB/4GB RAM",
    price: 12800,
    image: TecnoPop20,
    reviews: 52,
  },
  {
    id: 48,
    name: "Tecno Pop 20",
    brand: "Tecno",
    category: "Phones",
    specs: "128GB/4GB RAM",
    price: 15000,
    image: TecnoPop20,
    reviews: 60,
  },
  {
    id: 49,
    name: "Tecno Spark 40",
    brand: "Tecno",
    category: "Phones",
    specs: "128GB/4GB RAM",
    price: 14500,
    image: TecnoSpark40,
    reviews: 78,
  },
  {
    id: 50,
    name: "Tecno Spark 40 Pro",
    brand: "Tecno",
    category: "Phones",
    specs: "128GB/8GB RAM",
    price: 19500,
    image: TecnoSpark40Pro,
    reviews: 95,
  },
  {
    id: 51,
    name: "Tecno Spark 40 Pro+",
    brand: "Tecno",
    category: "Phones",
    specs: "128GB/8GB RAM",
    price: 24600,
    image: TecnoSpark40ProPlus,
    reviews: 108,
  },
  {
    id: 52,
    name: "Tecno Spark 40 Pro+",
    brand: "Tecno",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 26500,
    image: TecnoSpark40ProPlus,
    reviews: 115,
  },
  {
    id: 53,
    name: "Tecno Camon 40 Pro",
    brand: "Tecno",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 34200,
    image: TecnoCamon40Pro,
    reviews: 128,
  },
  {
    id: 54,
    name: "Tecno Camon 50 Pro",
    brand: "Tecno",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 37200,
    image: TecnoCamon50Pro,
    reviews: 142,
  },
  {
    id: 55,
    name: "Tecno Spark Slim",
    brand: "Tecno",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 27300,
    image: TecnoSparkSlim,
    reviews: 102,
  },
  {
    id: 56,
    name: "Tecno MegaPad SE",
    brand: "Tecno",
    category: "Tablets",
    specs: "128GB/4GB RAM",
    price: 19200,
    image: TecnoMegaPadSE,
    reviews: 65,
  },
  {
    id: 57,
    name: "Tecno MegaPad SE",
    brand: "Tecno",
    category: "Tablets",
    specs: "256GB/8GB RAM",
    price: 22600,
    image: TecnoMegaPadSE,
    reviews: 78,
  },
  // INFINIX
  {
    id: 58,
    name: "Infinix Note 50 Pro",
    brand: "Infinix",
    category: "Phones",
    specs: "Advanced Device",
    price: 30800,
    image: InfinixNote50Pro,
    reviews: 95,
  },
  {
    id: 59,
    name: "Infinix Note Edge",
    brand: "Infinix",
    category: "Phones",
    specs: "Advanced Device",
    price: 32000,
    image: InfinixNoteEdge,
    reviews: 102,
  },
  {
    id: 60,
    name: "Infinix Hot 60i",
    brand: "Infinix",
    category: "Phones",
    specs: "128GB/4GB RAM",
    price: 13800,
    image: InfinixHot60i,
    reviews: 62,
  },
  {
    id: 61,
    name: "Infinix Hot 60i",
    brand: "Infinix",
    category: "Phones",
    specs: "128GB/6GB RAM",
    price: 15300,
    image: InfinixHot60i,
    reviews: 75,
  },
  {
    id: 62,
    name: "Infinix Hot 60i",
    brand: "Infinix",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 17500,
    image: InfinixHot60i,
    reviews: 88,
  },
  {
    id: 63,
    name: "Infinix Hot 60 Pro",
    brand: "Infinix",
    category: "Phones",
    specs: "128GB/8GB RAM",
    price: 19200,
    image: InfinixHot60ProPlus,
    reviews: 95,
  },
  {
    id: 64,
    name: "Infinix Hot 60 Pro+",
    brand: "Infinix",
    category: "Phones",
    specs: "128GB/8GB RAM",
    price: 23300,
    image: InfinixHot60ProPlus,
    reviews: 108,
  },
  {
    id: 65,
    name: "Infinix Hot 60 Pro+",
    brand: "Infinix",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 26800,
    image: InfinixHot60ProPlus,
    reviews: 122,
  },
  {
    id: 66,
    name: "Infinix Smart 10",
    brand: "Infinix",
    category: "Phones",
    specs: "64GB/4GB RAM",
    price: 11500,
    image: InfinixSmart10,
    reviews: 55,
  },
  {
    id: 67,
    name: "Infinix Smart 10",
    brand: "Infinix",
    category: "Phones",
    specs: "128GB/4GB RAM",
    price: 12500,
    image: InfinixSmart10,
    reviews: 68,
  },
  // ITEL
  {
    id: 68,
    name: "iTel A06",
    brand: "iTel",
    category: "Phones",
    specs: "64GB/2GB RAM",
    price: 9000,
    image: ItelA06,
    reviews: 35,
  },
  {
    id: 69,
    name: "iTel A100c",
    brand: "iTel",
    category: "Phones",
    specs: "64GB/2GB RAM",
    price: 9300,
    image: ItelA100c,
    reviews: 42,
  },
  {
    id: 70,
    name: "iTel A90",
    brand: "iTel",
    category: "Phones",
    specs: "128GB/4GB RAM",
    price: 10800,
    image: ItelA90,
    reviews: 50,
  },
  {
    id: 71,
    name: "iTel City 100",
    brand: "iTel",
    category: "Phones",
    specs: "128GB/4GB RAM",
    price: 12300,
    image: ItelCity100,
    reviews: 58,
  },
  {
    id: 72,
    name: "iTel S23+",
    brand: "iTel",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 25000,
    image: ItelS23Plus,
    reviews: 102,
  },
  {
    id: 73,
    name: "iTel S26 Ultra",
    brand: "iTel",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 21500,
    image: ItelS26Ultra,
    reviews: 95,
  },
  {
    id: 74,
    name: "iTel KidPad",
    brand: "iTel",
    category: "Tablets",
    specs: "32GB Storage",
    price: 10500,
    image: ItelKidPad,
    reviews: 62,
  },
  {
    id: 75,
    name: "iTel P55+",
    brand: "iTel",
    category: "Phones",
    specs: "128GB/8GB RAM",
    price: 9800,
    image: ItelP55Plus,
    reviews: 75,
  },
  {
    id: 76,
    name: "iTel Vista Tab 10",
    brand: "iTel",
    category: "Tablets",
    specs: "10-inch Display",
    price: 8800,
    image: ItelVistaTab10,
    reviews: 48,
  },
  // VIVO
  {
    id: 77,
    name: "Vivo Y04",
    brand: "Vivo",
    category: "Phones",
    specs: "64GB/4GB RAM",
    price: 13600,
    image: VivoY04,
    reviews: 62,
  },
  {
    id: 78,
    name: "Vivo Y04",
    brand: "Vivo",
    category: "Phones",
    specs: "128GB/4GB RAM",
    price: 15300,
    image: VivoY04,
    reviews: 75,
  },
  {
    id: 79,
    name: "Vivo Y21D",
    brand: "Vivo",
    category: "Phones",
    specs: "128GB/4GB RAM",
    price: 18500,
    image: VivoY21D,
    reviews: 82,
  },
  {
    id: 80,
    name: "Vivo Y21D",
    brand: "Vivo",
    category: "Phones",
    specs: "128GB/6GB RAM",
    price: 20200,
    image: VivoY21D,
    reviews: 95,
  },
  {
    id: 81,
    name: "Vivo Y21D",
    brand: "Vivo",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 22900,
    image: VivoY21D,
    reviews: 108,
  },
  {
    id: 82,
    name: "Vivo Y31D",
    brand: "Vivo",
    category: "Phones",
    specs: "128GB/6GB RAM",
    price: 25500,
    image: VivoY31D,
    reviews: 118,
  },
  {
    id: 83,
    name: "Vivo Y31D",
    brand: "Vivo",
    category: "Phones",
    specs: "256GB/8GB RAM",
    price: 27900,
    image: VivoY31D,
    reviews: 132,
  },
  {
    id: 84,
    name: "Vivo V40 Lite",
    brand: "Vivo",
    category: "Phones",
    specs: "Advanced Device",
    price: 30700,
    image: VivoV40Lite,
    reviews: 140,
  },
  {
    id: 85,
    name: "Vivo V60 Lite",
    brand: "Vivo",
    category: "Phones",
    specs: "256GB/8GB 4G",
    price: 32500,
    image: VivoV60Lite,
    reviews: 148,
  },
  {
    id: 86,
    name: "Vivo V60 Lite",
    brand: "Vivo",
    category: "Phones",
    specs: "256GB/12GB 5G",
    price: 39000,
    image: VivoV60Lite,
    reviews: 158,
  },
  {
    id: 87,
    name: "Vivo V60",
    brand: "Vivo",
    category: "Phones",
    specs: "256GB/12GB RAM",
    price: 56000,
    image: VivoV60,
    reviews: 172,
  },
  {
    id: 88,
    name: "Vivo X300 Pro",
    brand: "Vivo",
    category: "Phones",
    specs: "Advanced Flagship",
    price: 147500,
    image: VivoX300Pro,
    reviews: 210,
  },
  // OTHER BRANDS
  {
    id: 89,
    name: "Villaon V20",
    brand: "Villaon",
    category: "Phones",
    specs: "Basic Device",
    price: 6500,
    image: VillaonV20,
    reviews: 25,
  },
  {
    id: 90,
    name: "Villaon V20 SE",
    brand: "Villaon",
    category: "Phones",
    specs: "Basic Device",
    price: 5500,
    image: VillaonV20SE,
    reviews: 18,
  },
  {
    id: 91,
    name: "Villaon V40",
    brand: "Villaon",
    category: "Phones",
    specs: "32GB Storage",
    price: 7000,
    image: VillaonV40,
    reviews: 30,
  },
  {
    id: 92,
    name: "Villaon V40s",
    brand: "Villaon",
    category: "Phones",
    specs: "32GB Storage",
    price: 8000,
    image: VillaonV40s,
    reviews: 35,
  },
  {
    id: 93,
    name: "Villaon V40s",
    brand: "Villaon",
    category: "Phones",
    specs: "64GB Storage",
    price: 8500,
    image: VillaonV40s,
    reviews: 42,
  },
  {
    id: 94,
    name: "Villaon V25",
    brand: "Villaon",
    category: "Phones",
    specs: "64GB/2GB RAM",
    price: 6200,
    image: VillaonV25,
    reviews: 28,
  },
  {
    id: 95,
    name: "Villaon V45",
    brand: "Villaon",
    category: "Phones",
    specs: "64GB/2GB RAM",
    price: 7300,
    image: VillaonV45,
    reviews: 32,
  },
  {
    id: 96,
    name: "Villaon V50s",
    brand: "Villaon",
    category: "Phones",
    specs: "64GB Storage",
    price: 9350,
    image: VillaonV50s,
    reviews: 38,
  },
  {
    id: 97,
    name: "Elimu-Tab ET04 Pro",
    brand: "Elimu-Tab",
    category: "Tablets",
    specs: "Educational Tablet",
    price: 9500,
    image: ElimuET04Pro,
    reviews: 55,
  },
  {
    id: 98,
    name: "Elimu-Tab ET05",
    brand: "Elimu-Tab",
    category: "Tablets",
    specs: "Educational Tablet",
    price: 8500,
    image: ElimuET05,
    reviews: 48,
  },
  {
    id: 99,
    name: "Bontel Landline T1000",
    brand: "Bontel",
    category: "Other",
    specs: "Landline Phone",
    price: 3800,
    image: BontelT1000,
    reviews: 22,
  },
];

const Shop = ({ addToCart }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterState, setFilterState] = useState({
    category: "All",
    priceRange: [0, 300000],
    search: "",
    brands: [],
    rating: 0,
  });
  const [addedToCart, setAddedToCart] = useState({});

  const applyFilters = useCallback((filters) => {
    let products = allProducts.filter((product) => {
      const searchMatch =
        !filters.search ||
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.specs.toLowerCase().includes(filters.search.toLowerCase());

      const categoryMatch =
        filters.category === "All" || product.category === filters.category;

      const priceMatch =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      // Brand filter: if no brands selected, show all; otherwise match selected brands
      const brandMatch =
        !filters.brands ||
        filters.brands.length === 0 ||
        filters.brands.includes(product.brand);

      // Rating filter was removed from the UI. Keep ratingMatch true so
      // filtering is performed only by search, category and price.
      const ratingMatch = true;

      return (
        searchMatch && categoryMatch && priceMatch && brandMatch && ratingMatch
      );
    });

    setFilteredProducts(products);
  }, []);

  useEffect(() => {
    applyFilters(filterState);
  }, [filterState, applyFilters]);

  const handleSearch = (term) => {
    setFilterState((prev) => ({
      ...prev,
      search: term,
    }));
  };

  const handleFilter = (filters) => {
    setFilterState(filters);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1b2a] via-[#0a0c10] to-[#000000] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Latest <span className="text-cyan-400">Gadgets</span>
          </h1>
          <p className="text-gray-400">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {/* Main Layout: Sidebar + Products */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDEBAR */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <SearchFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              products={allProducts}
            />
          </div>

          {/* RIGHT SIDE: PRODUCTS GRID */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-[#111827] rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-cyan-500/10"
                  >
                    {/* Image Container */}
                    <div className="relative h-64 bg-[#161b22] overflow-hidden flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                        {product.brand}
                      </p>

                      <h3 className="text-white font-bold text-sm mb-2 line-clamp-2 h-10">
                        {product.name}
                      </h3>

                      <p className="text-gray-400 text-xs mb-4">
                        {product.specs}
                      </p>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-white font-bold text-lg">
                          KSh {product.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`w-full font-bold py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                          addedToCart[product.id]
                            ? "bg-green-500 hover:bg-green-600 shadow-green-500/20"
                            : "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 shadow-cyan-500/20"
                        }`}
                      >
                        <ShoppingCart size={16} />
                        {addedToCart[product.id] ? "Added! ✓" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-[#111827] rounded-2xl border border-gray-800">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-400 text-xl mb-6">No products found</p>
                <p className="text-gray-500 text-sm mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => {
                    setFilterState({
                      category: "All",
                      priceRange: [0, 300000],
                      brands: [],
                      rating: 0,
                      search: "",
                    });
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold px-6 py-3 rounded-lg transition-all flex items-center gap-2"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
