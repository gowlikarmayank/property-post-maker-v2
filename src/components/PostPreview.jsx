import React, { forwardRef, useState } from 'react';
import { 
  Download, Copy, Sparkles, Building2, MapPin, IndianRupee, 
  Phone, Globe, ShieldCheck, Check, Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toPng, toBlob } from 'html-to-image';
import { ASPECT_RATIOS } from '../constants/presets';

const PostPreview = forwardRef(function PostPreview({
  data,
  branding,
  aspectRatioId,
  selectedBadge,
  onOpenCaptions
}, ref) {
  const [isExporting, setIsExporting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const currentRatio = ASPECT_RATIOS.find(r => r.id === aspectRatioId) || ASPECT_RATIOS[0];

  // Parse highlights into tags
  const highlightsList = data.highlights
    ? data.highlights
        .split(/·|,|\n/)
        .map(h => h.trim())
        .filter(Boolean)
    : ['3000 sq.ft', 'Corner Plot', 'Ready to Move'];

  // Trigger download as high-res PNG
  const handleDownload = async () => {
    if (!ref.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(ref.current, {
        quality: 0.98,
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = `property-post-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (err) {
      console.error('Error generating image download:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Copy Image directly to clipboard
  const handleCopyImage = async () => {
    if (!ref.current) return;
    setIsExporting(true);
    try {
      const blob = await toBlob(ref.current, {
        quality: 0.98,
        pixelRatio: 2,
        cacheBust: true,
      });

      if (blob && navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2500);

        confetti({
          particleCount: 40,
          spread: 45,
          origin: { y: 0.8 }
        });
      }
    } catch (err) {
      console.error('Error copying image to clipboard:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="preview-panel">
      {/* Action Toolbar above canvas */}
      <div className="preview-toolbar">
        <div className="preview-toolbar-left">
          <div className="preview-indicator">
            <span className="live-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Live Post Preview</span>
          </div>
          <span className="preview-ratio-pill">{currentRatio.name}</span>
        </div>

        <div className="preview-toolbar-right">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleCopyImage}
            disabled={isExporting}
            title="Copy Image to Clipboard"
          >
            {copySuccess ? (
              <>
                <Check size={15} className="text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={15} />
                <span>Copy Image</span>
              </>
            )}
          </button>

          <button
            type="button"
            className="btn btn-primary btn-sm btn-glow"
            onClick={handleDownload}
            disabled={isExporting}
          >
            <Download size={15} />
            <span>{isExporting ? 'Exporting...' : 'Download PNG'}</span>
          </button>
        </div>
      </div>

      {/* CANVAS CONTAINER */}
      <div className="canvas-wrapper">
        <div 
          className={`post-canvas-container aspect-${aspectRatioId.replace(':', '-')}`}
          style={{ aspectRatio: currentRatio.cssAspect }}
        >
          {/* THE ACTUAL EXPORTABLE CARD */}
          <div
            ref={ref}
            className={`post-card signature-luxury-post ratio-${aspectRatioId.replace(':', '-')}`}
          >
            {/* Ambient Background Decorative Grid & Light Orbs */}
            <div className="post-ambient-bg">
              <div className="ambient-orb orb-gold"></div>
              <div className="ambient-orb orb-emerald"></div>
              <div className="ambient-orb orb-indigo"></div>
              <div className="architectural-grid-pattern"></div>
              <div className="luxury-geometric-accent"></div>
            </div>

            {/* TOP BAR: Brand Box & Status Badge */}
            <div className="post-header-strip">
              <div className="post-brand-box">
                <div className="brand-logo-mark">
                  <Building2 size={18} />
                </div>
                <div className="brand-text-col">
                  <span className="brand-name">
                    {branding.agencyName || 'VERTEX ESTATES'}
                  </span>
                  <span className="brand-tagline">
                    {branding.tagline || 'LUXURY REAL ESTATE'}
                  </span>
                </div>
              </div>

              {selectedBadge && (
                <div className="post-status-badge">
                  <Sparkles size={12} className="text-amber-400" />
                  <span>{selectedBadge}</span>
                </div>
              )}
            </div>

            {/* WATERMARK */}
            <div className="post-watermark">
              <span>✦ Created with Property Post Maker · Built by Mayank</span>
            </div>

            {/* MAIN CONTENT GLASS CARD */}
            <div className="post-content-wrap">
              <div className="post-glass-card">
                {/* Price & Location Header */}
                <div className="post-card-top-row">
                  <div className="post-location-tag">
                    <MapPin size={15} className="text-emerald-400" />
                    <span>{data.location || 'Sushant Golf City, Lucknow'}</span>
                  </div>

                  <div className="post-price-badge">
                    <span className="price-val">{data.price || '₹2.5 Cr onwards'}</span>
                  </div>
                </div>

                {/* Property & Type Title */}
                <h3 className="post-property-title">
                  {data.title || '4 BHK Luxury Villa, Ansal Golf City'}
                </h3>

                {/* Highlights Tags */}
                <div className="post-highlights-row">
                  {highlightsList.map((hl, i) => (
                    <span key={i} className="highlight-pill">
                      <span className="highlight-dot" />
                      {hl}
                    </span>
                  ))}
                </div>

                {/* AUTO-ADDED CONTACT FOOTER BAR */}
                <div className="post-contact-strip">
                  <div className="contact-item">
                    <Phone size={13} className="text-amber-400" />
                    <span>{branding.phone || '+91 98765 43210'}</span>
                  </div>

                  <div className="contact-divider" />

                  <div className="contact-item">
                    <Globe size={13} className="text-amber-400" />
                    <span>{branding.website || 'vertexestates.com'}</span>
                  </div>

                  {branding.rera && (
                    <>
                      <div className="contact-divider" />
                      <div className="contact-item rera-item">
                        <ShieldCheck size={13} className="text-emerald-400" />
                        <span>RERA: {branding.rera}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Quick Action */}
      <div className="preview-footer-tips">
        <div className="tip-item">
          <Sparkles size={14} className="text-amber-400" />
          <span>Post auto-formats typography, branding & RERA verified contact info.</span>
        </div>
        <button 
          type="button"
          className="btn btn-text-accent"
          onClick={onOpenCaptions}
        >
          <Share2 size={14} />
          <span>Copy Post Caption & Hashtags</span>
        </button>
      </div>
    </div>
  );
});

export default PostPreview;
