import React, { forwardRef, useState } from 'react';
import { 
  Download, Copy, Sparkles, Building2, MapPin, IndianRupee, 
  Phone, Globe, ShieldCheck, Check, Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toPng, toBlob } from 'html-to-image';
import { THEMES } from '../constants/themes';
import { ASPECT_RATIOS } from '../constants/presets';
import { DEFAULT_IMAGES } from '../constants/defaultImages';

const PostPreview = forwardRef(function PostPreview({
  data,
  branding,
  aspectRatioId,
  selectedBadge,
  activeImageId,
  onOpenCaptions
}, ref) {
  const [isExporting, setIsExporting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Default theme is Midnight Gold (signature luxury theme)
  const currentTheme = THEMES[0];
  const currentRatio = ASPECT_RATIOS.find(r => r.id === aspectRatioId) || ASPECT_RATIOS[0];
  
  // Resolve background image from default curated visuals
  const defaultImg = DEFAULT_IMAGES.find(img => img.id === activeImageId) || DEFAULT_IMAGES[0];
  const bgImageUrl = defaultImg.url;

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
            className={`post-card theme-${currentTheme.id} ratio-${aspectRatioId.replace(':', '-')}`}
            style={{
              fontFamily: currentTheme.fontBody,
              backgroundImage: `url(${bgImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Dynamic Ambient Overlay */}
            <div 
              className="post-overlay"
              style={{ background: currentTheme.overlayGradient }}
            />

            {/* TOP BAR: Logo & Brand Strip + Badge */}
            <div className="post-header-strip">
              <div className="post-brand-box" style={{ background: currentTheme.cardBg, borderColor: currentTheme.cardBorder }}>
                <div className="brand-logo-mark" style={{ background: currentTheme.priceBg, color: currentTheme.priceText }}>
                  <Building2 size={18} />
                </div>
                <div className="brand-text-col">
                  <span className="brand-name" style={{ color: currentTheme.textColor }}>
                    {branding.agencyName || 'VERTEX ESTATES'}
                  </span>
                  <span className="brand-tagline" style={{ color: currentTheme.subTextColor }}>
                    {branding.tagline || 'LUXURY REAL ESTATE'}
                  </span>
                </div>
              </div>

              {selectedBadge && (
                <div 
                  className="post-status-badge"
                  style={{
                    background: currentTheme.badgeBg,
                    borderColor: currentTheme.badgeBorder,
                    color: currentTheme.badgeText
                  }}
                >
                  <Sparkles size={12} />
                  <span>{selectedBadge}</span>
                </div>
              )}
            </div>

            {/* CANDIDATE WATERMARK */}
            <div className="post-watermark">
              <span>✦ Created with Property Post Maker · Built by Mayank</span>
            </div>

            {/* BOTTOM / MAIN CONTENT CARD */}
            <div className="post-content-wrap">
              <div 
                className="post-glass-card"
                style={{
                  background: currentTheme.cardBg,
                  borderColor: currentTheme.cardBorder,
                  backdropFilter: 'blur(16px)'
                }}
              >
                {/* Price & Location Header */}
                <div className="post-card-top-row">
                  <div className="post-location-tag" style={{ color: currentTheme.subTextColor }}>
                    <MapPin size={15} style={{ color: currentTheme.accentColor }} />
                    <span style={{ color: currentTheme.textColor }}>{data.location || 'Sushant Golf City, Lucknow'}</span>
                  </div>

                  <div 
                    className="post-price-badge"
                    style={{
                      background: currentTheme.priceBg,
                      color: currentTheme.priceText
                    }}
                  >
                    <span className="price-val">{data.price || '₹2.5 Cr onwards'}</span>
                  </div>
                </div>

                {/* Property & Type Title */}
                <h3 
                  className="post-property-title"
                  style={{ 
                    color: currentTheme.textColor,
                    fontFamily: currentTheme.fontHeadline 
                  }}
                >
                  {data.title || '4 BHK Luxury Villa, Ansal Golf City'}
                </h3>

                {/* Highlights Tags */}
                <div className="post-highlights-row">
                  {highlightsList.map((hl, i) => (
                    <span 
                      key={i} 
                      className="highlight-pill"
                      style={{
                        background: currentTheme.tagBg,
                        color: currentTheme.tagText,
                        borderColor: currentTheme.cardBorder
                      }}
                    >
                      <span className="highlight-dot" style={{ background: currentTheme.accentColor }} />
                      {hl}
                    </span>
                  ))}
                </div>

                {/* AUTO-ADDED CONTACT FOOTER BAR */}
                <div className="post-contact-strip" style={{ borderColor: currentTheme.cardBorder }}>
                  <div className="contact-item">
                    <Phone size={13} style={{ color: currentTheme.accentColor }} />
                    <span style={{ color: currentTheme.textColor }}>{branding.phone || '+91 98765 43210'}</span>
                  </div>

                  <div className="contact-divider" style={{ background: currentTheme.cardBorder }} />

                  <div className="contact-item">
                    <Globe size={13} style={{ color: currentTheme.accentColor }} />
                    <span style={{ color: currentTheme.textColor }}>{branding.website || 'vertexestates.com'}</span>
                  </div>

                  {branding.rera && (
                    <>
                      <div className="contact-divider" style={{ background: currentTheme.cardBorder }} />
                      <div className="contact-item rera-item">
                        <ShieldCheck size={13} className="text-emerald-400" />
                        <span style={{ color: currentTheme.subTextColor }}>RERA: {branding.rera}</span>
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
          <span>Post automatically adds high-res typography, logo bar & RERA verified contact info.</span>
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
