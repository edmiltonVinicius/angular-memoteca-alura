import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { habilitarBotaoConfirmar } from 'src/app/utils/habilitarBotaoConfirmar';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  pensamento!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.pensamento = this.formBuilder.group({
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      modelo: [''],
      favorito: [false]
    })

    this.loadData();
  }

  private loadData() {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((p) => {
      this.pensamento.setValue({
        autoria: p.autoria,
        conteudo: p.conteudo,
        modelo: p.modelo,
        favorito: p.favorito
      });
    })
  }

  editarPensamento() {
    this.service.editar(this.pensamento.value).subscribe(() => {
      this.router.navigate(['/listarPensamento'])
    })
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao(): string {
    return habilitarBotaoConfirmar(this.pensamento.valid);
  }
}
