# Yntelli Office | Índice dos arquivos fonte

Inventário gerado da árvore do repositório de origem, incluindo testes.
Os comentários e exports foram usados como descrição indicativa; o arquivo linkado é a fonte definitiva.

## Totais

- client/src/: 229 arquivos
- server/: 163 arquivos
- shared/: 60 arquivos
- scripts/: 21 arquivos
- mod/: 13 arquivos

Total: 486 arquivos.

## client/src/

| Arquivo | Responsabilidade ou símbolo exportado |
|---|---|
| [`client/src/app.ts`](../../client/src/app.ts) | start |
| [`client/src/art/api.ts`](../../client/src/art/api.ts) | TILE / Dir / Pose |
| [`client/src/art/art.test.ts`](../../client/src/art/art.test.ts) | TESTE |
| [`client/src/art/character/appearance-move.test.ts`](../../client/src/art/character/appearance-move.test.ts) | TESTE |
| [`client/src/art/character/appearance.ts`](../../client/src/art/character/appearance.ts) | appearanceKey / EditorOptions / editorOptions |
| [`client/src/art/character/hair.ts`](../../client/src/art/character/hair.ts) | Tpl / HairLayers / HeadView |
| [`client/src/art/character/render.ts`](../../client/src/art/character/render.ts) | CHAR_W / CHAR_H / CHAR_AX |
| [`client/src/art/core/color.ts`](../../client/src/art/core/color.ts) | RGBA / parseColor / clamp01 |
| [`client/src/art/core/pixbuf.ts`](../../client/src/art/core/pixbuf.ts) | Palette / PixelBuf |
| [`client/src/art/core/sprite.ts`](../../client/src/art/core/sprite.ts) | Rects / BufSprite / BufFurniture |
| [`client/src/art/dynamic.ts`](../../client/src/art/dynamic.ts) | drawScreen / FOOTBALL_LANCE_MS / FOOTBALL_GOAL_AT |
| [`client/src/art/furniture/common.ts`](../../client/src/art/furniture/common.ts) | counter / counterSink / coffeeMachine |
| [`client/src/art/furniture/index.ts`](../../client/src/art/furniture/index.ts) | SEED_VARIATIONS / normalizeFurniture / renderFurniture |
| [`client/src/art/furniture/kit.ts`](../../client/src/art/furniture/kit.ts) | M / ACCENTS / SCREEN_BG |
| [`client/src/art/furniture/office.ts`](../../client/src/art/furniture/office.ts) | desk / deskBack / officeChair |
| [`client/src/art/furniture/wall.ts`](../../client/src/art/furniture/wall.ts) | whiteboard / windowItem / clock |
| [`client/src/art/icons.ts`](../../client/src/art/icons.ts) | ICON_NAMES / renderIcon / iconTemplates |
| [`client/src/art/index.ts`](../../client/src/art/index.ts) | appearanceFromSeed / poseFrameCount / poseFrameDuration |
| [`client/src/art/pixelfont.ts`](../../client/src/art/pixelfont.ts) | pixelTextWidth / pixelText |
| [`client/src/art/preview.ts`](../../client/src/art/preview.ts) | Página de prévia do módulo de arte (client/art-preview.html): mostra, ampliado e rotulado, tudo |
| [`client/src/art/seasonal.test.ts`](../../client/src/art/seasonal.test.ts) | TESTE |
| [`client/src/art/seasonal.ts`](../../client/src/art/seasonal.ts) | SeasonalProp / renderSeasonalProp |
| [`client/src/art/surfaces/floor.ts`](../../client/src/art/surfaces/floor.ts) | CHUNK_TILES / CHUNK_PX / h3 |
| [`client/src/art/surfaces/rug.ts`](../../client/src/art/surfaces/rug.ts) | renderRug |
| [`client/src/art/surfaces/walls.ts`](../../client/src/art/surfaces/walls.ts) | WALL_FACE_H / WALL_CAP_H / BASEBOARD_H |
| [`client/src/art/theme.ts`](../../client/src/art/theme.ts) | THEME_COUNT / roomTheme |
| [`client/src/audio/board.ts`](../../client/src/audio/board.ts) | SoundBoard |
| [`client/src/audio/scheduler.test.ts`](../../client/src/audio/scheduler.test.ts) | TESTE |
| [`client/src/audio/scheduler.ts`](../../client/src/audio/scheduler.ts) | SoundCategory / SoundKind / SOUND_CATEGORIES |
| [`client/src/audio/synth.ts`](../../client/src/audio/synth.ts) | VoiceOpts / makeNoise / playVoice |
| [`client/src/main.ts`](../../client/src/main.ts) | Ponto de entrada do cliente: primeiro o dicionário do idioma ativo (só ele vai para o navegador), depois o app |
| [`client/src/net/access.test.ts`](../../client/src/net/access.test.ts) | TESTE |
| [`client/src/net/access.ts`](../../client/src/net/access.ts) | onAccessChange / isLoopbackHostname / fallbackAccess |
| [`client/src/net/store.test.ts`](../../client/src/net/store.test.ts) | TESTE |
| [`client/src/net/store.ts`](../../client/src/net/store.ts) | ConnectionState / StoreEvents / pageBuild |
| [`client/src/net/timeline.test.ts`](../../client/src/net/timeline.test.ts) | TESTE |
| [`client/src/net/timeline.ts`](../../client/src/net/timeline.ts) | TimelineDayInfo / TimelineDays / TimelineBucket |
| [`client/src/net/world-stream.test.ts`](../../client/src/net/world-stream.test.ts) | TESTE |
| [`client/src/net/world-stream.ts`](../../client/src/net/world-stream.ts) | WorldStreamStatus / WorldStreamEvent / WorldStream |
| [`client/src/net/world.test.ts`](../../client/src/net/world.test.ts) | TESTE |
| [`client/src/net/world.ts`](../../client/src/net/world.ts) | WorldServerState / WorldAccess / WorldMeta |
| [`client/src/ui/agentorder.ts`](../../client/src/ui/agentorder.ts) | orderAgents / moveAgent |
| [`client/src/ui/appearance-fields.ts`](../../client/src/ui/appearance-fields.ts) | AppearanceFields |
| [`client/src/ui/avatar.ts`](../../client/src/ui/avatar.ts) | AvatarSize / createAvatar / createAvatarPlaceholder |
| [`client/src/ui/character-editor.ts`](../../client/src/ui/character-editor.ts) | CharacterEditor |
| [`client/src/ui/character-model.test.ts`](../../client/src/ui/character-model.test.ts) | TESTE |
| [`client/src/ui/character-model.ts`](../../client/src/ui/character-model.ts) | EditGate / canEditCharacter / changedParts |
| [`client/src/ui/composer-model.test.ts`](../../client/src/ui/composer-model.test.ts) | TESTE |
| [`client/src/ui/composer-model.ts`](../../client/src/ui/composer-model.ts) | PLUGIN_HINT / CODEX_BRIDGE_HINT / ComposerMode |
| [`client/src/ui/composer.ts`](../../client/src/ui/composer.ts) | ComposerVariant / ComposerOptions / MessageComposer |
| [`client/src/ui/context.ts`](../../client/src/ui/context.ts) | UiComponent / PanelName / TerminalRouter |
| [`client/src/ui/daystats-launcher.ts`](../../client/src/ui/daystats-launcher.ts) | DayLauncher |
| [`client/src/ui/daystats-model.test.ts`](../../client/src/ui/daystats-model.test.ts) | TESTE |
| [`client/src/ui/daystats-model.ts`](../../client/src/ui/daystats-model.ts) | STATUS_TEXT / formatAgentTime / Visible |
| [`client/src/ui/daystats.ts`](../../client/src/ui/daystats.ts) | DayPanel |
| [`client/src/ui/deliveries.test.ts`](../../client/src/ui/deliveries.test.ts) | TESTE |
| [`client/src/ui/deliveries.ts`](../../client/src/ui/deliveries.ts) | DELIVERIES_URL / parseDeliveries / unseenCount |
| [`client/src/ui/dictation.ts`](../../client/src/ui/dictation.ts) | MAX_RECORD_MS / dictationDone / DictationText |
| [`client/src/ui/dom.ts`](../../client/src/ui/dom.ts) | h / iconButton / setText |
| [`client/src/ui/drawer.ts`](../../client/src/ui/drawer.ts) | Drawer |
| [`client/src/ui/feed.test.ts`](../../client/src/ui/feed.test.ts) | TESTE |
| [`client/src/ui/feed.ts`](../../client/src/ui/feed.ts) | FeedPanel |
| [`client/src/ui/format.test.ts`](../../client/src/ui/format.test.ts) | TESTE |
| [`client/src/ui/format.ts`](../../client/src/ui/format.ts) | relativeTime / formatDuration / formatElapsed |
| [`client/src/ui/help.ts`](../../client/src/ui/help.ts) | HelpDialog |
| [`client/src/ui/history.test.ts`](../../client/src/ui/history.test.ts) | TESTE |
| [`client/src/ui/history.ts`](../../client/src/ui/history.ts) | HISTORY_URL / parseRecentSessions / filterSessions |
| [`client/src/ui/hovertip.ts`](../../client/src/ui/hovertip.ts) | HoverTip |
| [`client/src/ui/icons.ts`](../../client/src/ui/icons.ts) | pixelIcon / ICONS / IconKey |
| [`client/src/ui/index.ts`](../../client/src/ui/index.ts) | createUI |
| [`client/src/ui/markdown.test.ts`](../../client/src/ui/markdown.test.ts) | TESTE |
| [`client/src/ui/markdown.ts`](../../client/src/ui/markdown.ts) | MdInline / MdListItem / MdBlock |
| [`client/src/ui/model.test.ts`](../../client/src/ui/model.test.ts) | TESTE |
| [`client/src/ui/model.ts`](../../client/src/ui/model.ts) | STATUS_LABEL / statusLabel / activityFallback |
| [`client/src/ui/movable.ts`](../../client/src/ui/movable.ts) | MovableOptions / Movable / maximizeButton |
| [`client/src/ui/notify.ts`](../../client/src/ui/notify.ts) | NotificationState / notificationState / Notifier |
| [`client/src/ui/overlays.ts`](../../client/src/ui/overlays.ts) | Splash / officeIsEmpty / EmptyState |
| [`client/src/ui/permission.test.ts`](../../client/src/ui/permission.test.ts) | TESTE |
| [`client/src/ui/permission.ts`](../../client/src/ui/permission.ts) | PERMISSION_FOCUS_EVENT / destinationLabel / expiryText |
| [`client/src/ui/prefs.test.ts`](../../client/src/ui/prefs.test.ts) | TESTE |
| [`client/src/ui/prefs.ts`](../../client/src/ui/prefs.ts) | PREFS_KEY / UiPrefs / DEFAULT_PREFS |
| [`client/src/ui/provider.test.ts`](../../client/src/ui/provider.test.ts) | TESTE |
| [`client/src/ui/provider.ts`](../../client/src/ui/provider.ts) | PROVIDER_NAME / providerOf / isCodex |
| [`client/src/ui/pty.ts`](../../client/src/ui/pty.ts) | PtyControl / PtyPanel |
| [`client/src/ui/ptyapi.ts`](../../client/src/ui/ptyapi.ts) | ptyControllable / createPty / takeoverAgent |
| [`client/src/ui/ptypane.ts`](../../client/src/ui/ptypane.ts) | PtyPane |
| [`client/src/ui/roomorder.ts`](../../client/src/ui/roomorder.ts) | orderRooms / moveRoom |
| [`client/src/ui/roomrename.ts`](../../client/src/ui/roomrename.ts) | canRenameRoom / RoomRenamer |
| [`client/src/ui/rows.ts`](../../client/src/ui/rows.ts) | createAgentRow / updateAgentRow |
| [`client/src/ui/settings-sound.ts`](../../client/src/ui/settings-sound.ts) | SoundSettingsGroup |
| [`client/src/ui/settings.ts`](../../client/src/ui/settings.ts) | switchRow / segmented / SettingsPopover |
| [`client/src/ui/sidebar.ts`](../../client/src/ui/sidebar.ts) | Sidebar |
| [`client/src/ui/social.ts`](../../client/src/ui/social.ts) | coinDelta / recordText / SocialSection |
| [`client/src/ui/sound.ts`](../../client/src/ui/sound.ts) | SoundControl |
| [`client/src/ui/spawn.test.ts`](../../client/src/ui/spawn.test.ts) | TESTE |
| [`client/src/ui/spawn.ts`](../../client/src/ui/spawn.ts) | SPAWN_PROMPT_MAX / MAX_FILES / MAX_FILE_BYTES |
| [`client/src/ui/styles.css`](../../client/src/ui/styles.css) | Interface do Habblaud: painéis escuros translúcidos sobre o escritório em pixel art. |
| [`client/src/ui/termactions.ts`](../../client/src/ui/termactions.ts) | TermActions |
| [`client/src/ui/terminal.test.ts`](../../client/src/ui/terminal.test.ts) | TESTE |
| [`client/src/ui/terminal.ts`](../../client/src/ui/terminal.ts) | TERMINAL_DOM_LIMIT / RESULT_PREVIEW_LINES / INPUT_PREVIEW_LINES |
| [`client/src/ui/termtabs.ts`](../../client/src/ui/termtabs.ts) | TermTabs |
| [`client/src/ui/termtools.test.ts`](../../client/src/ui/termtools.test.ts) | TESTE |
| [`client/src/ui/termtools.ts`](../../client/src/ui/termtools.ts) | TerminalFilter / TERMINAL_FILTERS / finalAnswerKeys |
| [`client/src/ui/timelapse-speed.test.ts`](../../client/src/ui/timelapse-speed.test.ts) | TESTE |
| [`client/src/ui/timelapse.test.ts`](../../client/src/ui/timelapse.test.ts) | TESTE |
| [`client/src/ui/timelapse.ts`](../../client/src/ui/timelapse.ts) | SPEEDS / Speed / TIMELAPSE_ICONS |
| [`client/src/ui/toasts.ts`](../../client/src/ui/toasts.ts) | Toasts |
| [`client/src/ui/topbar.ts`](../../client/src/ui/topbar.ts) | TopBar |
| [`client/src/ui/update.ts`](../../client/src/ui/update.ts) | UpdateBanner |
| [`client/src/ui/usage-row.test.ts`](../../client/src/ui/usage-row.test.ts) | TESTE |
| [`client/src/ui/usage-row.ts`](../../client/src/ui/usage-row.ts) | UsageRowInput / usageRowFits |
| [`client/src/ui/usage-source.test.ts`](../../client/src/ui/usage-source.test.ts) | TESTE |
| [`client/src/ui/usage.ts`](../../client/src/ui/usage.ts) | SOURCE_LABEL / sourceLabel / USAGE_SETUP_STEPS |
| [`client/src/ui/version.test.ts`](../../client/src/ui/version.test.ts) | TESTE |
| [`client/src/ui/version.ts`](../../client/src/ui/version.ts) | UPDATE_SEEN_KEY / VERSION_ICONS / versionInfo |
| [`client/src/ui/viewport.test.ts`](../../client/src/ui/viewport.test.ts) | TESTE |
| [`client/src/ui/viewport.ts`](../../client/src/ui/viewport.ts) | INSET_GAP / DBLCLICK_GUARD_MS / MIN_FREE |
| [`client/src/ui/widgets.ts`](../../client/src/ui/widgets.ts) | createAccountChip / updateAccountChip / createProviderTag |
| [`client/src/ui/world/away-summary.ts`](../../client/src/ui/world/away-summary.ts) | AwaySummaryView / dayLabel / awaySummaryView |
| [`client/src/ui/world/blocked.ts`](../../client/src/ui/world/blocked.ts) | BlockedHost / buildBlocked |
| [`client/src/ui/world/building.ts`](../../client/src/ui/world/building.ts) | BuildingHost / BuildingCard / SentDialog |
| [`client/src/ui/world/links.ts`](../../client/src/ui/world/links.ts) | WORLD_TERMS_URL / WORLD_PRIVACY_URL / extLink |
| [`client/src/ui/world/scene-switch.test.ts`](../../client/src/ui/world/scene-switch.test.ts) | TESTE |
| [`client/src/ui/world/scene-switch.ts`](../../client/src/ui/world/scene-switch.ts) | CitySceneHost / citySceneAvailable / SceneSwitch |
| [`client/src/ui/world/settings-world.ts`](../../client/src/ui/world/settings-world.ts) | rich / deviceLabel / worldGate |
| [`client/src/ui/world/social.css`](../../client/src/ui/world/social.css) | ------------------------------------------------------------------ Habblaud World: social leve (Fase 5) |
| [`client/src/ui/world/social.test.ts`](../../client/src/ui/world/social.test.ts) | TESTE |
| [`client/src/ui/world/world-chip.ts`](../../client/src/ui/world/world-chip.ts) | WorldChip |
| [`client/src/ui/world/world-dialog.ts`](../../client/src/ui/world/world-dialog.ts) | WorldThemeLink / WorldDialog |
| [`client/src/ui/world/world-model.test.ts`](../../client/src/ui/world/world-model.test.ts) | TESTE |
| [`client/src/ui/world/world-model.ts`](../../client/src/ui/world/world-model.ts) | WorldSectionMode / WorldGate / worldSectionMode |
| [`client/src/ui/world/world-popups.ts`](../../client/src/ui/world/world-popups.ts) | WORLD_BUILDING_ICON / WorldPopupHooks / WorldPopups |
| [`client/src/world/api.ts`](../../client/src/world/api.ts) | Selection / WorldOptions / SeasonalTheme |
| [`client/src/world/assets.ts`](../../client/src/world/assets.ts) | WallArtAsset / BrandAsset / WorldAssets |
| [`client/src/world/camera.ts`](../../client/src/world/camera.ts) | Bounds / OVERVIEW_MARGIN / overviewFrame |
| [`client/src/world/city/cards.test.ts`](../../client/src/world/city/cards.test.ts) | TESTE |
| [`client/src/world/city/cards.ts`](../../client/src/world/city/cards.ts) | CARD_MAX_FLOORS / flagEmoji / countryName |
| [`client/src/world/city/facade.test.ts`](../../client/src/world/city/facade.test.ts) | TESTE |
| [`client/src/world/city/facade.ts`](../../client/src/world/city/facade.ts) | FACADE / FacadeStyle / FACADE_STYLES |
| [`client/src/world/city/fireworks.ts`](../../client/src/world/city/fireworks.ts) | FIREWORKS_MS / GoalView / goalsReached |
| [`client/src/world/city/greetings.ts`](../../client/src/world/city/greetings.ts) | BALLOON_MS / GREET_RANGE / REPLY_WINDOW_MS |
| [`client/src/world/city/ground.ts`](../../client/src/world/city/ground.ts) | cellCanvas / plazaCanvas / gardenCanvas |
| [`client/src/world/city/index.ts`](../../client/src/world/city/index.ts) | CITY_MIN_ZOOM / ENTER_RADIUS / CitySceneOptions |
| [`client/src/world/city/input.test.ts`](../../client/src/world/city/input.test.ts) | TESTE |
| [`client/src/world/city/input.ts`](../../client/src/world/city/input.ts) | CityInputHandlers / intentFrom / moveKeyOf |
| [`client/src/world/city/layout.test.ts`](../../client/src/world/city/layout.test.ts) | TESTE |
| [`client/src/world/city/layout.ts`](../../client/src/world/city/layout.ts) | TileRect / CELL / BUILDING_TILES |
| [`client/src/world/city/likes.ts`](../../client/src/world/city/likes.ts) | LIKE_DISTANCE / KNOCK_DISTANCE / STAMP_DISTANCE |
| [`client/src/world/city/minimap.test.ts`](../../client/src/world/city/minimap.test.ts) | TESTE |
| [`client/src/world/city/minimap.ts`](../../client/src/world/city/minimap.ts) | MINIMAP_RADIUS / MinimapCell / MinimapModel |
| [`client/src/world/city/notice.test.ts`](../../client/src/world/city/notice.test.ts) | TESTE |
| [`client/src/world/city/notice.ts`](../../client/src/world/city/notice.ts) | NoticePlace / noticeText |
| [`client/src/world/city/players.test.ts`](../../client/src/world/city/players.test.ts) | TESTE |
| [`client/src/world/city/players.ts`](../../client/src/world/city/players.ts) | WALK_TPS / RUN_TPS / INTERP_MIN_MS |
| [`client/src/world/city/resume.test.ts`](../../client/src/world/city/resume.test.ts) | TESTE |
| [`client/src/world/city/resume.ts`](../../client/src/world/city/resume.ts) | CityResume / RESUME_SAME_TILES / ResumePlacement |
| [`client/src/world/city/scene.ts`](../../client/src/world/city/scene.ts) | CityView / CityFxProp / CityScreenMap |
| [`client/src/world/city/social-pure.test.ts`](../../client/src/world/city/social-pure.test.ts) | TESTE |
| [`client/src/world/city/social.css`](../../client/src/world/city/social.css) | ------------------------------------------------------------------ Habblaud World: social leve na cidade (Fase 5 |
| [`client/src/world/city/social.ts`](../../client/src/world/city/social.ts) | CitySocialOptions / CitySocial |
| [`client/src/world/city/state.test.ts`](../../client/src/world/city/state.test.ts) | TESTE |
| [`client/src/world/city/state.ts`](../../client/src/world/city/state.ts) | RemotePlayer / CityEffect / isBuilding |
| [`client/src/world/city/teleport.ts`](../../client/src/world/city/teleport.ts) | CODE_ALPHABET / normalizeBuildingCode / FADE |
| [`client/src/world/city/tokens-facade.ts`](../../client/src/world/city/tokens-facade.ts) | signGlowLevel / meterBars / meterRect |
| [`client/src/world/constants.ts`](../../client/src/world/constants.ts) | COL_W / ROOM_H / CORRIDOR_H |
| [`client/src/world/debug.ts`](../../client/src/world/debug.ts) | ShellJobInput / SpawnOptions / WorldDebug |
| [`client/src/world/index.ts`](../../client/src/world/index.ts) | VisitWorld / CreateWorldOptions / createWorld |
| [`client/src/world/input.test.ts`](../../client/src/world/input.test.ts) | TESTE |
| [`client/src/world/input.ts`](../../client/src/world/input.ts) | Hit / InputHandlers / modalOpen |
| [`client/src/world/layout/builder.ts`](../../client/src/world/layout/builder.ts) | SEAT_FOOT_DY / SEATED_SORT_BIAS / SpotOpts |
| [`client/src/world/layout/building.ts`](../../client/src/world/layout/building.ts) | BuildingLayout / coreAreas / paintArea |
| [`client/src/world/layout/core.ts`](../../client/src/world/layout/core.ts) | RECEPTION_ID / RESTROOM_ID / CAFE_ID |
| [`client/src/world/layout/corridor.ts`](../../client/src/world/layout/corridor.ts) | CORRIDOR_ID / layoutCorridor |
| [`client/src/world/layout/exterior.ts`](../../client/src/world/layout/exterior.ts) | EXTERIOR_WALL / ExteriorLayout / SlotShell |
| [`client/src/world/layout/geometry.ts`](../../client/src/world/layout/geometry.ts) | Side / slotColumn / slotSide |
| [`client/src/world/layout/layout.test.ts`](../../client/src/world/layout/layout.test.ts) | TESTE |
| [`client/src/world/layout/room.ts`](../../client/src/world/layout/room.ts) | RoomInput / MeetingStyle / CornerStyle |
| [`client/src/world/layout/types.ts`](../../client/src/world/layout/types.ts) | AreaKind / TileRect / FurniturePlacement |
| [`client/src/world/path/astar.test.ts`](../../client/src/world/path/astar.test.ts) | TESTE |
| [`client/src/world/path/astar.ts`](../../client/src/world/path/astar.ts) | PathFinder |
| [`client/src/world/path/grid.ts`](../../client/src/world/path/grid.ts) | BLOCKED / FREE / SEAT |
| [`client/src/world/playback.test.ts`](../../client/src/world/playback.test.ts) | TESTE |
| [`client/src/world/playback.ts`](../../client/src/world/playback.ts) | animScale / rebaseSnapshot |
| [`client/src/world/render/anim.ts`](../../client/src/world/render/anim.ts) | clamp01 / easeOutBack / easeInBack |
| [`client/src/world/render/daylight.test.ts`](../../client/src/world/render/daylight.test.ts) | TESTE |
| [`client/src/world/render/daylight.ts`](../../client/src/world/render/daylight.ts) | DayPhase / Rgb / Ambient |
| [`client/src/world/render/github-fx.ts`](../../client/src/world/render/github-fx.ts) | reducedMotion / fxFade / beaconFrame |
| [`client/src/world/render/lighting.ts`](../../client/src/world/render/lighting.ts) | RECALC_MS / LightScene / View |
| [`client/src/world/render/overlay.test.ts`](../../client/src/world/render/overlay.test.ts) | TESTE |
| [`client/src/world/render/overlay.ts`](../../client/src/world/render/overlay.ts) | BUBBLE_MAX_W / ALERT_MAX_W / OVERVIEW_ZOOM |
| [`client/src/world/render/particles.test.ts`](../../client/src/world/render/particles.test.ts) | TESTE |
| [`client/src/world/render/particles.ts`](../../client/src/world/render/particles.ts) | CONFETTI_COLORS / Particles |
| [`client/src/world/render/props.ts`](../../client/src/world/render/props.ts) | PropSprite / propSprite / carSprite |
| [`client/src/world/render/renderer.ts`](../../client/src/world/render/renderer.ts) | HeadInfo / Renderer |
| [`client/src/world/render/scene.ts`](../../client/src/world/render/scene.ts) | WALL_MARGIN / FurnVis / WallVis |
| [`client/src/world/render/seasonal.ts`](../../client/src/world/render/seasonal.ts) | seasonalCostume / seasonalFurniture / seasonalRugColor |
| [`client/src/world/render/shell-sprites.ts`](../../client/src/world/render/shell-sprites.ts) | badgeText / countBadge / fallbackIcon |
| [`client/src/world/seasonal-world.test.ts`](../../client/src/world/seasonal-world.test.ts) | TESTE |
| [`client/src/world/sim/behavior.ts`](../../client/src/world/sim/behavior.ts) | Mode / modeFor / screenModeFor |
| [`client/src/world/sim/character.ts`](../../client/src/world/sim/character.ts) | Character / dirOf / facing |
| [`client/src/world/sim/elevator.ts`](../../client/src/world/sim/elevator.ts) | ELEVATOR_STAGGER_MS / Elevator |
| [`client/src/world/sim/github.test.ts`](../../client/src/world/sim/github.test.ts) | TESTE |
| [`client/src/world/sim/github.ts`](../../client/src/world/sim/github.ts) | RoomFx / PARTY_CHEER_MS / RoomFxState |
| [`client/src/world/sim/room-state.ts`](../../client/src/world/sim/room-state.ts) | RoomPhase / RoomState |
| [`client/src/world/sim/shell.test.ts`](../../client/src/world/sim/shell.test.ts) | TESTE |
| [`client/src/world/sim/shell.ts`](../../client/src/world/sim/shell.ts) | ShellStage / SHELL_DONE_TOOL / SHELL_RESTLESS_MS |
| [`client/src/world/sim/sim-pure.test.ts`](../../client/src/world/sim/sim-pure.test.ts) | TESTE |
| [`client/src/world/sim/sim.test.ts`](../../client/src/world/sim/sim.test.ts) | TESTE |
| [`client/src/world/sim/sim.ts`](../../client/src/world/sim/sim.ts) | WorldEffect / SimMode / VisitLight |
| [`client/src/world/sim/spots.ts`](../../client/src/world/sim/spots.ts) | SpotRegistry |
| [`client/src/world/sim/steps.ts`](../../client/src/world/sim/steps.ts) | Step |
| [`client/src/world/sim/visitor.ts`](../../client/src/world/sim/visitor.ts) | VISITOR_ID / VISITOR_LANYARD / EXIT_RADIUS |
| [`client/src/world/sim/world-visit.test.ts`](../../client/src/world/sim/world-visit.test.ts) | TESTE |
| [`client/src/world/social/gathering.ts`](../../client/src/world/social/gathering.ts) | GatherKind / Role / Program |
| [`client/src/world/social/lines.ts`](../../client/src/world/social/lines.ts) | Pool / INVITE / ACCEPT |
| [`client/src/world/social/persona.ts`](../../client/src/world/social/persona.ts) | CATCHPHRASES / Persona / personaFor |
| [`client/src/world/social/social-pure.test.ts`](../../client/src/world/social/social-pure.test.ts) | TESTE |
| [`client/src/world/social/social.test.ts`](../../client/src/world/social/social.test.ts) | TESTE |
| [`client/src/world/social/social.ts`](../../client/src/world/social/social.ts) | Floater / SHELL_SOCIAL_MIN_MS / Social |
| [`client/src/world/social/wallet.ts`](../../client/src/world/social/wallet.ts) | START_COINS / TASK_REWARD / DELIVERY_REWARD |
| [`client/src/world/sound-cues.ts`](../../client/src/world/sound-cues.ts) | SoundCues |
| [`client/src/world/theme.test.ts`](../../client/src/world/theme.test.ts) | TESTE |
| [`client/src/world/visit/controller.ts`](../../client/src/world/visit/controller.ts) | VISIT_RESYNC_GAP_MS / VisitControllerDeps / VisitController |
| [`client/src/world/visit/index.ts`](../../client/src/world/visit/index.ts) | LEAVE_TIMEOUT_MS / VisitSceneOptions / VisitScene |
| [`client/src/world/visit/model.ts`](../../client/src/world/visit/model.ts) | visitLightOf / agentsLabel / visitorsLabel |
| [`client/src/world/visit/visit.test.ts`](../../client/src/world/visit/visit.test.ts) | TESTE |
| [`client/src/world/visit-social.css`](../../client/src/world/visit-social.css) | ------------------------------------------------------------------ Habblaud World: social dentro do prédio (Fase |
| [`client/src/world/visit-social.test.ts`](../../client/src/world/visit-social.test.ts) | TESTE |
| [`client/src/world/visit-social.ts`](../../client/src/world/visit-social.ts) | utcDay / stampKey / stampedToday |

## server/

| Arquivo | Responsabilidade ou símbolo exportado |
|---|---|
| [`server/README.md`](../../server/README.md) | configuração, recurso ou módulo interno |
| [`server/accounts/accounts.test.ts`](../../server/accounts/accounts.test.ts) | TESTE |
| [`server/accounts/detect.ts`](../../server/accounts/detect.ts) | DetectedAccount / ACCOUNT_COLORS / AccountOverride |
| [`server/accounts/service.ts`](../../server/accounts/service.ts) | AccountEntry / ProviderAccountInput / AccountsServiceOptions |
| [`server/accounts/statusline.test.ts`](../../server/accounts/statusline.test.ts) | TESTE |
| [`server/accounts/statusline.ts`](../../server/accounts/statusline.ts) | StatuslineUsage / parseStatuslineFile / StatuslineUsageReader |
| [`server/accounts/usage.ts`](../../server/accounts/usage.ts) | UsageSource / UsageStatus / STALE_AFTER_MS |
| [`server/build.test.ts`](../../server/build.test.ts) | TESTE |
| [`server/build.ts`](../../server/build.ts) | createBuildReader / BuildStamp / readBuildInfo |
| [`server/claude-bin.ts`](../../server/claude-bin.ts) | isExecutableFile / findExecutable / claudeBinFrom |
| [`server/codex/http.test.ts`](../../server/codex/http.test.ts) | TESTE |
| [`server/codex/http.ts`](../../server/codex/http.ts) | CodexHookEvent / parseCodexEvent / codexAccountOf |
| [`server/config.ts`](../../server/config.ts) | ServerConfig / WorldConfig / isTruthy |
| [`server/deliveries/deliveries.test.ts`](../../server/deliveries/deliveries.test.ts) | TESTE |
| [`server/deliveries/deliveries.ts`](../../server/deliveries/deliveries.ts) | TAIL_BYTES / MAX_SESSIONS / MAX_DELIVERIES |
| [`server/deliveries/fetcher.test.ts`](../../server/deliveries/fetcher.test.ts) | TESTE |
| [`server/deliveries/fetcher.ts`](../../server/deliveries/fetcher.ts) | HOST_PRESENCE_MS / WAIT_MS / FetchResult |
| [`server/deliveries/files.test.ts`](../../server/deliveries/files.test.ts) | TESTE |
| [`server/deliveries/files.ts`](../../server/deliveries/files.ts) | DELIVERY_FILE_MAX_BYTES / extensionOf / fileType |
| [`server/dictation/dictation.test.ts`](../../server/dictation/dictation.test.ts) | TESTE |
| [`server/dictation/dictation.ts`](../../server/dictation/dictation.ts) | AUDIO_MAX_BYTES / AUDIO_BODY_MAX / HOST_PRESENCE_MS |
| [`server/dictation/whisper.test.ts`](../../server/dictation/whisper.test.ts) | TESTE |
| [`server/dictation/whisper.ts`](../../server/dictation/whisper.ts) | TRANSCRIBE_TIMEOUT_MS / DEFAULT_LANGS / WhisperSetup |
| [`server/history/daystats.test.ts`](../../server/history/daystats.test.ts) | TESTE |
| [`server/history/daystats.ts`](../../server/history/daystats.ts) | DEMO_ID_PREFIX / DayStatsDeps / DayStatsService |
| [`server/history/timeline.test.ts`](../../server/history/timeline.test.ts) | TESTE |
| [`server/history/timeline.ts`](../../server/history/timeline.ts) | TIMELINE_DIR / KEYFRAME_MS / THROTTLE_MS |
| [`server/host-wait.test.ts`](../../server/host-wait.test.ts) | TESTE |
| [`server/host-wait.ts`](../../server/host-wait.ts) | HOST_WAIT_MS / HostWait |
| [`server/http/app.ts`](../../server/http/app.ts) | ApiDeps / HttpError / sendJson |
| [`server/http/guard.ts`](../../server/http/guard.ts) | parseAllowedHosts / hostnameOf / isLoopbackHost |
| [`server/http/http.test.ts`](../../server/http/http.test.ts) | TESTE |
| [`server/http/pty.ts`](../../server/http/pty.ts) | ptyRequestProblem / createPtyRoutes |
| [`server/http/remote.test.ts`](../../server/http/remote.test.ts) | TESTE |
| [`server/http/remote.ts`](../../server/http/remote.ts) | RemoteFeature / RemoteTls / RemoteConfig |
| [`server/http/sessions.test.ts`](../../server/http/sessions.test.ts) | TESTE |
| [`server/http/sessions.ts`](../../server/http/sessions.ts) | SessionRoutesDeps / sessionsLockError / handleSessionsRoute |
| [`server/http/sse.ts`](../../server/http/sse.ts) | Hub / frame |
| [`server/http/static.ts`](../../server/http/static.ts) | HASHED_DIR / IMMUTABLE / REVALIDATE |
| [`server/http/stats.test.ts`](../../server/http/stats.test.ts) | TESTE |
| [`server/http/stats.ts`](../../server/http/stats.ts) | StatsQuery / parseStatsQuery / handleStatsRoute |
| [`server/http/terminal.test.ts`](../../server/http/terminal.test.ts) | TESTE |
| [`server/http/terminal.ts`](../../server/http/terminal.ts) | MAX_STREAMS / INIT_TAIL_BYTES / INIT_ENTRIES |
| [`server/http/timeline.test.ts`](../../server/http/timeline.test.ts) | TESTE |
| [`server/http/timeline.ts`](../../server/http/timeline.ts) | TimelineRoutesOptions / createTimelineHandler |
| [`server/index.ts`](../../server/index.ts) | Servidor do Habblaud: observa as sessões abertas do Claude Code (todas as contas), |
| [`server/legacy.test.ts`](../../server/legacy.test.ts) | TESTE |
| [`server/legacy.ts`](../../server/legacy.ts) | LEGACY_NAME / legacyEnvVars / legacyEnvWarning |
| [`server/log.ts`](../../server/log.ts) | setQuiet / errMsg / log |
| [`server/messages/codex.test.ts`](../../server/messages/codex.test.ts) | TESTE |
| [`server/messages/codex.ts`](../../server/messages/codex.ts) | QUEUE_TIMEOUT_MS / THREAD_ID / CodexQueueJob |
| [`server/messages/http.test.ts`](../../server/messages/http.test.ts) | TESTE |
| [`server/messages/http.ts`](../../server/messages/http.ts) | createMessageRoutes |
| [`server/messages/registry.test.ts`](../../server/messages/registry.test.ts) | TESTE |
| [`server/messages/registry.ts`](../../server/messages/registry.ts) | PRESENCE_MS / QUEUED_TIMEOUT_MS / SENT_TIMEOUT_MS |
| [`server/model/model.test.ts`](../../server/model/model.test.ts) | TESTE |
| [`server/model/names.ts`](../../server/model/names.ts) | StoredCharacter / NameStore |
| [`server/model/office.ts`](../../server/model/office.ts) | OFFLINE_GRACE_MS / DONE_GRACE_MS / SLOT_COOLDOWN_MS |
| [`server/model/room-aliases.test.ts`](../../server/model/room-aliases.test.ts) | TESTE |
| [`server/model/room-aliases.ts`](../../server/model/room-aliases.ts) | ROOM_NAME_MAX / pathKey / RoomAliases |
| [`server/model/rooms.ts`](../../server/model/rooms.ts) | normalizeCwd / roomDisplayNames / SlotAllocator |
| [`server/permissions/codex.test.ts`](../../server/permissions/codex.test.ts) | TESTE |
| [`server/permissions/codex.ts`](../../server/permissions/codex.ts) | CodexToolView / patchFiles / codexToolView |
| [`server/permissions/http.test.ts`](../../server/permissions/http.test.ts) | TESTE |
| [`server/permissions/http.ts`](../../server/permissions/http.ts) | waitMs / createPermissionRoutes |
| [`server/permissions/registry.test.ts`](../../server/permissions/registry.test.ts) | TESTE |
| [`server/permissions/registry.ts`](../../server/permissions/registry.ts) | DEFAULT_TIMEOUT_MS / MIN_TIMEOUT_MS / MAX_TIMEOUT_MS |
| [`server/permissions/transcript.ts`](../../server/permissions/transcript.ts) | SCAN_TAIL_BYTES / MAX_CALL_AGE_MS / callSignature |
| [`server/pty/manager.test.ts`](../../server/pty/manager.test.ts) | TESTE |
| [`server/pty/manager.ts`](../../server/pty/manager.ts) | PtyProcess / SpawnPty / PtyAccount |
| [`server/pty/optional.d.ts`](../../server/pty/optional.d.ts) | Dependências opcionais do terminal interativo (optionalDependencies): carregadas com import() dinâmico e usadas |
| [`server/pty/procinfo.test.ts`](../../server/pty/procinfo.test.ts) | TESTE |
| [`server/pty/procinfo.ts`](../../server/pty/procinfo.ts) | ProcInfo / RegisteredProc / looksLikeClaude |
| [`server/pty/screen.ts`](../../server/pty/screen.ts) | Tela de cada terminal interativo no servidor (@xterm/headless + @xterm/addon-serialize, dependências opcionais |
| [`server/pty/winkill.ts`](../../server/pty/winkill.ts) | TERMINAL_RESET / killWithConsoleReset |
| [`server/remote/envfile.ts`](../../server/remote/envfile.ts) | updateEnv / readEnvValue / addToList |
| [`server/remote/password.ts`](../../server/remote/password.ts) | PasswordHash / DEFAULT_LOG_N / parsePasswordHash |
| [`server/remote/remote.test.ts`](../../server/remote/remote.test.ts) | TESTE |
| [`server/remote/tls.ts`](../../server/remote/tls.ts) | CA_DAYS / SERVER_DAYS / RENEW_BEFORE_DAYS |
| [`server/sources/codex/accounts.test.ts`](../../server/sources/codex/accounts.test.ts) | TESTE |
| [`server/sources/codex/accounts.ts`](../../server/sources/codex/accounts.ts) | defaultCodexHome / discoverCodexDirs / codexOverrides |
| [`server/sources/codex/files.ts`](../../server/sources/codex/files.ts) | SESSIONS_DIR / ARCHIVED_DIR / LOCKS_DIR |
| [`server/sources/codex/history.test.ts`](../../server/sources/codex/history.test.ts) | TESTE |
| [`server/sources/codex/history.ts`](../../server/sources/codex/history.ts) | CodexHistoryAccount / CodexHistoryOptions / RolloutSummary |
| [`server/sources/codex/live.ts`](../../server/sources/codex/live.ts) | CodexLive |
| [`server/sources/codex/rollout.test.ts`](../../server/sources/codex/rollout.test.ts) | TESTE |
| [`server/sources/codex/rollout.ts`](../../server/sources/codex/rollout.ts) | isThreadId / HistoryMode / RolloutMeta |
| [`server/sources/codex/source.test.ts`](../../server/sources/codex/source.test.ts) | TESTE |
| [`server/sources/codex/source.ts`](../../server/sources/codex/source.ts) | LOCK_SETTLE_MS / STALE_LOCK_MS / FALLBACK_RECENT_MS |
| [`server/sources/codex/terminal.test.ts`](../../server/sources/codex/terminal.test.ts) | TESTE |
| [`server/sources/codex/terminal.ts`](../../server/sources/codex/terminal.ts) | createCodexTerminalParser |
| [`server/sources/github-live.test.ts`](../../server/sources/github-live.test.ts) | TESTE |
| [`server/sources/github.test.ts`](../../server/sources/github.test.ts) | TESTE |
| [`server/sources/github.ts`](../../server/sources/github.ts) | GitHubCall / scriptSegments / bashCall |
| [`server/sources/history.test.ts`](../../server/sources/history.test.ts) | TESTE |
| [`server/sources/history.ts`](../../server/sources/history.ts) | HISTORY_DAYS / HISTORY_MAX_AGE_MS / HISTORY_LIMIT |
| [`server/sources/registry.test.ts`](../../server/sources/registry.test.ts) | TESTE |
| [`server/sources/registry.ts`](../../server/sources/registry.ts) | RegistryEntry / parseRegistryEntry / SHELL_STATUS_VERSION |
| [`server/sources/shells.test.ts`](../../server/sources/shells.test.ts) | TESTE |
| [`server/sources/shells.ts`](../../server/sources/shells.ts) | SHELL_MAX_AGE_MS / SHELL_FALLBACK_MAX_AGE_MS / ShellStart |
| [`server/sources/source.test.ts`](../../server/sources/source.test.ts) | TESTE |
| [`server/sources/source.ts`](../../server/sources/source.ts) | AgentSource / SourceSet / HistorySession |
| [`server/sources/subagents.ts`](../../server/sources/subagents.ts) | SubagentFile / SubagentMeta / END_TURN_QUIET_MS |
| [`server/sources/tail.fallback.test.ts`](../../server/sources/tail.fallback.test.ts) | TESTE |
| [`server/sources/tail.test.ts`](../../server/sources/tail.test.ts) | TESTE |
| [`server/sources/tail.ts`](../../server/sources/tail.ts) | TailRead / MAX_LINE_BYTES / warnOversizedLine |
| [`server/sources/terminal.test.ts`](../../server/sources/terminal.test.ts) | TESTE |
| [`server/sources/terminal.ts`](../../server/sources/terminal.ts) | TerminalParser / TEXT_MAX / THINKING_MAX |
| [`server/sources/transcript.test.ts`](../../server/sources/transcript.test.ts) | TESTE |
| [`server/sources/transcript.ts`](../../server/sources/transcript.ts) | TaskOp / applyTaskOp / SpawnInfo |
| [`server/sources/watcher.test.ts`](../../server/sources/watcher.test.ts) | TESTE |
| [`server/sources/watcher.ts`](../../server/sources/watcher.ts) | WatcherOptions / encodeCwd / ClaudeWatcher |
| [`server/spawn/attachments.test.ts`](../../server/spawn/attachments.test.ts) | TESTE |
| [`server/spawn/attachments.ts`](../../server/spawn/attachments.ts) | ATTACHMENT_MAX_BYTES / ATTACHMENTS_PER_SPAWN / ATTACHMENT_BODY_MAX |
| [`server/spawn/folders.test.ts`](../../server/spawn/folders.test.ts) | TESTE |
| [`server/spawn/folders.ts`](../../server/spawn/folders.ts) | SpawnFolder / FOLDERS_LIMIT / projectFolder |
| [`server/spawn/spawn.test.ts`](../../server/spawn/spawn.test.ts) | TESTE |
| [`server/spawn/spawn.ts`](../../server/spawn/spawn.ts) | PROMPT_MAX / FOLDER_MAX / OPEN_TIMEOUT_MS |
| [`server/test/codex-bridge.test.ts`](../../server/test/codex-bridge.test.ts) | TESTE |
| [`server/test/codex-fixtures.ts`](../../server/test/codex-fixtures.ts) | threadId / MetaOpts / RateLimitsOpts |
| [`server/test/codex-hook.test.ts`](../../server/test/codex-hook.test.ts) | TESTE |
| [`server/test/codex-install.test.ts`](../../server/test/codex-install.test.ts) | TESTE |
| [`server/test/demo-timeline.test.ts`](../../server/test/demo-timeline.test.ts) | TESTE |
| [`server/test/docker-up.test.ts`](../../server/test/docker-up.test.ts) | TESTE |
| [`server/test/fake-codex.ts`](../../server/test/fake-codex.ts) | FAKE_CODEX_RUNS / writeFakeCodex / fakeCodexCalls |
| [`server/test/fake-world.ts`](../../server/test/fake-world.ts) | FakeRequest / FakeConnection / FakeSocketOptions |
| [`server/test/fixtures.ts`](../../server/test/fixtures.ts) | LineOpts / L / HAS_POSIX_MODES |
| [`server/test/hooks-install.test.ts`](../../server/test/hooks-install.test.ts) | TESTE |
| [`server/test/mod-install.test.ts`](../../server/test/mod-install.test.ts) | TESTE |
| [`server/test/mod.test.ts`](../../server/test/mod.test.ts) | TESTE |
| [`server/test/permission-hook.test.ts`](../../server/test/permission-hook.test.ts) | TESTE |
| [`server/test/permission-server.ts`](../../server/test/permission-server.ts) | MAIN / SESSION / CODEX_THREAD |
| [`server/test/release.test.ts`](../../server/test/release.test.ts) | TESTE |
| [`server/test/statusline.test.ts`](../../server/test/statusline.test.ts) | TESTE |
| [`server/tsconfig.json`](../../server/tsconfig.json) | Os scripts do host em TypeScript (docker-up, instaladores do tap de statusline, do hook de permissão, do mod e d |
| [`server/updates/checker.test.ts`](../../server/updates/checker.test.ts) | TESTE |
| [`server/updates/checker.ts`](../../server/updates/checker.ts) | CHECK_EVERY_MS / RETRY_MS / MANUAL_GAP_MS |
| [`server/world/altcha.test.ts`](../../server/world/altcha.test.ts) | TESTE |
| [`server/world/altcha.ts`](../../server/world/altcha.ts) | ALTCHA_MAX_NUMBER / parseAltchaChallenge / altchaHash |
| [`server/world/client.test.ts`](../../server/world/client.test.ts) | TESTE |
| [`server/world/client.ts`](../../server/world/client.ts) | WorldResult / CLIENT_ERROR / WorldClientOptions |
| [`server/world/http.test.ts`](../../server/world/http.test.ts) | TESTE |
| [`server/world/http.ts`](../../server/world/http.ts) | EXPORT_FILENAME / sameOriginRequest / createWorldRoutes |
| [`server/world/ids.test.ts`](../../server/world/ids.test.ts) | TESTE |
| [`server/world/ids.ts`](../../server/world/ids.ts) | ID_LIFETIME_MS / ID_JITTER_MS / WorldIdsOptions |
| [`server/world/privacy-doc.test.ts`](../../server/world/privacy-doc.test.ts) | TESTE |
| [`server/world/service.test.ts`](../../server/world/service.test.ts) | TESTE |
| [`server/world/service.ts`](../../server/world/service.ts) | Outcome / WorldServiceOptions / WAITING_POLL_MS |
| [`server/world/settings.test.ts`](../../server/world/settings.test.ts) | TESTE |
| [`server/world/settings.ts`](../../server/world/settings.ts) | WorldSession / DEVICE_ID_RE / TOKEN_RE |
| [`server/world/signals.test.ts`](../../server/world/signals.test.ts) | TESTE |
| [`server/world/signals.ts`](../../server/world/signals.ts) | AgentSignalsView / isCompaction / AgentSignals |
| [`server/world/social.test.ts`](../../server/world/social.test.ts) | TESTE |
| [`server/world/social.ts`](../../server/world/social.ts) | OwnerLink / OwnerListener / OwnerSocialOptions |
| [`server/world/sources.test.ts`](../../server/world/sources.test.ts) | TESTE |
| [`server/world/theme.test.ts`](../../server/world/theme.test.ts) | TESTE |
| [`server/world/theme.ts`](../../server/world/theme.ts) | resolveWorldTheme |
| [`server/world/tokens.test.ts`](../../server/world/tokens.test.ts) | TESTE |
| [`server/world/tokens.ts`](../../server/world/tokens.ts) | BuildingTokensOptions / BuildingTokens |
| [`server/world/uplink.test.ts`](../../server/world/uplink.test.ts) | TESTE |
| [`server/world/uplink.ts`](../../server/world/uplink.ts) | UplinkTiming / UPLINK_TIMING / backoffDelay |
| [`server/world/viewer.test.ts`](../../server/world/viewer.test.ts) | TESTE |
| [`server/world/viewer.ts`](../../server/world/viewer.ts) | CityLink / ViewerOptions / ViewerOutcome |

## shared/

| Arquivo | Responsabilidade ou símbolo exportado |
|---|---|
| [`shared/activity.test.ts`](../../shared/activity.test.ts) | TESTE |
| [`shared/activity.ts`](../../shared/activity.ts) | ActivityDescription / truncate / basename |
| [`shared/answers.test.ts`](../../shared/answers.test.ts) | TESTE |
| [`shared/answers.ts`](../../shared/answers.ts) | ANSWER_OTHER_MAX / ASK_TOOL / checkAnswers |
| [`shared/appearance.test.ts`](../../shared/appearance.test.ts) | TESTE |
| [`shared/appearance.ts`](../../shared/appearance.ts) | HAIR_STYLES / TOP_STYLES / ACCESSORIES |
| [`shared/daystats.test.ts`](../../shared/daystats.test.ts) | TESTE |
| [`shared/daystats.ts`](../../shared/daystats.ts) | HOUR_MS / MAX_GAP_MS / SETTLE_MS |
| [`shared/demo/daystats.test.ts`](../../shared/demo/daystats.test.ts) | TESTE |
| [`shared/demo/daystats.ts`](../../shared/demo/daystats.ts) | seedDemoHistory |
| [`shared/demo/github.test.ts`](../../shared/demo/github.test.ts) | TESTE |
| [`shared/demo/github.ts`](../../shared/demo/github.ts) | demoGitHubEvent |
| [`shared/demo/permission.test.ts`](../../shared/demo/permission.test.ts) | TESTE |
| [`shared/demo/permission.ts`](../../shared/demo/permission.ts) | DemoPermissionSource / DEMO_PERMISSION_MS / DemoPermissionKind |
| [`shared/demo/simulator.test.ts`](../../shared/demo/simulator.test.ts) | TESTE |
| [`shared/demo/simulator.ts`](../../shared/demo/simulator.ts) | DEMO_PROJECT_NAMES / DemoTickResult / DemoOptions |
| [`shared/demo/terminal.test.ts`](../../shared/demo/terminal.test.ts) | TESTE |
| [`shared/demo/terminal.ts`](../../shared/demo/terminal.ts) | demoTerminalEntries |
| [`shared/github.test.ts`](../../shared/github.test.ts) | TESTE |
| [`shared/github.ts`](../../shared/github.ts) | GitHubEventKind / GitHubEvent / GITHUB_TOOL |
| [`shared/hash.ts`](../../shared/hash.ts) | hash32 / mulberry32 |
| [`shared/i18n.test.ts`](../../shared/i18n.test.ts) | TESTE |
| [`shared/i18n.ts`](../../shared/i18n.ts) | Locale / LOCALES / LOCALE_STORAGE_KEY |
| [`shared/locales/all.ts`](../../shared/locales/all.ts) | DICTIONARIES |
| [`shared/locales/en.ts`](../../shared/locales/en.ts) | EN |
| [`shared/locales/es.ts`](../../shared/locales/es.ts) | ES |
| [`shared/locales/fr.ts`](../../shared/locales/fr.ts) | FR |
| [`shared/locales/none.ts`](../../shared/locales/none.ts) | DICTIONARIES |
| [`shared/messages.ts`](../../shared/messages.ts) | MESSAGE_MAX / MESSAGE_TOOL / describeMessage |
| [`shared/names.ts`](../../shared/names.ts) | PersonName / NAME_POOL / pickName |
| [`shared/timeline.test.ts`](../../shared/timeline.test.ts) | TESTE |
| [`shared/timeline.ts`](../../shared/timeline.ts) | TIMELINE_VERSION / TimelineActivity / TimelineShell |
| [`shared/types.ts`](../../shared/types.ts) | AgentKind / Provider / AgentStatus |
| [`shared/world/README.md`](../../shared/world/README.md) | configuração, recurso ou módulo interno |
| [`shared/world/api.test.ts`](../../shared/world/api.test.ts) | TESTE |
| [`shared/world/api.ts`](../../shared/world/api.ts) | WORLD_THEME_CHOICES / WorldThemeChoice / isWorldThemeChoice |
| [`shared/world/appearance-flat.test.ts`](../../shared/world/appearance-flat.test.ts) | TESTE |
| [`shared/world/appearance-flat.ts`](../../shared/world/appearance-flat.ts) | HairStyle / TopStyle / Accessory |
| [`shared/world/city.test.ts`](../../shared/world/city.test.ts) | TESTE |
| [`shared/world/city.ts`](../../shared/world/city.ts) | cityVersion / CityPoint / LOT |
| [`shared/world/floor-labels.test.ts`](../../shared/world/floor-labels.test.ts) | TESTE |
| [`shared/world/floor-labels.ts`](../../shared/world/floor-labels.ts) | isFloorNameId / floorLabel |
| [`shared/world/floor-names.ts`](../../shared/world/floor-names.ts) | FLOOR_NAME_IDS / FloorNameId |
| [`shared/world/intro.ts`](../../shared/world/intro.ts) | isIntroId / introLabel / introOptions |
| [`shared/world/labels.test.ts`](../../shared/world/labels.test.ts) | TESTE |
| [`shared/world/names-rules.test.ts`](../../shared/world/names-rules.test.ts) | TESTE |
| [`shared/world/names-rules.ts`](../../shared/world/names-rules.ts) | PlayerNameProblem / PlayerNameResult / playerNameKey |
| [`shared/world/office-from-world.test.ts`](../../shared/world/office-from-world.test.ts) | TESTE |
| [`shared/world/office-from-world.ts`](../../shared/world/office-from-world.ts) | WORLD_ID_PREFIX / worldId / isWorldId |
| [`shared/world/projection.test.ts`](../../shared/world/projection.test.ts) | TESTE |
| [`shared/world/projection.ts`](../../shared/world/projection.ts) | WorldIdSource / ProjectionInput / ProjectionResult |
| [`shared/world/protocol.test.ts`](../../shared/world/protocol.test.ts) | TESTE |
| [`shared/world/protocol.ts`](../../shared/world/protocol.ts) | HAIR_STYLES / TOP_STYLES / ACCESSORIES |
| [`shared/world/scene.test.ts`](../../shared/world/scene.test.ts) | TESTE |
| [`shared/world/scene.ts`](../../shared/world/scene.ts) | SceneResult / RESYNC_GAP_MS / MAX_SCENE_PLAYERS |
| [`shared/world/schema-validator.ts`](../../shared/world/schema-validator.ts) | Schema / SchemaError / compileValidator |
| [`shared/world/schema.json`](../../shared/world/schema.json) | configuração, recurso ou módulo interno |
| [`shared/world/social-labels.ts`](../../shared/world/social-labels.ts) | SocialLabel / GREETINGS / STAMPS |
| [`shared/world/traits.ts`](../../shared/world/traits.ts) | Trait / TRAITS / isTraitId |
| [`shared/world/visit-sample.ts`](../../shared/world/visit-sample.ts) | sampleBuildingDetail |

## scripts/

| Arquivo | Responsabilidade ou símbolo exportado |
|---|---|
| [`scripts/assets/README.md`](../../scripts/assets/README.md) | configuração, recurso ou módulo interno |
| [`scripts/assets/generate.mjs`](../../scripts/assets/generate.mjs) | Gerador de imagens via OpenRouter para os assets do Habblaud. |
| [`scripts/assets/generation-log.json`](../../scripts/assets/generation-log.json) | configuração, recurso ou módulo interno |
| [`scripts/assets/specs.json`](../../scripts/assets/specs.json) | configuração, recurso ou módulo interno |
| [`scripts/build-info.mjs`](../../scripts/build-info.mjs) | gitBuildInfo / writeBuildInfo |
| [`scripts/build-server.mjs`](../../scripts/build-server.mjs) | Empacota o servidor (TypeScript) em um único arquivo ESM em dist/server e grava dist/build.json (commit e "cópia |
| [`scripts/codex-bridge.ts`](../../scripts/codex-bridge.ts) | DEFAULT_PORT / POLL_MS / WAIT_ROUND_MIN_MS |
| [`scripts/codex-install.ts`](../../scripts/codex-install.ts) | HOOK_SCRIPT / DEFAULT_PORT / DEFAULT_WAIT_S |
| [`scripts/demo-timeline.ts`](../../scripts/demo-timeline.ts) | DemoTimelineOptions / parseArgs / sessionsAt |
| [`scripts/docker-up.ts`](../../scripts/docker-up.ts) | CODEX_MOUNTED_SUBDIRS / Options / parseArgs |
| [`scripts/hooks-install.ts`](../../scripts/hooks-install.ts) | HOOK_SCRIPT / LEGACY_HOOK_SCRIPT / DEFAULT_PORT |
| [`scripts/i18n-check.ts`](../../scripts/i18n-check.ts) | collectKeys |
| [`scripts/mod-install.ts`](../../scripts/mod-install.ts) | MARKETPLACE / MOD_PLUGIN / PERMISSIONS_PLUGIN |
| [`scripts/permission-hook.mjs`](../../scripts/permission-hook.mjs) | Caminho antigo do hook de permissão. Até a 0.2.0, o 'npm run hooks:install' gravava este arquivo no settings.jso |
| [`scripts/release.ts`](../../scripts/release.ts) | ReleaseArgs / parseReleaseArgs / changelogSection |
| [`scripts/remote-mdns.ts`](../../scripts/remote-mdns.ts) | mdnsCommand |
| [`scripts/remote-setup.ts`](../../scripts/remote-setup.ts) | MIN_PASSWORD / SetupArgs / parseArgs |
| [`scripts/shot.mjs`](../../scripts/shot.mjs) | Screenshot isolado (Chromium headless do Playwright, sem tocar no navegador do usuário). |
| [`scripts/statusline-install.ts`](../../scripts/statusline-install.ts) | TAP_SCRIPT / shellQuote / shellUnquote |
| [`scripts/statusline-tap.mjs`](../../scripts/statusline-tap.mjs) | originalCommand / configDirOf / usageRecord |
| [`scripts/world-shots.mjs`](../../scripts/world-shots.mjs) | Capturas da seção do Habblaud World no modo demonstração (?mock=1&world=approved: só dados fictícios do |

## mod/

| Arquivo | Responsabilidade ou símbolo exportado |
|---|---|
| [`mod/README.md`](../../mod/README.md) | configuração, recurso ou módulo interno |
| [`mod/habblaud/.claude-plugin/plugin.json`](../../mod/habblaud/.claude-plugin/plugin.json) | configuração, recurso ou módulo interno |
| [`mod/habblaud/hooks/hooks.json`](../../mod/habblaud/hooks/hooks.json) | configuração, recurso ou módulo interno |
| [`mod/habblaud/hooks/register.ts`](../../mod/habblaud/hooks/register.ts) | DEFAULT_PORT / POLL_MS / OFFLINE_POLL_MS |
| [`mod/habblaud/tests/habblaud.test.ts`](../../mod/habblaud/tests/habblaud.test.ts) | TESTE |
| [`mod/habblaud-codex/hook.mjs`](../../mod/habblaud-codex/hook.mjs) | DEFAULT_PORT / DEFAULT_WAIT_S / MIN_WAIT_S |
| [`mod/habblaud-mensagens/.claude-plugin/plugin.json`](../../mod/habblaud-mensagens/.claude-plugin/plugin.json) | configuração, recurso ou módulo interno |
| [`mod/habblaud-mensagens/hooks/hooks.json`](../../mod/habblaud-mensagens/hooks/hooks.json) | configuração, recurso ou módulo interno |
| [`mod/habblaud-mensagens/hooks/register.ts`](../../mod/habblaud-mensagens/hooks/register.ts) | DEFAULT_PORT / POLL_MS / OFFLINE_POLL_MS |
| [`mod/habblaud-mensagens/tests/habblaud-mensagens.test.ts`](../../mod/habblaud-mensagens/tests/habblaud-mensagens.test.ts) | TESTE |
| [`mod/habblaud-permissoes/.claude-plugin/plugin.json`](../../mod/habblaud-permissoes/.claude-plugin/plugin.json) | configuração, recurso ou módulo interno |
| [`mod/habblaud-permissoes/hooks/hooks.json`](../../mod/habblaud-permissoes/hooks/hooks.json) | configuração, recurso ou módulo interno |
| [`mod/habblaud-permissoes/hooks/permission-hook.mjs`](../../mod/habblaud-permissoes/hooks/permission-hook.mjs) | DEFAULT_PORT / DEFAULT_TIMEOUT_S / parseOptions |
