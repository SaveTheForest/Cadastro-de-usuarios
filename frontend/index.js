async function get() {
  // Definir a URL da API
  const apiUrl = "http://localhost:8800/";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const lista = document.getElementById("lista-tarefas");

      for (const usuario of data) {
        const item = document.createElement("li");
        const nome = document.createElement("span");
        const email = document.createElement("span");
        const telefone = document.createElement("span");
        const dataNascimento = document.createElement("span");

        const dataStr = usuario.data_nascimento;

        // Cria um objeto Date a partir da string
        const data = new Date(dataStr);

        // Extrai os componentes da data
        const dia = data.getDate().toString().padStart(2, "0");
        const mes = (data.getMonth() + 1).toString().padStart(2, "0");
        const ano = data.getFullYear();

        // Formata a data como 'dd-mm-yyyy'
        const dataFormatada = `${dia}-${mes}-${ano}`;

        nome.innerText = usuario.nome;
        email.innerText = usuario.email;
        telefone.innerText = usuario.fone;
        dataNascimento.innerText = dataFormatada;

        nome.classList.add("label");
        email.classList.add("label");
        telefone.classList.add("label");
        dataNascimento.classList.add("label");

        item.appendChild(nome);
        item.appendChild(document.createElement("br"));
        item.appendChild(email);
        item.appendChild(document.createElement("br"));
        item.appendChild(telefone);
        item.appendChild(document.createElement("br"));
        item.appendChild(dataNascimento);

        lista.appendChild(item);
      }
    });
}
document.addEventListener("DOMContentLoaded", get);

function create() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const data_nascimento = document.getElementById("data_nascimento").value;
  console.log(nome, email, telefone, data_nascimento);

  fetch("http://localhost:8800", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: nome,
      email: email,
      fone: telefone,
      data_nascimento: data_nascimento,
    }),
  })
    .then((response) => response.json())
    .then((data) => toast.success(data))
    .catch((error) => toast.error(error.message));

  get();
}

