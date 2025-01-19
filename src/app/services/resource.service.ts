import { Injectable, signal } from '@angular/core';
import { LoadingManager, TextureLoader } from 'three';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  static instance: ResourceService;

  private loadingManager = new LoadingManager();

  public isDesertSceneLoaded = signal<boolean>(false);
  public isDeskSceneLoaded = signal<boolean>(false);
  public isProjectSceneLoaded = signal<boolean>(false);

  public texture = new TextureLoader(this.loadingManager);

  constructor() { ResourceService.instance = this }

  public startLoadTextures() {
    this.loadingManager.onStart = () => { console.log('inizio caricamento') }
    this.loadingManager.onProgress = (url, itemsLoaded, tota) => { console.log(url, 'caricato ' + itemsLoaded, tota) }
    this.loadingManager.onLoad = () => { console.log('fine caricamento') }
  }


  // loadTexture(url: string) {
  //   if (!this.resourcesCache.has(url)) {
  //     // const resource = rxResource({
  //     //   request: () =>
  //     //     new Promise((resolve, reject) => {
  //     //       const loader = new TextureLoader();
  //     //       loader.load(url, resolve, undefined, reject);
  //     //     }),
  //     // });
  //     // this.resourcesCache.set(url, resource);
  //   }
  //   return this.resourcesCache.get(url);
  // }
}
