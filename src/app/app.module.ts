import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragableDirective } from './dragable.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [AppComponent, DragableDirective],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule,DragDropModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
