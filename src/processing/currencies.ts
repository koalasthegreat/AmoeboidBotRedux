import { Convert } from "easy-currencies";

class CachedCurrencyConverter {
  converter: any;
  lastUpdated: Date;
  constructor(converter: any) {
    this.converter = converter;
    this.lastUpdated = new Date();
  }
}

let cachedCurrencyConverter: CachedCurrencyConverter;

export const convertToCad = async (usdPrice : string) : Promise<string> => {
    updateCurrencyConverter();
    let usdNumber : number = +usdPrice;
    return await cachedCurrencyConverter.converter.amount(usdNumber).to("CAD");
}

async function updateCurrencyConverter() {
    if (cachedCurrencyConverter == null) {
        cachedCurrencyConverter = new CachedCurrencyConverter(await Convert().from("USD").fetch());
    }
    else {
        let currentDate = new Date();
        let hoursElapsed = Math.floor(
            Math.abs(
                currentDate.getTime() - cachedCurrencyConverter.lastUpdated.getTime()
            ) /
            (1000 * 3600)
        );
        if (hoursElapsed >= 12) {
            await cachedCurrencyConverter.converter.from("USD").fetch();
        }
    }
}
