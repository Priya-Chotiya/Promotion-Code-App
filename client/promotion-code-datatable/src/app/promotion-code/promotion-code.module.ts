import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionCodeComponent } from './promotion-code.component';
import { RouterModule, Routes } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const routes: Routes = [  
  { path: '', component: PromotionCodeComponent }  
 ];  

@NgModule({
  declarations: [PromotionCodeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatMenuModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class PromotionCodeModule { }
