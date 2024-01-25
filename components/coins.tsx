import { useEffect, useState } from "react";
import c from "../styles/Coins.module.css";
import Image from 'next/image';
import paris_gold from "../public/paris.png";
import paris_green from "../public/paris_green.png";
import paris_purple from "../public/paris_purple.png";
import paris_red from "../public/paris_red.png";

import {compare_by_name,compare_price} from "./sort";

type CoinData = {
    id: string;
    name: string;
    priceUsd: string;
    changePercent24Hr:string
};

type superlatives = {
    highest_price:CoinData,
    lowest_price:CoinData,
    sharpest_rise:CoinData,
    sharpest_fall:CoinData,
}

const Coins = () => {
    const [data_from_server, setData] = useState<CoinData[]>([]);
    const [superlatives, setSuperlatives] = useState<superlatives>();

    useEffect(() => {
        const eventSource = new EventSource('/api/coins');
        eventSource.onmessage = (event) => {
          const eventData = JSON.parse(event.data);
          setData(eventData);
          const highest_price = eventData.sort(compare_price<CoinData>('priceUsd', 'desc'))[0]
          const lowest_price = eventData.sort(compare_price<CoinData>('priceUsd', 'asc'))[0]

          const sharpest_rise = eventData.sort(compare_price<CoinData>('changePercent24Hr', 'desc'))[0]
          const sharpest_fall = eventData.sort(compare_price<CoinData>('changePercent24Hr', 'asc'))[0]

          setSuperlatives({
              highest_price:highest_price,
              lowest_price:lowest_price,
              sharpest_rise:sharpest_rise,
              sharpest_fall:sharpest_fall,
          })
        };
        return () => {
          eventSource.close();
        };
      }, []);


return (
<>
    <div className={c.theme}>
        <Image id={c.gold} src={paris_gold} alt={"paris"} priority />
        <Image id={c.green} src={paris_green} alt={"paris"} priority />
        <Image id={c.purple} src={paris_purple} alt={"paris"} priority />
        <Image id={c.red} src={paris_red} alt={"paris"} priority />
        <div className={c.theme_line}>
            <div id={c.left} className={c.theme_line_cells}>
                <div className={c.theme_line_cells_each}>
                    <h3>Le prix le plus haut--</h3>
                    {
                        superlatives && 
                        <>
                        <div className={c.theme_line_cells_each_detail}>
                            <span>{superlatives && superlatives.highest_price.name.substring(0,8)}: </span>
                            <span>${superlatives && superlatives.highest_price.priceUsd.substring(0,8)}</span>
                        </div>

                        </> 
                    }
                </div>

                <div className={c.theme_line_cells_each}>
                    <h3>Le prix le plus bas</h3>
                    {
                        superlatives && 
                        <>
                        <div className={c.theme_line_cells_each_detail}>
                            <span>{superlatives && superlatives.lowest_price.name.substring(0,8)}: </span>
                            <span>${superlatives && superlatives.lowest_price.priceUsd.substring(0,8)}</span>
                        </div>

                        </> 
                    }
                </div>
            </div>
            <div id={c.right} className={c.theme_line_cells}>
                <div className={c.theme_line_cells_each}>
                    <h3>La plus forte hausse</h3>
                    {
                        superlatives && 
                        <>
                        <div className={c.theme_line_cells_each_detail}>
                            <span>{superlatives && superlatives.sharpest_rise.name.substring(0,8)}: </span>
                            <span>{superlatives && superlatives.sharpest_rise.changePercent24Hr.substring(0,4)}%</span>
                        </div>
                        </> 
                    }
                </div>
                <div className={c.theme_line_cells_each}>
                    <h3>La plus forte baisse</h3>
                    {
                        superlatives && 
                        <>
                        <div className={c.theme_line_cells_each_detail}>
                            <span>{superlatives && superlatives.sharpest_fall.name.substring(0,8)}: </span>
                            <span>{superlatives && superlatives.sharpest_fall.changePercent24Hr.substring(0,5)}%</span>
                        </div>
                        </> 
                    }
                </div>
            </div>
        </div>
    </div>

    <div className={c.coins}>
        <table>
            <thead>
                <tr>
                    <th>Pièce</th>
                    <th>Valeur</th>
                    <th>Variation</th>
                </tr>
                <tr id={c.two}>
                    <th>Pièce</th>
                    <th>Valeur</th>
                    <th>Variation</th>
                </tr>
                <tr id={c.three}>
                    <th>Pièce</th>
                    <th>Valeur</th>
                    <th>Variation</th>
                </tr>
                <tr id={c.four}>
                    <th>Pièce</th>
                    <th>Valeur</th>
                    <th>Variation</th>
                </tr>
            </thead>
            <tbody>
                {data_from_server.sort(compare_by_name("asc")).slice(0,100).map((item,i) => (
                    <tr key={i}>
                        <td><abbr title={item.name}>{item.name.substring(0,7)}</abbr></td>
                        <td>${item.priceUsd.substring(0,8)}</td>
                        <td>{item.changePercent24Hr.substring(0,5)}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</>
);
}

export default Coins;