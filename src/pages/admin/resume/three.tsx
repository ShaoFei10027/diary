import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ArcCurve from './components/ArcCurve';
import styles from './index.less';

export default function Resume() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    const dom: HTMLDivElement = ref.current as HTMLDivElement;
    console.log(dom);

    const camera = new THREE.PerspectiveCamera(
      70,
      dom.offsetWidth / dom.offsetHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(dom.offsetWidth, dom.offsetHeight);
    dom.appendChild(renderer.domElement);
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: '0xff0000' });
    // const cube = new THREE.Mesh(geometry, material);
    const circle = new ArcCurve().getArc(0, 0, 64, 0, 2);
    scene.add(circle);
    const squre1 = new ArcCurve().getSqure(0, 0, 45.254, 0);
    scene.add(squre1);
    const squre2 = new ArcCurve().getSqure(0, 0, 45.254, 0);
    scene.add(squre2);
    squre2.rotation.z = (1 / 6) * Math.PI;
    const squre3 = new ArcCurve().getSqure(0, 0, 45.254, 0);
    scene.add(squre3);
    squre3.rotation.z = (1 / 3) * Math.PI;

    const circle2 = new ArcCurve().getArc(0, 0, 45.254, 0, 2);
    scene.add(circle2);

    const circle3 = new ArcCurve().getArc(0, 0, 44, 0, 2);
    scene.add(circle3);

    const star = new ArcCurve().getStar(0, 0, 44, 0, 2);
    scene.add(star);

    camera.position.x = 0;
    camera.position.z = 50;
    camera.position.y = -120;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    function animate() {
      requestAnimationFrame(animate);
      circle.rotation.z += 0.01;
      circle2.rotation.z += 0.01;
      // circle3.rotation.z += 0.01;
      squre1.rotation.z += 0.01;
      squre2.rotation.z += 0.01;
      squre3.rotation.z += 0.01;
      star.rotation.z -= 0.01;
      // camera.rotation.y += 1;
      renderer.render(scene, camera);
    }
    animate();
  }, []);
  return <div ref={ref} className={styles.container}></div>;
}
