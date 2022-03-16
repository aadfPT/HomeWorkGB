import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './common/modules/app-routing.module';
import { MaterialModule } from './common/modules/material.module';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ApiCalculatorComponent } from './api-calculator/api-calculator.component';
import { ClientCalculatorComponent } from './client-calculator/client-calculator.component';
import { GreaterThanZeroDirective } from './common/directives/greater-than-zero.directive';


@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    ApiCalculatorComponent,
    ClientCalculatorComponent,
    GreaterThanZeroDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
