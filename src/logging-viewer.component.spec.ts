// tslint:disable-next-line:no-reference
/// <reference path="../node_modules/@types/jasmine/index.d.ts" />

// tslint:disable:no-magic-numbers
import { EventEmitter } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";

import { LoggingService, LogMessage } from "ionic-logging-service";

import { LoggingViewerFilterService } from "./logging-viewer-filter.service";
import { LoggingViewerComponent } from "./logging-viewer.component";

describe("LoggingViewerComponent", () => {

	let component: LoggingViewerComponent;
	let fixture: ComponentFixture<LoggingViewerComponent>;
	let loggingService: LoggingService;

	const loggerStub = jasmine.createSpyObj("logger", ["entry", "exit"]);

	const loggingServiceEventEmitter = new EventEmitter<LogMessage>();
	const loggingServiceStub = jasmine.createSpyObj("loggingServiceStub",
		["getLogger", "getLogMessages", "logMessagesChanged"]);
	loggingServiceStub.getLogger.and.returnValue(loggerStub);
	loggingServiceStub.getLogMessages.and.returnValue([]);
	loggingServiceStub.logMessagesChanged = loggingServiceEventEmitter;

	beforeEach(async(() => {
		TestBed
			.configureTestingModule({
				declarations: [
					LoggingViewerComponent,
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
		fixture = TestBed.createComponent(LoggingViewerComponent);
		fixture.detectChanges();

		component = fixture.componentInstance;

		loggingService = TestBed.get(LoggingService);
	});

	describe("constructor", () => {

		it("gets correct named logger", () => {

			expect(loggingServiceStub.getLogger).toHaveBeenCalledWith("Ionic.Logging.Viewer.Component");
		});

	});
});
