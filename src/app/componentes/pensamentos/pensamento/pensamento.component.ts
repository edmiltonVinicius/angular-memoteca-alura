import { Pensamento } from './../pensamento';
import { Component, Input, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {

  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: 'I love Angular',
    autoria: 'Nay',
    modelo: 'modelo3',
    favorito: false
  }

  @Input() favoritos: Pensamento[] = [];

  constructor(private serive: PensamentoService) { }

  ngOnInit(): void {
  }

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  mudarIconeFavorito(): string {
    if(this.pensamento.favorito == false) {
      return 'https://raw.githubusercontent.com/alura-cursos/2678-angular-curso2/aula-5/src/assets/imagens/icone-favorito-inativo.png';
    }
    return 'https://raw.githubusercontent.com/alura-cursos/2678-angular-curso2/aula-5/src/assets/imagens/icone-favorito-ativo.png';
  }

  favoritar() {
    this.pensamento.favorito = !this.pensamento.favorito;
    this.serive.editar(this.pensamento).subscribe(() => {
      this.favoritos.splice(this.favoritos.indexOf(this.pensamento), 1)
    });
  }

}
