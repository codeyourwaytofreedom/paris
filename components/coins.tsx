import { useEffect, useState } from "react";


type CoinData = {
    id: string;
    name: string;
    priceUsd: string;
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
<div>
    <h1>Coin no: {data_from_server.length}</h1>
    <ul>
    {data_from_server.map((item,i) => (
        <li key={i}>
        {item.name}: ${item.priceUsd}
        </li>
    ))}
    </ul>
</div>
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