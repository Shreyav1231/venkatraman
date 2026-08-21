import { Suspense, useEffect } from 'react'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, Html, ContactShadows } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import * as THREE from 'three'

// The desk scene is the default view of the website, with 3D models of a desk, monitor, and phone

const MONITOR_OBJECT  = 'Cube'
const RESUME_OBJECT   = 'Resume_Paper'
const PHONE_OBJECTS   = new Set(['основа_телефона', 'Трубка', 'диск', 'ограничитель_диска', 'провод'])
const CAT_OBJECT      = 'Cone.001'
const CLICKABLE       = new Set([MONITOR_OBJECT, RESUME_OBJECT, CAT_OBJECT, ...PHONE_OBJECTS])

function DesktopModel({ onOpen, onResumeOpen, onSocialsOpen, onHobbiesOpen }) {
  const base = import.meta.env.BASE_URL
  const materials = useLoader(MTLLoader, `${base}3d-models/desktop_with_resume.mtl`)
  const obj = useLoader(OBJLoader, `${base}3d-models/desktop_with_resume.obj`, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

  const getClickedName = (e) => e.object.name || e.object.parent?.name || ''

  const handleClick = (e) => {
    e.stopPropagation()
    const name = getClickedName(e)
    if (name === MONITOR_OBJECT)  onOpen()
    if (name === RESUME_OBJECT)   onResumeOpen()
    if (name === CAT_OBJECT)      onHobbiesOpen && onHobbiesOpen()
    if (PHONE_OBJECTS.has(name))  onSocialsOpen()
  }

  const handlePointerOver = (e) => {
    if (CLICKABLE.has(getClickedName(e))) document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => { document.body.style.cursor = 'default' }

  return (
    <primitive
      object={obj}
      rotation={[0, Math.PI, 0]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  )
}

// Computes the scene bounding box and positions the camera from a front-right
// angle at desk level so the table surface (and resume) are clearly visible.
function AutoCamera() {
  const { camera, scene } = useThree()

  useEffect(() => {
    // Wait one frame so the model is in the scene graph
    const id = requestAnimationFrame(() => {
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      const size   = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)

      // Position camera front-right at ~desk-top height, looking at the center
      const dist = maxDim * 1.4
      camera.position.set(center.x + dist * 0.4, center.y + dist * 0.15, center.z + dist)
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
        loading...
      </span>
    </Html>
  )
}

export default function Scene({ onOpen, onResumeOpen, onSocialsOpen, onHobbiesOpen }) {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 50 }}
      style={{ position: 'fixed', inset: 0 }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[-4, 6, 6]}  intensity={1.4} />
      <directionalLight position={[6, 2, 4]}   intensity={0.6} />
      <directionalLight position={[0, 4, -8]}  intensity={0.35} />

      <Suspense fallback={<Loader />}>
        <DesktopModel onOpen={onOpen} onResumeOpen={onResumeOpen} onSocialsOpen={onSocialsOpen} onHobbiesOpen={onHobbiesOpen} />
        <AutoCamera />
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.5}
          scale={20}
          blur={2.5}
        />
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI * 0.85}
        minDistance={1}
        maxDistance={50}
      />
    </Canvas>
  )
}
