import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConsultaavaliacaoService } from '../services/consultaavaliacao.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { LoginService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-container-edit',
  templateUrl: './container-edit.component.html',
  styleUrls: ['./container-edit.component.scss']
})
export class ContainerEditComponent implements OnInit {

  idAvaliacao: number;
  avaliacao: any[] = [];
  DataAtual: any = new Date().toLocaleDateString();
  tecnologias: any[] = [];
  atributos: any[] = [];
  projetos: any[] = [];
  tam_atributos: any;
  collapsedAtr1: boolean[] = [];
  collapsedAtr2: boolean[] = [];
  collapsedAtr3: boolean[] = [];
  collapsedAtr4: boolean[] = [];
  collapsed: string;
  tam: number;
  isOpen1: boolean[] = [];
  isOpen2: boolean[] = [];
  isOpen3: boolean[] = [];
  isOpen4: boolean[] = [];
  expandedIndex: number;
  show_text = false;

  constructor(
    private _consultaavaliacaoService: ConsultaavaliacaoService,
    private route: ActivatedRoute,
    private _authservice: LoginService,
    private _location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.idAvaliacao = id;
    });
    this._consultaavaliacaoService.getBuscaDetalhesAvaliacao(this.idAvaliacao).subscribe(
      data => {
        this.avaliacao.push(data);
        this.atributos = data['atributos'];
        for (let i = 0; i < this.atributos.length; i++) {
          this.isOpen1[i] = false;
          this.isOpen2[i] = false;
          this.isOpen3[i] = false;
          this.isOpen4[i] = false;
        }
      }
      ,
      error => {
        console.log('error: ', error);
      }
    );
  }

  onPrintPage() {
    window.setTimeout(function() {
      window.print();
    }, 0);
  }
  onPrintPDF() {
    // this.show_text = true;
    // await this.delay(500);
    const data = document.getElementById('print-section');
    html2canvas(data).then(canvas => {
     canvas.style.visibility = 'visible';
      const imgWidth = 200;
      const pageHeight = 260;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('Avaliação.pdf'); // Generated PDF
    });
    // this.show_text = false;
  }
 // nossa função delay com suporte a promisse.
 private delay(ms: number): Promise<boolean> {
   return new Promise(resolve => {
     setTimeout(() => {
       resolve(true);
     }, ms);
   });
 }


  onCancel() {
    this._location.back();
  }

  Collapse1(index: any) {
    this.collapsedAtr1[index] = !this.collapsedAtr1[index];
    this.isOpen1[index] = !this.isOpen1[index];
  }
  Collapse2(index: any) {
    this.collapsedAtr2[index] = !this.collapsedAtr2[index];
    this.isOpen2[index] = !this.isOpen2[index];
  }
  Collapse3(index: any) {
    this.collapsedAtr3[index] = !this.collapsedAtr3[index];
    this.isOpen3[index] = !this.isOpen3[index];
  }
  Collapse4(index: any) {
    this.collapsedAtr4[index] = !this.collapsedAtr4[index];
    this.isOpen4[index] = !this.isOpen4[index];
  }

  perfil(): string {
   const perfil = this._authservice.perfilUser();
   return perfil;
  }

}

