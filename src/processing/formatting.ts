import { ColorResolvable } from "discord.js";
import { Card, CardFace } from "scryfall-sdk";

export const getColorIdentity = (card: Card): ColorResolvable => {
  const colors = card.color_identity;

  // Gold Cards
  if (colors.length > 1) {
    return 0xcfb53b;
  }

  const color = colors[0];

  switch (color) {
    case "W":
      return 0xe6e7e8;
    case "U":
      return 0x55acee;
    case "B":
      return 0x31373d;
    case "R":
      return 0xdd2e44;
    case "G":
      return 0x78b159;
    default:
      return 0x646566;
  }
};

export const getLegalityString = (card: Card): string => {
  const mapLegality = (
    legality: "legal" | "not_legal" | "restricted" | "banned"
  ): string => {
    switch (legality) {
      case "not_legal":
        return "🔴";
      case "restricted":
        return "🟡";
      case "banned":
        return "❌";
      default:
        return "🟢";
    }
  };

  const legalities = card.legalities;

  // TODO: Implement loading these from .env or some config
  return `
    Standard: ${mapLegality(legalities.standard)}
    Pioneer: ${mapLegality(legalities.pioneer)}
    Modern: ${mapLegality(legalities.modern)}
    Legacy: ${mapLegality(legalities.legacy)}
    Vintage: ${mapLegality(legalities.vintage)}
    Pauper: ${mapLegality(legalities.pauper)}
    Commander: ${mapLegality(legalities.commander)}
  `;
};

export const getFormattedManaCost = (card: Card): string => {
  if (card.mana_cost) {
    return insertEmojiis(card.mana_cost);
  }
  return "";
};

export const getFormattedDescription = (card: Card): string => {
  const getFormattedText = (card: Card | CardFace): string => {
    if (card.getText()) {
      return `${card.getText()}`;
    }
    return "";
  };

  const getFormattedFlavor = (card: Card | CardFace): string => {
    if (card.flavor_text) {
      return `\n\n*${card.flavor_text}*`;
    }
    return "";
  };

  const getSingleFacedDescription = (card: Card): string => {
    return `${getFormattedText(card)}${getFormattedFlavor(card)}`;
  };

  const getDoubleFacedDescription = (card: Card): string => {
    const [first, second] = card.card_faces;

    const firstDescription = `${getFormattedText(first)}${getFormattedFlavor(
      first
    )}`;
    const secondDescription = `${getFormattedText(second)}${getFormattedFlavor(
      second
    )}`;

    return insertEmojiis(
      `${firstDescription}\n\n-----\n\n${secondDescription}`
    );
  };

  switch (card.layout) {
    case "double_faced_token":
    case "double_sided":
    case "flip":
    case "modal_dfc":
    case "split":
    case "transform":
      return insertEmojiis(getDoubleFacedDescription(card));
    default:
      return insertEmojiis(getSingleFacedDescription(card));
  }
};

export const insertEmojiis = (val: string): string => {
  const emojiiMap = new Map([
    // Basic Symbols
    ["{W}", "<:manaw:1283952943976157246>"],
    ["{U}", "<:manau:1283952604899966997>"],
    ["{B}", "<:manab:1283950410398302291>"],
    ["{R}", "<:manar:1283951642219253810>"],
    ["{G}", "<:manag:1283951262605381674>"],
    ["{C}", "<:manac:1283950754645807135>"],
    // Numbers
    ["{0}", "<:mana0:1283948192890753066>"],
    ["{½}", "<:manahalf:1283954217811312743>"],
    ["{1}", "<:mana1:1283948242706497547>"],
    ["{2}", "<:mana2:1283948784258256967>"],
    ["{3}", "<:mana3:1283949253823037511>"],
    ["{4}", "<:mana4:1283949281912291389>"],
    ["{5}", "<:mana5:1283949319300321393>"],
    ["{6}", "<:mana6:1283949391505395806>"],
    ["{7}", "<:mana7:1283949456575827999>"],
    ["{8}", "<:mana8:1283949513509175371>"],
    ["{9}", "<:mana9:1283949652000903179>"],
    ["{10}", "<:mana10:1283949686146728037>"],
    ["{11}", "<:mana11:1283949717440565299>"],
    ["{12}", "<:mana12:1283949783760769108>"],
    ["{13}", "<:mana13:1283949840128016396>"],
    ["{14}", "<:mana14:1283949880716431382>"],
    ["{15}", "<:mana15:1283950098992205845>"],
    ["{16}", "<:mana16:1283950143493640254>"],
    ["{20}", "<:mana20:1283950174028431482>"],
    ["{100}", "<:mana100a:1283953922259685499><:mana100b:1283953944699338862>"],
    [
      "{1000000}",
      "<:mana1000000a:1283953971639226448><:mana1000000b:1283953997354631210><:mana1000000c:1283954022352420924><:mana1000000d:1283954053361176708>",
    ],
    ["{∞}", "<:manainfinity:1283954297062821888>"],
    // Phyrexian Mana
    ["{W/P}", "<:manawp:1283953080404152370>"],
    ["{U/P}", "<:manaup:1283952761653825586>"],
    ["{B/P}", "<:manabp:1283950627369521263>"],
    ["{R/P}", "<:manarp:1283951754144387244>"],
    ["{G/P}", "<:managp:1283951294217982044>"],
    ["{C/P}", "<:manacp:1283954088442200076>"],
    ["{H}", "<:manah:1283954171552337931>"],
    // Colorless/Colored
    ["{C/W}", "<:manacw:1283951112218607617>"],
    ["{C/U}", "<:manacu:1283951062663037018>"],
    ["{C/B}", "<:manacb:1283950815949754442>"],
    ["{C/R}", "<:manacr:1283951011869757552>"],
    ["{C/G}", "<:manacg:1283950849562771457>"],
    // Hybrid Generic/Colored
    ["{2/W}", "<:mana2w:1283949029058809898>"],
    ["{2/U}", "<:mana2u:1283948966140051596>"],
    ["{2/B}", "<:mana2b:1283948863144591391>"],
    ["{2/R}", "<:mana2r:1283948924650127400>"],
    ["{2/G}", "<:mana2g:1283948897588477962>"],
    // Allied Colors
    ["{W/U}", "<:manawu:1283953166479659008>"],
    ["{W/U/P}", "<:manawup:1283953320708280330>"],
    ["{U/B}", "<:manaub:1283952642258767944>"],
    ["{U/B/P}", "<:manaubp:1283952686823112786>"],
    ["{B/R}", "<:manabr:1283950665743204413>"],
    ["{B/R/P}", "<:manabrp:1283950704133668927>"],
    ["{R/G}", "<:manarg:1283951670908158002>"],
    ["{R/G/P}", "<:manargp:1283951706278854749>"],
    ["{G/W}", "<:managw:1283951435779670047>"],
    ["{G/W/P}", "<:managwp:1283951467434217554>"],
    // Enemy Colors
    ["{W/B}", "<:manawb:1283952985990365246>"],
    ["{W/B/P}", "<:manawbp:1283953036695175178>"],
    ["{B/G}", "<:manabg:1283950494657806346>"],
    ["{B/G/P}", "<:manabgp:1283950553256300586>"],
    ["{G/U}", "<:managu:1283951350732034128>"],
    ["{G/U/P}", "<:managup:1283951397187878922>"],
    ["{U/R}", "<:manaur:1283952890238734336>"],
    ["{U/R/P}", "<:manaurp:1283952910589362198>"],
    ["{R/W}", "<:manarw:1283952143065419879>"],
    ["{R/W/P}", "<:manarwp:1283952174153470044>"],
    // Other Symbols/Mana
    ["{S}", "<:manas:1283952250825347123>"],
    ["{L}", "<:manal:1283954327186051162>"],
    ["{D}", "<:manad:1283954138035781755>"],
    ["{X}", "<:manax:1283953349712023604>"],
    ["{Y}", "<:manay:1283954348967333899>"],
    ["{Z}", "<:manaz:1283954377442197665>"],
    ["{T}", "<:manat:1283952315728134155>"],
    ["{Q}", "<:manaq:1283951612447948890>"],
    ["{E}", "<:manae:1283951208603844669>"],
    ["{P}", "<:manap:1283951505312976979>"],
    ["{PW}", "<:manapw:1283951548627554415>"],
    ["{CHAOS}", "<:manachaos:1283950886233702400>"],
    ["{A}", "<:manaa:1283950211726704722>"],
    ["{TK}", "<:manatk:1283952562621382668>"],
    ["{HW}", "<:manahw:1283954264754098228>"],
    ["{HR}", "<:manahr:1283954244503867433>"],
  ]);

  return val.replace(/{(.*?)}/g, (str) => emojiiMap.get(str) || str);
};

export const formatPrices = (card: Card): string => {
  const prices = card.prices;

  const nonfoil = prices.usd ? `${prices.usd} USD` : "N/A";
  const foil = prices.usd_foil ? `${prices.usd_foil} USD` : "N/A";

  const priceString = `Nonfoil: ${nonfoil}\nFoil: ${foil}`;

  return priceString;
};
