import { TestBed } from '@angular/core/testing';

import { GiftdisplayService } from './giftdisplay.service';

describe('GiftdisplayService', () => {
  let service: GiftdisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiftdisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
