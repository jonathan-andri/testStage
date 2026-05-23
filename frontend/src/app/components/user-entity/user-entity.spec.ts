import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEntity } from './user-entity';

describe('UserEntity', () => {
  let component: UserEntity;
  let fixture: ComponentFixture<UserEntity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEntity],
    }).compileComponents();

    fixture = TestBed.createComponent(UserEntity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
