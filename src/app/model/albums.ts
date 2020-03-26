import {JsonObject, JsonProperty} from 'json2typescript';

export class Album {

  @JsonProperty('album', String)
  NAME: string;
  @JsonProperty('image', String)
  IMAGE: string;
  @JsonProperty('quantity', Number)
  QUANTITY: number;
  @JsonProperty('price', Number)
  PRICE: number;
  @JsonProperty('copyright', String)
  COPYRIGHT: string;
  @JsonProperty('title', String)
  TITLE: string;
  @JsonProperty('relaseDate', String)
  RELEASEDATE: string;
  @JsonProperty('category', String)
  CATEGORY: string;
  @JsonProperty('applePage', String)
  APPLE_PAGE: string;
  @JsonProperty('artistPage', String)
  ARTIST_PAGE: string;

  constructor() {
    this.NAME = undefined;
    this.IMAGE = undefined;
    this.QUANTITY = undefined;
    this.PRICE = undefined;
    this.COPYRIGHT = undefined;
    this.TITLE = undefined;
    this.RELEASEDATE = undefined;
    this.CATEGORY = undefined;
    this.APPLE_PAGE = undefined;
    this.ARTIST_PAGE = undefined;
  }
}