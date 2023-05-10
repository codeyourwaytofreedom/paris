type CoinData = {
    id: string;
    name: string;
    priceUsd: string;
    changePercent24Hr:string
};


export const compare_by_name = (direction: 'asc' | 'desc') => (a: any, b: any) => {
    if (direction === 'asc') {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    } else {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    }
  };
  

  export const compare_price = <T>(key: keyof T, direction: 'asc' | 'desc') => (a: T, b: T) => {
    const valueA = Number(a[key]);
    const valueB = Number(b[key]);
    if (direction === 'asc') {
      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    } else {
      if (valueA > valueB) {
        return -1;
      }
      if (valueA < valueB) {
        return 1;
      }
      return 0;
    }
  };