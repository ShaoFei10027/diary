import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Ball from './Ball';

let idleId: any;

export default function Background(props: any) {
  const ref = useRef<HTMLDivElement>(null);
  const clearScene = (scene: THREE.Scene) => {
    scene.traverse((child: any) => {
      if (child.material) {
        child.material.dispose();
      }
      if (child.geometry) {
        child.geometry.dispose();
      }
      child = null;
    });
    scene.clear();
  };
  useEffect(() => {
    const dom: HTMLDivElement = ref.current as HTMLDivElement;
    const camera = new THREE.PerspectiveCamera(
      70,
      dom.offsetWidth / dom.offsetHeight,
      0.1,
      1000
    );
    let renderer = new THREE.WebGLRenderer({ alpha: true });
    const scene = new THREE.Scene();
    const timer = setTimeout(() => {
      renderer.setSize(dom.offsetWidth, dom.offsetHeight);
      dom.appendChild(renderer.domElement);

      var ambient = new THREE.AmbientLight(0xbbbbbb);
      scene.add(ambient);
      // var point = new THREE.PointLight(0xffffff);
      // // 光源位置设置
      // point.position.set(400, -200, 300);
      // scene.add(point);

      camera.position.x = 0;
      camera.position.z = 200;
      camera.position.y = 0;
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      const arr = new Array(40).fill(undefined);
      const objs = arr.map(
        (v) =>
          new Ball(
            480 * Math.random() - 240,
            120 * Math.random() - 60,
            1 * Math.random() - 0.5,
            1 * Math.random() - 0.5,
            0.5,
            scene
          )
      );
      function animate() {
        if (window.requestIdleCallback) {
          idleId = window.requestIdleCallback(animate);
          const pointsArray = objs.map((v) => {
            v.run();
            return v.getPosition();
          });
          objs.forEach((obj, i) => {
            obj.computeLines(pointsArray, i);
          });
          renderer.render(scene, camera);
        }
      }
      animate();
    }, 600);
    function onResize() {
      renderer.setSize(dom.offsetWidth, dom.offsetHeight);
      camera.aspect = dom.offsetWidth / dom.offsetHeight;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(timer);
      try {
        clearScene(scene);
        dom.innerHTML = '';
        renderer.dispose();
        renderer.forceContextLoss();
        // @ts-ignore
        renderer.domElement = null;
        // @ts-ignore
        renderer.content = null;
        // @ts-ignore
        renderer = null;
      } catch (error) {
        console.log(error);
      }
      if (idleId && window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);
  return <div ref={ref} {...props} />;
}
