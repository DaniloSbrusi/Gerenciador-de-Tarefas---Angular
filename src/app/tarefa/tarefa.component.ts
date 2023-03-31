import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {
  
  // Chave no local storage:
  TAREFA_KEY = 'tarefa_key'

  listaTarefas: any[] = []

  constructor() { }

  ngOnInit(): void {
    // this.listaTarefas = [
    //   { id: 0, nome: 'Lavar o carro', concluida: false },
    //   { id: 1, nome: 'Ir ao mercado', concluida: true },
    //   { id: 2, nome: 'Estudar Angular', concluida: false },
    //   { id: 3, nome: 'Enviar lista 32', concluida: false }
    // ]

    const tarefas = localStorage.getItem(this.TAREFA_KEY)
    if (tarefas) {
      this.listaTarefas = JSON.parse(tarefas)
    }
  }

  adicionar(nomeTarefa: string) {
    if (nomeTarefa.trim().length == 0) {
      return;
    }
    const tarefaEncontrada = this.listaTarefas.find(item => item.nome.toLowerCase() == nomeTarefa.toLowerCase())
    if (!tarefaEncontrada) {
      this.listaTarefas.push({ id: this.listaTarefas.length, nome: nomeTarefa, concluida: false })
      this.salvarLista()
    }
  }

  deletar(id: number) {
    this.listaTarefas = this.listaTarefas.filter(item => (item.id != id))
    this.salvarLista()
  }

  completar(id: number) {
    const tarefaEncontrada = this.listaTarefas.find(item => item.id == id)
    if (tarefaEncontrada) {
      tarefaEncontrada.concluida = !tarefaEncontrada.concluida
      this.salvarLista()
    }
  }

  private salvarLista() {
    localStorage.setItem(this.TAREFA_KEY, JSON.stringify(this.listaTarefas))
  }

}
