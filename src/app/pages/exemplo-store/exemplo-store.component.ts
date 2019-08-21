import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DECREMENT, INCREMENT, RESET } from '../../store/counter.reducer';

interface AppState {
  counter: number;
}

@Component({
  selector: 'app-exemplo-store',
  templateUrl: './exemplo-store.component.html',
  styleUrls: ['./exemplo-store.component.scss']
})
export class ExemploStoreComponent implements OnInit {
  counter: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.counter = store.select('counter');
  }

  ngOnInit() {}

  increment() {
    this.store.dispatch({ type: INCREMENT });
  }

  decrement() {
    this.store.dispatch({ type: DECREMENT });
  }

  reset() {
    this.store.dispatch({ type: RESET });
  }
}
