import { TestBed } from '@angular/core/testing';

import { EditFotoService } from './edit-foto.service';

describe('EditFotoService', () => {
  let service: EditFotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditFotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
