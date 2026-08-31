export function generateSocialCaption(data, branding) {
  const highlightsList = data.highlights
    ? data.highlights.split(/·|,|\n/).map(h => h.trim()).filter(Boolean)
    : [];

  return `🏡 ✨ NEW PROPERTY SPOTLIGHT ✨ 🏡

✨ ${data.title || 'Luxury Property Listing'}
📍 Location: ${data.location || 'Prime Location'}
💰 Investment: ${data.price || 'Price on Request'}

🔑 KEY HIGHLIGHTS:
${highlightsList.length > 0 ? highlightsList.map(h => `• ${h}`).join('\n') : '• Ultra Luxury Specifications\n• Prime Neighborhood\n• High ROI Potential'}

🌟 Why you will love this:
- Unmatched architectural aesthetics & luxury fittings
- Seamless connectivity to top schools, business hubs & dining
- RERA approved verified clear-title property

📞 SCHEDULE A PRIVATE TOUR / INQUIRE:
Call/WhatsApp: ${branding.phone || '+91 98765 43210'}
Email: ${branding.email || 'info@vertexestates.com'}
Agency: ${branding.agencyName || 'VERTEX ESTATES'} (RERA: ${branding.rera || 'UPRERA18492'})
🌐 ${branding.website || 'www.vertexestates.com'}

#RealEstate #${(data.location || 'RealEstate').replace(/[^a-zA-Z0-9]/g, '')} #LuxuryHomes #PropertyForSale #DreamHome #Architecture #InvestmentOpportunity #BuiltWithClaude
`;
}
