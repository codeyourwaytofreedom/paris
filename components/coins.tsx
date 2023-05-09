import { useEffect, useState } from "react";
import c from "../styles/Coins.module.css";
import Image from 'next/image';
import paris from "../public/paris.png";

type CoinData = {
    id: string;
    name: string;
    priceUsd: string;
    changePercent24Hr:string
  };

const Coins = () => {
    const [data_from_server, setData] = useState<CoinData[]>([]);

    useEffect(() => {
        const eventSource = new EventSource('/api/coins');
        eventSource.onmessage = (event) => {
          const eventData = JSON.parse(event.data);
          setData(eventData)
        };
        return () => {
          eventSource.close();
        };
      }, []);

return (
<>
    <div className={c.theme}>
        <Image src={paris} alt={"paris"} />
    </div>
    <div className={c.coins}>
        <table>
            <thead>
                <tr>
                    <th>Coin</th>
                    <th>Price</th>
                    <th>Change</th>
                </tr>
                <tr>
                    <th>Coin</th>
                    <th>Price</th>
                    <th>Change</th>
                </tr>
                <tr>
                    <th>Coin</th>
                    <th>Price</th>
                    <th>Change</th>
                </tr>
                <tr>
                    <th>Coin</th>
                    <th>Price</th>
                    <th>Change</th>
                </tr>
            </thead>
            <tbody>
                {data_from_server.map((item,i) => (
                    <tr key={i}>
                        <td><abbr title={item.name}>{item.name.substring(0,9)}</abbr></td>
                        <td>${item.priceUsd.substring(0,7)}</td>
                        <td>{item.changePercent24Hr.substring(0,5)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
</>
);
}

export default Coins;




/* const index = data_from_server.findIndex(item => item.id === eventData.id);
if (index !== -1) {
  if (data_from_server[index].priceUsd !== eventData.priceUsd) {
    const newData = [...data_from_server];
    newData[index].priceUsd = eventData.priceUsd;
    setData(newData);
  }
} else {
  console.log("no need to update")
} */