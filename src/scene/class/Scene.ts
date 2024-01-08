import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import _, { DebouncedFunc, partial } from "lodash";
import { Pane } from "./Pane";
import { Panes } from "./config";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { MouseEventHandler, WheelEventHandler } from "react";

interface SceneProps {
  rendererContainer: HTMLDivElement | null;
  handleProgress: (progress: number) => void;
  onRotation: (isAnimating: boolean) => void;
  onPlay: (trackID: number, isPlaying: boolean) => void;
}

interface tweenTo {
  [key: string]: string | number;
}

type OnWheelHandler = (
  e?: WheelEvent,
  triggeredByNavigation: boolean,
  progress?: number
) => void;

type IntersectionType = Array<THREE.Object3D<THREE.Object3DEventMap> & Pane>;

export class Scene {
  _rendererContainer: HTMLDivElement | null;
  _scene: THREE.Scene;
  _canvas: HTMLCanvasElement;
  _camera: THREE.PerspectiveCamera;
  _renderer: THREE.WebGLRenderer;
  _raycaster: THREE.Raycaster;
  _pointer: THREE.Vector2;
  _ratio: number;

  isPlaying = false;

  handleProgress: (progress: number) => void;
  handleRotation: (isAnimating: boolean) => void;
  onPlay: (trackID: number, isPlaying: boolean) => void;
  wheelHandler: unknown;

  paneGroup: THREE.Group<THREE.Object3DEventMap>;
  sphere!: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  typeCastedPanes!: IntersectionType;
  progress: number;
  absProgress: number;
  paneCount = 15;
  paneWidth = 6.5;
  radius: number = 16;
  trackProgres = 0;
  isAnimating = false;
  timeOutID = 0;
  prevValue = { x: 0, y: 0 };
  angleIncrement = (2 * Math.PI) / 15;

  constructor({
    rendererContainer,
    handleProgress,
    onRotation,
    onPlay,
  }: SceneProps) {
    this._rendererContainer = rendererContainer;
    this._canvas = document.createElement("canvas");
    this._rendererContainer?.appendChild(this._canvas);
    this._raycaster = new THREE.Raycaster();
    this._pointer = new THREE.Vector2();

    const rendererOptions = {
      canvas: this._canvas,
      antialias: true,
      alpha: true,
    };
    this._renderer = new THREE.WebGLRenderer(rendererOptions);

    this._renderer.setSize(window.innerWidth, window.innerHeight);

    this._scene = new THREE.Scene();
    this._ratio = window.innerWidth / window.innerHeight;
    this._camera = new THREE.PerspectiveCamera(45, this._ratio);

    this._camera.lookAt(this.angleIncrement * 5 - 0.104, 0, 0);

    this.handleProgress = handleProgress;
    this.onPlay = onPlay;
    this.handleRotation = onRotation;
    this.paneGroup = new THREE.Group();

    this.progress = 0;
    this.absProgress = Math.abs(this.progress);

    this.addContainerSphere();
    this.addPanes();
    this.resetPlaneRotations();

    document.addEventListener("wheel", this.createDebouncedEventListener());
    document.addEventListener("click", this.clickHandler);
  }

  async init() {
    this._raycaster.layers.set(1);
  }

  addContainerSphere = () => {
    const widthSegments = 10;
    const heightSegments = 10;
    const sphereGeometry = new THREE.SphereGeometry(
      this.radius,
      widthSegments,
      heightSegments
    );

    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0,
    });

    this.sphere = new THREE.Mesh(sphereGeometry, material);
    this.typeCastedPanes = this.sphere.children as IntersectionType;
    this._scene.add(this.sphere);
  };

  addPanes = async () => {
    const paneWidth = this.paneWidth;

    Panes.forEach(async (pane, paneID) => {
      const paneItem = new Pane({ ...pane, paneWidth, paneID });
      await paneItem.init();
      this.sphere.add(paneItem);
    });
  };

  resetPlaneRotations = () => {
    this.typeCastedPanes.forEach((plane) => {
      const { x, y, z } = plane.initialRotation;
      const rotation = { x: x, y: y, z: z };
      this.rotatePlane(rotation, plane);
    });
  };

  rotatePlane = (tweenTo: tweenTo, plane: THREE.Object3D) => {
    const tween = new TWEEN.Tween(plane.rotation)
      .to(tweenTo, 800)
      .easing(TWEEN.Easing.Circular.Out);

    tween.start();
  };

  setPaneActivity = () => {
    this.typeCastedPanes.forEach((pane) => {
      const isPaneActive = pane.paneID === Math.abs(this.progress);
      pane.isActive = isPaneActive;
    });
  };

  setTrackProgress = (progres: number) => {
    const activePane = this.typeCastedPanes.find((pane) => pane.isActive);
    if (activePane) {
      activePane.trackProgres = progres;
    }
  };

  clickHandler = (e: MouseEvent) => {
    this._pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    this._pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this._raycaster.setFromCamera(this._pointer, this._camera);

    const intersects = this._raycaster.intersectObjects(this.typeCastedPanes);

    intersects.map(({ object: { parent } }) => {
      this.isPlaying = !this.isPlaying;
      this.onPlay(parent?.paneID, this.isPlaying);

      console.log(parent?.isActive);
    });
  };

  createDebouncedEventListener = () => {
    const options = { maxWait: 100 };
    const wheelHandler = _.debounce(this.onWheel, 300, options);

    return wheelHandler as unknown as (
      this: Document,
      ev: WheelEvent
    ) => unknown;
  };

  onWheel: OnWheelHandler = (e, triggeredByNavigation, progress = 0): void => {
    triggeredByNavigation ? (this.progress = -progress) : this.progress--;

    this.handleProgress(Math.abs(this.progress));

    const angleIncrement = (2 * Math.PI) / 15;
    const tweento = { y: -(this.progress * angleIncrement) };

    new TWEEN.Tween(this.sphere.rotation)
      .to(tweento, 1000)
      .easing(TWEEN.Easing.Back.Out)
      .onStart(this.onWheelAnimationStart)
      .onComplete(this.onWheelAnimationEnd)
      .start();

    this.setPaneActivity();
    this.resetPlaneRotations();
  };

  onWheelAnimationStart = () => {
    clearTimeout(this.timeOutID);
    this.handleRotation(true);
    this.isAnimating = true;
  };

  onWheelAnimationEnd = () => {
    this.timeOutID = setTimeout(() => {
      this.handleRotation(false);
      this.isAnimating = false;
    }, 300);
  };

  animate() {
    this._renderer.render(this._scene, this._camera);
    TWEEN.update();
    requestAnimationFrame(this.animate.bind(this));
  }
}
