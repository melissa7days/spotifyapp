import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SpotifyService } from './services/spotify.service';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './components/search/search.component';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
const appRoutes: Routes = [
  {path:'', component:SearchComponent},
  {path:'artist/:id', component: ArtistComponent},
  {path:'album/:id', component: AlbumComponent},
  {path:'', redirectTo: '/center', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    ArtistComponent,
    AlbumComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      )
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
