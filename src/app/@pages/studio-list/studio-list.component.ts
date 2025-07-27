import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/@services/api.service';


interface UserLocation {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-studio-list',
  templateUrl: './studio-list.component.html',
  styleUrls: ['./studio-list.component.scss']
})
export class StudioListComponent implements OnInit {
  radius: number = 10;
  userLocation: UserLocation | null = null;
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

    this.studioData = this.filteredStudios;
  
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log('User location:', this.userLocation);
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = this.deg2rad(lat2 - lat1);
  const dLon = this.deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

filterStudiosByRadius(radiusKm: number) {
  if (!this.userLocation) return;

  this.filteredStudios = this.studioData.filter(studio => {
    // studio.Lat and studio.Lng must exist
    return this.getDistanceFromLatLonInKm(
      this.userLocation!.lat,
      this.userLocation!.lng,
      studio.Lat,
      studio.Lng
    ) <= radiusKm;
  });

  console.log(`Filtered studios within ${radiusKm} km:`, this.filteredStudios);
  

  this.studioData = this.filteredStudios
}
}
