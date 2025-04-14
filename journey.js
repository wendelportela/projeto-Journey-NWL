
const formatador = (data) => {
  
  return {

    dia: {
      numerico: dayjs(data).format('DD'),
      semana: {
        curto: dayjs(data).format('ddd'),
        longo: dayjs(data).format('dddd'),
      }
    },
    mes: dayjs(data).format('MMMM'),
    hora: dayjs(data).format('HH:mm')
  }
  
} 

formatador(new Date('2024-04-01'));

const atividade = {
  nome: "almoço",
  data: new Date("2024-07-08 10:00"),
  finalizada: true
}


let  atividades = [
  atividade,  {
  nome: "academia em grupo",
  data: new Date("2024-07-09 09:00"),
  finalizada: false
  }, 
  {
  nome: "gaming session",
  data: new Date("2024-07-09 16:00"),
  finalizada: false
  }
]


const criarItemDeAtividade = (atividade) => {
  
  let input = `<input
  onchange="concluirAtividade(event)"
  value="${atividade.data}" 
  type="checkbox"
  `

  if (atividade.finalizada) {
    input = input + 'checked'
  }
 

  input +=  '>';

const formatar = formatador(atividade.data)
 
  return `
    <div>
    ${input}
    <span>${atividade.nome}</span>
    <time>${formatar.dia.semana.longo}, 
    ${formatar.dia.numerico} de 
    ${formatar.mes} 
    às ${formatar.hora}h</time>
  </div>
  `
}


const atualizarListaDeAtividades = () => {
  let section = document.querySelector('section');

  section.innerHTML = ''


  if (atividades.length == 0) {
    section.innerHTML = `<p>Nnenhuma atividade cadastrada</p>`
    return
  }

  for (let x of atividades) {
    section.innerHTML += criarItemDeAtividade(x)
  } 


}

atualizarListaDeAtividades();
 

const salvarAtividade = (event) => {
 
  event.preventDefault()
 
  const dadosDoFormulario = new FormData(event.target)
  const nome = dadosDoFormulario.get('atividade')
  const dia = dadosDoFormulario.get('dia')
  const hora = dadosDoFormulario.get('hora')
  const data = `${dia} ${hora}`



  const novaAtividade = {
    nome,
    data,
    finalizada: false
  }


  const atividadeExiste = atividades.find((atividade) => {
    return atividade.data == novaAtividade.data
  })

  if(atividadeExiste) {
    return alert('Dia/hora não disponivel')
  }



  atividades = [ novaAtividade, ...atividades]
  atualizarListaDeAtividades()


}

const criarDiasSelecao = () => {
  const dias = [
     "2024-02-28",
     "2024-02-29",
     "2024-03-01",
     "2024-03-02",
     "2024-03-03",
  ]

  let diasSelecao = ''

  for(let dia of dias) {
    const formatar = formatador(dia)
    const diaFormatado = `
    ${formatar.dia.numerico} de 
    ${formatar.mes}`
    diasSelecao += `<option value="${dia}">${diaFormatado}</option>"`
  }

  document.
  querySelector('select[name="dia"]').
  innerHTML = diasSelecao

}
criarDiasSelecao()

const criarHorasSelecao = () => {
    let horasDiponiveis = ''

    for(let i = 6; i < 23; i++) {
      const hora = String(i).padStart(2, '0') 
      horasDiponiveis += `<option value="${hora}:00">${hora}:00</option>`
      horasDiponiveis += `<option value="${hora}:30">${hora}:30</option>`
    }

    document.
    querySelector('select[name="hora"]').
    innerHTML = horasDiponiveis
}

criarHorasSelecao()

const concluirAtividade = (event) => {
  const input = event.target
  const dataDesteInput = input.value


  const atividade = atividades.find((atividade) => {
    return atividade.data == dataDesteInput
  }) 

  if (!atividade) {
    return
  }

  atividade.finalizada = !atividade.finalizada
}