import { Component } from '@angular/core';
import {ConfigService} from './config/config.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  file1: File;

  file2: File;

  constructor(private configService: ConfigService) { }

  title = 'pruebaangular2';

  loading: boolean = false;

  downloadSFC() {
    this.configService.getSFC().subscribe((data: any) => {
      FileSaver.saveAs(data, `MET2119246_AERMET_2019-2020.SFC`);
  });
  }

  downloadPFL() {
    this.configService.getPFL().subscribe((data: any) => {
      FileSaver.saveAs(data, `MET2119246_AERMET_2019-2020.PFL`);
  });
  }

  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        this.file1 = <File>file;

        const formData = new FormData();
    formData.append('files', file);

    }
  }
  
  onFileSelected2(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        this.file2 = <File>file;

    }
  }

  upload(){
    this.loading = true;
    this.configService.uploadFiles(this.file1, this.file2).subscribe(
      res => {
        console.log(res);
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

}
