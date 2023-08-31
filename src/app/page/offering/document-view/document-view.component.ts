import { environment } from "../../../../environments/environment";
import { ActivatedRoute } from "@angular/router";
import {
  Component,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { Subject } from "rxjs";
import WebViewer, { WebViewerInstance } from "@pdftron/webviewer";
@Component({
  selector: "app-document-view",
  templateUrl: "./document-view.component.html",
  styleUrls: ["./document-view.component.scss"],
})
export class DocumentViewComponent implements OnInit {
  @ViewChild("viewer") viewer: ElementRef;
  wvInstance: WebViewerInstance;
  @Output() coreControlsEvent: EventEmitter<string> = new EventEmitter();

  private documentLoaded$: Subject<void>;
  type = "pdf";
  filename = "";
  API_URL = environment.API_URL;
  constructor(private _route: ActivatedRoute) {
    this.documentLoaded$ = new Subject<void>();
  }

  ngOnInit() {
    this._route.queryParamMap.subscribe((params) => {
      this.filename = params.get("filename");
      this.type = params.get("type");
    });
  }
  ngAfterViewInit(): void {
    console.log(this.type);
    WebViewer(
      {
        path: "../../../assets/lib",
        initialDoc: `${this.API_URL}/attachment?filename=${this.filename}`,
        extension: this.type,
        // "../../../assets/pptx/test-file.pptx",
      },
      this.viewer.nativeElement
    ).then((instance) => {
      // this.wvInstance = instance;

      // this.coreControlsEvent.emit(instance.UI.LayoutMode.Single);

      const { documentViewer, Annotations, annotationManager } = instance.Core;
      instance.UI.disableElements(["toolbarGroup-Shapes"]);
      instance.UI.disableElements(["toolbarGroup-Edit"]);
      instance.UI.disableElements(["toolbarGroup-Insert"]);
      instance.UI.disableElements(["toolbarGroup-View"]);
      instance.UI.disableElements(["toolbarGroup-Annotate"]);
      instance.UI.disableElements(["toolbarGroup-Forms"]);
      instance.UI.disableElements(["toolbarGroup-FillAndSign"]);
      instance.UI.disableElements(["tool-group-buttons-scroll"]);
      // instance.UI.openElements(["notesPanel"]);

      // documentViewer.addEventListener("annotationsLoaded", () => {
      //   console.log("annotations loaded");
      // });

      documentViewer.addEventListener("documentLoaded", () => {
        this.documentLoaded$.next();
        // const rectangleAnnot = new Annotations.RectangleAnnotation({
        //   PageNumber: 1,
        //   // values are in page coordinates with (0, 0) in the top left
        //   X: 100,
        //   Y: 150,
        //   Width: 200,
        //   Height: 200,
        //   Author: annotationManager.getCurrentUser(),
        // });
        // annotationManager.addAnnotation(rectangleAnnot);
        // annotationManager.redrawAnnotation(rectangleAnnot);
      });
    });
  }

  getDocumentLoadedObservable() {
    return this.documentLoaded$.asObservable();
  }
}
