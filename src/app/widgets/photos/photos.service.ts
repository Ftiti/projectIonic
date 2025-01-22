import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import { FileSystemService } from '../file-system/file-system.service';

export interface IPhoto {
  filepath: string;
  webviewPath?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  public photos: IPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';

  constructor(
    private platform: Platform,
    private fileSystem: FileSystemService
  ) {
    this.platform = platform;
  }


  public async addNewToGallery(type:string, quality:number) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: quality
    });
    const savedImageFile = await this.savePicture(capturedPhoto);    
    this.photos.unshift(savedImageFile);
    Preferences.set({
      key: `${this.PHOTO_STORAGE}/${type}`,
      value: JSON.stringify(this.photos),
    });
  } 

  private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  private async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = this.fileSystem.readFile(photo.path!);
      return (await file).data;
    } else {
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  private async savePicture(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    const fileName = Date.now() + '.jpeg';
    const saved = await this.fileSystem.writeFile(fileName, base64Data);
    if (this.platform.is('hybrid')) {
      return {
        filepath: saved.uri,
        webviewPath: Capacitor.convertFileSrc(saved.uri),
      };
    } else {
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  }

  public async loadSaved(type:string) {
    const { value } = await Preferences.get({
      key: `${this.PHOTO_STORAGE}/${type}`,
    });
    this.photos = (value ? JSON.parse(value) : []) as IPhoto[];    
    if (!this.platform.is('hybrid')) {      
      for (let photo of this.photos) {
        const readFile = await this.fileSystem.readFile(photo.filepath);        
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }

  public async  deletePhoto(path:string , type:string){
    const photoIndex = this.photos.findIndex(photo => photo.filepath === path);
    if (photoIndex === -1) {
      return;
    }
    this.photos.splice(photoIndex, 1);
    const deletedFile = await this.fileSystem.deleteFile(path)
    await Preferences.set({
      key: `${this.PHOTO_STORAGE}/${type}`,
      value: JSON.stringify(this.photos),
    });
    return deletedFile
  }
}
