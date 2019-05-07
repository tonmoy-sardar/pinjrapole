import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { MainService } from '../../core/services/main.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

//import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';


//declare var cordova: any;
//import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';

//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
//import { File } from '@ionic-native/file';

/**
 * Generated class for the ManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// const options: DocumentViewerOptions = {
//   title: 'My PDF'
// }

@IonicPage()
@Component({
  selector: 'page-magazine',
  templateUrl: 'magazine.html',
})
export class MagazinePage {

  allMagazineList: any = [];
  

  constructor(
    private spinnerDialog: SpinnerDialog,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public mainService: MainService,
    private iab: InAppBrowser
    //private transfer: FileTransfer,

    // private file: File
    //private document: DocumentViewer,
    //private transfer: FileTransfer, private file: File
    ) {
      
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MagazinePage');
    this.menuCtrl.close();

    this.getMagazineList()

    
  }


  getMagazineList() {
    this.spinnerDialog.show();
    this.mainService.getMagazineList().subscribe(
      res => {
        this.allMagazineList = res.data;
        //console.log(this.allMagazineList);
        this.spinnerDialog.hide();
      },
      error => {
        this.spinnerDialog.hide();
      }
    )
  }

  viewPdfFile(allMagazine) {
    var pdfUrl = allMagazine.magazine_file;

    console.log(allMagazine);
    console.log(pdfUrl );
    
    //this.document.viewDocument(pdfUrl, 'application/pdf', options);
  }

  

  openWebpage(url: string) {
    // const options: InAppBrowserOptions = {
    //   zoom: 'no'
    // }

    this.iab.create(url, '_system');

    // Opening a URL and returning an InAppBrowserObject
    //const browser = this.iab.create(url, '_system');
    //window.open(‘http://example.com’, ‘_system’);	Loads in the system browser 

   // Inject scripts, css and more with browser.X
  }

}
