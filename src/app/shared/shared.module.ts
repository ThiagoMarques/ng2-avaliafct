import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SdInputComponent } from './components/sd-input/sd-input.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxMaskModule.forRoot(),
        NgxDatatableModule,
        RouterModule
    ],
    declarations: [SdInputComponent],
    exports: [SdInputComponent],
    providers: [
    ]
})
export class SharedModule {}
