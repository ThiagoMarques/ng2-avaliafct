import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sd-input',
  templateUrl: './sd-input.component.html',
  styleUrls: ['./sd-input.component.scss']
})
export class SdInputComponent implements OnInit {

 @Input() ext_type: string;
 @Input() ext_mask: string;
 @Input() ext_label: string;
 @Input() ext_placeholder: string;
 @Input() ext_class: string;
 @Input() ext_required: string;

 isRequired: string;

 constructor
  ( ) { }

  ngOnInit() {
   this.define_required();
   this.define_mask();
  }
  define_mask(): void {
   switch (this.ext_mask) {
    case 'cpf':
     this.ext_mask = '000.000.000-00';
     break;

    case 'cnpj':
     this.ext_mask = '000.000.000/0000-00';
     break;
   }
  }
  define_required(): void {
   if (this.ext_required === 'true') {
    this.isRequired = 'required';
   } else {
    this.isRequired = 'label';
   }
  }

}
