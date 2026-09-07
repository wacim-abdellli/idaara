'use client';

import React from 'react';
import { GatewayPillars } from './features/GatewayPillars';
import { DossierSimulator } from './features/DossierSimulator';

export function FeaturesSection() {
  return (
    <>
      <GatewayPillars />
      <DossierSimulator />
    </>
  );
}
