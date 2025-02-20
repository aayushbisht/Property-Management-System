import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Property } from 'src/app/shared/model/property';
import { DataService } from 'src/app/shared/service/data.service';

export interface Tile {
  id: string;
  cost: string;
  location: string;
  type: string;
  imageUrl: string; 
}

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  propertyArr: Property[] = [];
  tiles: Tile[] = [];
  filteredTiles: Tile[] = [];

  costFilter: number | null = null;
  locationFilter: string | null = null;
  typeFilter: string | null = null;

  constructor(
    public grid: MatGridListModule,
    private dataApi: DataService,
  ) {}

  ngOnInit(): void {
    this.getAllProperty();
  }

  viewproperty(id: any) {
    window.open('/dashboard/sell/' + id, '_blank');
  }

  getAllProperty() {
    this.dataApi.getAllProperty().subscribe(res => {
      this.propertyArr = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
      const images: string[] = [
        'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://mldllifespacebucket01.s3.amazonaws.com/2019/10/vicino-overview.jpg',
        'https://www.buylanddholera.com/wp-content/uploads/2022/08/2-BHK-3-BHK-Flats-in-Ahmedabad.jpg',
        'https://im.proptiger.com/1/641729/6/athena-images-for-elevation-of-apex-buildcon-athena-10780957.jpeg',
        'https://i.pinimg.com/originals/33/32/e6/3332e6567130014c34cab863f6d64763.jpg',
        'https://www.paranych.com/uploads/benefits-penthouse-living-main-image.png'
       
      ];

      for (let i = 0; i < this.propertyArr.length; i++) {
        const id = this.propertyArr[i].id;
        const cost = this.propertyArr[i].cost;
        const location = this.propertyArr[i].location;
        const type = this.propertyArr[i].type;
        const imageUrl = images[i % images.length];
        this.tiles.push({ id, cost, location, type, imageUrl });
      }

      this.filteredTiles = this.tiles; 
    });
  }

  selectedFilter: string = 'cost';
  filterValue: string = '';

  applyFilters(): void {
    this.filteredTiles = this.tiles.filter((tile: Tile) => {
      if (this.selectedFilter === 'cost') {
        return tile.cost.includes(this.filterValue);
      } else if (this.selectedFilter === 'location') {
        return tile.location.toLowerCase().includes(this.filterValue.toLowerCase());
      } else if (this.selectedFilter === 'type') {
        return tile.type.toLowerCase().includes(this.filterValue.toLowerCase());
      }
      return true;
    });
  }


}
