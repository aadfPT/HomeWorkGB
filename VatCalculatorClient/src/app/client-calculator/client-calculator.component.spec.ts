import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../common/modules/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCalculatorComponent } from './client-calculator.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

describe('ClientCalculatorComponent', () => {
  let component: ClientCalculatorComponent;
  let fixture: ComponentFixture<ClientCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule, BrowserAnimationsModule,
        ReactiveFormsModule, MaterialModule, MatCardModule],
      declarations: [ClientCalculatorComponent]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ClientCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update vat and gross after setting tax and net', () => {
    component.selectedTax = { value: 10, displayName: "10%" };
    component.net.setValue(100);
    component.netUpdated();
    fixture.detectChanges();
    expect(component.vat.value).withContext("Error calculating vat from net").toEqual(10);
    expect(component.gross.value).withContext("Error calculating grossfrom net").toEqual(110);
  });

  it('should update net and gross after setting tax and vat', () => {
    component.selectedTax = { value: 10, displayName: "10%" };
    component.vat.setValue(10);
    component.vatUpdated();
    fixture.detectChanges();
    expect(component.net.value).withContext("Error calculating net from vat").toEqual(100);
    expect(component.gross.value).withContext("Error calculating gross from Vat").toEqual(110);
  });

  it('should update vat and gross after setting tax and net', () => {
    component.selectedTax = { value: 10, displayName: "10%" };
    component.gross.setValue(110);
    component.grossUpdated();
    fixture.detectChanges();
    expect(component.net.value).withContext("Error calculating net from gross").toEqual(100);
    expect(component.vat.value).withContext("Error calculating vat from gross").toEqual(10);
  });
});
