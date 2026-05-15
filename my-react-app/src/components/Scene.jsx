import { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Html, ContactShadows, Bounds } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'

function DesktopModel({ onOpen }) {
  const materials = useLoader(MTLLoader, '/Desktop.mtl')
  const obj = useLoader(OBJLoader, '/Desktop.obj', (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

  return (
    <primitive
      object={obj}
      rotation={[0, Math.PI, 0]}
      onClick={onOpen}
      onPointerOver={() => { document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = 'default' }}
    />
  )
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

export default function Scene({ onOpen }) {
  return (
    <Canvas
      camera={{ position: [0, 1, 5], fov: 50 }}
      style={{ position: 'fixed', inset: 0 }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[-4, 6, 6]}  intensity={1.4} />
      <directionalLight position={[6, 2, 4]}   intensity={0.6} />
      <directionalLight position={[0, 4, -8]}  intensity={0.35} />

      <Suspense fallback={<Loader />}>
        <Bounds fit clip observe margin={1.2}>
          <DesktopModel onOpen={onOpen} />
        </Bounds>
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
        maxPolarAngle={Math.PI / 2}
        minDistance={1}
        maxDistance={20}
      />
    </Canvas>
  )
}
