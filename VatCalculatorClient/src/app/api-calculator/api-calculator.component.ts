import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Price } from '../common/interfaces/price';
import { Tax } from '../common/interfaces/tax';
import { MatOptionSelectionChange } from '@angular/material/core';
import { FormControl, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-api-calculator',
  templateUrl: './api-calculator.component.html',
  styleUrls: ['./api-calculator.component.scss']
})
export class ApiCalculatorComponent implements OnInit {
  net = new FormControl("", []);
  vat = new FormControl();
  gross = new FormControl();
  taxes: Tax[] = [
    { value: 10, displayName: "10%" },
    { value: 13, displayName: "13%" },
    { value: 20, displayName: "20%" }
  ];

  selectedTax?: Tax;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  taxUpdated(event: MatOptionSelectionChange, tax: Tax): void {
    if (!event.isUserInput) return;

    this.selectedTax = tax;
    if (this.net.valid) {
      this.netUpdated();
    }
    else if (this.vat.valid) {
      this.vatUpdated();
    }
    else if (this.gross.valid) {
      this.grossUpdated();
    }
  }

  netUpdated(): void {
    if (!this.net.valid) return;
    if (!this.selectedTax || !this.net.value) return;
    this.http.post<Price>(
      environment.api.endpoints.withNet,
      {
        tax: this.selectedTax?.value,
        net: this.net.value
      }).subscribe(result => {
        this.vat.setValue(result.vat);
        this.gross.setValue(result.gross);
      }, error => console.error(error));
  }

  vatUpdated(): void {
    if (!this.vat.valid) return;
    if (!this.selectedTax || !this.vat.value) return;
    this.http.post<Price>(
      environment.api.endpoints.withVat,
      {
        tax: this.selectedTax?.value,
        vat: this.vat.value
      }).subscribe(result => {
        this.net.setValue(result.net);
        this.gross.setValue(result.gross);
      }, error => console.error(error));
  }

  grossUpdated(): void {
    if (!this.gross.valid) return;
    if (!this.selectedTax || !this.gross.value) return;
    this.http.post<Price>(
      environment.api.endpoints.withGross,
      {
        tax: this.selectedTax?.value,
        gross: this.gross.value
      }).subscribe(result => {
        this.net.setValue(result.net);
        this.vat.setValue(result.vat);
      }, error => console.error(error));
  }

}
