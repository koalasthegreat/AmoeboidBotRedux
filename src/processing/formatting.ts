import { ColorResolvable } from "discord.js"
import { Card, CardFace } from "scryfall-sdk"

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

    const firstDescription = `${getFormattedText(first)}${getFormattedFlavor(first)}`;
    const secondDescription = `${getFormattedText(second)}${getFormattedFlavor(second)}`;

    return `${firstDescription}\n\n-----\n\n${secondDescription}`;
  };

  switch(card.layout) {
    case "double_faced_token":
    case "double_sided":
    case "flip":
    case "modal_dfc":
    case "split":
    case "transform": return getDoubleFacedDescription(card);
    default: return getSingleFacedDescription(card);
  }
};
