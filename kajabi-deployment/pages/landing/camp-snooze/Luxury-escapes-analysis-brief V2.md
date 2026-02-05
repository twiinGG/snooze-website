# **Project Brief: Luxury Escapes "Member-First" Pricing Implementation**

## **1\. Executive Summary**

This update implements the "Member-First" pricing model. Unlike the previous version which showed two cards, this layout focuses on **one prominent price ($390)** to simplify the decision-making process while using popups to drive membership upsells and transparency \[cite: 1.5, 3.2\].

## **2\. Updated Value Math**

* **Total Value:** $3,530 (1:1 Transformation \+ 2 weeks of Snooze)  
* **Non-Member Price:** $690  
* **Snooze Member Price:** $390  
* **The "Gap":** Members save an additional $300 \[cite: 1.5\].

## **3\. UI/UX Flow**

1. **Hero Pricing:** Displays $3,530 value anchor and $390 prominent price. Includes a "Price Details" link \[cite: 1.5\].  
2. **Price Details Modal:** Shows the line-item breakdown of how we get from $3,530 to $390 \[cite: 1.5, 3.1\].  
3. **Booking Interstitial (The Upsell):** Triggers upon "Book Now." Presents the "Upgrade to Member" choice. Highlighting Snooze benefits. Includes the "Non-member price ($690)" as the secondary option at the bottom \[cite: 1.2, 3.2\].

## **4\. Technical Implementation**

(Refer to the unified HTML file camp-snooze-rework-v3.html for complete CSS/JS/HTML integration)

### **A. The "Price Details" Logic**

A simple hidden div modal that calculates:

* Value: $3,530  
* Camp Discount: \-$2,840  
* Member Exclusive: \-$300  
* **Total: $390**

### **B. The Interstitial Upsell**

This popup is high-friction by design. It forces the user to acknowledge the value of the Snooze Membership (e.g., $147/quarter) before they are allowed to proceed to checkout \[cite: 1.2\].

## **Appendix: Luxury Escapes Reference Analysis (Updated)**

* **Price Anchoring:** Leading with the highest possible value reference \[cite: 1.5\].  
* **Strategic Interstitials:** Using the moment of highest intent (clicking Book) to present a membership offer \[cite: 1.2\].  
* **The "Non-Member Tax":** Explicitly showing the higher price non-members pay to encourage conversion \[cite: 1.5\].