import { Action } from '@ngrx/store';
import { createFormGroupState, formGroupReducer } from 'ngrx-forms';

export interface SampleFormValue {
  text?: string;
  email?: string;
  password?: string;
}
export const FORM_ID = 'sampleForm';

export const initialState = createFormGroupState<SampleFormValue>(FORM_ID, {
  text: '',
  email: '',
  password: ''
});

export function sampleFormReducer(s = initialState, a: Action) {
  return formGroupReducer(s, a);
}
