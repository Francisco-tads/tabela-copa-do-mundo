console.log('Tabela da Copa')

let tabelaJogos = document.querySelector('.tabelaJogos')
// console.log(tabelaJogos)

// Ler o arquivo json
fetch('jogos-fase1.json')
  .then(response => response.json())
  .then(data => data.forEach(jogo => {
    // console.log(data)

    // criar um linha de tabela, colocar ela na tabela
    let linha = document.createElement('tr')
    tabelaJogos.appendChild(linha)

    // preencher os dados do jogo em cada linha de tabela
    linha.innerHTML = `
            <td>${jogo.diaSemana}</td>
            <td>${jogo.data}</td>
            <td>${jogo.hora}</td>
            <td>${jogo.grupo}</td>
            <td class='centralizar'>
                <img class='imagemp' src='./images/bandeiras/${jogo.mandante}' alt='' /
                >
                <span class='gols'>${jogo.gols_mandante}</span>

                <span class='partida'>${jogo.partida}</span>

                <span class='gols'>${jogo.gols_visitante}</span>

                <img class='imagemp' src='./images/bandeiras/${jogo.visitante}' alt='' /
                >
            </td>
            <td class='esquerda'>${jogo.estadio}</td>     
      `
  })
  )

let tabelaClassificacao = document.querySelector('.tabelaClassificacao')
// console.log(tabelaClassificacao)
let linhas = document.querySelectorAll('.corpoClassificaçao tr')
console.log(linhas)

exibirTabelaClasificacao('G')

function exibirTabelaClasificacao(letraGrupo) {
  // Atualizar letra do grupo no index.html
  document.querySelector('.letra').innerHTML = letraGrupo


  // Ler json das classificações
  fetch(`classificacaoGrupo${letraGrupo}.json`)
    .then(resposta => resposta.json())
    .then(dados => {
      // Ordenar os dados do array
      dados.sort(function compararNumeros(a, b) {
        return a.posicao - b.posicao
      })

      dados.forEach((selecao, indice) => {
        // console.log(dados)
        // console.log(selecao)

        // criar linha tr
        // let linha = document.createElement('tr')

        // colocar ela como filho dentro da tabela
        // tabelaClassificacao.appendChild(linha)

        // preencher os dados
        linhas[indice].innerHTML = `
          <td>${selecao.posicao}</td>
          <td>${selecao.selecao}</td>
          <td>${selecao.pontos}</td>
          <td>${selecao.jogos}</td>
          <td>${selecao.vitorias}</td>
          <td>${selecao.empates}</td>
          <td>${selecao.derrotas}</td>
          <td>${selecao.gols_pro}</td>
          <td>${selecao.gols_contra}</td>       
          <td>${selecao.saldo_de_gols}</td> 
        `

      })
    }
    )
}

// exibirTabelaClasificacao('F')

// Controlar a escolha da letra do grupo para exibir na tabela de classificação
let selectLetra = document.querySelector('.letrasDosGrupos')
console.log(selectLetra)

// Usar um escutador de eventos para nossa cx select
selectLetra.addEventListener('change', (event) => {
  // console.log('mudou')
  //  console.log(event.target.value)
  exibirTabelaClasificacao(event.target.value)
})

// Oitavas de Final
let divOitavas = document.querySelector('.divOitavas')
console.log(divOitavas)

fetch('oitavas-de-final.json')
  .then(resposta => resposta.json())
  .then(dados => {
    console.log(dados)

    dados.forEach(jogo => {
      // criar uma nova divisoria
      let divisoria = document.createElement('div')

      // colocar ela como filho de divOitavas
      divOitavas.appendChild(divisoria)

      // preencher os dados de cada jogo
      divisoria.innerHTML = `
         <h3 class='jogo'>Oitavas ${jogo.id}</h3>
         <h4>
         <span class='dia'>${jogo.diaSemana}</span>
         ${jogo.data}
         <span class='hora'>${jogo.hora}</span>         
         </h4>         
         <h4 class='centralizar jogo'>
           <img class='imagemp' src='./images/bandeiras/${jogo.img_mandante}' />
           <span class='gols'>${jogo.gols_mandante}</span> 
         ${jogo.partida}
         <span class='gols'>${jogo.gols_visitante}</span>
          <img class='imagemp' src='./images/bandeiras/${jogo.img_visitante}' />
         </h4>
         <h5>${jogo.estadio}</h5>

       `

    })
  })