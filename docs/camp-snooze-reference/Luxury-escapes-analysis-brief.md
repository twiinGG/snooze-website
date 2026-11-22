# **Project Brief: Luxury Escapes Style Upsell Implementation for Camp Snooze**

## **1\. Executive Summary**

The goal of this update is to transition the Camp Snooze landing page from a "flat" pricing model to a **Status-Based Value System**, modeled after the high-conversion "LuxPlus+" strategy used by Luxury Escapes. We want to move away from simply listing prices and toward **anchored value comparisons**, **gamification**, and **strategic friction**.

## **2\. Core Strategy Analysis (The "LuxPlus" Model)**

| Strategy | Implementation Principle |
| :---- | :---- |
| **Price Anchoring** | Displaying a high "reference value" (e.g., $1,500) next to our offer to make $690 feel like a significant win. |
| **Dual-Pricing** | Showing a "Member Price" vs. a "Public/Non-member Price" to drive FOMO. |
| **Value Stacking** | Presenting the membership not as a cost, but as a "Fee Waiver" (e.g., Waiving the $200 joining fee). |
| **Interactive Friction** | Using a toggle to "Unlock" prices, forcing the user to make a value-based choice rather than just reading a list. |

## **3\. Copywriting Shifts**

The language should shift from **Service-based** to **Privilege-based**:

* **Standard:** "What You'll Get" → **VIP:** "Your Member Inclusions"  
* **Standard:** "Book your spot" → **VIP:** "Unlock Member Pricing & Secure Spot"  
* **Standard:** "Save $100" → **VIP:** "Special Offer: No joining fee for new members (Save $200 today)"

## **4\. Technical Implementation (Code Snippets)**

### **A. The Interactive Pricing Section (HTML)**

Replace the existing Pricing/Hero Preview with this structure. It uses a toggle that controls the "Status" of the user.

\<\!-- INTERACTIVE PRICING SECTION \--\>  
\<div class="pricing-container" style="text-align: center; padding: 3rem 1rem; background: \#fdfcf8; border-radius: 1.5rem; margin-top: 2rem;"\>  
    
  \<\!-- The Luxury Escapes Style Toggle \--\>  
  \<div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 2.5rem;"\>  
    \<span style="font-weight: 600; color: \#475569; font-size: 0.9rem;"\>Standard Price\</span\>  
    \<label class="snooze-switch"\>  
      \<input type="checkbox" id="member-toggle" checked\>  
      \<span class="snooze-slider round"\>\</span\>  
    \</label\>  
    \<span style="font-weight: 700; color: \#1e293b; display: flex; align-items: center; gap: 0.5rem;"\>  
      Apply Member Discount \<i class="fa-solid fa-crown" style="color: \#d4af37;"\>\</i\>  
    \</span\>  
  \</div\>

  \<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem;"\>  
    \<\!-- Standalone Card \--\>  
    \<div class="price-card" style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px \-1px rgb(0 0 0 / 0.1); border: 1px solid \#e2e8f0; width: 300px; text-align: left;"\>  
      \<p style="color: \#64748b; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;"\>Standalone Camp\</p\>  
      \<div id="standalone-price-area"\>  
        \<p style="font-size: 2.5rem; font-weight: 700; color: \#1e293b; margin: 0; line-height: 1;"\>  
          $\<span id="price-standalone"\>690\</span\>  
        \</p\>  
        \<p id="non-member-anchor" style="color: \#94a3b8; text-decoration: line-through; margin-top: 5px; font-size: 0.9rem;"\>Non-member $790\</p\>  
      \</div\>  
      \<div style="background: \#22c55e; color: white; display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: 800; margin-top: 1rem;"\>-54% OFF TOTAL VALUE\</div\>  
      \<div style="margin-top: 1.5rem; font-size: 0.8rem; color: \#64748b; border-top: 1px solid \#f1f5f9; padding-top: 1rem;"\>  
         \<i class="fa-solid fa-star" style="color: \#d4af37;"\>\</i\> Earn 1,200 pts \+ 25 status credits  
      \</div\>  
    \</div\>

    \<\!-- Bundle Card (The High-Value Upsell) \--\>  
    \<div class="price-card highlight" style="background: white; padding: 2rem; border-radius: 1rem; border: 4px solid \#d4af37; width: 340px; position: relative; text-align: left; box-shadow: 0 20px 25px \-5px rgb(0 0 0 / 0.1);"\>  
       \<div style="position: absolute; top: \-15px; right: 20px; background: \#d4af37; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 800;"\>BEST VALUE\</div\>  
      \<p style="color: \#1e293b; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;"\>VIP BUNDLE\</p\>  
      \<p style="font-size: 2.5rem; font-weight: 700; color: \#1e293b; margin: 0; line-height: 1;"\>  
        $\<span id="price-bundle"\>587\</span\>  
      \</p\>  
      \<p id="bundle-saving-note" style="color: \#22c55e; font-size: 0.85rem; font-weight: 700; margin-top: 10px;"\>Save $200 with Member Waiver\</p\>  
      \<ul style="list-style: none; padding: 0; margin-top: 1.5rem; font-size: 0.85rem; color: \#475569;"\>  
          \<li style="margin-bottom: 8px;"\>\<i class="fa-solid fa-check" style="color: \#22c55e;"\>\</i\> Full 2-Week Transformation\</li\>  
          \<li style="margin-bottom: 8px;"\>\<i class="fa-solid fa-check" style="color: \#22c55e;"\>\</i\> 12 Months VIP Snooze Access\</li\>  
          \<li\>\<i class="fa-solid fa-check" style="color: \#22c55e;"\>\</i\> Priority 24/7 Troubleshooting\</li\>  
      \</ul\>  
    \</div\>  
  \</div\>  
\</div\>

### **B. Functional Styles (CSS)**

/\* The Toggle Slider \*/  
.snooze-switch {  
  position: relative;  
  display: inline-block;  
  width: 54px;  
  height: 28px;  
}

.snooze-switch input {  
  opacity: 0;  
  width: 0;  
  height: 0;  
}

.snooze-slider {  
  position: absolute;  
  cursor: pointer;  
  top: 0; left: 0; right: 0; bottom: 0;  
  background-color: \#cbd5e1;  
  transition: .4s;  
  border-radius: 34px;  
}

.snooze-slider:before {  
  position: absolute;  
  content: "";  
  height: 22px; width: 22px;  
  left: 3px; bottom: 3px;  
  background-color: white;  
  transition: .4s;  
  border-radius: 50%;  
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);  
}

input:checked \+ .snooze-slider {  
  background-color: \#22c55e;  
}

input:checked \+ .snooze-slider:before {  
  transform: translateX(26px);  
}

### **C. The Logic (JavaScript)**

document.addEventListener('DOMContentLoaded', function() {  
  const toggle \= document.getElementById('member-toggle');  
  const standalonePrice \= document.getElementById('price-standalone');  
  const bundlePrice \= document.getElementById('price-bundle');  
  const anchorText \= document.getElementById('non-member-anchor');  
  const savingNote \= document.getElementById('bundle-saving-note');

  toggle.addEventListener('change', function() {  
    if (this.checked) {  
      // MEMBER PRICES ACTIVE (Default)  
      standalonePrice.innerText \= "690";  
      bundlePrice.innerText \= "587";  
      anchorText.style.visibility \= "visible";  
      savingNote.innerText \= "Save $200 with Member Waiver";  
      savingNote.style.color \= "\#22c55e";  
    } else {  
      // STANDARD PRICES ACTIVE  
      standalonePrice.innerText \= "790";  
      bundlePrice.innerText \= "787";  
      anchorText.style.visibility \= "hidden";  
      savingNote.innerText \= "Standard Bundle Price";  
      savingNote.style.color \= "\#64748b";  
    }  
  });  
});

## **5\. Next Steps for Development**

1. **Integrate IDs:** Ensure the checkout button URLs are updated dynamically based on the toggle state (e.g., appending a ?discount=MEMBER parameter).  
2. **Mobile Polish:** Ensure the toggle is touch-friendly (34px height minimum).  
3. **Initial State:** Always default the toggle to checked to anchor the user to the lower price point immediately.

## **Appendix: Luxury Escapes Reference Analysis**

### **Checkout Flow Breakdown**

1. **Product Hook:** Persistent dual-price display (Standard vs. Member) from the start.  
2. **Hard Upsell Modal:** A full-screen interstitial appearing upon "Book Now," forcing a choice between "No Thanks" and a value-stacked "Upgrade."  
3. **Investment Framing:** Membership fee ($249) is framed as an investment that pays for itself via immediate savings ($150) and bonus perks.  
4. **Final Summary:** The checkout sidebar explicitly deducts the "Member Discount," validating the user's decision at the point of purchase.

### **Pricing Presentation Tactics**

* **Price Anchoring:** High reference prices (e.g., "Valued up to $3,889") create a massive value gap.  
* **Waiver Strategy:** "Waiving" a joining fee (e.g., $500) makes the annual cost feel like a bargain rather than a new expense.  
* **Status Indicators:** Use of "Silver/Gold Member" status and progress bars for points/credits to gamify long-term loyalty.

### **Copywriting Strategy**

* **Exclusivity:** Uses terms like "Unlock," "Member-only," and "VIP Travel Club."  
* **Risk Reversal:** Prominent "Cancel anytime" messaging next to primary CTAs.  
* **Benefit Stacking:** Lists distinct inclusions (Transfers, Breakfast, Points) as a bundle to justify the subscription cost.