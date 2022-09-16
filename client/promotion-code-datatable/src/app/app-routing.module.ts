import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {  
    path: '',  
    loadChildren: () => import('./promotion-code/promotion-code.module')  
    .then(m => m.PromotionCodeModule)  
 },   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
