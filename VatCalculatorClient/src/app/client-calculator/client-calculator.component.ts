import { Component, OnInit } from '@angular/core';
import { Tax } from '../common/interfaces/tax';
import { FormControl, Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { GreaterThanZeroDirective } from '../common/directives/greater-than-zero.directive';


@Component({
  selector: 'app-client-calculator',
  templateUrl: './client-calculator.component.html',
  styleUrls: ['./client-calculator.component.scss']
})
export class ClientCalculatorComponent implements OnInit {
  net = new FormControl("", []);
  vat = new FormControl();
  gross = new FormControl();

  // @ViewChild('gross', { static: true }) grossElement!: NgModel;



  taxes: Tax[] = [
    { value: 10, displayName: "10%" },
    { value: 13, displayName: "13%" },
    { value: 20, displayName: "20%" }
  ];

  selectedTax?: Tax;

  constructor() {
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
    if (!this.net.valid || !this.selectedTax) return;
    this.vat.setValue(this.selectedTax.value * this.net.value / 100);
    this.gross.setValue((100 + this.selectedTax.value) * this.net.value / 100);
  }

  vatUpdated(): void {
    if (!this.vat.valid || !this.selectedTax) return;
    this.net.setValue(100 * this.vat.value / this.selectedTax.value);
    this.gross.setValue((100 + this.selectedTax.value) * this.vat.value / this.selectedTax.value);
  }

  grossUpdated(): void {
    if (!this.gross.valid || !this.selectedTax) return;
    this.net.setValue(100 * this.gross.value / (100 + this.selectedTax.value));
    this.vat.setValue(this.selectedTax.value * this.gross.value / (100 + this.selectedTax.value));
  }
}
