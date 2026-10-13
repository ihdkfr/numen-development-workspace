#!/usr/bin/env node
// Plan edit, 13 Oct 2026 (owner, in chat): "make sure everything from my current game is in there; if nothing is
// there or only some stuff, add the rest", and the streaming answer for Q-HM1.
//
// What it does (safe to run again; it never adds the same thing twice):
//  1. Adds every built system the plan did not list yet to its "Check what's built" task (T01.07 to T01.20,
//     T03.07, T14.01, T14.02) as steps marked "built, needs a play check". Source: an audit of the game code at
//     build 246 (SoulSurvival-cero-v6, branch feat/cero-v6): 646 scripts, of which 454 were never named here,
//     and the 367 Config.Features switches (349 on, 18 off).
//  2. Puts an "Already in the game" note at the top of the extra detail of later tasks whose system partly exists,
//     so a Claude brief starts from the existing code instead of building it twice.
//  3. Records the owner's streaming answer (Q-HM1, HW7) and adds the "test streaming off" check before publishing.
//  4. Adds the same lists to the codex page "What is built today" (and the downloadable full text).
//
// Usage (from the repo root): node tools/plan-edit/audit-built-2026-10-13.js
// Then: node tools/set-plan-build.js <n> <date> "<note>"
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');
const PLAN_FILE = path.join(ROOT, 'data', 'plan-data.js');
const CODEX_FILE = path.join(ROOT, 'data', 'codex-data.js');
const SRC = 'game audit 13 Oct (build 246)';
const STATE = 'built, needs a play check';

function load(file, key) {
  const text = fs.readFileSync(file, 'utf8');
  const marker = `window.${key} = `;
  const at = text.indexOf(marker);
  if (at < 0) throw new Error('no ' + marker + ' in ' + file);
  const sandbox = { window: {} };
  vm.runInNewContext(text, sandbox, { filename: file });
  return { text, at, marker, data: sandbox.window[key] };
}
function save(file, f) {
  fs.writeFileSync(file, f.text.slice(0, f.at) + f.marker + JSON.stringify(f.data) + ';\n');
}

// ---- 1. Built systems missing from the "Check what's built" lists -------------------------------------------------
// Each line is what you will see and try in game, in plain words. "(switch off)" means its Config switch is off.
const BUILT = {
  'T01.07': [
    'Realm culling: you never see another realm on the horizon (RealmCull)',
    'Each realm has its own sky; Karakura runs on a day clock with street lamps that switch on (RealmLighting)',
    'World clock and weather: Karakura day and night, rain and fog on a timer, seasonal snow (WorldService)',
    'Round minimap at the top right, drawn from the map itself (Minimap)',
    'Dev tools: /terrainreservations, /worlddebug overlays and the world geometry audit (WorldAudit)',
  ],
  'T01.08': [
    'Seireitei wall restyle: 4 great gates with walkable pavilions, wall-top stairs, bamboo; the Plaza hero stair',
    'Seireitei urban fabric kit and the 13 Division neighbourhoods (SeireiteiFabric, DivisionNeighbourhoods)',
    'The 320-district rollout: far skyline, district signs, names, banners, steles and landmarks (DistrictRollout)',
    'Soul Society life: crowd figures, Gotei patrols, Hollow incursions, street props (SoulSocietyLife, CrowdPool)',
    'Soul Society horizon: layered mountains round the map (SoulSocietyHorizon)',
    'Sōkyoku hero landscape and the Sōkyoku landmark and massif (SokyokuHero, SokyokuLandmark)',
    'The Seireitei far skyline of the 20 wards and the far roof sea (WardSkyline, SeireiteiFarLOD)',
    'Terrain v3: middle Rukongai and the Seireitei on; outer and ring terrain v3 have their switches off',
    'Tree kit everywhere with distance detail levels, and the Rukongai relief (TreeKitEverywhere, RukongaiRelief)',
    'Soul Society lighting pass and avenue lanterns (SSLighting, AvenueLanterns)',
    'Furnished rooms you can walk into (switch off: EnterableBuildings)',
  ],
  'T01.09': [
    'Hueco wanderers: the surface has Hollows wandering and hunting (HuecoWanderers, HollowsHunt)',
    'Menos ecology: the Forest of Menos is alive, the Molt event and the Gathering crowd (MenosEcology)',
    'Menos titans with footsteps that feel like a building walking (MenosTitans, MenosFeel)',
    'Hueco ambience: the sound bed of Hueco Mundo (HuecoAmbience)',
    'Wind-blown sand, the bone river, bone pillars, the sky tear and the far view (HuecoWindSandV2, HuecoBoneRiver)',
    'Las Noches: the dome barrier, floodlights, the grand version, the portal and the way in (LasNochesPortal, LasNochesEnter)',
  ],
  'T01.10': [
    'Karakura\'s two layers (living and spirit) and the gigai (KarakuraLayers, LayerService)',
    'Karakura traffic and a crowd: 16 civilians by day, 6 by night, with jobs (KarakuraTraffic, TierACivilians)',
    'Walk-in buildings with furniture (KarakuraDoors, KarakuraInteriors)',
    'Trains on the line across town and the level crossings (KarakuraRail)',
    'The summer festival below the hill shrine, with stall games: goldfish scooping and the shooting gallery',
    'Town sounds: the level-crossing bell, the shop chime and more (KarakuraSounds)',
    'Town prompts and crowd reactions (KarakuraPrompts, CrowdReactions)',
    'The Soul Pager: a 2000s flip phone for the Substitute route (SoulPager, SubstituteRoute)',
    'Hollow raids on Karakura at night',
  ],
  'T01.11': [
    'The generated Soul Reaper uniform with cloth that sways (UniformV1, ClothSway; try /uniform)',
    'The real sealed Zanpakutō built from the imported sword model (SwordV2; try /fitcheck)',
    'Hollow mesh skins and the Vasto Lorde VL2 skin (HollowMeshSkins, VL2Skin)',
  ],
  'T01.12': [
    'Reiatsu v3: a living flame aura, the feel of standing near strong pressure, and the redrawn sense view',
    'Sense: hold Ctrl and the world dims; reiatsu shows through walls as drifting dust (Sense, SenseV3)',
    'The release cinematic in combat and the world reacting to a fighter\'s release (FocusCinematic, FocusSurroundings)',
    'Each race\'s own flash-step look: Shunpo, Sonído, Hirenkyaku and Bringer Light (FlashStepFX)',
    'Conceal perks, reiatsu leak hunters, battleground pressure and stamina drain on block',
    'Flash sense: landing and feint reads (FlashSenseLanding, FlashSenseFeint)',
  ],
  'T01.13': [
    'Kidō chanting: hold the key to chant for power, the words show over your head (KidoChant)',
    'The blade-lock clash: a timing struggle on screen (ClashUI)',
    'Status effects with stacks, diminishing returns and cleanses, with icons (StatusV2)',
    'Stances, air combat, Shunpo counters and feints, block arc (Stances, AirCombat, ShunpoCounter)',
    'Loadout: keys 1 to 4 hold four equipped abilities (LoadoutService)',
    'Techniques tab, technique mastery tiers and tier cooldowns (TechniqueMastery)',
    'Abilities are earned, not given: Kidō is taught, Cero comes from devouring (UnlockService)',
    'Ranked duels with a queue and rating screens (RankedDuels)',
    'NPC fighters and wanderers with a fighting brain (NPCService, NPCBrain)',
    'The inner Hollow that fights like you, learning your habits (MirrorAI)',
    'Knock-downs, grabs, downed and bound states (Knockdown, Grab, Downed)',
    'The first Shikai and Bankai title card (ReleaseCard)',
    'Combat Lab dev panel: /lab',
  ],
  'T01.14': [
    'Older versions of Gran Rey Cero, Cero Oscuras, Shakkahō and Sōkatsui from before Cero v8 (their switches are on)',
    'The shared element VFX library, pooled (ElementVfx, ZVfx)',
    'Store VFX gallery: a one-play-test preview of the free Creator Store effects (StoreVfxGallery)',
  ],
  'T01.15': [
    'Jinzen: four sittings that turn your nameless blade into your Zanpakutō; the third asks a question that picks your Shikai ability',
    'The sword spirit, who remembers what you do (SwordSpirit, SpiritMemory)',
    'Shikai looks, signature powers and power abilities (ShikaiLooks, SignaturePowers)',
    'Inner worlds built from biomes for each power (InnerWorldGen, PowerInnerWorld)',
    'Zanpakutō library manifest and cinematics (ZanLibManifest, ZanLibCinematics)',
    'Bankai mastery drain: Bankai costs less as you master it (BankaiMasteryDrain)',
  ],
  'T01.16': [
    'The Konsō creation screen: see yourself in the shihakushō and learn where you woke up (TheKonso)',
    'The Plus phase: the chain clock, the guide, the officer\'s Konsō prompt and a safe arrival (PlusPhase, PlusGuide)',
    'Finders and player Konsō: Shinigami players can send Pluses on (Finders, PlayerKonso)',
    'The current Academy: campus, exams with graded stations and Division offers (AcademyCampus, AcademyExams)',
    'Barracks rooms, Division uniforms and the duty board (BarracksRooms, DivisionUniforms)',
    'The story chapters, side goals, the Cleaner chase and safe travel (StoryChapters, SideGoals, CleanerChase)',
    'The Guide: your road as stages and steps on the HUD and the Path tab (Guide)',
    'The Substitute route outside Karakura, gigai fights and Mod Souls (SubstituteGuard, GigaiCombat, ModSoul)',
    'Second stages: you sit, fall inward and face what waits (AscensionService)',
  ],
  'T01.17': [
    'The Mask: Hollow creation; choose a line and a hole, see what was rolled, reroll a few times, confirm (TheMask)',
    '"What are you becoming": three bone-framed cards with live 3D previews of your Adjuchas or Vasto Lorde body (BodyChoice)',
    'Evolution floors, hunger instinct, hungry packs and the red hunger screen (EvolutionFloors, HungerPack)',
    'Soul orbs: to a Hollow, souls glow as food; the same soul reads "Devour" to you (SoulOrbs)',
    'The trial of the self inside the Gillian, and the mask-fragment altar (TrialUI, FragmentUI)',
    'Resurrección as a moment, and the Arrancar look (ResurreccionForm, ArrancarLook)',
    'Espada extras: seats, the Gran Rey Cero, the tattoo, Fracción and Tres Cifras (EspadaSeats, Fraccion)',
    'Four-legged walking and wing gliding for beast Hollows (QuadrupedGait, WingGlide)',
    'Mask tiers (MaskTiers)',
  ],
  'T01.18': [
    'Investigations: seeded cases with five clues and a case card (CaseService)',
    'The law on screen: the wanted seal, law buildings and the execution event (CourtUI, ExecutionEvent)',
    'The economy: Kan, standing and stall vendors (EconomyService, VendorUI)',
    'World scars: craters and rubble from big fights stay (ScarService)',
    'The live game: ranks and titles, bounties, the duel ring and control points (LiveService)',
    'Player-held top ranks across every server, with perks, units and a seat board (RankSeatService)',
    'Territory war and the hall of names (TerritoryWar, HallOfNames)',
    'Player organisations: Shinigami squads, Hollow packs and circles of the living (OrgService)',
    'Linked events across servers: The Tide (LinkService)',
  ],
  'T01.19': [
    'Dialogue box for every story beat (Dialogue)',
    'One-time key hints with the right key for your device (Hints, Glyphs)',
    'Notice stack, status strip, one type scale for every menu (NoticeStack, StatusStrip, MenuTypeScale)',
    'Patch-notes card, credits tab and the extra menu pages (PatchNotes, CreditsTab, GlueMenuPages)',
    'Saved settings (SettingsService)',
    'Pad camera, phone HUD, touch controls and pad layers (PadCamera, PhoneHUD, TouchUI)',
    'Audio layer, music that changes with the moment, and voice lines (AudioLayer, MusicStates, VoiceLines)',
    'The ledger: press J for three pages (LedgerUI)',
    'Onboarding and HUD modes (Onboarding, HudModes)',
  ],
  'T01.20': [
    'Anti-cheat: remote guard, fixed hurtbox, damage sanity and rate limits (AntiCheat, RemoteGuard)',
    'New-player shield, player reports and farm limits (NewPlayerShield, PlayerReports, FarmLimits)',
    'Analytics and live switches you can flip without publishing (Analytics, LiveFlags)',
    'Private servers (PrivateServers)',
    'The store: cosmetics, wardrobe, passes, season tracks and name tokens (StoreService, StoreUI)',
    'The shop: Kan spending and Robux items (ShopService); the Robux respec switch is off',
    'Performance work: shadow trim, animation, fighter and gait detail levels, effect distance culling',
  ],
  'T03.07': [
    'New Hueco place: modelled white trees in four shapes with bone-white bark (approved 9 Oct)',
    'New Hueco place: basalt cliff bands, boulders and modelled ruins (Blender rock kit)',
    'New Hueco place: ring masses, mesas and fins as columnar basalt with pale sandy tops (approved 9 Oct)',
    'New Hueco place: craters lined with black basalt terraces',
    'New Hueco place: six long ravine cracks, two across salt pans and four hidden in the dunes, with walk-out ends (10 Oct)',
    'New Hueco place: the edge sandstorm and the finds blockout (ruins, white-tree groves, sinkhole crowns)',
  ],
  'T14.01': [
    'Quincy: the ladder and ranks, Sanrei glove, Sprenger, Ginto tubes, Blut windows, Licht Regen, Hirenkyaku',
    'Quincy and Fullbringer creation: your rolled letter with two rerolls, and your Fullbring (Awakening)',
    'Fullbring life, Fullbring pulls and the traversal course in the Dojo (FullbringLife, PullCourse)',
    'Visored depth: the mask and its timers (VisoredDepth)',
    'Note: these routes\' Config switches read on at build 246; check whether a player can reach them',
  ],
  'T14.02': [
    'Homes in Rukongai with furniture (HomeService; switch Housing reads on at build 246)',
    'The tournament stadium: walk-outs, commentary and brackets (StadiumService; switch on at build 246)',
    'Chronicle mode: Witness chapters (Chronicle)',
    'Secrets: 40 hidden secrets, and "sense" secrets (SecretsV2)',
    'The lower realm as a mystery: the gate (GateService)',
    'Dangai: currents with one shared Kōtotsu, lost travellers and pockets (DangaiCurrents, DangaiPocketService)',
    'The account-wide legacy record and the wardrobe (Legacy, Wardrobe)',
    'Research (Research)',
  ],
};

// ---- 2. Later tasks whose system already exists in code ------------------------------------------------------------
const PARTLY = {
  'T04.01': 'EconomyService (Kan), ShopService, StoreService, the Soul Candy shop and stall vendors.',
  'T04.02': 'LevelService levels 1 to 100 with the Soul Web, Leveling and StageGates; HogyokuService 101 to 150 (switch off).',
  'T04.03': 'DutyService and the Division duty board, SideGoalService and CaseService investigations.',
  'T04.04': 'Knock-down, grab, downed, bound and dead states in combat, the tutorial death beat, and "an ally you devour leaves your party".',
  'T04.05': 'Parties exist in part: Garganta moves parties, and devouring an ally removes them from your party.',
  'T04.06': 'PlayerReports, RemoteGuard and the DevCommands admin tools.',
  'T04.07': 'Analytics (switch on).',
  'T04.08': 'PrivateServers (switch on) and shared/PrivateServer.lua.',
  'T05.04': 'FlashStepFX gives each race its own flash-step look; Sonído and Hirenkyaku exist.',
  'T05.08': 'Sense and SenseV3 (hold Ctrl), ConcealRules and ReiatsuTiers.',
  'T05.09': 'ReiatsuV3Pressure, PressureWorld and BattlegroundPressure.',
  'T06.02': 'KidoChant and the Techniques tab.',
  'T06.03': 'TreeService: skill points, deeds, buying nodes, respec and stat points; and the Soul Web.',
  'T06.07': 'NPCService with the NPC brain, and MirrorAI (the inner Hollow that learns your habits).',
  'T06.08': 'MenosBoss: a three-phase Menos Grande boss.',
  'T06.09': 'TouchUI, PadLayers, PadCamera, PhoneHUD and device key glyphs.',
  'T08.07': 'An older Gran Rey Cero from before Cero v8 (switch GranReyCero on); rebuild it on the v8 kit.',
  'T08.08': 'An older Cero Oscuras from before Cero v8; rebuild it on the v8 kit.',
  'T08.10': 'An older Shakkahō from before Cero v8; rebuild it on the v8 kit.',
  'T08.11': 'An older Sōkatsui from before Cero v8; the approved look is the volumetric flame (A04).',
  'T08.14': 'Procedural animations in code (Anims.lua, AnimsM2.lua played by client/Animation.lua), 32 hand-keyed animations waiting for upload (AnimIds.lua), and HollowGait for beasts.',
  'T08.15': 'ZanCinematics, ResurreccionCard, FocusCinematic, ReleaseCard and the anime cut-ins.',
  'T09.01': 'Habits.lua already records how a player fights (for the Mirror AI); the Soul Imprint can build on it.',
  'T09.02': 'JinzenService: four sittings that turn a nameless blade into your Zanpakutō, and JinzenChoice (the third sitting\'s question picks the Shikai ability).',
  'T09.03': 'SwordSpirit, SpiritMemory and SpiritTrials.',
  'T09.04': 'InnerWorldGen, InnerWorldBiomes, PowerInnerWorld and the inner world look.',
  'T09.05': 'ShikaiLooks, PowerSignatures and SignatureAbilities.',
  'T09.06': 'BankaiForge, BankaiQuest (5 stages), BankaiMasteryDrain and the ZanLib Bankai.',
  'T10.01': 'StoryService, PlusPhase, PlusGuide, the officer\'s Konsō prompt and ArrivalGuard; the chain-choice screen has its switch off.',
  'T10.02': 'TutorialService with tutorials for three races and the tutorial death beat.',
  'T10.04': 'AcademyService, AcademyExamService, AcademyGrades, the Academy campus and Division offers.',
  'T10.05': 'DivisionLife, DutyService, seats, RankSeatService and barracks rooms.',
  'T10.08': 'DangaiGroups (currents and one shared Kōtotsu), DangaiPocketService, the Cleaner chase and safe travel.',
  'T10.09': 'LegacyService: an account-wide legacy record already exists (switch Legacy on). Check what it gives before deciding C06.',
  'T10.13': 'HollowHunger, HollowEvolution, EvolutionFloors, HungerInstinct and BodyChoice.',
  'T10.14': 'TheMask already offers a few free rerolls of your rolled line at creation.',
  'T10.18': 'EspadaService, EspadaExtras, Fracción and Tres Cifras.',
  'T10.19': 'VisoredDepth and VisoredClient.',
  'T11.01': 'LawService, HistoryService, NemesisService and EconomyService.',
  'T11.03': 'OrgService: Shinigami squads, Hollow packs and circles of the living.',
  'T11.05': 'Staged raids, TerritoryWar, FactionWarService and the execution event.',
  'T11.06': 'The event director (Plus in danger, Garganta rupture, missing Shinigami, Rukongai crime) and linked events (The Tide).',
  'T11.12': 'RankedDuels with queue and rating screens.',
  'T11.14': 'LiveFlags and patch notes.',
  'T12.01': 'AnimeHUD, HUD modes, notice stack and status strip.',
  'T12.02': 'TheKonso, TheMask, Awakening and BodyChoice creation screens, LookBuilder and the wardrobe.',
  'T12.04': 'AudioLayer, MusicStates, voice lines, KarakuraSounds and HuecoAmbience.',
  'T12.05': 'SettingsService saves player preferences.',
  'T13.03': 'AntiCheat, RemoteGuard, FixedHurtbox, DamageSanity and RateLimit.',
  'T13.07': 'ShopService (Kan and Robux) and StoreService (cosmetics, passes, season tracks).',
};

// ---- 3. Streaming ------------------------------------------------------------------------------------------------
const STREAMING_ANSWER =
  'Answered by the owner on 13 Oct 2026, in chat: "leave it on for now while in development but before publishing we\'ll look into turning it off". ' +
  'Streaming stays on in the Hueco place during development. Before the Hueco place is published, test it off on the iPhone 13 (time a join, measure memory), then decide.';
const STREAMING_STEP = 'Before publishing: test the Hueco place with streaming off on the iPhone 13 (join time and memory), then decide (Q-HM1)';

// ---------------------------------------------------------------------------------------------------------------
const plan = load(PLAN_FILE, 'SS_PLAN');
const codex = load(CODEX_FILE, 'SS_CODEX');
const P = plan.data;
const byId = Object.fromEntries(P.tasks.map((t) => [t.id, t]));
let addedSteps = 0;
let notes = 0;

for (const [id, lines] of Object.entries(BUILT)) {
  const t = byId[id];
  if (!t) throw new Error('no task ' + id);
  t.steps = t.steps || [];
  const have = new Set(t.steps.map((s) => s.text));
  for (const text of lines) {
    if (have.has(text)) continue;
    t.steps.push({ text, note: '', done: true, state: STATE, src: SRC });
    addedSteps++;
  }
}

const MARK = '**Already in the game (audit 13 Oct, build 246):**';
for (const [id, text] of Object.entries(PARTLY)) {
  const t = byId[id];
  if (!t) throw new Error('no task ' + id);
  if ((t.details || '').includes(MARK)) continue;
  t.details = `${MARK} ${text} Start from this code; don't build it twice.\n\n` + (t.details || '');
  notes++;
}

for (const id of ['T03.08', 'T13.10']) {
  const t = byId[id];
  if (!t) throw new Error('no task ' + id);
  t.steps = t.steps || [];
  if (!t.steps.some((s) => s.text === STREAMING_STEP)) {
    t.steps.push({ text: STREAMING_STEP, note: '', done: false, state: '', src: 'owner 13 Oct (Q-HM1)' });
    addedSteps++;
  }
}

for (const d of P.decisions) {
  if (d.id === 'Q-HM1' || d.id === 'HW7') {
    d.status = 'answered';
    if (!(d.detail || '').includes('13 Oct 2026, in chat')) d.detail = ((d.detail || '') + '\n\n' + STREAMING_ANSWER).trim();
  }
  if (d.id === 'C16' && !(d.detail || '').includes('Q-HM1')) {
    d.detail = ((d.detail || '') + '\n\nOn 13 Oct the owner kept streaming on for development (Q-HM1); off is tested before publishing.').trim();
  }
}
const counts = {};
for (const t of P.tasks) counts[t.seed_status] = (counts[t.seed_status] || 0) + 1;
P.metadata.status_counts = counts;

// ---- 4. Codex -----------------------------------------------------------------------------------------------------
const C = codex.data;
const LABEL = {
  'T01.07': 'realms and world tech', 'T01.08': 'Soul Society', 'T01.09': 'the old Hueco Mundo', 'T01.10': 'Karakura',
  'T01.11': 'models', 'T01.12': 'spiritual power and movement', 'T01.13': 'combat', 'T01.14': 'Cero and effects',
  'T01.15': 'Zanpakutō and Bankai', 'T01.16': 'the Soul Reaper path', 'T01.17': 'the Hollow path', 'T01.18': 'the living world',
  'T01.19': 'menus, sound and looks', 'T01.20': 'saving and safety', 'T03.07': 'the new Hueco Mundo place',
  'T14.01': 'switched-off routes', 'T14.02': 'after-launch extras',
};
const HEAD = '## Also built (audit 13 Oct, build 246)';
const block = [
  HEAD,
  'An audit of the game code at build 246 found these built systems that this page did not list yet. Each one is also a step on its task, marked "built, needs a play check". Switches are read from Config.Features (349 on, 18 off).',
  '',
  ...Object.entries(BUILT).flatMap(([id, lines]) => [`### ${id} ${LABEL[id]}`, ...lines.map((l) => '- ' + l), '']),
].join('\n');
const sec = C.sections.find((s) => s.title === 'What is built today');
if (!sec) throw new Error('no codex section "What is built today"');
if (!sec.content.includes(HEAD)) {
  const old = sec.content;
  const cut = old.indexOf('## Where the code is');
  sec.content = cut >= 0 ? old.slice(0, cut) + block + '\n' + old.slice(cut) : old + '\n\n' + block;
  if (typeof C.full === 'string') {
    C.full = C.full.includes(old) ? C.full.replace(old, () => sec.content) : C.full + '\n\n' + block;
  }
}
const oq = C.sections.find((s) => s.title === 'Open questions for the owner');
if (oq && !oq.content.includes('Answered 13 Oct: on for development')) {
  const before = oq.content;
  oq.content = oq.content.replace(
    /(- \*\*Q-HM1 Streaming in the Hueco place: on \(9 Oct\) or off \(12 Oct\)\?\*\*)[^\n]*/,
    '$1 **Answered 13 Oct: on for development; test off on the iPhone 13 before publishing.**'
  );
  if (typeof C.full === 'string' && C.full.includes(before)) C.full = C.full.replace(before, () => oq.content);
}

save(PLAN_FILE, plan);
save(CODEX_FILE, codex);
console.log(`Added ${addedSteps} steps and ${notes} "already in the game" notes; Q-HM1 answered.`);
