import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import { FormControl } from '@angular/forms';
import { Artist } from 'src/app/models/Artist';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers:[SpotifyService]
})
export class SearchComponent implements OnInit {
  searchStr:string;
  results: Artist[];
  display: Artist[];
  query: FormControl = new FormControl();
  constructor(private spotifyService:SpotifyService) { 
  }

  ngOnInit(): void {
    
  }

  displayArtists(){
    this.query.valueChanges
    .pipe(debounceTime(800),
    distinctUntilChanged())
    .subscribe(query => this.spotifyService.getAuth()
      .subscribe(res => this.spotifyService.displayArtists(res.access_token).subscribe(
        res => {
          console.log(res.artists.items)
          this.display = res.artists.items
        })
      ));
  }
  searchMusic(){
    this.query.valueChanges
    .pipe(debounceTime(800),
    distinctUntilChanged())
    .subscribe(query => this.spotifyService.getAuth()
      .subscribe(res => this.spotifyService.searchMusic(query, 'artist', res.access_token).subscribe(
        res => {
          console.log(res.artists.items)
          this.results = res.artists.items
        })
      ));
    /* this.spotifyService.searchMusic(this.searchStr).subscribe(query => this.spotifyService.getAuth().subscribe(res =>{
      console.log(res.artists.items);
    }) */
  }

}
