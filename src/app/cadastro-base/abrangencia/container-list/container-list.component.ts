import { ViewChild, TemplateRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Abrangencia } from '../models/abrangencia.model';
import { AbrangenciaService } from '../services/abrangencia.service';
import { ToastrCenterService } from '@serpro-design/angular';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {
  public onClose: Subject<boolean>;
  abrangencia: Abrangencia[] = [];
  rows = [];
  temp = [];
  selected = [];
  reorderable = true;
  loadingIndicator = true;
  submitted = false;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private _abrangenciaService: AbrangenciaService,
    private _toastrService: ToastrCenterService
  ) {}

  ngOnInit() {
    this.getAbrangencia();
  }

  getAbrangencia(): void {
    this._abrangenciaService.getAbrangencia().subscribe(
      (dados: any) => {
        this.abrangencia = dados;
        this.rows = dados;
      },
      error =>
        this._toastrService.error(
          'Não foi possivel carregar os dados',
          'Erro ao carregar os dados'
        )
    );
  }

  onDeleteAbrangencia(abrangencia: Abrangencia, template: TemplateRef<any>) {
    this._abrangenciaService.deleteAbrangencia(abrangencia.id_abrangencia).subscribe(data => {
      if (!data['code']) {
        this.abrangencia = this.abrangencia.filter(atr => atr !== abrangencia);
        this._toastrService.success('Registro removido com sucesso', 'SUCESSO!');
      } else {
        this._toastrService.error('Não é possível deletar o registro selecionado', 'Erro!');
      }
    });
  }
}
