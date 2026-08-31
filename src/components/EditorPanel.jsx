import React from 'react';
import { 
  Home, MapPin, IndianRupee, Sparkles, 
  Layout, ShieldCheck, Check, Zap, Building2, Globe
} from 'lucide-react';
import { ASPECT_RATIOS, BADGES, SAMPLE_PRESETS } from '../constants/presets';
import { DEFAULT_IMAGES } from '../constants/defaultImages';

export default function EditorPanel({
  data,
  setData,
  branding,
  setBranding,
  aspectRatioId,
  setAspectRatioId,
  selectedBadge,
  setSelectedBadge,
  activeImageId,
  setActiveImageId,
  onApplyPreset
}) {
  const handleInputChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleBrandingChange = (field, value) => {
    setBranding(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="editor-panel">
      {/* Quick Sample Presets */}
      <div className="editor-card presets-card">
        <div className="card-header-compact">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-amber-400" />
            <span className="section-title">Quick Presets</span>
          </div>
          <span className="text-xs text-muted">1-Click Demo Data</span>
        </div>
        <div className="preset-buttons-grid">
          {SAMPLE_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              className="preset-btn"
              onClick={() => onApplyPreset(preset)}
              title={`Load: ${preset.title}`}
            >
              <span className="preset-btn-name">{preset.name}</span>
              <span className="preset-btn-price">{preset.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: PROPERTY DETAILS */}
      <div className="editor-card main-inputs-card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <div className="step-badge">1</div>
            <div>
              <h2 className="section-title">Property Details</h2>
              <p className="section-desc">Fill in the 4 core fields to generate your post</p>
            </div>
          </div>
        </div>

        <div className="form-fields">
          {/* Field 1: Property & Type */}
          <div className="form-group">
            <label className="field-label">
              <Home size={15} className="text-amber-400" />
              <span>Property & Type <span className="text-rose-400">*</span></span>
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                className="input-control"
                placeholder="e.g. 4 BHK Luxury Villa, Ansal Golf City"
                value={data.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </div>
          </div>

          {/* Field 2: Location */}
          <div className="form-group">
            <label className="field-label">
              <MapPin size={15} className="text-emerald-400" />
              <span>Location <span className="text-rose-400">*</span></span>
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                className="input-control"
                placeholder="e.g. Sushant Golf City, Lucknow"
                value={data.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>
          </div>

          {/* Field 3: Price */}
          <div className="form-group">
            <label className="field-label">
              <IndianRupee size={15} className="text-amber-400" />
              <span>Price <span className="text-rose-400">*</span></span>
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                className="input-control"
                placeholder="e.g. ₹2.5 Cr onwards"
                value={data.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
            </div>
          </div>

          {/* Field 4: Highlights */}
          <div className="form-group">
            <label className="field-label">
              <Sparkles size={15} className="text-blue-400" />
              <span>Highlights & USPs <span className="text-rose-400">*</span></span>
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                className="input-control"
                placeholder="e.g. 3000 sq.ft · Corner plot · Ready to move"
                value={data.highlights}
                onChange={(e) => handleInputChange('highlights', e.target.value)}
              />
            </div>
            <span className="field-hint">Tip: Separate points with dots (·), commas (,), or dashes (-)</span>
          </div>
        </div>
      </div>

      {/* STEP 2: FORMAT & STATUS BADGE (NO THEMES/POSTER STYLES) */}
      <div className="editor-card styling-card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <div className="step-badge">2</div>
            <div>
              <h2 className="section-title">Format & Status Badge</h2>
              <p className="section-desc">Choose social media aspect ratio and property status tag</p>
            </div>
          </div>
        </div>

        {/* Aspect Ratio Selector */}
        <div className="sub-section">
          <label className="sub-label">
            <Layout size={14} />
            <span>Social Media Format</span>
          </label>
          <div className="ratio-chips-grid">
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio.id}
                type="button"
                className={`ratio-chip ${aspectRatioId === ratio.id ? 'active' : ''}`}
                onClick={() => setAspectRatioId(ratio.id)}
              >
                <span className="ratio-title">{ratio.name}</span>
                <span className="ratio-sub">{ratio.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Status Badge Selector */}
        <div className="sub-section">
          <label className="sub-label">
            <ShieldCheck size={14} />
            <span>Property Status Badge</span>
          </label>
          <div className="badge-pills-wrap">
            {BADGES.map((badge) => (
              <button
                key={badge}
                type="button"
                className={`badge-pill ${selectedBadge === badge ? 'active' : ''}`}
                onClick={() => setSelectedBadge(badge)}
              >
                {badge}
              </button>
            ))}
            <button
              type="button"
              className={`badge-pill ${selectedBadge === '' ? 'active' : ''}`}
              onClick={() => setSelectedBadge('')}
            >
              None
            </button>
          </div>
        </div>
      </div>

      {/* STEP 3: BACKGROUND VISUAL (CURATED PHOTOS, NO FILE UPLOAD) */}
      <div className="editor-card media-card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <div className="step-badge">3</div>
            <div>
              <h2 className="section-title">Background Architecture</h2>
              <p className="section-desc">Select curated high-res luxury property backdrop</p>
            </div>
          </div>
        </div>

        <div className="images-grid">
          {DEFAULT_IMAGES.map((img) => (
            <button
              key={img.id}
              type="button"
              className={`img-thumb-btn ${activeImageId === img.id ? 'active' : ''}`}
              onClick={() => setActiveImageId(img.id)}
            >
              <img src={img.thumbnail} alt={img.name} />
              <span className="img-thumb-label">{img.category}</span>
              {activeImageId === img.id && (
                <div className="img-selected-overlay">
                  <Check size={16} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 4: AUTO-BRANDING & CONTACT STRIP */}
      <div className="editor-card branding-card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <div className="step-badge">4</div>
            <div>
              <h2 className="section-title">Auto-Branding & Contact Strip</h2>
              <p className="section-desc">Auto-added to the post (pre-filled, fully customizable)</p>
            </div>
          </div>
        </div>

        <div className="form-fields-grid">
          <div className="form-group">
            <label className="field-label-sm">Agency Brand Name</label>
            <input
              type="text"
              className="input-control-sm"
              value={branding.agencyName}
              onChange={(e) => handleBrandingChange('agencyName', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="field-label-sm">Tagline / Subtext</label>
            <input
              type="text"
              className="input-control-sm"
              value={branding.tagline}
              onChange={(e) => handleBrandingChange('tagline', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="field-label-sm">Contact Number / WhatsApp</label>
            <input
              type="text"
              className="input-control-sm"
              value={branding.phone}
              onChange={(e) => handleBrandingChange('phone', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="field-label-sm">Official Website</label>
            <input
              type="text"
              className="input-control-sm"
              value={branding.website}
              onChange={(e) => handleBrandingChange('website', e.target.value)}
            />
          </div>

          <div className="form-group col-span-2">
            <label className="field-label-sm">RERA Registration / Verification</label>
            <input
              type="text"
              className="input-control-sm"
              value={branding.rera}
              onChange={(e) => handleBrandingChange('rera', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
