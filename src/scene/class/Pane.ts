import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";
import { PaneData } from "./type";

export class Pane extends THREE.Group {
  isVideoPane: boolean;
  isPlaying: boolean;
  isHovered: boolean;
  isActive: boolean;
  paneWidth: number;
  paneName: string;
  paneID: number;
  videoTexture: THREE.VideoTexture | undefined;
  textureLoader: THREE.TextureLoader;
  initialRotation: THREE.Euler;
  hasContentLoaded: boolean;
  progresOverlay: THREE.Mesh | null = null;
  angleIncrement = (2 * Math.PI) / 15;
  trackProgres = 0;
  radius = 16;

  constructor(data: PaneData) {
    super();
    this.paneName = data.paneName;
    this.isActive = data.isActive;
    this.isHovered = data.isHovered;
    this.isPlaying = data.isPlaying;
    this.paneWidth = data.paneWidth;
    this.paneID = data.paneID;
    this.isVideoPane = data.isVideoPane;
    this.hasContentLoaded = false;
    this.textureLoader = new THREE.TextureLoader();
    this.initialRotation = new THREE.Euler();
  }

  loadTexture = async (path: string) => {
    return await this.textureLoader.loadAsync(`textures/${path}`);
  };

  createMesh = async (isPaneBase: boolean) => {
    const isVideoPane = this.isVideoPane;
    let geometry;
    let path;
    let texture;

    if (isPaneBase) {
      geometry = new RoundedBoxGeometry(this.paneWidth, 9, 0.1, undefined);
      path = `images/image-${this.paneID + 1}.jpg`;
    } else {
      geometry = new THREE.PlaneGeometry(this.paneWidth, 9);
      path = `overlays/overlay${this.paneID + 1}.png`;
    }

    if (isVideoPane && isPaneBase) {
      texture = this.initVideoTexture();
    } else {
      texture = await this.loadTexture(path);
    }

    const material = this.createMaterial(texture, isPaneBase);

    return new THREE.Mesh(geometry, material);
  };

  calculateWidth = () => {
    const widthInUnits = 15;
    const heightInUnits = 9;
    const pixelsPerUnit = 10;
    const devicePixelRatio = window.devicePixelRatio || 1;

    const widthInPixels = widthInUnits * pixelsPerUnit * devicePixelRatio;
    const heightInPixels = heightInUnits * pixelsPerUnit * devicePixelRatio;

    console.log("Width in Pixels:", widthInPixels);
    console.log("Height in Pixels:", heightInPixels);
  };
  createMaterial = (texture: THREE.Texture, isPaneBase: boolean) => {
    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.FrontSide,
      transparent: !isPaneBase,
    });
  };

  createProgresOverlay = () => {
    const geometry = new RoundedBoxGeometry(3, 9, 0.001);
    const material = new THREE.MeshBasicMaterial({
      color: "black",
      opacity: 0.3,
      transparent: true,
      side: THREE.FrontSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = 0.1;
    return mesh;
  };

  addPanesToScene = async () => {
    const paneBaseMesh = await this.createMesh(true);
    paneBaseMesh.layers.enable(1);

    this.progresOverlay = this.createProgresOverlay();
    this.add(this.progresOverlay, paneBaseMesh);

    const isFirst = this.paneID === 0;
    this.isActive = isFirst;
  };

  getVideoSrc = () => `/textures/videos/video-${this.paneID}.mp4`;

  initVideoTexture = () => {
    const video = document.createElement("video");
    video.src = this.getVideoSrc();
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.play();
    return new THREE.VideoTexture(video);
  };

  positionPane = () => {
    const angle = this.paneID * this.angleIncrement;
    const x = this.radius * Math.cos(angle);
    const y = this.radius * Math.sin(angle);
    this.position.set(x, 0, y);
    this.lookAt(0, 0, 0);
    this.initialRotation.copy(this.rotation);
  };

  init = async () => {
    this.positionPane();
    this.initVideoTexture();
    await this.addPanesToScene();
    this.animate();
  };

  updateProgresOverlay = () => {
    const trackProgres = this.trackProgres;
    const paneWidth = this.paneWidth;
    const scaleX = (paneWidth * trackProgres) / 100;
    this.progresOverlay!.scale.x = scaleX / 3;
  };

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.updateProgresOverlay();
  }
}
