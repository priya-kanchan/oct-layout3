Project Name — new landing page

Open index.html to view the layout. For deployment, upload this folder's contents
to the web root. The old-layout folder has not been modified.

The page follows the supplied reference with local CSS, local WOFF2 fonts,
local JavaScript and WebP images, including icons and country flag sprites.
No PNG, JPG, JPEG or SVG assets remain in the new-layout site. Bootstrap is absent.
GTF services, optional country detection and contact links use external access.

Form integration:
- Project configuration, API loading and field mappings are at the bottom of
  index.html. Country selectors are initialized by js/intl.custom.js.
- Uses the user-supplied live script:
  https://api2.gtftech.com/scripts/queryform.min.ssl.js?v=<timestamp>
- Uses the supplied AgentInfo without changing its values: agent 4444,
  Godrej Global Business City Noida, and the supplied godrej-dmic site and
  thank-you URLs under https://godrejluxuryhomesindia.com/noida/.
- The external helper owns validation, tracking, submission and redirection.
  There are no local API replacements or custom field-validation handlers.
- The prior config.js, phone-input.js and queryform.min.ssl.js were removed.
  main.js contains only page presentation and interaction behavior.
- The supplied jQuery click handlers call SubmitQueryData with their field IDs.
  The optional second-popup mapping is retained and binds only if it exists.
- Country selectors use the supplied intl-tel-input v18.2.1 CDN CSS/JS and
  js/intl.custom.js. Each phone input targets its own hidden dial-code input
  through data-countrycode-id; SenderControlCountryCodeID maps that ID in GTF.
  Flag sprites are overridden with local WebP assets. Design is unchanged.
- Supplied integration is retained, with SenderControlCountryCodeID added to
  each existing form mapping as requested.
  No Promise loader, custom submission wrapper or API override remains.
- The form containers use div elements, matching the supplied markup, to avoid
  native form reloads. GTF error labels display below their input using CSS.

SEO and loading:
- Semantic sections, one H1, descriptive image text and accessible dialogs.
- Title, description, canonical, social metadata and WebPage structured data.
- The original canonical and live URLs are retained. Update them if deploying
  under a different URL; make sure the configured thanks.htm exists there.
- Responsive WebP hero, high-priority hero loading, deferred JavaScript,
  lazy-loaded section imagery, local fonts and reduced-motion support.
- No live PageSpeed score is claimed. Hosting compression and cache headers
  should be configured on the production server.

Verification:
- Browser checks at widths 320, 360, 390, 620, 768, 850, 1024, 1280, 1440,
  1920 and 2560 pixels passed without horizontal overflow.
- All eight top navigation links connect to visible sections, including a
  standalone Developer section outside the expandable Overview details.
- Navigation, enquiry dialogs, gallery navigation, supplied integration mappings,
  failure handling and encoded submission routing passed.
- Remote APIs were mocked during tests; live lead delivery was not tested.
- Results and desktop/mobile screenshots are in ../layout-checks/.

AI imagery update:
All property and lifestyle photographs are now AI-generated luxury concepts.
Seven unique images plus a smaller hero variant are in images/ai/.
Maps, brand identity, amenity icons and the RERA QR remain factual source assets.
Generated visuals are labeled as illustrations on the page.
The built-in image_gen tool was used. The full prompt set and source provenance
are recorded in ../layout-checks/ai-image-prompts.json.
Reference section update:
- css/section-layouts.css styles the building panorama and floor-plan selector.
- The Developer navigation target retains about_builder and now displays the
  supplied building-section composition with a generated architectural image.
- Building image: images/ai/building-panorama.webp; built-in Imagegen prompt:
  ../layout-checks/building-image-prompt.txt.
- Floor-plan tabs use the existing 2900, 3500 and 4100 sq.ft. project images.
  The selected plan, carpet area, accessible tab state and enlarged image update
  together. Arrow keys, Home and End also select plans.
- Explore the Building, Download Brochure and Watch the Film request the enquiry
  modal. No project film asset was supplied; the film action requests access.
- Desktop/mobile section screenshots are saved in ../layout-checks/.
