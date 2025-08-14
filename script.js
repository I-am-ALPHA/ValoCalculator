// Skin price tiers (VP)
const TIERS = {
  "Select": 875,
  "Deluxe": 1275,
  "Premium": 1775,
  "Exclusive": 2175,
  "Ultra": 2475
};

// VP bundles (vp, price in USD)
const VP_BUNDLES = [
  { vp: 475, usd: 4.99 },
  { vp: 1000, usd: 9.99 },
  { vp: 2100, usd: 19.99 },
  { vp: 3850, usd: 34.99 },
  { vp: 5350, usd: 49.99 },
  { vp: 8000, usd: 69.99 },
  { vp: 11000, usd: 99.99 }
];

// Weapons list
const WEAPONS = {
  "Sidearms": ["Classic", "Shorty", "Frenzy", "Ghost", "Sheriff"],
  "SMGs": ["Stinger", "Spectre"],
  "Rifles": ["Bulldog", "Guardian", "Phantom", "Vandal"],
  "Sniper Rifles": ["Marshal", "Operator"],
  "Shotguns": ["Bucky", "Judge"],
  "Machine Guns": ["Ares", "Odin"],
  "Melee": ["Knife"]
};

function createWeaponList() {
  const container = document.getElementById("weapon-list");
  for (const [category, guns] of Object.entries(WEAPONS)) {
    const catDiv = document.createElement("div");
    catDiv.className = "weapon-category";
    const catTitle = document.createElement("h2");
    catTitle.textContent = category;
    catDiv.appendChild(catTitle);

    guns.forEach(gun => {
      const div = document.createElement("div");
      div.className = "weapon-item";

      const select = document.createElement("select");
      select.innerHTML = `<option value="0">No skin</option>` +
        Object.entries(TIERS).map(([tier, vp]) => `<option value="${vp}">${tier} (${vp} VP)</option>`).join("");

      const label = document.createElement("label");
      label.textContent = gun;

      div.appendChild(label);
      div.appendChild(select);
      catDiv.appendChild(div);
    });

    container.appendChild(catDiv);
  }
}

function calculateCheapestUSD(vpNeeded) {
  const dp = Array(vpNeeded + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 0; i <= vpNeeded; i++) {
    for (const { vp, usd } of VP_BUNDLES) {
      if (i + vp <= vpNeeded) {
        dp[i + vp] = Math.min(dp[i + vp], dp[i] + usd);
      }
    }
  }
  // find smallest >= vpNeeded
  let minCost = Infinity;
  for (let i = vpNeeded; i < dp.length; i++) {
    if (dp[i] < minCost) minCost = dp[i];
  }
  return minCost === Infinity ? "N/A" : `$${minCost.toFixed(2)}`;
}

document.getElementById("calculateBtn").addEventListener("click", () => {
  const selects = document.querySelectorAll(".weapon-item select");
  let totalVP = 0;
  selects.forEach(sel => totalVP += parseInt(sel.value));

  const bpCount = parseInt(document.getElementById("battlePasses").value) || 0;
  totalVP += bpCount * 1000;

  const estimatedUSD = calculateCheapestUSD(totalVP);

  document.getElementById("result").innerHTML = `
    <p><strong>Total VP:</strong> ${totalVP}</p>
    <p><strong>Estimated USD Spent:</strong> ${estimatedUSD}</p>
  `;
});

createWeaponList();
