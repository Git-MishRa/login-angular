import { TestBed } from '@angular/core/testing';

import { AdminAuthService } from './adminauth.service';

describe('AdminauthService', () => {
  let service: AdminAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
