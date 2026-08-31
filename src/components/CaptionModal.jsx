import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, MessageCircle, Share2 } from 'lucide-react';
import { generateSocialCaption } from '../utils/captionGenerator';
import confetti from 'canvas-confetti';

export default function CaptionModal({ isOpen, onClose, data, branding }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const captionText = generateSocialCaption(data, branding);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(captionText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);

      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Failed to copy caption:', err);
    }
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(captionText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <div className="modal-icon-badge">
              <Sparkles size={18} className="text-amber-400" />
            </div>
            <div>
              <h3 className="modal-title">Ready-to-Share Social Caption</h3>
              <p className="modal-subtitle">Auto-generated with formatting, emojis & hashtags</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="caption-preview-box">
            <pre className="caption-pre">{captionText}</pre>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleWhatsAppShare}>
            <MessageCircle size={16} className="text-emerald-400" />
            <span>Share to WhatsApp</span>
          </button>

          <button className="btn btn-primary btn-glow" onClick={handleCopy}>
            {copied ? (
              <>
                <Check size={16} />
                <span>Caption Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy Caption</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
