const fs = require("fs");
const readline = require("readline");

let series = [];

function exibirMenu() {
  console.log("=== MENU ===");
  console.log("1. Cadastrar série");
  console.log("2. Listar séries para assistir");
  console.log("3. Listar séries assistidas");
  console.log("4. Alterar estado de uma série");
  console.log("5. Remover série");
  console.log("0. Sair");
  console.log("==============");
}

function carregarDados() {
  try {
    const data = fs.readFileSync("series.json", "utf8");
    series = JSON.parse(data);
  } catch (err) {
    series = [];
  }
}

function salvarDados() {
  const data = JSON.stringify(series);
  fs.writeFileSync("series.json", data, "utf8");
}

function cadastrarSerie(nome, distribuidor, prioridade, estado) {
  const serie = {
    nome: nome,
    distribuidor: distribuidor,
    prioridade: prioridade,
    estado: estado
  };

  series.push(serie);
  salvarDados();
  console.log("Série cadastrada com sucesso!");
}

function listarSeriesAssistir() {
  const seriesAssistir = series.filter(serie => serie.estado === "assistir");
  listarSeries(seriesAssistir);
}

function listarSeriesAssistido() {
  const seriesAssistido = series.filter(serie => serie.estado === "assistido");
  listarSeries(seriesAssistido);
}

function listarSeries(series) {
  if (series.length === 0) {
    console.log("Não há séries para exibir.");
  } else {
    console.log("Listagem de Séries:");
    series.forEach(serie => {
      console.log(`Nome: ${serie.nome}`);
      console.log(`Distribuidor: ${serie.distribuidor}`);
      console.log(`Prioridade: ${serie.prioridade}`);
      console.log(`Estado: ${serie.estado}`);
      console.log("----------------------");
    });
  }
}

function alterarSerie(nome, novoEstado) {
  const serie = series.find(serie => serie.nome === nome);
  if (serie) {
    serie.estado = novoEstado;
    salvarDados();
    console.log("Estado da série alterado com sucesso!");
  } else {
    console.log("Série não encontrada.");
  }
}

function removerSerie(nome) {
  const index = series.findIndex(serie => serie.nome === nome);
  if (index !== -1) {
    series.splice(index, 1);
    salvarDados();
    console.log("Série removida com sucesso!");
  } else {
    console.log("Série não encontrada.");
  }
}


function iniciarPrograma() {
  exibirMenu();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Selecione uma opção do menu: ", opcao => {
    console.log(""); 

    switch (opcao) {
      case "1":
        rl.question("Digite o nome da série: ", nome => {
          rl.question("Plataforma onde assistir: ", distribuidor => {
            rl.question("Defina o nivel de prioridade: ", prioridade => {
              rl.question("Marcar como assistido ou assistir: ", estado => {
                cadastrarSerie(nome, distribuidor, parseInt(prioridade), estado);
                console.log(""); 
                iniciarPrograma();
              });
            });
          });
        });
        break;

      case "2":
        listarSeriesAssistir();
        console.log(""); 
        iniciarPrograma();
        break;

      case "3":
        listarSeriesAssistido();
        console.log(""); 
        iniciarPrograma();
        break;

      case "4":
        rl.question("Digite o nome da série que deseja alterar o estado: ", nome => {
          rl.question("assistir ou assistido: ", novoEstado => {
            alterarSerie(nome, novoEstado);
            console.log(""); 
            iniciarPrograma();
          });
        });
        break;

      case "5":
        rl.question("Digite o nome da série que deseja remover: ", nome => {
          removerSerie(nome);
          console.log(""); 
          iniciarPrograma();
        });
        break;

      case "0":
        console.log("Saindo...");
        rl.close();
        break;

      default:
        console.log("Opção inválida. Tente novamente.");
        console.log(""); 
        iniciarPrograma();
        break;
    }
  });
}


carregarDados();

iniciarPrograma();
