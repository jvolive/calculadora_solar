const cepInput = document.getElementById("cep");
const consumoInput = document.getElementById("consumo");
const tarifaInput = document.getElementById("tarifa");
const calcularButton = document.getElementById("calcular");

calcularButton.addEventListener("click", calcular);

cepInput.addEventListener("keyup", function () {
  const cep = cepInput.value.replace(/\D/g, "");
  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.erro) {
          const logradouro = data.logradouro;
          const bairro = data.bairro;
          const cidade = data.localidade;
          const uf = data.uf;
          document.getElementById("logradouro").value = logradouro;
          document.getElementById("bairro").value = bairro;
          document.getElementById("cidade").value = cidade;
          document.getElementById("uf").value = uf;
        }
      })
      .catch((error) => console.error(error));
  }
});

function calcular() {
  const consumo = consumoInput.value;
  const tarifa = tarifaInput.value;
  const producao = Math.ceil(consumo / 0.15);
  const economia = consumo * tarifa - producao * 0.81;
  const payback = Math.ceil(8100 / economia);
  document.getElementById(
    "producao"
  ).textContent = `Produção Necessária: ${producao} Wp`;
  document.getElementById(
    "economia"
  ).textContent = `Economia Mensal: R$ ${economia.toFixed(2)}`;
  document.getElementById("payback").textContent = `Payback: ${payback} meses`;
}
