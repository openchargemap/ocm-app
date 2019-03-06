import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiEditorPage } from './poi-editor.page';

describe('PoiEditorPage', () => {
  let component: PoiEditorPage;
  let fixture: ComponentFixture<PoiEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoiEditorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
