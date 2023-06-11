import { ColorResolvable } from "discord.js"
import { Card, Legalities, Legality,  } from "scryfall-sdk"

export const getColorIdentity = (card: Card): ColorResolvable => {
  const colors = card.color_identity;

  // Gold Cards
  if (colors.length > 1) {
    return 0xcfb53b;
  }
  
  const color = colors[0];

  switch (color) {
    case "W": return 0xe6e7e8;
    case "U": return 0x55acee;
    case "B": return 0x31373d;
    case "R": return 0xdd2e44;
    case "G": return 0x78b159;
    default: return 0x646566;
  };
};

export const getLegalityString = (card: Card): string => {
  const mapLegality = (legality: "legal" | "not_legal" | "restricted" | "banned"): string => {  
    switch (legality) {
      case "not_legal": return "🔴";
      case "restricted": return "🟡";
      case "banned": return "❌";
      default: return "🟢";
    };
  }

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
}
