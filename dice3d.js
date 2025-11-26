// dice3d.js — sync 3D dice for Role&Roll
import DiceBox from "https://unpkg.com/@3d-dice/[email protected]/dist/dice-box.es.min.js";

const diceBox = new DiceBox({
  assetPath: "https://unpkg.com/@3d-dice/[email protected]/assets/",
  origin: "https://unpkg.com/@3d-dice/[email protected]/dist/",
  container: "#dice-box-3d",
  theme: "default",
  scale: 6
});

async function initDiceBox() {
  if (!initDiceBox._initialized) {
    await diceBox.init();
    initDiceBox._initialized = true;
  }
}
initDiceBox._initialized = false;

// Roll and return numeric d6 values that correspond to the animation
window.roll3dDiceSync = async function (count) {
  try {
    await initDiceBox();

    const notation = `${count}d6`;
    const rollGroups = await diceBox.roll(notation);

    const values = [];
    for (const group of rollGroups) {
      if (!group.rolls) continue;
      for (const die of group.rolls) {
        if (typeof die.value === "number") values.push(die.value);
      }
    }
    return values;
  } catch (err) {
    console.error("3D dice error:", err);
    return [];
  }
};
