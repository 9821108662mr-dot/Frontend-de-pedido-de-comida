import { trigger, transition, style, query, animate, group } from '@angular/animations';

export const routeTransitionAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    // Initial state of entering and leaving elements
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0
      })
    ], { optional: true }),
    
    // Entering element starts hidden and shifted
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(10px)' })
    ], { optional: true }),

    // Execute animations in parallel
    group([
      query(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ], { optional: true }),
      query(':enter', [
        animate('300ms 150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ], { optional: true })
    ])
  ])
]);
