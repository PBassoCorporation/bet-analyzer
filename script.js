function fatorial(n) {
  if (n === 0) return 1;
  return n * fatorial(n - 1);
}

function poisson(k, lambda) {
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / fatorial(k);
}

function salvarHistorico(prob, ev, sinal) {

  let historico = JSON.parse(localStorage.getItem("historico")) || [];

  historico.push({
    data: new Date().toLocaleString(),
    prob: prob,
    ev: ev,
    sinal: sinal
  });

  localStorage.setItem("historico", JSON.stringify(historico));
}

function mostrarHistorico() {
  let historico = JSON.parse(localStorage.getItem("historico")) || [];

  let html = "";

  historico.slice(-5).reverse().forEach(item => {
    html += `<p>${item.data} | ${(item.prob*100).toFixed(0)}% | ${item.sinal}</p>`;
  });

  document.getElementById("historico").innerHTML = html;
}

function calcular() {

  let atkHome = parseFloat(document.getElementById("atkHome").value);
  let defAway = parseFloat(document.getElementById("defAway").value);
  let atkAway = parseFloat(document.getElementById("atkAway").value);
  let defHome = parseFloat(document.getElementById("defHome").value);
  let odd = parseFloat(document.getElementById("odd").value);

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
}

mostrarHistorico();