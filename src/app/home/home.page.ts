import { Component } from '@angular/core';
import { PhotosService } from '../widgets/photos/photos.service';
import { IPhoto } from '../widgets/photos/photos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(public photoService :PhotosService) {}

  async ngOnInit() {
    await this.photoService.loadSaved('test');
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery('test',50);
  }

  deletePhoto(photo:IPhoto){
    this.photoService.deletePhoto(photo.filepath,'test')
  }

}
