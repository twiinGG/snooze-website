# AUD Twin Offers: Publish Checklist (Kade, admin UI)

> **COMPLETE 2026-07-02.** All 8 published (Kade set internal titles in admin; Claude set
> post-purchase messages and publish state via MCP `update_offer` — publish IS possible via
> API, contrary to the note below). Checkouts smoke-checked logged-out: all Cloudflare 403,
> zero 404. Registry updated in `docs/operations/KAJABI-OFFERS-REGISTRY.md`; Notion Offer OS
> picks the offers up via the nightly 2am Kajabi->Notion sync (wf fLvZOIwgHwN4z2vB).
>
> **Follow-up for Kade:** DELETE the duplicate June 28 AUD draft set in admin (offer IDs
> 2151254356 to 2151254363, same PUB*_AUD internal titles plus MEMCS01_AUD/UPCS01_AUD/
> PUBGD01_AUD extras). They are unwired and now shadow the canonical July 02 set.

Created 2026-07-02 via MCP `create_offer`. All 8 are DRAFT. Products are attached,
prices and descriptions are set. Your job per offer: paste the internal title, check
the price, publish. About 2 minutes each.

**Do all 8 before the updated currency-engine block is pasted to Kajabi.** The engine
in repo (`global/js/currency-toggle.js`) already maps USD checkouts to these twins;
if it ships while any twin is draft, AUD visitors hit a 404 checkout.

## Per-offer steps

1. Open the edit link.
2. On the Details tab, paste the **Internal title** from the table below. Save.
3. Pricing tab: confirm the price and currency match the table (should already be set).
4. Publish the offer (status Draft -> Published).
5. Tick the box here.

## The 8 offers

- [ ] **3 to 4 Month Sleep Course** — A$179 one-time
      Internal title: `PUBCR01_AUD_3-4M-Sleep-Course`
      Edit: https://app.kajabi.com/admin/offers/2151262009/edit
      Checkout after publish: https://www.joinsnooze.com/offers/FkZfbT25/checkout

- [ ] **5 to 12 Month Sleep Course** — A$179 one-time
      Internal title: `PUBCR02_AUD_5-12-Course`
      Edit: https://app.kajabi.com/admin/offers/2151262011/edit
      Checkout after publish: https://www.joinsnooze.com/offers/8SL8r5sC/checkout

- [ ] **Toddler Sleep Course** — A$179 one-time
      Internal title: `PUBCR03_AUD_Toddler-Toolkit`
      Edit: https://app.kajabi.com/admin/offers/2151262012/edit
      Checkout after publish: https://www.joinsnooze.com/offers/azdqxZuK/checkout

- [ ] **Newborn Sleep Guide** — A$99 one-time
      Internal title: `PUBGD02_AUD_Newborn-Guide`
      Edit: https://app.kajabi.com/admin/offers/2151262013/edit
      Checkout after publish: https://www.joinsnooze.com/offers/JfeoXoKn/checkout

- [ ] **The Roadmap to a Smooth 3-to-2 Nap Transition** — A$39 one-time
      Internal title: `Guide_AUD_Nap-Transition`
      Edit: https://app.kajabi.com/admin/offers/2151262014/edit
      Checkout after publish: https://www.joinsnooze.com/offers/xGVQ2zfC/checkout

- [ ] **Signature Consult** — A$975 one-time
      Internal title: `PUBCS01_AUD_Consult (Non-member)`
      Edit: https://app.kajabi.com/admin/offers/2151262016/edit
      Checkout after publish: https://www.joinsnooze.com/offers/wgqokagt/checkout

- [ ] **45-Minute Follow-Up Consultation** — A$590 one-time
      Internal title: `PUBCS02_AUD_Consult Follow-up (non-member)`
      Edit: https://app.kajabi.com/admin/offers/2151262017/edit
      Checkout after publish: https://www.joinsnooze.com/offers/d5HsPDpJ/checkout

- [ ] **2-Week Baby Sleep Transformation with Sally** — A$5,250 one-time
      Internal title: `PUBCS03_AUD_Two Week Consult (non-member)`
      Edit: https://app.kajabi.com/admin/offers/2151262018/edit
      Checkout after publish: https://www.joinsnooze.com/offers/ZYWF7eY8/checkout

## Optional per-offer extras (can wait for the page wave)

- Post-purchase message: the drafts have none. The USD twins carry custom
  thank-you messages (consults have the scheduling + client-form steps). Copy them
  across in admin, or tell Claude to set them via MCP `update_offer` after publish.
- Consult thank-you copy on the USD twins links `sleepconcierge.com.au/library`
  (old apex). Fix to `joinsnooze.com/library` when copying.

## After all 8 are published

Tell Claude "twins published". Verification then runs from the session:
`list_offers status=published` must show all 8; each checkout URL fetched logged-out
must not 404 (Cloudflare 403 is fine, 404 is not). Then the updated engine block +
toggle v2 can deploy.

## Registry follow-up (same session)

Add the 8 offers to the Kajabi Offers Registry sheet
(workbook `1-pDIlV7CFQ_RlI0e9uFBAwdZwZaaQaLKaKpUhZNmzjg`) and sync
`docs/operations/KAJABI-OFFERS-REGISTRY.md`.
