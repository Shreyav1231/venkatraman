import { Suspense, useEffect } from 'react'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import * as THREE from 'three'

function BeachModel() {
  const materials = useLoader(MTLLoader, '/3d-models/BeachTutorial.mtl')
  const obj = useLoader(OBJLoader, '/3d-models/BeachTutorial.obj', (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

  return <primitive object={obj} />
}

function AutoCamera() {
  const { camera, scene } = useThree()

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const box = new THREE.Box3().setFromObject(scene)
      if (box.isEmpty()) return
      const center = box.getCenter(new THREE.Vector3())
      const size   = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const dist   = maxDim * 1.2
      camera.position.set(center.x, center.y + dist * 0.2, center.z + dist)
      camera.lookAt(center)
      camera.updateProjectionMatrix()
    })
    return () => cancelAnimationFrame(id)
  }, [camera, scene])

  return null
}

function Loader() {
  return (
    <Html center>
      <span style={{ color: '#50fa7b', fontFamily: 'monospace', fontSize: 14 }}>
        loading beach...
      </span>
    </Html>
  )
}

export default function BeachScene() {
  return (
    <Canvas
      camera={{ position: [0, 5, 20], fov: 50 }}
      style={{ position: 'fixed', inset: 0 }}
      gl={{ toneMapping: THREE.NoToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 20, 10]} intensity={1.0} />
      <directionalLight position={[-10, 10, -5]} intensity={0.6} />
      <hemisphereLight args={['#87ceeb', '#c2a97a', 0.8]} />

      <Suspense fallback={<Loader />}>
        <BeachModel />
        <AutoCamera />
      </Suspense>

      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI * 0.85}
        minDistance={1}
        maxDistance={500}
      />
    </Canvas>
  )
}
