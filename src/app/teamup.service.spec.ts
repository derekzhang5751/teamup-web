import { TestBed } from '@angular/core/testing';

import { TeamupService } from './teamup.service';

describe('TeamupService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: TeamupService = TestBed.get(TeamupService);
        expect(service).toBeTruthy();
    });
});
