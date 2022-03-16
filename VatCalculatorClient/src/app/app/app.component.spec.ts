import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing'; import {
  RouterTestingModule
} from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { MaterialModule } from '../common/modules/material.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule.withRoutes([{ path: 'home', redirectTo: '/home' },
        { path: 'api-calculator', redirectTo: '/home' },
        { path: 'client-calculator', redirectTo: '/home' },
        { path: '**', redirectTo: '/home' }]),
        NoopAnimationsModule,
        LayoutModule,
        MaterialModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatCardModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
