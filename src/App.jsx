import React, { useState, useRef } from 'react';
import Header from './components/Header';
import EditorPanel from './components/EditorPanel';
import PostPreview from './components/PostPreview';
import CaptionModal from './components/CaptionModal';
import { SAMPLE_PRESETS } from './constants/presets';
import './App.css';

const DEFAULT_PROPERTY_DATA = {
  title: '4 BHK Luxury Villa, Ansal Golf City',
  location: 'Sushant Golf City, Lucknow',
  price: '₹2.5 Cr onwards',
  highlights: '3000 sq.ft · Corner plot · Ready to move'
};

const DEFAULT_BRANDING = {
  agencyName: 'VERTEX ESTATES',
  tagline: 'LUXURY REAL ESTATE',
  phone: '+91 98765 43210',
  website: 'vertexestates.com',
  email: 'info@vertexestates.com',
  rera: 'UPRERAAGT18492'
};

export default function App() {
  const [data, setData] = useState(DEFAULT_PROPERTY_DATA);
  const [branding, setBranding] = useState(DEFAULT_BRANDING);
  const [aspectRatioId, setAspectRatioId] = useState('1:1');
  const [selectedBadge, setSelectedBadge] = useState('JUST LISTED');
  const [isCaptionModalOpen, setIsCaptionModalOpen] = useState(false);

  const previewCardRef = useRef(null);

  const handleApplyPreset = (preset) => {
    setData({
      title: preset.title,
      location: preset.location,
      price: preset.price,
      highlights: preset.highlights
    });
    if (preset.badge !== undefined) setSelectedBadge(preset.badge);
    if (preset.aspectRatio) setAspectRatioId(preset.aspectRatio);
  };

  const handleReset = () => {
    setData(DEFAULT_PROPERTY_DATA);
    setBranding(DEFAULT_BRANDING);
    setAspectRatioId('1:1');
    setSelectedBadge('JUST LISTED');
  };

  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <Header 
        onApplyPreset={() => handleApplyPreset(SAMPLE_PRESETS[0])}
        onReset={handleReset}
        onOpenCaptions={() => setIsCaptionModalOpen(true)}
      />

      {/* Main Workspace Area */}
      <main className="main-content">
        <div className="workspace-grid">
          {/* Left Column: Form & Controls */}
          <div className="editor-column">
            <EditorPanel 
              data={data}
              setData={setData}
              branding={branding}
              setBranding={setBranding}
              aspectRatioId={aspectRatioId}
              setAspectRatioId={setAspectRatioId}
              selectedBadge={selectedBadge}
              setSelectedBadge={setSelectedBadge}
              onApplyPreset={handleApplyPreset}
            />
          </div>

          {/* Right Column: Live Sticky Preview & Canvas */}
          <div className="preview-column">
            <PostPreview 
              ref={previewCardRef}
              data={data}
              branding={branding}
              aspectRatioId={aspectRatioId}
              selectedBadge={selectedBadge}
              onOpenCaptions={() => setIsCaptionModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Social Media Caption Generator Modal */}
      <CaptionModal 
        isOpen={isCaptionModalOpen}
        onClose={() => setIsCaptionModalOpen(false)}
        data={data}
        branding={branding}
      />
    </div>
  );
}
