// tslint:disable-next-line:no-reference
/// <reference path="../node_modules/@types/jasmine/index.d.ts" />

// tslint:disable:no-magic-numbers
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";

import { LoggingService } from "ionic-logging-service";

import { LoggingViewerFilterService } from "./logging-viewer-filter.service";
import { LoggingViewerSearchComponent } from "./logging-viewer-search.component";

describe("LoggingViewerSearchComponent", () => {

	let component: LoggingViewerSearchComponent;
	let fixture: ComponentFixture<LoggingViewerSearchComponent>;
	let loggingService: LoggingService;
	let loggingViewerFilterService: LoggingViewerFilterService;

	const loggerStub = jasmine.createSpyObj("logger", ["entry", "exit"]);

	const loggingServiceStub = jasmine.createSpyObj("loggingServiceStub",
		["getLogger"]);
	loggingServiceStub.getLogger.and.returnValue(loggerStub);

	beforeEach(async(() => {
		TestBed
			.configureTestingModule({
				declarations: [
					LoggingViewerSearchComponent,
				],
				imports: [
					IonicModule.forRoot(undefined),
				],
				providers: [
					{ provide: LoggingService, useValue: loggingServiceStub },
					LoggingViewerFilterService,
				],
			})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoggingViewerSearchComponent);
		fixture.detectChanges();

		component = fixture.componentInstance;

		loggingService = TestBed.get(LoggingService);
		loggingViewerFilterService = TestBed.get(LoggingViewerFilterService);
	});

	describe("constructor", () => {

		it("gets correct named logger", () => {

			expect(loggingServiceStub.getLogger).toHaveBeenCalledWith("Ionic.Logging.Viewer.Search.Component");
		});
	});

	describe("filterChangedSubscription", () => {

		it("event updates search value", () => {

			loggingViewerFilterService.search += "X";

			expect(component.search).toBe(loggingViewerFilterService.search);
		});
	});

	describe("onSearchChanged", () => {

		it("updates value in filter service", () => {

			component.search += "Y";
			component.onSearchChanged();

			expect(loggingViewerFilterService.search).toBe(component.search);
		});
	});
});
