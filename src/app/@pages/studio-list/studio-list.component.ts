import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/@services/api.service';

@Component({
  selector: 'app-studio-list',
  templateUrl: './studio-list.component.html',
  styleUrls: ['./studio-list.component.scss']
})
export class StudioListComponent implements OnInit {

  studioData: any[] = [];
  filteredStudios !: any[];
  suggestions : any[] = [];
  searchTerm: string = '';

    constructor(
    private apiService: ApiService
  ) {
      console.log('AppComponent initialized');
  }
  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.apiService.getData().subscribe( (data:any) => {
      console.log('Data fetched:', data);
      this.studioData = data.Studios;
    }, (error: any) => {
      console.error('Error fetching data:', error);
    });
  }

  search($event: any) {
    console.log('Search event:', $event.target.value);
       let term = $event.target.value.toLowerCase();


       this.suggestions = this.studioData
      .map(studio => studio.Location.Area)
      .filter((area: string, index: number, self: string[]) =>
        area.toLowerCase().includes(term)
      );

      console.log(this.suggestions);
      

      this.filteredStudios = this.studioData.filter(studio =>
      studio.Location.Area.toLowerCase().includes(term)
    );


    this.studioData = this.filteredStudios;
    console.log(this.filteredStudios);
    
  }

  selectSuggestion(suggestion:string){
       this.searchTerm = suggestion;
    this.suggestions = [];
    this.filteredStudios = this.studioData.filter(studio =>
      studio.Location.Area === suggestion
    );
  
  }
}
