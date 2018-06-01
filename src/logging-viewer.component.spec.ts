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
	let loggingViewerFilterService: LoggingViewerFilterService;
	const logMessages: LogMessage[] = [];

	const loggerStub = jasmine.createSpyObj("logger", ["entry", "exit"]);

	const loggingServiceEventEmitter = new EventEmitter<LogMessage>();
	const loggingServiceStub = jasmine.createSpyObj("loggingServiceStub",
		["getLogger", "getLogMessages", "logMessagesChanged"]);
	loggingServiceStub.getLogger.and.returnValue(loggerStub);
	loggingServiceStub.getLogMessages.and.returnValue(logMessages);
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
		loggingViewerFilterService = TestBed.get(LoggingViewerFilterService);
	});

	describe("constructor", () => {

		it("gets correct named logger", () => {

			expect(loggingServiceStub.getLogger).toHaveBeenCalledWith("Ionic.Logging.Viewer.Component");
		});

	});

	describe("filterLogMessages", () => {

		it("level DEBUG, search empty", () => {

			logMessages.splice(0, logMessages.length);
			logMessages.push(
				{
					level: "DEBUG",
					logger: "myLogger",
					message: ["myMessage"],
					methodName: "myMethod",
					timeStamp: new Date(),
				}, {
					level: "INFO",
					logger: "myLogger",
					message: ["myMessage", "xxx"],
					methodName: "myMethod",
					timeStamp: new Date(),
				}, {
					level: "INFO",
					logger: "myLogger",
					message: ["myMessage"],
					methodName: "myMethod",
					timeStamp: new Date(),
				});
			loggingViewerFilterService.level = "INFO";
			loggingViewerFilterService.search = "";

			// logMessagesChanged calls indirectly filterLogMessages
			loggingService.logMessagesChanged.emit();

			expect(component.logMessagesForDisplay.length).toBe(2);
		});
	});

	describe("filterLogMessagesByLevel", () => {

		it("message with same level returns true", () => {

			const logMessage = {
				level: "DEBUG",
				logger: "myLogger",
				message: ["myMessage"],
				methodName: "myMethod",
				timeStamp: new Date(),
			};
			loggingViewerFilterService.level = "DEBUG";
			loggingViewerFilterService.search = "";

			const result = component.filterLogMessagesByLevel(logMessage);

			expect(result).toBeTruthy();
		});

		it("message with higher level returns true", () => {

			const logMessage = {
				level: "INFO",
				logger: "myLogger",
				message: ["myMessage"],
				methodName: "myMethod",
				timeStamp: new Date(),
			};
			loggingViewerFilterService.level = "DEBUG";
			loggingViewerFilterService.search = "";

			const result = component.filterLogMessagesByLevel(logMessage);

			expect(result).toBeTruthy();
		});

		it("message with lower level returns true", () => {

			const logMessage = {
				level: "DEBUG",
				logger: "myLogger",
				message: ["myMessage"],
				methodName: "myMethod",
				timeStamp: new Date(),
			};
			loggingViewerFilterService.level = "INFO";
			loggingViewerFilterService.search = "";

			const result = component.filterLogMessagesByLevel(logMessage);

			expect(result).toBeFalsy();
		});
	});

	describe("filterLogMessagesBySearch", () => {

		it("search value is empty returns true", () => {

			const logMessage = {
				level: "DEBUG",
				logger: "myLogger",
				message: ["myMessage"],
				methodName: "myMethod",
				timeStamp: new Date(),
			};
			loggingViewerFilterService.search = "";

			const result = component.filterLogMessagesBySearch(logMessage);

			expect(result).toBeTruthy();
		});

		it("logger contains search value returns true", () => {

			const logMessage = {
				level: "DEBUG",
				logger: "myLogger",
				message: ["myMessage"],
				methodName: "myMethod",
				timeStamp: new Date(),
			};
			loggingViewerFilterService.search = "yLog";

			const result = component.filterLogMessagesBySearch(logMessage);

			expect(result).toBeTruthy();
		});

		it("logger contains search value with different casing returns true", () => {

			const logMessage = {
				level: "DEBUG",
				logger: "myLogger",
				message: ["myMessage"],
				methodName: "myMethod",
				timeStamp: new Date(),
			};
			loggingViewerFilterService.search = "ylog";

			const result = component.filterLogMessagesBySearch(logMessage);

			expect(result).toBeTruthy();
		});

		it("methodName contains search value returns true", () => {

			const logMessage = {
				level: "INFO",
				logger: "myLogger",
				message: ["myMessage"],
				methodName: "myMethod",
				timeStamp: new Date(),
			};
			loggingViewerFilterService.search = "yMeth";

			const result = component.filterLogMessagesBySearch(logMessage);

			expect(result).toBeTruthy();
		});

		it("methodName contains search value with different casing returns true", () => {

			const logMessage = {
				level: "INFO",
				logger: "myLogger",
				message: ["myMessage"],
				methodName: "myMethod",
				timeStamp: new Date(),
			};
			loggingViewerFilterService.search = "ymeth";

			const result = component.filterLogMessagesBySearch(logMessage);

			expect(result).toBeTruthy();
		});

		it("message contains search value returns true", () => {

			const logMessage = {
				level: "DEBUG",
				logger: "myLogger",
				message: ["myMessage"],
				methodName: "myMethod",
				timeStamp: new Date(),
			};
			loggingViewerFilterService.search = "yMes";

			const result = component.filterLogMessagesBySearch(logMessage);

			expect(result).toBeTruthy();
		});

		it("message contains search value with different casing returns true", () => {

			const logMessage = {
				level: "DEBUG",
				logger: "myLogger",
				message: ["myMessage"],
				methodName: "myMethod",
				timeStamp: new Date(),
			};
			loggingViewerFilterService.search = "ymes";

			const result = component.filterLogMessagesBySearch(logMessage);

			expect(result).toBeTruthy();
		});

		it("nothing contains search value returns false", () => {

			const logMessage = {
				level: "DEBUG",
				logger: "myLogger",
				message: ["myMessage"],
				methodName: "myMethod",
				timeStamp: new Date(),
			};
			loggingViewerFilterService.search = "xxx";

			const result = component.filterLogMessagesBySearch(logMessage);

			expect(result).toBeFalsy();
		});
	});
});
