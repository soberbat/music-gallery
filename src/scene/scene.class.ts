import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import _ from "lodash";

interface SceneProps {
  rendererContainer: HTMLDivElement | null;
  handleProgress: (progress: number) => void;
}

export class Scene {
  _rendererContainer: HTMLDivElement | null;
  _scene: THREE.Scene;
  _canvas: HTMLCanvasElement;
  _camera: THREE.PerspectiveCamera;
  _renderer: THREE.WebGLRenderer;
  _ratio: number;

  handleProgress: (progress: number) => void;
  paneGroup: THREE.Group<THREE.Object3DEventMap>;
  progress: number;
  cloneCount: number = 1;
  wheelHandler: (e: WheelEvent) => void;

  constructor({ rendererContainer, handleProgress }: SceneProps) {
    this._rendererContainer = rendererContainer;
    this._canvas = document.createElement("canvas");
    this._rendererContainer?.appendChild(this._canvas);

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
    this._camera.position.z = -14;
    this._camera.lookAt(0, 0, 0);

    this.handleProgress = handleProgress;
    this.paneGroup = new THREE.Group();
    this.progress = 0;

    this.addPanes();
    this.resetPlaneRotations();

    const options = { maxWait: 100 };
    this.wheelHandler = _.debounce(this.onWheel, 300, options);

    document.addEventListener("wheel", this.wheelHandler);
    document.addEventListener("mousemove", this.onMouseMove);
  }

  resetPlaneRotations = () => {
    const panes = this.paneGroup.children;

    panes.forEach((plane) => {
      const { userData } = plane;
      const activePlane = userData.isActive;
      const planeId = userData.id;
      const planeBefore = planeId < Math.abs(this.progress) ? true : false;

      let tweenTo = { x: 0, y: 0, z: 0 };
      !activePlane && (tweenTo = { x: 0, y: planeBefore ? -0.5 : 0.5, z: 0 });

      this.rotatePlane(tweenTo, plane);
    });
  };

  rotatePlane = (tweenTo: { [key: string]: number }, plane: THREE.Object3D) => {
    const tween = new TWEEN.Tween(plane.rotation)
      .to(tweenTo, 1000)
      .easing(TWEEN.Easing.Circular.Out);

    tween.start();
  };

  onMouseMove = (event: MouseEvent) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    this.paneGroup.children.map((plane) => {
      const activePlane = plane.userData.isActive;
      const planeId = plane.userData.id;
      const planeBefore = planeId < Math.abs(this.progress) ? true : false;

      let rotation = { x: 0, y: 0, z: 0 };

      if (activePlane) {
        rotation = { y: mouseX / 4, x: mouseY / 7, z: -mouseX / 6 };
      } else {
        if (planeBefore) {
          rotation = { y: mouseX / 4 - 0.5, x: mouseY / 2, z: -mouseX / 6 };
        } else {
          rotation = { y: mouseX / 4 + 0.5, x: mouseY / 2, z: -mouseX / 6 };
        }
      }

      this.rotatePlane(rotation, plane);
    });
  };

  onWheel = (e: WheelEvent): void => {
    const paneGroup = this.paneGroup;

    const isForwards = e.deltaY > 0;
    if (!isForwards && this.progress === 0) return;
    isForwards ? (this.progress -= 1) : (this.progress += 1);

    const shouldClonePanes = Math.abs(this.progress) === this.cloneCount * 5;
    shouldClonePanes && this.clonePanes();

    this.setPaneActivity();

    const tween = new TWEEN.Tween(paneGroup.position)
      .to({ x: this.progress * 6 }, 1000)
      .easing(TWEEN.Easing.Back.Out);

    tween.start();
    this.resetPlaneRotations();
  };

  clonePanes = () => {
    const paneGroup = this.paneGroup;
    const panes = this.paneGroup.children;

    this.cloneCount++;

    const removedPanes = panes.splice(0, 4);
    const lastpane = panes[panes.length - 1];
    const lastPanePosition = lastpane.position.x;
    const lastpaneID = lastpane.userData.id;

    removedPanes.forEach(({ position, userData }, i) => {
      position.x = lastPanePosition + 5 + 5 * i;
      userData.id = lastpaneID + 1 + i;
    });

    paneGroup.add(...removedPanes);
  };

  private setPaneActivity = () => {
    const panes = this.paneGroup.children;
    panes.forEach(({ userData }) => {
      const isPaneActive = userData.id === Math.abs(this.progress);
      userData.isActive = isPaneActive;
    });
  };

  rc() {
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();
    return new THREE.Color(r, g, b);
  }

  addPanes() {
    [...Array(12)].forEach((_, index) => {
      const geometry = new THREE.PlaneGeometry(6, 8);

      const materialOptions = { color: this.rc(), side: THREE.DoubleSide };
      const material = new THREE.MeshBasicMaterial(materialOptions);
      const plane = new THREE.Mesh(geometry, material);

      const isFirst = index === 0;

      plane.userData.isActive = isFirst;
      plane.userData.id = index;
      plane.position.x = index * 6;

      this.paneGroup.add(plane);
    });

    this.paneGroup.position.x = 0;
    this._scene.add(this.paneGroup);
  }

  animate() {
    this._renderer.render(this._scene, this._camera);
    TWEEN.update();
    requestAnimationFrame(this.animate.bind(this));
  }

  async init() {}
}
