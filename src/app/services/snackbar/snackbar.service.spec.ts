import { TestBed } from "@angular/core/testing";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { SnackBarService } from "./snackbar.service";

describe("Given a SnackBar Service", () => {
  let snackBarService: SnackBarService;
  let snackBarMock: { open: jest.Mock };

  beforeEach(() => {
    snackBarMock = { open: jest.fn() };

    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        SnackBarService,
        {
          provide: MatSnackBar,
          useValue: snackBarMock,
        },
      ],
    });

    snackBarService = TestBed.inject(SnackBarService);
  });

  describe("When its method openSnackBar is called with a message and an action", () => {
    test("Then it should invoke the 'open' method of the received SnackBar", () => {
      const message = "Test message";
      const expectedOptions = {
        verticalPosition: snackBarService.verticalPosition,
      };

      snackBarService.openSnackBar(message);

      expect(snackBarMock.open).toHaveBeenCalledWith(
        message,
        "Close",
        expectedOptions
      );
    });
  });
});
