import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { cachingInterceptor } from './core/interceptors/caching.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withViewTransitions()), provideClientHydration(), provideHttpClient(withFetch(),withInterceptors([cachingInterceptor]))]
};

// {
//   onViewTransitionCreated: ({transition}) => {
//     const router = inject(Router);
//     const targetUrl = router.getCurrentNavigation()!.finalUrl!;
//     const config:any = { 
//       paths: 'exact', 
//       matrixParams: 'exact',
//       fragment: 'ignored',
//       queryParams: 'ignored',
//     };
 
//     if (router.isActive(targetUrl, config)) {
//       transition.skipTransition();
//     }
//   },
//  }