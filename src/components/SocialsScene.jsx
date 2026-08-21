import { Suspense, useEffect } from 'react'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import * as THREE from 'three'

const LINKEDIN_URL = 'https://www.linkedin.com/in/shreya-venkatraman'
const GITHUB_URL   = 'https://github.com/Shreyav1231'

function SocialsModel() {
  const base = import.meta.env.BASE_URL
  const materials = useLoader(MTLLoader, `${base}3d-models/socials.mtl`)
  const obj = useLoader(OBJLoader, `${base}3d-models/socials.obj`, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

  const getName = (e) => e.object.name || e.object.parent?.name || ''

  const handleClick = (e) => {
    e.stopPropagation()
    const name = getName(e)
    if (name === 'Curve.001') { window.open(GITHUB_URL,   '_blank'); return }
    if (name.startsWith('Curve')) window.open(LINKEDIN_URL, '_blank')
  }

  const handlePointerOver = (e) => {
    const name = getName(e)
    if (name.startsWith('Curve')) document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => { document.body.style.cursor = 'default' }

  return (
    <primitive
      object={obj}
      rotation={[Math.PI / 2, Math.PI, 0]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  )
}

function AutoCamera() {
  const { camera, scene } = useThree()

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const box    = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      const size   = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const dist   = maxDim * 1.0
      camera.position.set(center.x, center.y + dist * 0.45, center.z + dist)
      camera.lookAt(center)
      camera.updateProjectionMatrix()
    })
    return () => cancelAnimationFrame(id)
  }, [camera, scene])

  return null
}

export default function SocialsScene() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 4, 4]} intensity={1.3} />
      <directionalLight position={[-2, 2, -2]} intensity={0.4} />

      <Suspense fallback={
        <Html center>
          <span style={{ color: '#50fa7b', fontFamily: 'monospace', fontSize: 14 }}>loading...</span>
        </Html>
      }>
          <SocialsModel />
        <AutoCamera />
      </Suspense>

      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  )
}
