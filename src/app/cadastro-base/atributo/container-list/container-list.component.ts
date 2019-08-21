import { ViewChild, TemplateRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Atributo } from '../models/atributo.model';
import { AtributoService } from '../services/atributo.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})


export class ContainerListComponent implements OnInit {
  public onClose: Subject<boolean>;
  atributo: Atributo[] = [];
  rows = [];
  temp = [];
  selected = [];
  reorderable = true;
  loadingIndicator = true;
  submitted = false;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private _atributoService: AtributoService,
    private _toastrService: ToastrCenterService
  ) { }

  ngOnInit() {
    this.getlistatributo();
    this.onClose = new Subject();
  }

  getlistatributo(): void {
    this._atributoService.getAtributo().subscribe(
      (dados: any) => {
        this.atributo = dados;
        this.rows = dados;
        this.temp = dados;
      },
      error =>
        this._toastrService.error(
          'Não foi possivel carregar os dados',
          'Erro ao carregar os dados'
        )
    );
  }

  onDeleteAtributo(atributo: Atributo, template: TemplateRef<any>) {
    this._atributoService.deleteAtributo(atributo.id_atributo).subscribe(data => {
      if (!data['code']) {
        this.atributo = this.atributo.filter(atr => atr !== atributo);
        this._toastrService.success('Registro removido com sucesso', 'SUCESSO!');
      } else {
        this._toastrService.error('Não é possível deletar o registro selecionado', 'Erro!');
      }
    });
  }
  // updateFilter(event) {
  //   const val = event.target.value.toLowerCase();
  //   const temp = this.temp.filter((d: any): any => {
  //     return d.name.toLowerCase().indexOf(val) !== -1 || !val;
  //   });
  //   this.rows = temp;
  //   this.table.offset = 0;
  // }
}
