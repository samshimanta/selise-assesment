import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Studio } from 'src/app/studio';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss']
})
export class StudioComponent implements OnInit {


  

  @Input()
  studio!: any;
  visible: boolean = false;

  rangeDates: Date[] = [];
  invalidDates !: Date[];
  es:any


    showDialog() {
        this.visible = true;
    }

  BookingForm!:FormGroup;
  constructor(){

  }

    ngOnInit(): void {

          this.BookingForm = new FormGroup({
      'userData': new FormGroup({
          'name':new FormControl(null,[Validators.required]),
          'email':new FormControl(null,[Validators.required ]),
          'date':new FormControl(null,[Validators.required]),
      }),
     
    })
  }
    

  openDialog(){
    this.visible = true;
  }

  onSubmit(){
    console.log('Form submitted:', this.BookingForm.value);
  }


}
