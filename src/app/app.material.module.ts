
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule,  } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';



@NgModule ({
  
  imports: [MatButtonModule, MatButtonToggleModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule,MatDatepickerModule,MatIconModule,MatNativeDateModule, MatTableModule,MatSelectModule],
  exports: [MatButtonModule, MatButtonToggleModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule,MatDatepickerModule,MatIconModule,MatNativeDateModule, MatTableModule,MatSelectModule],
  providers: [MatNativeDateModule, MatDatepickerModule],
})
export class MaterialModule { }
