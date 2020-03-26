import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { Album } from 'src/app/model/albums';
import { orderType } from 'src/app/model/enums/orderType';
import { fadeInOut } from 'src/app/globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  animations: [fadeInOut]
})
export class HomeComponent implements OnInit {

  public limit = 100;
  public albumsList = [];
  public searchList = [];
  public originalAlbumsList = [];
  public loading = true;
  public term = '';
  public order: orderType = orderType.asc;
  public orderType = orderType;

  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums(): void {
    this.albumsList = [];
    this.serverService.getAppleAlbums(this.limit).subscribe(response => {
      response.body.feed.entry.forEach(element => {
        this.albumsList.push(this.fillData(element));
        this.loading = false;
      });
    }, (error) => {
      console.log(error);
    });
  }

  fillData(element: any): Album {
    let album = new Album();
    album.NAME = element['im:name'].label;
    let image = this.getLastImage(element['im:image']);
    album.IMAGE = image['label'];
    album.QUANTITY = element['im:itemCount'].label;
    album.PRICE = element['im:price'].label;
    album.COPYRIGHT = element['rights'].label;
    album.TITLE = element['title'].label;
    album.RELEASEDATE = element['im:releaseDate'].label;
    album.CATEGORY = element['category'].attributes.label;
    album.APPLE_PAGE = element['link'].attributes.href;
    if (element['im:artist'].attributes != undefined) {
      album.ARTIST_PAGE = element['im:artist'].attributes.href;
    }
    return album;
  }

  getLastImage(imagesList: []): String {
    return imagesList[imagesList.length - 1];
  }

  showMoreAlbums(): void {
    this.loading = true;
    this.albumsList = [];
    this.limit += 100;
    this.getAlbums();
  }

  viewDetails(album: Album): void {
    localStorage.setItem('albumData', JSON.stringify(album));
    this.router.navigate(['/details']);
  }

  onSearchChange(newValue: string): void {
    this.searchList = [];
    this.albumsList.forEach(element => {
      if (element.TITLE.toLowerCase().indexOf(this.term.toLowerCase()) !== -1) {
        this.searchList.push(element);
      }
    });
  }

  onChange(newValue: string) {
    switch (newValue) {
      case '':
        this.getAlbums();
        break;
      case 'TITLE':
        this.order = orderType.asc;
        this.albumsList.sort((a,b) => (a[newValue] > b[newValue]) ? 1 : ((b[newValue] > a[newValue]) ? -1 : 0));
        break;
      case 'PRICE':
        this.order = orderType.asc;
        this.albumsList.sort((a,b) => (parseFloat(a[newValue].replace('$','')) > parseFloat(b[newValue].replace('$',''))) ? 1 : ((parseFloat(b[newValue].replace('$','')) > parseFloat(a[newValue].replace('$',''))) ? -1 : 0));
        break;
      case 'RELEASEDATE':
        this.order = orderType.asc;
        this.albumsList.sort((a,b) => (new Date(a[newValue]) > new Date(b[newValue])) ? 1 : ((new Date(b[newValue]) > new Date(a[newValue])) ? -1 : 0));
        break;
      case 'asc':
        if (this.order === orderType.desc) {
          this.order = orderType.asc;
          this.albumsList.reverse();
        }
        break;
      case 'desc':
        if (this.order === orderType.asc) {
          this.order = orderType.desc;
          this.albumsList.reverse();
        }
        break;
    }
  }

}
