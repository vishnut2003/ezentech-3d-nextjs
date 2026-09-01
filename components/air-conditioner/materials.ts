import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

export type PresentationMode = 'product' | 'technical';

export type ACMaterials = ReturnType<typeof buildMaterials>;

/**
 * Simple procedural materials — no texture workflow. Geometry is what is being
 * tested here, so these only need to separate the parts convincingly:
 * satin body plastic, slightly glossier fascia, matte-black cavities, a neutral
 * grey for the grille, and a dark glass display.
 */
function buildMaterials(mode: PresentationMode) {
  const technical = mode === 'technical';

  // In technical mode the whole unit cools off a little so it sits inside the
  // navy environment instead of glowing warm against it.
  const bodyColor = technical ? '#dfe4ea' : '#f1efec';
  const fasciaColor = technical ? '#e7ebf0' : '#f8f6f3';

  const shell = new THREE.MeshStandardMaterial({
    color: bodyColor,
    roughness: 0.56,
    metalness: 0.02,
    name: 'shell',
  });

  // Physical + a light clearcoat reads as the moulded ABS front panel.
  const fascia = new THREE.MeshPhysicalMaterial({
    color: fasciaColor,
    roughness: 0.34,
    metalness: 0.03,
    clearcoat: 0.4,
    clearcoatRoughness: 0.32,
    name: 'fascia',
  });

  const louver = new THREE.MeshPhysicalMaterial({
    color: fasciaColor,
    roughness: 0.4,
    metalness: 0.03,
    clearcoat: 0.3,
    clearcoatRoughness: 0.4,
    name: 'louver',
  });

  // Open-ended boxes: we render the inside, so the material must be BackSide.
  const cavity = new THREE.MeshStandardMaterial({
    color: '#0b0e11',
    roughness: 0.95,
    metalness: 0.0,
    side: THREE.BackSide,
    name: 'cavity',
  });

  const grille = new THREE.MeshStandardMaterial({
    color: technical ? '#b9c2cc' : '#d5d4d0',
    roughness: 0.72,
    metalness: 0.04,
    name: 'grille',
  });

  const vane = new THREE.MeshStandardMaterial({
    color: '#e2e0dc',
    roughness: 0.6,
    metalness: 0.02,
    side: THREE.DoubleSide,
    name: 'vane',
  });

  const display = new THREE.MeshPhysicalMaterial({
    color: '#080b10',
    roughness: 0.16,
    metalness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    emissive: new THREE.Color('#0d1c2e'),
    emissiveIntensity: 0.45,
    name: 'display',
  });

  const indicatorOn = new THREE.MeshStandardMaterial({
    color: '#0d2b1a',
    emissive: new THREE.Color('#3ddc84'),
    emissiveIntensity: 1.6,
    roughness: 0.3,
    name: 'indicatorOn',
  });

  const indicatorIdle = new THREE.MeshStandardMaterial({
    color: '#1b1f24',
    emissive: new THREE.Color('#2b6fb0'),
    emissiveIntensity: 0.5,
    roughness: 0.35,
    name: 'indicatorIdle',
  });

  const metal = new THREE.MeshStandardMaterial({
    color: '#9299a1',
    roughness: 0.42,
    metalness: 0.85,
    name: 'metal',
  });

  const insulation = new THREE.MeshStandardMaterial({
    color: '#2a2d31',
    roughness: 0.9,
    metalness: 0.02,
    name: 'insulation',
  });

  const backplate = new THREE.MeshStandardMaterial({
    color: '#b6b5b1',
    roughness: 0.75,
    metalness: 0.15,
    name: 'backplate',
  });

  return {
    shell,
    fascia,
    louver,
    cavity,
    grille,
    vane,
    display,
    indicatorOn,
    indicatorIdle,
    metal,
    insulation,
    backplate,
  };
}

/**
 * Materials are built once per presentation mode and shared by every part, so
 * nothing is re-allocated on render. Wireframe is applied as a side effect on
 * the live materials rather than by rebuilding them.
 */
export function useACMaterials(mode: PresentationMode, wireframe: boolean): ACMaterials {
  const materials = useMemo(() => buildMaterials(mode), [mode]);

  useEffect(() => {
    for (const material of Object.values(materials)) {
      material.wireframe = wireframe;
    }
  }, [materials, wireframe]);

  useEffect(() => {
    return () => {
      for (const material of Object.values(materials)) material.dispose();
    };
  }, [materials]);

  return materials;
}
