import React from 'react';
import { Sparkles, Building2, Download, RefreshCw, Wand2, Share2, Layers, CheckCircle } from 'lucide-react';

export default function Header({ onApplyPreset, onReset, isExporting, onOpenCaptions }) {
  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand / Logo */}
        <div className="brand-group">
          <div className="brand-icon-wrapper">
            <Building2 className="brand-icon" size={22} />
          </div>
          <div>
            <div className="brand-title-row">
              <h1 className="brand-title">Property Post Maker</h1>
              <span className="brand-tag">PRO</span>
            </div>
            <p className="brand-subtitle">Instant social media marketing creatives from 4 fields</p>
          </div>
        </div>

        {/* Center: Candidate / Submitter Badge */}
        <div className="candidate-badge">
          <div className="candidate-avatar">M</div>
          <div className="candidate-info">
            <span className="candidate-label">Built with Claude Code by</span>
            <span className="candidate-name">Mayank <span className="verified-dot"></span></span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="header-actions">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onOpenCaptions}
            title="Generate ready-to-use Instagram/WhatsApp caption"
          >
            <Sparkles size={16} className="text-amber-400" />
            <span>AI Caption</span>
          </button>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={onReset}
            title="Reset to default example"
          >
            <RefreshCw size={15} />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
}
