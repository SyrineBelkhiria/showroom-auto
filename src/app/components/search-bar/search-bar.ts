import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interfaces/auto';
@Component({
  imports: [FontAwesomeModule],
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar implements OnInit {
  faMagnifyingGlass=faMagnifyingGlass;
  @Input() autos:Auto[]=[]
  @Input() favoriteIds: number[] = [];
  @Output() onToggleFavorite = new EventEmitter<number>();
  @Output() onSelectCar=new EventEmitter<Auto>()
  selectedAutos: Auto[]=[]
  searchText = '';
  selectedBrand = '';
  maxPrice = 750;
  sortOrder = 'default';
  brands: string[] = [];

  ngOnInit(){
  this.brands = [...new Set(this.autos.map(x=>x.brand))].sort();
  this.selectAutos(this.searchText);}
  
  selectAutos(selectedBrand:string){
    this.searchText = selectedBrand;
    this.selectedAutos=this.autos.filter(x=>
      (x.brand+' '+x.model).toLowerCase().includes(this.searchText.toLowerCase()) &&
      (!this.selectedBrand || x.brand===this.selectedBrand) && x.price<=this.maxPrice
    );
    if(this.sortOrder==='asc') this.selectedAutos.sort((a,b)=>a.price-b.price);
    if(this.sortOrder==='desc') this.selectedAutos.sort((a,b)=>b.price-a.price);
    if(this.sortOrder==='brand') this.selectedAutos.sort((a,b)=>(a.brand+a.model).localeCompare(b.brand+b.model));
  }
  toggleFavorite(id: number) {
    this.onToggleFavorite.emit(id);
  }
  changeBrand(value:string){
    this.selectedBrand=value;
    this.selectAutos(this.searchText);
  }
  changePrice(value:string){
    this.maxPrice=Number(value);
    this.selectAutos(this.searchText);
  }
  changeSort(value:string){
    this.sortOrder=value;
    this.selectAutos(this.searchText);
  }
  resetFilters(){
    this.selectedBrand='';
    this.searchText='';
    this.maxPrice=750;
    this.sortOrder='default';
    this.selectAutos('');
  }
  selectCar(auto:Auto){
    this.onSelectCar.emit(auto)
  }
}
