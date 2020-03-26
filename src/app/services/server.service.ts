import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private static AppleURL =  'https://itunes.apple.com/us/rss/topalbums/';

  constructor(private http: HttpClient) { }

  /**
   * Set general headers
   */
  private static setHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    return headers;
  }

  /**
   * Get Apple albums
   * @param limit » Limit of albums to get
   */
  getAppleAlbums(limit: number): Observable<any> {
    const headers = ServerService.setHeaders();
    let endopint = 'limit=' + limit + '/json';
    return this.http.get(ServerService.AppleURL + endopint, {headers: headers, observe: 'response'});
  }
}
