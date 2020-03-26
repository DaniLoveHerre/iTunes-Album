import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/model/albums';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {

  public actualAlbum: Album;

  constructor(private router: ActivatedRoute, private _location: Location) { }

  ngOnInit(): void {
    this.actualAlbum = JSON.parse(localStorage.getItem('albumData'));
  }

  goBack(): void {
    localStorage.clear()
    this._location.back();
  }

}
