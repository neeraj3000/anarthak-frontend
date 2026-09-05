// src/components/home/HomeView.jsx
import React from 'react';
import { HeroBanner } from './HeroBanner';
import { BrandManifesto } from './BrandManifesto';
import { FeaturedDrop } from './FeaturedDrop';
import { FabricStory } from './FabricStory';
import { CollectionGrid } from './CollectionGrid';
import { Testimonials } from './Testimonials';

export const HomeView = () => {
  return (
    <div className="w-full">
      <HeroBanner />
      <BrandManifesto />
      <FeaturedDrop />
      <FabricStory />
      <CollectionGrid />
      <Testimonials />
    </div>
  );
};
