// dice3d.js
// Simple 3D dice using @3d-dice/dice-box via CDN.
// VISUAL ONLY – does not affect your Role&Roll logic.

import DiceBox from "https://unpkg.com/@3d-dice/dice-box@1.1.3/dist/dice-box.es.min.js";

let diceBox = null;
let initPromise = null;

// Initialise the dice box once and reuse it
async function ensureDiceBox() {
  if (!diceBox) {
    diceBox = new DiceBox({
      container: "#dice-box-3d",          // <div id="dice-box-3d">
      assetPath: "assets/",              // used together with origin (CDN)
      origin: "https://unpkg.com/@3d-dice/dice-box@1.1.3/dist/",
      theme: "default",
      themeColor: "#2e8555",
      offscreen: true,
      scale: 6
    });

    initPromise = diceBox.init();
  }

  // wait until the assets are ready
  await initPromise;
  return diceBox;
}

// Called from dice.js: window.roll3dDice(totalDice)
window.roll3dDice = async function (count) {
  try {
    const box = await ensureDiceBox();

    const qty = Math.max(1, Math.min(30, Number(count) || 1));

    // Optional: clear old dice each roll
    await box.clear();
    await box.roll(`${qty}d6`);   // visual only, plain d6
  } catch (err) {
    console.error("3D dice error:", err);
  }
};
