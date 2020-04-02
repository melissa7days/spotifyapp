import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators'; 
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private searchUrl: string;
  private artistUrl: string;
  private albumsUrl: string;
  private albumUrl: string;
  private clientId: string = 'a8746fd779094aa0af12746b73a33127';
  private clientSecret: string = '206ac18c11344af9845ac42d95c8e28a';
  constructor(private http: Http) { }
  getAuth = () => {

    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(this.clientId + ":" + this.clientSecret));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'client_credentials');
    let body = params.toString();

    return this.http.post('https://accounts.spotify.com/api/token', body, { headers: headers })
    .pipe(map(res => res.json()));

  }
  searchMusic(query: string, type = 'artist', authToken: string) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + authToken);

    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + query + '&offset=0&limit=20&type=' + type + '&market=US';

    return this.http.get(this.searchUrl, { headers: headers })
    .pipe(map(res => res.json()));
  }
  getArtist(id:string, authToken: string) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + authToken);

    this.artistUrl = 'https://api.spotify.com/v1/artists/'+id;

    return this.http.get(this.artistUrl, { headers: headers })
    .pipe(map(res => res.json()));
  }
  getAlbums(artistId:string, authToken: string) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + authToken);

    this.albumsUrl = 'https://api.spotify.com/v1/artists/'+artistId+'/albums';

    return this.http.get(this.albumsUrl, { headers: headers })
    .pipe(map(res => res.json()));
  }
  
  getAlbum(id:string, authToken: string) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + authToken);

    this.albumUrl = 'https://api.spotify.com/v1/albums/'+id;

    return this.http.get(this.albumUrl, { headers: headers })
    .pipe(map(res => res.json()));
  }


/*   searchMusic(str: string, type='artist'){
    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQD_k4eM1dpF3LK31s4q3_-oj0gME5GxK1CZe18DPY6yugvbq4egH1RpfCY0n7svNtIVegSaTs5LZIzZClY'
    });
    this.searchUrl = 'https://api.spotify.com/v1/search?q='+str+'&offset=0&limit=20&type='+type+'&market=US';
    return this.http.get(this.searchUrl).pipe(map(res => res.json()));
  } */
}
