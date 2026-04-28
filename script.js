function calcular() {

  let atkHome = parseFloat(document.getElementById("atkHome").value);
  let defAway = parseFloat(document.getElementById("defAway").value);
  let atkAway = parseFloat(document.getElementById("atkAway").value);
  let defHome = parseFloat(document.getElementById("defHome").value);
  let odd = parseFloat(document.getElementById("odd").value);

  let xG = (atkHome + defAway + atkAway + defHome) / 2;

  let prob;

  if (xG > 3) prob = 0.70;
  else if (xG > 2.5) prob = 0.60;
  else prob = 0.45;

  let ev = (prob * odd) - 1;

  let sinal;

  if (ev > 0.10) sinal = "✅ ENTRAR";
  else if (ev > 0) sinal = "⚠️ RISCO";
  else sinal = "❌ NÃO ENTRAR";

  document.getElementById("resultado").innerHTML =
    `xG: ${xG.toFixed(2)}<br>
     Probabilidade: ${(prob*100).toFixed(0)}%<br>
     EV: ${ev.toFixed(2)}<br>
     <strong>${sinal}</strong>`;
}