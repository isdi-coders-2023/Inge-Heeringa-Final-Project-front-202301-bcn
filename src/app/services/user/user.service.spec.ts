import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UserService } from "./user.service";
import { UiService } from "../ui/ui.service";
import { createMockStore } from "../../spec/mockStore";
import { Store } from "@ngrx/store";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("UserService", () => {
  let userService: UserService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let uiService: UiService;
  let mockStore;

  beforeEach(() => {
    mockStore = createMockStore();

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [
        UserService,
        UiService,
        { provide: Store, useValue: mockStore },
      ],
    });

    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    uiService = TestBed.inject(UiService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should make a POST request to the login endpoint", () => {
    const credentials = { email: "test@example.com", password: "password123" };
    const mockResponse = { token: "mockToken" };

    userService.login(credentials).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${userService.userEndpoint}`);
    expect(req.request.method).toEqual("POST");
    expect(req.request.body).toEqual(credentials);

    req.flush(mockResponse);
  });

  it("should call showErrorModal when a HttpErrorResponse with an error field is thrown", () => {
    const mockError = { error: { error: "mockError" } };
    const spy = jest.spyOn(uiService, "showErrorModal");

    userService.handleError(mockError as HttpErrorResponse, uiService);
    expect(spy).toHaveBeenCalledWith(mockError.error.error);

    spy.mockRestore();
  });

  it("should call showErrorModal when a HttpErrorResponse with a message field is thrown", () => {
    const mockError = { error: "error", message: "mockError" };
    const spy = jest.spyOn(uiService, "showErrorModal");

    userService.handleError(mockError as HttpErrorResponse, uiService);
    expect(spy).toHaveBeenCalledWith(mockError.message);

    spy.mockRestore();
  });
});
