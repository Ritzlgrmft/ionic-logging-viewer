// tslint:disable-next-line:no-reference
/// <reference path="../node_modules/@types/jasmine/index.d.ts" />

// tslint:disable:no-magic-numbers
import { EventEmitter } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule, NavParams, ViewController } from "ionic-angular";

import { LoggingService, LogMessage } from "ionic-logging-service";

import { LoggingViewerFilterService } from "./logging-viewer-filter.service";
import { LoggingViewerLevelsComponent } from "./logging-viewer-levels.component";
import { LoggingViewerModalComponent } from "./logging-viewer-modal.component";
import { LoggingViewerSearchComponent } from "./logging-viewer-search.component";
import { LoggingViewerComponent } from "./logging-viewer.component";

describe("LoggingViewerModalComponent", () => {

	let component: LoggingViewerModalComponent;
	let fixture: ComponentFixture<LoggingViewerModalComponent>;

	const loggerStub = jasmine.createSpyObj("logger", ["debug", "entry", "exit", "info"]);

	const loggingServiceEventEmitter = new EventEmitter<LogMessage>();
	const loggingServiceStub = jasmine.createSpyObj("loggingServiceStub", ["getLogger", "getLogMessages"]);
	loggingServiceStub.getLogger.and.returnValue(loggerStub);
	loggingServiceStub.getLogMessages.and.returnValue([]);
	loggingServiceStub.logMessagesChanged = loggingServiceEventEmitter;

	const viewControllerStub = new ViewController();

	const navParamsStub = jasmine.createSpyObj("navParams", ["get"]);
	navParamsStub.get.and.returnValue(undefined);

	beforeEach(async(() => {
		TestBed
			.configureTestingModule({
				declarations: [
					LoggingViewerComponent,
					LoggingViewerLevelsComponent,
					LoggingViewerSearchComponent,
					LoggingViewerModalComponent,
				],
				imports: [
					IonicModule.forRoot(undefined),
				],
				providers: [
					{ provide: LoggingService, useValue: loggingServiceStub },
					{ provide: ViewController, useValue: viewControllerStub },
					{ provide: NavParams, useValue: navParamsStub },
					LoggingViewerFilterService,
				],
			})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoggingViewerModalComponent);
		fixture.detectChanges();
		component = fixture.componentInstance;
	});

	describe("constructor", () => {

		it("gets correct named logger", () => {

			expect(loggingServiceStub.getLogger).toHaveBeenCalledWith("Ionic.Logging.Viewer.Modal.Component");
		});

		it("logs entry and exit", () => {

			expect(loggerStub.entry).toHaveBeenCalledWith("ctor");
			expect(loggerStub.exit).toHaveBeenCalledWith("ctor");
		});
	});

	describe("ionViewDidEnter", () => {

		it("logs entry and exit", () => {

			component.ionViewDidEnter();

			expect(loggerStub.entry).toHaveBeenCalledWith("ionViewDidEnter");
			expect(loggerStub.exit).toHaveBeenCalledWith("ionViewDidEnter");
		});
	});

	describe("onClose(): void", () => {

		it("calls viewController.dismiss()", () => {

			spyOn(viewControllerStub, "dismiss");

			component.onClose();

			expect(viewControllerStub.dismiss).toHaveBeenCalled();
		});
	});

	describe("getTranslation(): LoggingViewerTranslation", () => {

		it("known language, no translation: title is translated", () => {

			component.ngOnInit();
			component.language = "de";
			component.translation = undefined;

			const translation = component.getTranslation();

			expect(translation.title).toBe("Konfiguration");
		});

		it("unknown language, no translation: english translation is used", () => {

			component.ngOnInit();
			component.language = "fr";
			component.translation = undefined;

			const translation = component.getTranslation();

			expect(translation.title).toBe("Logging");
		});

		it("no language, no translation: english translation is used", () => {

			component.ngOnInit();
			component.language = undefined;
			component.translation = undefined;

			const translation = component.getTranslation();

			expect(translation.title).toBe("Logging");
		});

		it("no language, but translation: translation is used", () => {

			component.ngOnInit();
			component.language = undefined;
			component.translation = { title: "ttt", cancel: "bc", searchPlaceholder: "sp" };

			const translation = component.getTranslation();

			expect(translation.title).toBe("ttt");
		});

		it("language and translation: translation is used", () => {

			component.ngOnInit();
			component.language = "en";
			component.translation = { title: "ttt", cancel: "bc", searchPlaceholder: "sp" };

			const translation = component.getTranslation();

			expect(translation.title).toBe("ttt");
		});
	});
});
