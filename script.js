// 🔥 POISSON (OVER)
function fatorial(n) {
  if (n === 0) return 1;
  return n * fatorial(n - 1);
}

function poisson(k, lambda) {
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / fatorial(k);
}

// =========================
// ⚽ OVER 2.5
// =========================
function calcularOver() {

  let atkHome = parseFloat(document.getElementById("atkHome").value);
  let defAway = parseFloat(document.getElementById("defAway").value);
  let atkAway = parseFloat(document.getElementById("atkAway").value);
  let defHome = parseFloat(document.getElementById("defHome").value);
  let odd = parseFloat(document.getElementById("oddOver").value);

  let lambdaHome = (atkHome + defAway) / 2;
  let lambdaAway = (atkAway + defHome) / 2;

  let prob = 0;

  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      if ((i + j) >= 3) {
        prob += poisson(i, lambdaHome) * poisson(j, lambdaAway);
      }
    }
  }

  let ev = (prob * odd) - 1;

  let sinal = ev > 0 ? "✅ ENTRAR" : "❌ NÃO ENTRAR";

  document.getElementById("resultadoOver").innerHTML =
    `Prob: ${(prob*100).toFixed(1)}% | EV: ${ev.toFixed(2)} | ${sinal}`;
}

// =========================
// 🤝 BTTS
// =========================
function calcularBTTS() {

  let home = parseFloat(document.getElementById("bttsHome").value);
  let away = parseFloat(document.getElementById("bttsAway").value);
  let odd = parseFloat(document.getElementById("oddBtts").value);

  let prob = home * away;

  let ev = (prob * odd) - 1;

  let sinal = ev > 0 ? "✅ ENTRAR" : "❌ NÃO ENTRAR";

  document.getElementById("resultadoBTTS").innerHTML =
    `Prob: ${(prob*100).toFixed(1)}% | EV: ${ev.toFixed(2)} | ${sinal}`;
}

// =========================
// 🚩 ESCANTEIOS
// =========================
function calcularCorners() {

  let home = parseFloat(document.getElementById("cornersHome").value);
  let away = parseFloat(document.getElementById("cornersAway").value);
  let odd = parseFloat(document.getElementById("oddCorners").value);

  let mediaTotal = home + away;

  let prob;

  if (mediaTotal > 11) prob = 0.70;
  else if (mediaTotal > 10) prob = 0.60;
  else prob = 0.45;

  let ev = (prob * odd) - 1;

  let sinal = ev > 0 ? "✅ ENTRAR" : "❌ NÃO ENTRAR";

  document.getElementById("resultadoCorners").innerHTML =
    `Média: ${mediaTotal} | EV: ${ev.toFixed(2)} | ${sinal}`;
}