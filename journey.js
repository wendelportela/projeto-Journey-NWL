
const atividade = {
    nome: "almoço",
    data: new Date("2024-07-08 10:00"),
    finalizada: true
  }
  
  
  //lista, array, vetor []
  
  const  atividades = [
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
    
    let input = '<input type="checkbox"'
  
    if (atividade.finalizada) {
      input = input + 'checked'
    }
   
  
    input +=  '>';
  
   
    return `
      <div>
      ${input}
      <span>${atividade.nome}</span>
      <time>${atividade.data}</time>
    </div>
    `
  }
  
  const section = document.querySelector('section');
  
  for (let x of atividades) {
    
    section.innerHTML += criarItemDeAtividade(x)
    alert(criarItemDeAtividade(x))
  } 
  