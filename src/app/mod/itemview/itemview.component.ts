import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-itemview',
  templateUrl: './itemview.component.html',
  styleUrl: './itemview.component.css'
})
export class ItemviewComponent {
    @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;
    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;
    private controls!: OrbitControls;
    private model!: THREE.Object3D;
  
    constructor(private renderer2: Renderer2) {}
  
    ngOnInit(): void {
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        this.initThreeJS();
      }
    }
  
    private initThreeJS(): void {
      const container = this.rendererContainer.nativeElement;
  
      // Scene, Camera, Renderer
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.offsetWidth, container.offsetHeight);
      this.renderer2.appendChild(container, this.renderer.domElement);
  
      // Light
      const light = new THREE.AmbientLight(0xffffff);
      this.scene.add(light);
  
      // OrbitControls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true; // Smooth controls
      this.controls.dampingFactor = 0.1;
  
      // Load a GLTF model
      const loader = new GLTFLoader();
      loader.load('assets/rainbowallay.gltf', (gltf) => {
        this.model = gltf.scene;
        this.scene.add(gltf.scene);

      });
  
      // Camera position
      this.camera.position.set(0, 1, 5);
      this.controls.update();
  
      // Animation loop
      this.animate();
    }

  
    private animate(): void {
      requestAnimationFrame(() => this.animate());
  
      // Update controls
      this.controls.update();
      // Render the scene
      this.renderer.render(this.scene, this.camera);
    }
}