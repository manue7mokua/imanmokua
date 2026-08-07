# Projects Page Design QA

## Comparison Target

- Source visual truth: `/Users/imanmokua/.codex/generated_images/019fd5c3-9dab-78a1-a295-6c61b9f213f1/call_qMFmdV1BddvTDkrsGGULl9c3.png`
- Pathfinder interaction target: `/var/folders/t7/9n3jtrfd019bt3b8p3vd242m0000gn/T/codex-clipboard-f2355a93-5aea-4294-bf92-3f69cca31bc1.png`
- Fathom source photography: `/Users/imanmokua/Downloads/IMG_1986.HEIC`, `/Users/imanmokua/Downloads/IMG_1979.HEIC`, and `/var/folders/t7/9n3jtrfd019bt3b8p3vd242m0000gn/T/codex-clipboard-15e97778-23c3-40c6-960f-15af7d9b8f38.jpg`
- Implementation: `http://localhost:3000/projects`
- Implementation screenshot: `design-qa/implementation-desktop.png`
- Full-view comparison: `design-qa/full-comparison.png`
- Pathfinder comparison: `design-qa/pathfinder-comparison.png`
- Viewport and CSS size: 1487 x 1058
- Source pixels: 1487 x 1058
- Implementation pixels: 1487 x 1058
- Device scale factor: 1
- Density normalization: none required
- State: dark projects index, initial page load

## Findings

No actionable P0, P1, or P2 differences remain.

- Fonts and typography: the implementation uses a native monospace stack for the navigation, heading, project names, descriptions, and actions. Sizes, weights, wrapping, line heights, and zero letter spacing follow the reference hierarchy.
- Spacing and layout rhythm: the 16-column desktop grid preserves the featured-left and stacked-right proportions within a centered two-thirds-width bento. At 1487px the grid measures 991px with equal 248px side space. The original card tracks remain unchanged.
- Colors and visual tokens: the near-black background, low-contrast card borders, warm white type, muted body copy, and orange action/status accent match the source treatment.
- Image quality and asset fidelity: Pathfinder uses optimized 1600px WebP exports of the supplied photography. Fathom uses three optimized 720 x 1280 WebP crops so every child card has a true 9:16 portrait ratio. Wazza, Cruyffchess, Datagolf, and Mem Arctec use optimized H.264 demos with fast-start metadata and poster fallbacks. Wazza and Mem Arctec no longer add an inner gray frame around their video previews.
- Copy and content: Fathom replaces Baby Fathom with the multilingual voice AI description, underlined Codex GPT-5 Hackathon award, and a `see post` link without a divider. Datagolf now includes the short tutoring rationale. Wazza's project action routes to GitHub while `view notes` remains an inert button. Pathfinder remains in the InCourse AI slot.
- Responsive behavior: the page remains one viewport tall while the bento region owns vertical scrolling. At 390 x 844 the grid stacks into one column, all six cards remain readable in the intended order, and `scrollWidth` equals the 390px viewport width.
- Interaction and accessibility: clicking either Pathfinder photo or any of Fathom's three portrait photos promotes it to the front with a smooth depth transition. Project titles link to their supplied GitHub or production destinations, with Fathom routed to `heyfathom.com`. The stacks use native buttons, visible keyboard focus, pressed-state semantics, descriptive labels, and a polite live-region update. Reduced-motion preferences disable the transition.

## Comparison History

1. Initial pass found P2 proportion drift: the featured card and right stack were too evenly sized. Fixed by moving to a 16-column grid with explicit desktop row heights. Post-fix evidence: `design-qa/full-comparison.png`.
2. Initial pass found P2 image cropping in Wazza, Baby Fathom, and InCourse AI. Fixed by containing the supplied artwork and matching the featured media frame dimensions. Post-fix evidence: `design-qa/focused-comparison.png`.
3. Route-change testing found P2 zero-height image warnings. Fixed by adding stable minimum media heights. A fresh page load produced no console errors or warnings from the projects feature.
4. Annotation pass enlarged the Wazza media frame and exchanged the complete InCourse AI and Datagolf card positions. Datagolf now owns the taller slot, and the same order is preserved on mobile.
5. Follow-up annotations moved InCourse AI into Datagolf's large slot, returned Datagolf to a compact slot, removed Mini CursorISH and the footer, and expanded Cruyffchess to keep both desktop grid columns filled. Project titles now use the orange accent on card hover.
6. The latest annotation keeps the established grid tracks, moves Datagolf into the large InCourse AI slot, and makes only the centered bento region scrollable. The navigation and `/projects` heading remain fixed within the viewport.
7. The Pathfinder pass replaced InCourse AI without moving its slot, added the supplied drone and UGV photo stack, connected four local demo videos, and narrowed the desktop bento to two-thirds of the viewport. Focused comparison evidence: `design-qa/pathfinder-comparison.png`.
8. The Fathom pass replaced Baby Fathom in place, introduced the supplied hackathon photo stack, linked every provided project title, added the OpenAI post action, and removed the remaining Wazza and Mem Arctec preview borders.
9. The portrait-stack pass added the third supplied Fathom image, normalized all three crops to 9:16, scaled the stack below Pathfinder's visual weight, removed the Fathom action divider, and verified both image stacks at 390px mobile width.

## Primary Checks

- Desktop viewport: 1487 x 1058
- Mobile viewport: 390 x 844
- Back to Home navigation: passed
- Horizontal overflow: none at desktop or mobile
- Scroll ownership: document remains fixed; bento region scrolls independently
- Pathfinder image swap: passed for both front/back states
- Fathom image swap: passed for all three front states on desktop and mobile
- Project title destinations: passed for Wazza, Cruyffchess, Datagolf, Fathom, and Mem Arctec
- Demo playback: four H.264 videos loaded with non-zero intrinsic dimensions
- Projects feature ESLint: passed
- Browser console errors: none
- Production build: passed

## Follow-up Polish

- P3: move the checked-in demo fallbacks to public Vercel Blob URLs after the project is linked to a Blob store.
- P3: confirm final destination URLs for each project when those project pages are ready.

final result: passed
