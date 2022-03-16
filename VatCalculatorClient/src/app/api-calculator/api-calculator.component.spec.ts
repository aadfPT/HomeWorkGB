import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../common/modules/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCalculatorComponent } from './api-calculator.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Price } from '../common/interfaces/price';


describe('ApiCalculatorComponent', () => {
  let component: ApiCalculatorComponent;
  let fixture: ComponentFixture<ApiCalculatorComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserModule, BrowserAnimationsModule,
        ReactiveFormsModule, MaterialModule, MatCardModule],
      declarations: [ApiCalculatorComponent]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ApiCalculatorComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update vat and gross after setting tax and net', () => {
    component.selectedTax = { value: 10, displayName: "10%" };
    component.net.setValue(100);
    component.netUpdated();

    let result: Price = {
      net: 100,
      vat: 10,
      gross: 110
    };
    const req = httpTestingController.expectOne("/api/Calculator/WithNet");
    req.flush(result);

    fixture.detectChanges();

    expect(req.request.body).withContext("Sent wrong request to API").toEqual({ tax: 10, net: 100 });
    expect(req.request.method).withContext("Sent wrong verb to API").toEqual("POST");
    expect(component.vat.value).withContext("Error calculating vat from net").toEqual(10);
    expect(component.gross.value).withContext("Error calculating grossfrom net").toEqual(110);
  });

  it('should update net and gross after setting tax and vat', () => {
    component.selectedTax = { value: 10, displayName: "10%" };
    component.vat.setValue(10);
    component.vatUpdated();

    let result: Price = {
      net: 100,
      vat: 10,
      gross: 110
    };
    const req = httpTestingController.expectOne("/api/Calculator/WithVat");
    req.flush(result);

    fixture.detectChanges();

    expect(req.request.body).withContext("Sent wrong request to API").toEqual({ tax: 10, vat: 10 });
    expect(req.request.method).withContext("Sent wrong verb to API").toEqual("POST");
    expect(component.net.value).withContext("Error calculating net from vat").toEqual(100);
    expect(component.gross.value).withContext("Error calculating gross from Vat").toEqual(110);
  });

  it('should update net and vat after setting tax and gross', () => {
    component.selectedTax = { value: 10, displayName: "10%" };
    component.gross.setValue(110);
    component.grossUpdated();

    let result: Price = {
      net: 100,
      vat: 10,
      gross: 110
    };
    const req = httpTestingController.expectOne("/api/Calculator/WithGross");
    req.flush(result);

    fixture.detectChanges();

    expect(req.request.body).withContext("Sent wrong request to API").toEqual({ tax: 10, gross: 110 });
    expect(req.request.method).withContext("Sent wrong verb to API").toEqual("POST");
    expect(component.net.value).withContext("Error calculating net from gross").toEqual(100);
    expect(component.vat.value).withContext("Error calculating vat from gross").toEqual(10);
  });
});
