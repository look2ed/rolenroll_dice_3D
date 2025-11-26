// dice3d.js
// Simple 3D dice using @3d-dice/dice-box via CDN.
// This is VISUAL ONLY – it does not change your R&R roll results.

import DiceBox from "https://unpkg.com/@3d-dice/dice-box@1.1.3/dist/dice-box.es.min.js";

let diceBox = null;
let diceBoxReady = false;

// Initialise the 3D box once
async function initDiceBox() {
  if (diceBoxReady && diceBox) return diceBox;

  diceBox = new DiceBox({
    // Use the div in your HTML:
    //   <div id="dice-box-3d" class="dice-3d-container"></div>
    container: "#dice-box-3d",

    // These two options are required when loading from the CDN
    assetPath: "assets/",
    origin: "https://unpkg.com/@3d-dice/dice-box@1.1.3/dist/",

    // Just some visual tweaks
    theme: "default",
    scale: 6,
    lightIntensity: 1,
    enableShadows: true
  });

  await diceBox.init();
  diceBoxReady = true;
  return diceBox;
}

// Global function used by dice.js
// Called as: window.roll3dDice(totalDice)
window.roll3dDice = async function (count) {
  try {
    const box = await initDiceBox();

    // clamp count a bit so it doesn't explode the scene
    const qty = Math.max(1, Math.min(30, Number(count) || 1));

    // Roll qty d6 – this is only for visual effect
    await box.roll(`${qty}d6`);
  } catch (err) {
    console.error("3D dice error:", err);
  }
};
