import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Entity } from './entity';

describe('Entity', () => {
  let component: Entity;
  let fixture: ComponentFixture<Entity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Entity],
    }).compileComponents();

    fixture = TestBed.createComponent(Entity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
