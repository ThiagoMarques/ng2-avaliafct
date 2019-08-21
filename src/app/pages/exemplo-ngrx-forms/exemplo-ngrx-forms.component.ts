import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { SampleFormValue } from '../../store/sampleForm.reducer';

@Component({
  selector: 'app-exemplo-ngrx-forms',
  templateUrl: './exemplo-ngrx-forms.component.html',
  styleUrls: ['./exemplo-ngrx-forms.component.scss']
})
export class ExemploNgrxFormsComponent implements OnInit {
  sampleFormState$: Observable<FormGroupState<SampleFormValue>>;
  debugMessage = '';

  constructor(private store: Store<any>) {
    this.sampleFormState$ = this.store.select('sampleForm');
  }

  ngOnInit() {
    this.sampleFormState$.subscribe(
      (result: FormGroupState<SampleFormValue>) => {
        // console.log({ result });
        const value = result.value;
        this.debugMessage = JSON.stringify(value, null, 4);
      }
    );
  }
}
