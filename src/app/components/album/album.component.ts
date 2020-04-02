import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Artist } from 'src/app/models/Artist';
import { Album } from 'src/app/models/Album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  id:string;
  album: any;

  constructor(private spotifyService:SpotifyService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .pipe(map(params => params['id']))
      .subscribe((id) => {
        this.spotifyService.getAuth()
          .subscribe(res => {
            this.spotifyService.getAlbum(id, res.access_token)
              .subscribe(album => {
                this.album = album;
              });
          });
      });
  }
}
