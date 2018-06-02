// tslint:disable:no-magic-numbers
import { LoggingViewerModalManager } from "./logging-viewer-modal.manager";

describe("LoggingViewerModalManager", () => {

	const loggerStub = jasmine.createSpyObj("logger", ["entry", "exit"]);

	const loggingServiceStub = jasmine.createSpyObj("loggingService", ["getLogger"]);
	loggingServiceStub.getLogger.and.returnValue(loggerStub);

	class ModalStub {
		private onDidDismissCallback: () => void;
		public present(): Promise<void> {
			return Promise.resolve();
		}
		public onDidDismiss(callback: () => void): void {
			this.onDidDismissCallback = callback;
		}
		public dismiss(): void {
			this.onDidDismissCallback();
		}
	}
	const modalStub = new ModalStub();

	const modalControllerStub = jasmine.createSpyObj("modalController", ["create"]);
	modalControllerStub.create.and.returnValue(modalStub);

	describe("constructor", () => {

		it("gets correct named logger", () => {

			// tslint:disable-next-line:no-unused-expression
			new LoggingViewerModalManager(modalControllerStub, loggingServiceStub);

			expect(loggingServiceStub.getLogger).toHaveBeenCalledWith("Ionic.Logging.Viewer.Modal.Manager");
		});

		it("logs entry and exit", () => {

			// tslint:disable-next-line:no-unused-expression
			new LoggingViewerModalManager(modalControllerStub, loggingServiceStub);

			expect(loggerStub.entry).toHaveBeenCalledWith("ctor");
			expect(loggerStub.exit).toHaveBeenCalledWith("ctor");
		});
	});

	describe("openModal(): Promise<void>", () => {

		it("presents modal", (done) => {

			const manager = new LoggingViewerModalManager(modalControllerStub, loggingServiceStub);
			spyOn(modalStub, "present").and.callThrough();

			manager.openModal()
				.then(() => {
					expect(modalStub.present).toHaveBeenCalled();
					done();
				});
		});

		it("language is passed", (done) => {

			const manager = new LoggingViewerModalManager(modalControllerStub, loggingServiceStub);

			manager.openModal("xx")
				.then(() => {
					expect(modalControllerStub.create.calls.mostRecent().args[1])
						.toEqual({
							language: "xx",
							translation: undefined,
						});
					done();
				});
		});

		it("translation is passed", (done) => {

			const manager = new LoggingViewerModalManager(modalControllerStub, loggingServiceStub);

			manager.openModal(undefined, { title: "ttt", cancel: "bc", searchPlaceholder: "sp" })
				.then(() => {
					expect(modalControllerStub.create.calls.mostRecent().args[1])
						.toEqual({
							language: undefined,
							translation: { title: "ttt", cancel: "bc", searchPlaceholder: "sp" },
						});
					done();
				});
		});

		it("language and translation is passed", (done) => {

			const manager = new LoggingViewerModalManager(modalControllerStub, loggingServiceStub);

			manager.openModal("xx", { title: "ttt", cancel: "bc", searchPlaceholder: "sp" })
				.then(() => {
					expect(modalControllerStub.create.calls.mostRecent().args[1])
						.toEqual({
							language: "xx",
							translation: { title: "ttt", cancel: "bc", searchPlaceholder: "sp" },
						});
					done();
				});
		});
	});

	describe("modalClosed: EventEmitter<void>()", () => {

		it("event is triggered when modal gets closed", (done) => {

			const manager = new LoggingViewerModalManager(modalControllerStub, loggingServiceStub);
			manager.modalClosed.subscribe(() => {
				done();
			});

			manager.openModal()
				.then(() => {
					modalStub.dismiss();
				});
		});
	});
});
