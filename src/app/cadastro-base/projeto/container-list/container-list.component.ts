import { Component, TemplateRef, OnInit } from '@angular/core';

import { Projeto } from '../models/projeto.model';
import { ProjetoService } from '../services/projeto.service';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {
  projeto: Projeto[] = [];
  table: any;
  rows = [];
  selected = [];
  reorderable = true;
  loadingIndicator = true;
  submitted = false;


  constructor(
    private _projetoService: ProjetoService,
    private _toastrService: ToastrCenterService
  ) {}

  ngOnInit() {
    this.getProjeto();
  }

  getProjeto(): void {
    this._projetoService.getProjeto().subscribe((dados: any) => {
        this.projeto = dados;
        this.rows = dados;
      });
  }
  onDeleteProjeto(projeto: Projeto, template: TemplateRef<any>) {
    this._projetoService.deleteProjeto(projeto.id_projeto)
      .subscribe(data => {
        if (!data['code']) {
          this.projeto = this.projeto.filter(pro => pro !== projeto);
          this._toastrService.success('Registro removido com sucesso!', 'SUCESSO!');
        } else {
          this._toastrService.error(
            'Não é possivel deletar o registro selecionado.',
            'ERROR!'
          );
        }
      });
  }
}
