import * as THREE from 'three';

export default class Ball {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  ball: THREE.Mesh;
  x: number;
  y: number;
  vx: number;
  vy: number;
  m: number;
  scene: THREE.Scene;
  linePoints: THREE.Vector3[] = [];
  lines: THREE.Line[] = [];
  lineMaterial = new THREE.LineBasicMaterial({ color: 0xbbbbbb });
  constructor(
    x: number,
    y: number,
    vx: number,
    vy: number,
    m: number,
    scene: THREE.Scene
  ) {
    this.geometry = new THREE.SphereGeometry(m, 40, 40);
    this.material = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    this.ball = new THREE.Mesh(this.geometry, this.material);
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.m = m;
    this.scene = scene;
    scene.add(this.ball);
  }
  run() {
    if (this.x > 300) {
      this.vx = -Math.abs(this.vx);
    } else if (this.x < -300) {
      this.vx = Math.abs(this.vx);
    }
    if (this.y > 150) {
      this.vy = -Math.abs(this.vy);
    } else if (this.y < -150) {
      this.vy = Math.abs(this.vy);
    }
    this.x += this.vx;
    this.y += this.vy;
    this.ball.position.set(this.x, this.y, 0);
  }
  getPosition() {
    return this.ball.position;
  }
  computeLines(arr: THREE.Vector3[], index: number) {
    this.linePoints = [];
    arr.forEach((v, i) => {
      if (i > index) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        if (dx * dx + dy * dy < 800) {
          this.linePoints.push(v);
        }
      }
    });

    if (this.linePoints.length > this.lines.length) {
      this.linePoints.forEach((linePoint, i) => {
        if (!this.lines[i]) {
          const line = new THREE.Line(
            new THREE.BufferGeometry(),
            this.lineMaterial
          );
          this.scene.add(line);
          this.lines.push(line);
        }
        const points: THREE.Vector3[] = [];
        points.push(new THREE.Vector3(this.x, this.y, 0), linePoint);
        this.lines[i].geometry.setFromPoints(points);
      });
    } else {
      this.lines.forEach((line, i) => {
        if (this.linePoints[i]) {
          const points: THREE.Vector3[] = [];
          points.push(new THREE.Vector3(this.x, this.y, 0), this.linePoints[i]);
          line.geometry.setFromPoints(points);
        } else {
          this.scene.remove(line);
          line.geometry.dispose();
        }
      });
      this.lines = this.lines.slice(0, this.linePoints.length);
    }
  }
}
