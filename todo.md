# ConnectPlus Deep Cleanup + Premium UX + Mobile Responsiveness TODO

## Current Status
- [x] Main cleanup and UX/mobile pass implemented.
- [x] Guest mode implemented (frontend-only, no backend calls).
- [x] Get Started flow updated to choose Sign Up / Continue as Guest.
- [x] Login and Get Started header CTAs made visually consistent in size.
- [x] `todo.md` converted to a tracked checklist.

## Phase 1: Stability and Hygiene
- [x] Backend settings moved to env-driven config (`SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, CORS, `DATABASE_URL` fallback).
- [x] Duplicate DB config/comments removed from backend settings.
- [x] Broken/unused `frontend/src/pages/Login.js` removed.
- [x] Unused/dead frontend code trimmed (navbar/auth/creator/view cleanup).
- [x] Debug logs removed from roadmap view paths.
- [x] User-facing API error messages normalized via shared utility.
- [x] Route/API sanity pass completed for active UI paths.

## Phase 2: Premium UI Foundation (Same Theme Identity)
- [x] Typography/spacing/elevation hierarchy improved while preserving brand colors.
- [x] Global theme polish applied for cards/buttons/papers and background layering.
- [x] Consistent empty/error/loading states applied across primary screens.
- [x] Motion behavior made more intentional.
- [x] Reduced-motion preference respected in route transitions.

## Phase 3: Mobile Responsiveness
- [x] Landing header reworked for mobile (drawer + cleaner CTA zone).
- [x] Landing category controls made mobile-safe (horizontal overflow handling).
- [x] Auth layouts improved for mobile spacing/stacking.
- [x] Dashboard header/toggles/cards improved for smaller screens.
- [x] Roadmap Creator step flow and controls refined for mobile.
- [x] Roadmap View action areas and week controls made wrapping-safe on mobile.

## Phase 4: Product Completeness and Quality
- [x] Settings page placeholder replaced with practical MVP controls.
- [x] Shared frontend API error utility introduced.
- [x] Deterministic token-invalid behavior retained (logout + redirect path).
- [x] Frontend smoke tests added (auth routing, dashboard empty state, roadmap notes dialog).
- [x] Backend API tests added for auth/roadmap-notes scenarios.
- [ ] Execute backend tests locally in a Django-enabled environment (blocked here: local shell missing Django install).
- [x] Add viewport-specific responsive tests for landing/dashboard mobile smoke.

## Guest Mode Scope (Implemented)
- [x] Session mode expanded to `anonymous | guest | user`.
- [x] Guest mode is backend-independent for roadmap creation and progress.
- [x] Guest state persisted via browser storage keys:
  - `connectplus_session`
  - `connectplus_guest_roadmap`
- [x] Guest dashboard enabled.
- [x] Guest roadmap creation limited to one roadmap.
- [x] Guest roadmap data restricted to small template skill sets (2-3 skills).
- [x] Guest roadmap supports local progress toggles, notes, completion, and reset/delete.
- [x] Guest UI messaging added so limitations are explicit.

## Auth UX Fixes
- [x] Login warning about free-host cold start retained.
- [x] Register warning about free-host cold start retained.
- [x] Forgot password no longer points to a broken link; now shows an explicit dialog explaining current limitation.
- [x] Added "Continue as Guest" path on login screen.

## Remaining Items to Fully Close
- [ ] Run backend tests in your active project virtualenv (`python manage.py test roadmap`) and address any environment-specific failures.
