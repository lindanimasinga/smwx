
import { Routes } from '@angular/router';
import { ShopComponent } from './pages/shop/shop';
import { SponsorsComponent } from './pages/sponsors/sponsors';
import { ContactComponent } from './pages/contact/contact';
import { VideosComponent } from './pages/videos/videos';

export const routes: Routes = [
    { path: '', redirectTo: 'videos', pathMatch: 'full' },
    { path: 'videos', component: VideosComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'sponsors', component: SponsorsComponent },
    { path: 'contact', component: ContactComponent },
];
