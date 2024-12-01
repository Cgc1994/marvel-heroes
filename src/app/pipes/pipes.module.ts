import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './capitalize.pipe';

@NgModule({
  declarations: [],
  exports: [CapitalizePipe],
  imports: [CommonModule, CapitalizePipe]
})
export class PipesModule {}
