import { TestBed } from '@angular/core/testing';

import { CalendarUserService } from './calendar-user.service';

describe('CalendarUserService', () => {
  let service: CalendarUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
