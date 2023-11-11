import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsTableComponent } from '../products-table/products-table.component';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressBarComponent } from '../shared/progress-bar/progress-bar.component';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  RouterModule,
  convertToParamMap,
} from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';

class MockActivatedRoute {
  // Use BehaviorSubject to provide a value immediately
  private paramMapSubject = new BehaviorSubject(convertToParamMap({}));

  // Expose a method to set the paramMap
  setParamMap(params: any) {
    this.paramMapSubject.next(convertToParamMap(params));
  }

  // Expose paramMap as an observable
  paramMap = this.paramMapSubject.asObservable();
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(async () => {
    mockActivatedRoute = new MockActivatedRoute();

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
      ],
      declarations: [
        DashboardComponent,
        ProductsTableComponent,
        ProgressBarComponent,
      ],
      providers: [
        // Provide the mock ActivatedRoute instead of the actual one
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call filterProducts with a correct param', () => {
    expect(component).toBeTruthy();
  });

  it('should filter', () => {
    spyOn(component.tableChildren, 'filterProducts');
    component.filterResults('value');
    expect(component.tableChildren.filterProducts).toHaveBeenCalledWith(
      'value'
    );
  });
});
