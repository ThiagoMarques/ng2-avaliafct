import { Component, OnInit, TemplateRef } from '@angular/core';
import { Avaliacao } from '../../avaliacao/models/avaliacao.model';
import { AvaliacaoService } from '../../avaliacao/services/avaliacao.service';
import { ColaboradorService } from '../../cadastro-base/colaborador/services/colaborador.service';
import { ToastrCenterService } from '@serpro-design/angular';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { LoginService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {

  Avaliacao: Avaliacao[] = [];
  avaliacaoDetalhe: any[] = [];
  avaliacaoCarregada: boolean;
  isOpen: boolean[] = [];
  collapsed: boolean[] = [];
  modalRef: BsModalRef;
  id_colaborador: number;
  id_colabAval: number;
  arrayColab: any[] = [];

  constructor(
    private _avaliacaoService: AvaliacaoService,
    private _colaboradorService: ColaboradorService,
    private _toastr: ToastrCenterService,
    private _authservice: LoginService,
    private _modalService: BsModalService
  ) { }

  ngOnInit() {
   this.avaliacaoCarregada = false;
   this._avaliacaoService.getAvaliacao().subscribe(avaliacao => {
    let avalFilter: any[];
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.id_colaborador = currentUser['id_colaborador'];

    avalFilter = avaliacao.filter(function (el) {
     return el['sigla_divisao'] === currentUser['sigla'];
    });

    if (currentUser['ds_perfil'] === 'ADMINISTRADOR') {
     for (let i = 0; i < avaliacao.length; i++) {
      this.isOpen[i] = false;
     }
     this.getAvaliacaoDetalhe(avaliacao);
    } else if (currentUser['ds_perfil'] === 'COLABORADOR') {
      avalFilter.filter((data) => {
       if (data['TB_COLABORADOR_id_colaborador'] === this.id_colaborador) {
        this.arrayColab.push(data);
       }
     });
     for (let i = 0; i < this.arrayColab.length; i++) {
      this.isOpen[i] = false;
     }
     this.getAvaliacaoDetalhe(this.arrayColab);
    } else {
     for (let i = 0; i < avalFilter.length; i++) {
      this.isOpen[i] = false;
     }
     this.getAvaliacaoDetalhe(avalFilter);
    }
   },
    () => {
     this.avaliacaoCarregada = true;
    });
  }
  // Modal
  openModal(msg: TemplateRef<any>) {
    this.modalRef = this._modalService.show(msg, { class: 'modal-sm' });
  }
  confirm(): void {
    this.modalRef.hide();
  }
  decline(): void {
    this.modalRef.hide();
  }
  deleteAvaliacao(avaliacao, avaliacaoDetalhe) {
    // if (confirm('Tem certeza que quer APAGAR a Avaliação #' + avaliacao.id_resultado + ' ?')) {
      const index = avaliacaoDetalhe.indexOf(avaliacao);
      avaliacaoDetalhe.splice(index, 1);
      this._avaliacaoService.deleteAvaliacao(avaliacao.id_resultado).subscribe(
        data => {
          this._toastr.success('Avaliação removida com sucesso!', 'Sucesso!', {
            progressBar: true,
            progressAnimation: 'increasing',
            closeButton: true,
            timeOut: 1000
          });
          setTimeout(() => {
          }, 500);
        },
        err => {
          alert('A avaliação não foi apagada!');
          avaliacaoDetalhe.splice(index, 0, avaliacao);
          throw err;
        });
    // }
    this.modalRef.hide();
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
  getAvaliacaoDetalhe(data) {
    data.forEach(elementGroup => {
      this._avaliacaoService.getAvaliacaoId(elementGroup.TB_COLABORADOR_id_colaborador).subscribe(elementDetalhe => {
        this.avaliacaoDetalhe.push({
          'listGroup': elementGroup,
          'listDetalhe': elementDetalhe
        });
      });
    });
  }
  Collapse(index: any) {
    this.collapsed[index] = !this.collapsed[index];
    this.isOpen[index] = !this.isOpen[index];
  }
  perfil(): string {
   const perfil = this._authservice.perfilUser();
   return perfil;
  }
}
