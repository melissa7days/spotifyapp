import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Album } from 'src/app/models/Album';
import { Artist } from 'src/app/models/Artist';
import { ActivatedRoute } from '@angular/router';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  id:string;
  artist: Artist[];
  albums: Album[];
  query: FormControl = new FormControl();
  constructor(private spotifyService:SpotifyService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .pipe(map(params => params['id']))
      .subscribe((id) => {
        this.spotifyService.getAuth()
          .subscribe(res => {
            this.spotifyService.getArtist(id, res.access_token)
              .subscribe(artist => {
                this.artist = artist;
              });
            this.spotifyService.getAlbums(id, res.access_token)
              .subscribe(albums => {
                this.albums = albums.items;
              }); 
          });
      });
  }

}
