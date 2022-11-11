import * as THREE from 'three';

export default class ArcCurve {
  geometry: THREE.BufferGeometry
  material: THREE.Material
  constructor(){
    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
  }
  getArc(x: number, y: number, radius: number, angle1: number, angle2: number) {
    const arc = new THREE.ArcCurve(x, y, radius, angle1 * Math.PI, angle2 * Math.PI, false);
    const points = arc.getPoints(50);
    this.geometry.setFromPoints(points);
    return new THREE.Line(this.geometry, this.material)
  }
  getSqure(x: number, y: number, radius: number, angle: number) {
    const points = new Float32Array([
      x + radius, y + radius, 0,
      x - radius, y + radius, 0,
      x - radius, y - radius, 0,
      x + radius, y - radius, 0,
      x + radius, y + radius, 0,
    ])
    this.geometry.attributes.position = new THREE.BufferAttribute(points, 3)
    return new THREE.Line(this.geometry, this.material)
  }
  getStar(x: number, y: number, radius: number, angle1: number, angle2: number) {
    const arc = new THREE.ArcCurve(x, y, radius, angle1 * Math.PI, angle2 * Math.PI, false);
    const arcPoints = arc.getPoints(5);
    const points = new Float32Array([
      arcPoints[0].x, arcPoints[0].y, 0,
      arcPoints[2].x, arcPoints[2].y, 0,
      arcPoints[4].x, arcPoints[4].y, 0,
      arcPoints[1].x, arcPoints[1].y, 0,
      arcPoints[3].x, arcPoints[3].y, 0,
      arcPoints[0].x, arcPoints[0].y, 0,
    ])
    console.log(arcPoints)
    this.geometry.attributes.position = new THREE.BufferAttribute(points, 3)
    return new THREE.Line(this.geometry, this.material)
  }

}
