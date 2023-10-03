import React from "react";
import { PiShoppingBagOpenDuotone } from "react-icons/pi";
import { GiDelicatePerfume } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";
import CompactCard from "./CompactCard.jsx";
import { useSelector } from "react-redux";

const Cards = () => {
  

  const { totalOrders } = useSelector((state) => state.orders);
  const { totalProducts } = useSelector((state) => state.items);
  const { totalUser } = useSelector((state) => state.getUser);
  

  



  const CardsData = [
    {
      title: "Orders",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: totalOrders,
      value: totalOrders,
      png: PiShoppingBagOpenDuotone,
    },
    {
      title: "Products",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: 60,
      value: totalProducts,
      png: GiDelicatePerfume,
    },
    {
      title: "Users",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: totalUser,
      value: totalUser,
      png: FaUsers,
    },
  ];

  return (
    <div className="Cards">
      {CardsData.map((card, id) => (
        <div className="parentContainer" key={id}>
          <CompactCard
            title={card.title}
            color={card.color}
            barValue={card.barValue}
            Png={card.png}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
