import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router, withViewTransitions } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withViewTransitions({
    onViewTransitionCreated: ({transition}) => {
      const router = inject(Router);
      const targetUrl = router.getCurrentNavigation()!.finalUrl!;
      const config:any = { 
        paths: 'exact', 
        matrixParams: 'exact',
        fragment: 'ignored',
        queryParams: 'ignored',
      };
   
      if (router.isActive(targetUrl, config)) {
        transition.skipTransition();
      }
    },
   })), provideClientHydration(), provideHttpClient(withFetch())]
};
