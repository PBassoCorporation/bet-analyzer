function fatorial(n) {
  if (n === 0) return 1;
  return n * fatorial(n - 1);
}

function poisson(k, lambda) {
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / fatorial(k);
}

function salvarHistorico(prob, ev, sinal) {

  let resultadoAposta = document.getElementById("resultadoAposta").value;

  let historico = JSON.parse(localStorage.getItem("historico")) || [];

  historico.push({
    data: new Date().toLocaleString(),
    prob: prob,
    ev: ev,
    sinal: sinal,
    resultado: resultadoAposta
  });

  localStorage.setItem("historico", JSON.stringify(historico));
}

function mostrarHistorico() {
  let historico = JSON.parse(localStorage.getItem("historico")) || [];

  let html = "";

  historico.slice(-10).reverse().forEach(item => {
    html += `<p>${item.data} | ${(item.prob*100).toFixed(0)}% | ${item.sinal} | ${item.resultado || "-"}</p>`;
  });

  document.getElementById("historico").innerHTML = html;
}

function atualizarDashboard() {

  let historico = JSON.parse(localStorage.getItem("historico")) || [];

  let banca = 0;
  let wins = 0;
  let losses = 0;

  historico.forEach(item => {
    if (item.resultado === "win") {
      banca += 1;
      wins++;
    } else if (item.resultado === "loss") {
      banca -= 1;
      losses++;
    }
  });

  document.getElementById("dashboard").innerHTML =
    `Lucro: ${banca} unidades<br>
     Greens: ${wins}<br>
     Reds: ${losses}`;
}

function limparCampos() {

  document.getElementById("atkHome").value = "";
  document.getElementById("defAway").value = "";
  document.getElementById("atkAway").value = "";
  document.getElementById("defHome").value = "";
  document.getElementById("odd").value = "";
  document.getElementById("resultadoAposta").value = "";

  document.getElementById("resultado").innerHTML = "";
}

function limparHistorico() {
  localStorage.removeItem("historico");
  mostrarHistorico();
  atualizarDashboard();
}

function calcular() {

  let atkHome = parseFloat(document.getElementById("atkHome").value);
  let defAway = parseFloat(document.getElementById("defAway").value);
  let atkAway = parseFloat(document.getElementById("atkAway").value);
  let defHome = parseFloat(document.getElementById("defHome").value);
  let odd = parseFloat(document.getElementById("odd").value);

  if (isNaN(atkHome) || isNaN(defAway) || isNaN(atkAway) || isNaN(defHome) || isNaN(odd)) {
    alert("Preencha todos os campos!");
    return;
  }

  let lambdaHome = (atkHome + defAway) / 2;
  let lambdaAway = (atkAway + defHome) / 2;

  let probOver = 0;

  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {

      let probCasa = poisson(i, lambdaHome);
      let probFora = poisson(j, lambdaAway);

      if ((i + j) >= 3) {
        probOver += probCasa * probFora;
      }
    }
  }

  let ev = (probOver * odd) - 1;

  let sinal;

  if (ev > 0.10) sinal = "🔥 ENTRAR FORTE";
  else if (ev > 0) sinal = "⚠️ ENTRAR LEVE";
  else sinal = "❌ NÃO ENTRAR";

  document.getElementById("resultado").innerHTML =
    `Prob Over 2.5: ${(probOver*100).toFixed(1)}%<br>
     EV: ${ev.toFixed(2)}<br>
     <strong>${sinal}</strong>`;

  salvarHistorico(probOver, ev, sinal);
  mostrarHistorico();
  atualizarDashboard();
}

window.onload = function() {
  mostrarHistorico();
  atualizarDashboard();
};