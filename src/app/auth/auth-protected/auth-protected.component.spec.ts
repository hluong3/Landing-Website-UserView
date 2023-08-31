import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthProtectedComponent } from "./auth-protected.component";

describe("AuthProtectedComponent", () => {
  let component: AuthProtectedComponent;
  let fixture: ComponentFixture<AuthProtectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthProtectedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthProtectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
