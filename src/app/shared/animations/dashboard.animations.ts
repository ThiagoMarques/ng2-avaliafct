
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export function q (s, a, o = { optional: true }) {
  return query(s, a, o);
}

export const dashboardAnimations = [
  trigger('dashboardAnimation', [
    transition('* => *', [
      q('.card', style({ opacity: 0 })),
      q('.card', stagger(100, [
        style({ transform: 'scale(1.1)', opacity: '0' }),
        animate('0.3s ease-in-out', style({ transform: 'scale(1)', opacity: '1' }))
    ]))
    ])
  ])
];
