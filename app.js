/* ═══════════════════════════════════════════════════
   CSS Interactive Lab — Application Logic
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Default State ───
  const DEFAULTS = Object.freeze({
    width: 300,
    widthUnit: 'px',
    height: 200,
    heightUnit: 'px',
    marginTop: 24,
    marginRight: 24,
    marginBottom: 24,
    marginLeft: 24,
    marginLinked: true,
    paddingTop: 24,
    paddingRight: 24,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingLinked: true,
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.6,
    textAlign: 'left',
    borderWidth: 2,
    borderRadius: 12,
    borderStyle: 'solid',
    borderColor: '#6366f1',
    bgColor: '#1e293b',
    textColor: '#e2e8f0',
    shadowX: 0,
    shadowY: 8,
    shadowBlur: 24,
    shadowSpread: 0,
    shadowColor: '#000000',
    shadowOpacity: 25,
    display: 'block',
    position: 'static',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    activeX: 'left',
    activeY: 'top',
    bgImage: '',
    bgSize: 'cover',
    bgPos: 'center',
    bgRepeat: 'no-repeat',
    bgAttach: 'scroll',
    showGuides: true,
    showSiblings: false,
    theme: 'light',
    dir: 'ltr',
  });

  // Flexbox defaults
  const FLEX_DEFAULTS = Object.freeze({
    direction: 'row',
    wrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'stretch',
    gap: 8,
    itemCount: 6,
    selectedItem: 'all',
    // Per-item properties (indexed arrays)
    itemGrow: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    itemShrink: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    itemBasis: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    itemOrder: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    itemAlignSelf: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
  });

  // Clone state from defaults
  let state = { ...DEFAULTS };
  let flexState = {
    ...FLEX_DEFAULTS,
    itemGrow: [...FLEX_DEFAULTS.itemGrow],
    itemShrink: [...FLEX_DEFAULTS.itemShrink],
    itemBasis: [...FLEX_DEFAULTS.itemBasis],
    itemOrder: [...FLEX_DEFAULTS.itemOrder],
    itemAlignSelf: [...FLEX_DEFAULTS.itemAlignSelf],
  };

  // Track current active tab
  let currentTab = 'dimensions';

  // ─── DOM References ───
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const dom = {
    html: document.documentElement,
    body: document.body,
    // Landing
    landingPage: $('#landingPage'),
    enterLabBtn: $('#enterLabBtn'),
    appWrapper: $('#appWrapper'),
    backToLanding: $('#backToLanding'),
    // Header
    dirToggle: $('#dirToggle'),
    themeToggle: $('#themeToggle'),
    // Tabs
    tabBtns: $$('.tab-btn'),
    tabPanels: $$('.tab-panel'),
    // Sliders
    widthSlider: $('#widthSlider'),
    widthUnit: $('#widthUnit'),
    heightSlider: $('#heightSlider'),
    heightUnit: $('#heightUnit'),
    marginTop: $('#marginTop'),
    marginRight: $('#marginRight'),
    marginBottom: $('#marginBottom'),
    marginLeft: $('#marginLeft'),
    marginLink: $('#marginLink'),
    paddingTop: $('#paddingTop'),
    paddingRight: $('#paddingRight'),
    paddingBottom: $('#paddingBottom'),
    paddingLeft: $('#paddingLeft'),
    paddingLink: $('#paddingLink'),
    fontSize: $('#fontSize'),
    fontWeight: $('#fontWeight'),
    lineHeight: $('#lineHeight'),
    fontFamily: $('#fontFamily'),
    borderWidth: $('#borderWidth'),
    borderRadius: $('#borderRadius'),
    borderStyle: $('#borderStyle'),
    borderColor: $('#borderColor'),
    bgColor: $('#bgColor'),
    textColor: $('#textColor'),
    shadowX: $('#shadowX'),
    shadowY: $('#shadowY'),
    shadowBlur: $('#shadowBlur'),
    shadowSpread: $('#shadowSpread'),
    shadowColor: $('#shadowColor'),
    shadowOpacity: $('#shadowOpacity'),
    // New Controls
    displayProp: $('#displayProp'),
    positionProp: $('#positionProp'),
    topProp: $('#topProp'),
    rightProp: $('#rightProp'),
    bottomProp: $('#bottomProp'),
    leftProp: $('#leftProp'),
    bgImageProp: $('#bgImageProp'),
    bgSizeProp: $('#bgSizeProp'),
    bgPosProp: $('#bgPosProp'),
    bgRepeatProp: $('#bgRepeatProp'),
    bgAttachProp: $('#bgAttachProp'),
    // Value displays
    widthVal: $('#widthVal'),
    heightVal: $('#heightVal'),
    marginTopVal: $('#marginTopVal'),
    marginRightVal: $('#marginRightVal'),
    marginBottomVal: $('#marginBottomVal'),
    marginLeftVal: $('#marginLeftVal'),
    paddingTopVal: $('#paddingTopVal'),
    paddingRightVal: $('#paddingRightVal'),
    paddingBottomVal: $('#paddingBottomVal'),
    paddingLeftVal: $('#paddingLeftVal'),
    fontSizeVal: $('#fontSizeVal'),
    fontWeightVal: $('#fontWeightVal'),
    lineHeightVal: $('#lineHeightVal'),
    borderWidthVal: $('#borderWidthVal'),
    borderRadiusVal: $('#borderRadiusVal'),
    borderColorHex: $('#borderColorHex'),
    bgColorHex: $('#bgColorHex'),
    textColorHex: $('#textColorHex'),
    shadowXVal: $('#shadowXVal'),
    shadowYVal: $('#shadowYVal'),
    shadowBlurVal: $('#shadowBlurVal'),
    shadowSpreadVal: $('#shadowSpreadVal'),
    shadowColorHex: $('#shadowColorHex'),
    shadowOpacityVal: $('#shadowOpacityVal'),
    topVal: $('#topVal'),
    rightVal: $('#rightVal'),
    bottomVal: $('#bottomVal'),
    leftVal: $('#leftVal'),
    // Align buttons
    alignBtns: $$('.align-btn'),
    // Canvas
    canvasStage: $('#canvasStage'),
    canvasToolbarTitle: $('#canvasToolbarTitle'),
    targetWrapper: $('#targetWrapper'),
    targetCard: $('#targetCard'),
    paddingOverlay: $('#paddingOverlay'),
    contentBox: $('#contentBox'),
    toggleGuides: $('#toggleGuides'),
    guidesDot: $('#guidesDot'),
    showSiblingsToggle: $('#showSiblingsToggle'),
    siblings: $$('.sibling-element'),
    // Rulers
    rulerWidth: $('#rulerWidth'),
    rulerHeight: $('#rulerHeight'),
    rulerWidthLabel: $('#rulerWidthLabel'),
    rulerHeightLabel: $('#rulerHeightLabel'),
    // Code
    codeOutput: $('#codeOutput'),
    copyBtn: $('#copyBtn'),
    resetBtn: $('#resetBtn'),
    codePanel: $('#codePanel'),
    toast: $('#toast'),
    // Flexbox
    flexCanvas: $('#flexCanvas'),
    flexContainer: $('#flexContainer'),
    flexCodePanel: $('#flexCodePanel'),
    flexCodeOutput: $('#flexCodeOutput'),
    copyFlexBtn: $('#copyFlexBtn'),
    flexDirection: $('#flexDirection'),
    flexWrap: $('#flexWrap'),
    justifyContent: $('#justifyContent'),
    alignItems: $('#alignItems'),
    alignContent: $('#alignContent'),
    flexGap: $('#flexGap'),
    flexGapVal: $('#flexGapVal'),
    flexItemCount: $('#flexItemCount'),
    flexItemCountVal: $('#flexItemCountVal'),
    flexGrow: $('#flexGrow'),
    flexGrowVal: $('#flexGrowVal'),
    flexShrink: $('#flexShrink'),
    flexShrinkVal: $('#flexShrinkVal'),
    flexBasis: $('#flexBasis'),
    flexBasisVal: $('#flexBasisVal'),
    flexOrder: $('#flexOrder'),
    flexOrderVal: $('#flexOrderVal'),
    alignSelf: $('#alignSelf'),
    flexItemBtns: $$('.flex-item-btn'),
  };


  // ═══════════════════════════════════════════════════
  //  INITIALIZATION
  // ═══════════════════════════════════════════════════

  function init() {
    applyStateToControls();
    applyStateToPreview();
    generateCode();
    bindEvents();
    updateGuideToggleUI();
    updateFlexPreview();
    generateFlexCode();
  }


  // ═══════════════════════════════════════════════════
  //  LANDING PAGE
  // ═══════════════════════════════════════════════════

  function showLab() {
    dom.landingPage.classList.add('hidden');
    dom.appWrapper.style.display = 'flex';
    dom.body.style.overflow = 'hidden';
    setTimeout(() => {
      dom.landingPage.style.display = 'none';
    }, 600);
  }

  function showLanding() {
    dom.landingPage.style.display = 'flex';
    dom.landingPage.classList.remove('hidden');
    dom.appWrapper.style.display = 'none';
  }


  // ═══════════════════════════════════════════════════
  //  SYNC STATE → CONTROLS
  // ═══════════════════════════════════════════════════

  function applyStateToControls() {
    // Sliders
    dom.widthSlider.value = state.width;
    if(dom.widthUnit) dom.widthUnit.value = state.widthUnit;
    dom.heightSlider.value = state.height;
    if(dom.heightUnit) dom.heightUnit.value = state.heightUnit;
    dom.marginTop.value = state.marginTop;
    dom.marginRight.value = state.marginRight;
    dom.marginBottom.value = state.marginBottom;
    dom.marginLeft.value = state.marginLeft;
    dom.marginLink.checked = state.marginLinked;
    dom.paddingTop.value = state.paddingTop;
    dom.paddingRight.value = state.paddingRight;
    dom.paddingBottom.value = state.paddingBottom;
    dom.paddingLeft.value = state.paddingLeft;
    dom.paddingLink.checked = state.paddingLinked;
    dom.fontFamily.value = state.fontFamily;
    dom.fontSize.value = state.fontSize;
    dom.fontWeight.value = state.fontWeight;
    dom.lineHeight.value = state.lineHeight;
    dom.borderWidth.value = state.borderWidth;
    dom.borderRadius.value = state.borderRadius;
    dom.borderStyle.value = state.borderStyle;
    dom.borderColor.value = state.borderColor;
    dom.bgColor.value = state.bgColor;
    dom.textColor.value = state.textColor;
    dom.shadowX.value = state.shadowX;
    dom.shadowY.value = state.shadowY;
    dom.shadowBlur.value = state.shadowBlur;
    dom.shadowSpread.value = state.shadowSpread;
    dom.shadowColor.value = state.shadowColor;
    dom.shadowOpacity.value = state.shadowOpacity;

    if(dom.displayProp) dom.displayProp.value = state.display;
    if(dom.positionProp) dom.positionProp.value = state.position;
    if(dom.topProp) dom.topProp.value = state.top;
    if(dom.rightProp) dom.rightProp.value = state.right;
    if(dom.bottomProp) dom.bottomProp.value = state.bottom;
    if(dom.leftProp) dom.leftProp.value = state.left;
    if(dom.bgImageProp) dom.bgImageProp.value = state.bgImage;
    if(dom.bgSizeProp) dom.bgSizeProp.value = state.bgSize;
    if(dom.bgPosProp) dom.bgPosProp.value = state.bgPos;
    if(dom.bgRepeatProp) dom.bgRepeatProp.value = state.bgRepeat;
    if(dom.bgAttachProp) dom.bgAttachProp.value = state.bgAttach;
    
    // Borders
    dom.themeToggle.checked = state.theme === 'dark';
    dom.dirToggle.checked = state.dir === 'rtl';
    if(dom.showSiblingsToggle) dom.showSiblingsToggle.checked = state.showSiblings;

    // Value displays
    updateAllValueDisplays();

    // Align buttons
    dom.alignBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.align === state.textAlign);
    });
  }

  function updateAllValueDisplays() {
    dom.widthVal.textContent = state.width + state.widthUnit;
    dom.heightVal.textContent = state.height + state.heightUnit;
    dom.marginTopVal.textContent = state.marginTop + 'px';
    dom.marginRightVal.textContent = state.marginRight + 'px';
    dom.marginBottomVal.textContent = state.marginBottom + 'px';
    dom.marginLeftVal.textContent = state.marginLeft + 'px';
    dom.paddingTopVal.textContent = state.paddingTop + 'px';
    dom.paddingRightVal.textContent = state.paddingRight + 'px';
    dom.paddingBottomVal.textContent = state.paddingBottom + 'px';
    dom.paddingLeftVal.textContent = state.paddingLeft + 'px';
    dom.fontSizeVal.textContent = state.fontSize + 'px';
    dom.fontWeightVal.textContent = state.fontWeight;
    dom.lineHeightVal.textContent = state.lineHeight;
    dom.borderWidthVal.textContent = state.borderWidth + 'px';
    dom.borderRadiusVal.textContent = state.borderRadius + 'px';
    dom.borderColorHex.textContent = state.borderColor;
    dom.bgColorHex.textContent = state.bgColor;
    dom.textColorHex.textContent = state.textColor;
    dom.shadowXVal.textContent = state.shadowX + 'px';
    dom.shadowYVal.textContent = state.shadowY + 'px';
    dom.shadowBlurVal.textContent = state.shadowBlur + 'px';
    dom.shadowSpreadVal.textContent = state.shadowSpread + 'px';
    dom.shadowColorHex.textContent = state.shadowColor;
    dom.shadowOpacityVal.textContent = state.shadowOpacity + '%';
    
    if(dom.topVal) dom.topVal.textContent = state.top + 'px';
    if(dom.rightVal) dom.rightVal.textContent = state.right + 'px';
    if(dom.bottomVal) dom.bottomVal.textContent = state.bottom + 'px';
    if(dom.leftVal) dom.leftVal.textContent = state.left + 'px';
  }


  // ═══════════════════════════════════════════════════
  //  SYNC STATE → PREVIEW (Canvas Target)
  // ═══════════════════════════════════════════════════

  function applyStateToPreview() {
    const card = dom.targetCard;
    const wrapper = dom.targetWrapper;

    // Dimensions
    card.style.width = state.width + state.widthUnit;
    card.style.height = state.height + state.heightUnit;

    // Margin → applied as wrapper padding (so it's visible as the gap)
    wrapper.style.padding = `${state.marginTop}px ${state.marginRight}px ${state.marginBottom}px ${state.marginLeft}px`;

    // Padding
    card.style.padding = `${state.paddingTop}px ${state.paddingRight}px ${state.paddingBottom}px ${state.paddingLeft}px`;

    // Typography
    card.style.fontFamily = state.fontFamily;
    card.style.fontSize = state.fontSize + 'px';
    card.style.fontWeight = state.fontWeight;
    card.style.lineHeight = state.lineHeight;
    card.style.textAlign = state.textAlign;

    // Border
    card.style.borderWidth = state.borderWidth + 'px';
    card.style.borderStyle = state.borderStyle;
    card.style.borderColor = state.borderColor;
    card.style.borderRadius = state.borderRadius + 'px';

    // Colors
    card.style.backgroundColor = state.bgColor;
    card.style.color = state.textColor;

    // Box Shadow
    const shadowRgba = hexToRgba(state.shadowColor, state.shadowOpacity / 100);
    card.style.boxShadow = `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${shadowRgba}`;

    // Display & Position
    let outerDisplay = state.display;
    if (['flex', 'grid', 'block'].includes(state.display)) outerDisplay = 'block';
    if (['inline-flex', 'inline-grid', 'inline-block'].includes(state.display)) outerDisplay = 'inline-block';
    if (state.display === 'inline') outerDisplay = 'inline';
    if (state.display === 'none') outerDisplay = 'none';

    wrapper.style.display = outerDisplay;
    card.style.display = state.display;
    card.classList.toggle('is-inline', state.display === 'inline');
    
    wrapper.style.position = state.position;
    if (state.position !== 'static') {
      wrapper.style.top = state.activeY === 'top' ? state.top + 'px' : 'auto';
      wrapper.style.bottom = state.activeY === 'bottom' ? state.bottom + 'px' : 'auto';
      wrapper.style.left = state.activeX === 'left' ? state.left + 'px' : 'auto';
      wrapper.style.right = state.activeX === 'right' ? state.right + 'px' : 'auto';
    } else {
      wrapper.style.top = '';
      wrapper.style.right = '';
      wrapper.style.bottom = '';
      wrapper.style.left = '';
    }
    
    // Reset card position in case it was applied previously
    card.style.position = '';
    card.style.top = '';
    card.style.right = '';
    card.style.bottom = '';
    card.style.left = '';

    // Background Image
    if (state.bgImage && state.bgImage.trim() !== '') {
      card.style.backgroundImage = `url(${state.bgImage})`;
      card.style.backgroundSize = state.bgSize;
      card.style.backgroundPosition = state.bgPos;
      card.style.backgroundRepeat = state.bgRepeat;
      card.style.backgroundAttachment = state.bgAttach;
    } else {
      card.style.backgroundImage = 'none';
      card.style.backgroundSize = '';
      card.style.backgroundPosition = '';
      card.style.backgroundRepeat = '';
      card.style.backgroundAttachment = '';
    }

    // Sibling Boxes (Flow Test)
    if (state.showSiblings) {
      dom.canvasStage.classList.add('normal-flow');
      dom.siblings.forEach(s => {
        s.style.display = outerDisplay;
        s.classList.toggle('is-inline', outerDisplay === 'inline');
      });
    } else {
      dom.canvasStage.classList.remove('normal-flow');
      dom.siblings.forEach(s => {
        s.style.display = 'none';
        s.classList.remove('is-inline');
      });
    }

    // Box Model guides
    wrapper.classList.toggle('show-guides', state.showGuides);

    // Rulers
    updateRulers();
  }

  function updateRulers() {
    const wrapper = dom.targetWrapper;
    const card = dom.targetCard;
    // Width ruler tracks the card width
    dom.rulerWidth.style.width = card.offsetWidth + 'px';
    dom.rulerWidthLabel.textContent = state.display === 'inline' 
      ? 'Ignored for inline' 
      : state.width + state.widthUnit;

    // Height ruler tracks the card height
    dom.rulerHeight.style.height = card.offsetHeight + 'px';
    dom.rulerHeightLabel.textContent = state.display === 'inline'
      ? 'Ignored for inline'
      : state.height + state.heightUnit;
  }


  // ═══════════════════════════════════════════════════
  //  GENERATE CSS CODE
  // ═══════════════════════════════════════════════════

  function generateCode() {
    const s = state;
    const shadowRgba = hexToRgba(s.shadowColor, s.shadowOpacity / 100);

    // Build margin shorthand
    const margin = shorthand(s.marginTop, s.marginRight, s.marginBottom, s.marginLeft, 'px');
    const padding = shorthand(s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft, 'px');

    const lines = [];
    
    lines.push({ comment: 'Layout' });
    if (s.display !== 'block') lines.push({ prop: 'display', val: s.display });
    if (s.position !== 'static') {
      lines.push({ prop: 'position', val: s.position });
      
      if (s.activeY === 'top') {
        lines.push({ prop: 'top', val: s.top + 'px' });
      } else {
        lines.push({ prop: 'bottom', val: s.bottom + 'px' });
      }
      
      if (s.activeX === 'left') {
        lines.push({ prop: 'left', val: s.left + 'px' });
      } else {
        lines.push({ prop: 'right', val: s.right + 'px' });
      }
    }
    
    lines.push({ comment: 'Dimensions' });
    lines.push({ prop: 'width', val: s.width + s.widthUnit });
    lines.push({ prop: 'height', val: s.height + s.heightUnit });
    lines.push({ blank: true });

    lines.push({ comment: 'Box Model' });
    lines.push({ prop: 'margin', val: margin });
    lines.push({ prop: 'padding', val: padding });
    lines.push({ blank: true });

    lines.push({ comment: 'Border' });
    lines.push({ prop: 'border', val: `${s.borderWidth}px ${s.borderStyle} ${s.borderColor}` });
    lines.push({ prop: 'border-radius', val: s.borderRadius + 'px' });
    lines.push({ blank: true });

    lines.push({ comment: 'Typography' });
    lines.push({ prop: 'font-family', val: s.fontFamily });
    lines.push({ prop: 'font-size', val: s.fontSize + 'px' });
    lines.push({ prop: 'font-weight', val: '' + s.fontWeight });
    lines.push({ prop: 'line-height', val: '' + s.lineHeight });
    lines.push({ prop: 'text-align', val: s.textAlign });
    lines.push({ blank: true });

    lines.push({ comment: 'Colors & Background' });
    lines.push({ prop: 'background-color', val: s.bgColor });
    if (s.bgImage && s.bgImage.trim() !== '') {
      lines.push({ prop: 'background-image', val: `url("${s.bgImage}")` });
      lines.push({ prop: 'background-size', val: s.bgSize });
      lines.push({ prop: 'background-position', val: s.bgPos });
      lines.push({ prop: 'background-repeat', val: s.bgRepeat });
      lines.push({ prop: 'background-attachment', val: s.bgAttach });
    }
    lines.push({ prop: 'color', val: s.textColor });
    lines.push({ blank: true });

    lines.push({ comment: 'Effects' });
    lines.push({ prop: 'box-shadow', val: `${s.shadowX}px ${s.shadowY}px ${s.shadowBlur}px ${s.shadowSpread}px ${shadowRgba}` });

    // Build syntax-highlighted HTML
    let html = span('syn-selector', '.box') + ' ' + span('syn-brace', '{') + '\n';

    for (const line of lines) {
      if (line.blank) {
        html += '\n';
      } else if (line.comment) {
        html += '  ' + span('syn-comment', '/* ' + line.comment + ' */') + '\n';
      } else {
        const valClass = isColorValue(line.val) ? 'syn-val-color' : isNumericValue(line.val) ? 'syn-val-num' : 'syn-val';
        html += '  ' + span('syn-prop', line.prop) + span('syn-colon', ': ') + span(valClass, escapeHtml(line.val)) + span('syn-semi', ';') + '\n';
      }
    }

    html += span('syn-brace', '}');

    dom.codeOutput.innerHTML = html;
  }

  function getPlainCSS() {
    const s = state;
    const shadowRgba = hexToRgba(s.shadowColor, s.shadowOpacity / 100);
    const margin = shorthand(s.marginTop, s.marginRight, s.marginBottom, s.marginLeft, 'px');
    const padding = shorthand(s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft, 'px');

    let extraCSS = '';
    if (s.display !== 'block') extraCSS += `\n  display: ${s.display};`;
    if (s.position !== 'static') {
      extraCSS += `\n  position: ${s.position};`;
      if (s.activeY === 'top') extraCSS += `\n  top: ${s.top}px;`;
      else extraCSS += `\n  bottom: ${s.bottom}px;`;
      if (s.activeX === 'left') extraCSS += `\n  left: ${s.left}px;`;
      else extraCSS += `\n  right: ${s.right}px;`;
    }
    
    let bgCSS = `\n  background-color: ${s.bgColor};`;
    if (s.bgImage && s.bgImage.trim() !== '') {
      extraCSS += `\n  background-image: url(${s.bgImage});`;
      if (s.bgSize !== 'auto') extraCSS += `\n  background-size: ${s.bgSize};`;
      if (s.bgPos !== '0% 0%') extraCSS += `\n  background-position: ${s.bgPos};`;
      if (s.bgRepeat !== 'repeat') extraCSS += `\n  background-repeat: ${s.bgRepeat};`;
      if (s.bgAttach !== 'scroll') extraCSS += `\n  background-attachment: ${s.bgAttach};`;
    } else {
      extraCSS += `\n  background-color: ${s.bgColor};`;
    }

    return `.box {${extraCSS}
  /* Dimensions */
  width: ${s.width}${s.widthUnit};
  height: ${s.height}${s.heightUnit};

  /* Box Model */
  margin: ${margin};
  padding: ${padding};

  /* Border */
  border: ${s.borderWidth}px ${s.borderStyle} ${s.borderColor};
  border-radius: ${s.borderRadius}px;

  /* Typography */
  font-family: ${s.fontFamily};
  font-size: ${s.fontSize}px;
  font-weight: ${s.fontWeight};
  line-height: ${s.lineHeight};
  text-align: ${s.textAlign};

  /* Colors & Background */${bgCSS}
  color: ${s.textColor};

  /* Effects */
  box-shadow: ${s.shadowX}px ${s.shadowY}px ${s.shadowBlur}px ${s.shadowSpread}px ${shadowRgba};
}`;
  }


  // ═══════════════════════════════════════════════════
  //  FLEXBOX LOGIC
  // ═══════════════════════════════════════════════════

  function updateFlexPreview() {
    const container = dom.flexContainer;
    if (!container) return;

    // Apply container properties
    container.style.flexDirection = flexState.direction;
    container.style.flexWrap = flexState.wrap;
    container.style.justifyContent = flexState.justifyContent;
    container.style.alignItems = flexState.alignItems;
    container.style.alignContent = flexState.alignContent;
    container.style.gap = flexState.gap + 'px';

    // Ensure we have enough children
    while (container.querySelectorAll('.flex-child').length < 12) {
      const idx = container.querySelectorAll('.flex-child').length;
      const newChild = document.createElement('div');
      newChild.className = 'flex-child';
      newChild.dataset.index = idx;
      container.appendChild(newChild);
      newChild.addEventListener('click', () => selectFlexItem(idx));
    }

    // Update children
    const children = container.querySelectorAll('.flex-child');
    children.forEach((child, i) => {
      if (i < flexState.itemCount) {
        child.style.display = 'flex';
        // Apply per-item properties
        child.style.flexGrow = flexState.itemGrow[i];
        child.style.flexShrink = flexState.itemShrink[i];
        child.style.flexBasis = flexState.itemBasis[i] > 0 ? flexState.itemBasis[i] + 'px' : 'auto';
        child.style.order = flexState.itemOrder[i];
        child.style.alignSelf = flexState.itemAlignSelf[i];

        // Build label with non-default properties
        let labelParts = [];
        if (flexState.itemGrow[i] !== 0) labelParts.push('grow:' + flexState.itemGrow[i]);
        if (flexState.itemShrink[i] !== 1) labelParts.push('shrink:' + flexState.itemShrink[i]);
        if (flexState.itemBasis[i] > 0) labelParts.push('basis:' + flexState.itemBasis[i] + 'px');
        if (flexState.itemOrder[i] !== 0) labelParts.push('order:' + flexState.itemOrder[i]);
        if (flexState.itemAlignSelf[i] !== 'auto') labelParts.push('self:' + flexState.itemAlignSelf[i]);

        // Update content
        let content = `<span>Child ${i + 1}</span>`;
        if (labelParts.length > 0) {
          content += `<span class="flex-child-label">${labelParts.join(' | ')}</span>`;
        }
        child.innerHTML = content;
      } else {
        child.style.display = 'none';
      }
    });

    // Update selected state
    children.forEach((child, i) => {
      if (flexState.selectedItem === 'all') {
        child.classList.remove('selected');
      } else {
        child.classList.toggle('selected', i === parseInt(flexState.selectedItem));
      }
    });
  }

  function selectFlexItem(index) {
    flexState.selectedItem = String(index);
    
    // Update button UI
    dom.flexItemBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.item === String(index));
    });

    // Load selected item's values into controls
    loadItemProperties(index);
    updateFlexPreview();
  }

  function loadItemProperties(index) {
    const idx = parseInt(index);
    if (isNaN(idx) || idx < 0) {
      // "All" selected - show zeros/defaults
      if (dom.flexGrow) { dom.flexGrow.value = 0; dom.flexGrowVal.textContent = '0'; }
      if (dom.flexShrink) { dom.flexShrink.value = 1; dom.flexShrinkVal.textContent = '1'; }
      if (dom.flexBasis) { dom.flexBasis.value = 0; dom.flexBasisVal.textContent = 'auto'; }
      if (dom.flexOrder) { dom.flexOrder.value = 0; dom.flexOrderVal.textContent = '0'; }
      if (dom.alignSelf) dom.alignSelf.value = 'auto';
      return;
    }
    if (dom.flexGrow) { dom.flexGrow.value = flexState.itemGrow[idx]; dom.flexGrowVal.textContent = flexState.itemGrow[idx]; }
    if (dom.flexShrink) { dom.flexShrink.value = flexState.itemShrink[idx]; dom.flexShrinkVal.textContent = flexState.itemShrink[idx]; }
    if (dom.flexBasis) {
      dom.flexBasis.value = flexState.itemBasis[idx];
      dom.flexBasisVal.textContent = flexState.itemBasis[idx] > 0 ? flexState.itemBasis[idx] + 'px' : 'auto';
    }
    if (dom.flexOrder) { dom.flexOrder.value = flexState.itemOrder[idx]; dom.flexOrderVal.textContent = flexState.itemOrder[idx]; }
    if (dom.alignSelf) dom.alignSelf.value = flexState.itemAlignSelf[idx];
  }

  function setItemProperty(prop, value) {
    if (flexState.selectedItem === 'all') {
      // Apply to all items
      for (let i = 0; i < 12; i++) {
        flexState[prop][i] = value;
      }
    } else {
      const idx = parseInt(flexState.selectedItem);
      flexState[prop][idx] = value;
    }
    updateFlexPreview();
    generateFlexCode();
  }

  function generateFlexCode() {
    if (!dom.flexCodeOutput) return;
    const f = flexState;

    let html = span('syn-comment', '/* Container */') + '\n';
    html += span('syn-selector', '.flex-container') + ' ' + span('syn-brace', '{') + '\n';
    html += '  ' + span('syn-prop', 'display') + span('syn-colon', ': ') + span('syn-val', 'flex') + span('syn-semi', ';') + '\n';
    if (f.direction !== 'row') html += '  ' + span('syn-prop', 'flex-direction') + span('syn-colon', ': ') + span('syn-val', f.direction) + span('syn-semi', ';') + '\n';
    if (f.wrap !== 'nowrap') html += '  ' + span('syn-prop', 'flex-wrap') + span('syn-colon', ': ') + span('syn-val', f.wrap) + span('syn-semi', ';') + '\n';
    if (f.justifyContent !== 'flex-start') html += '  ' + span('syn-prop', 'justify-content') + span('syn-colon', ': ') + span('syn-val', f.justifyContent) + span('syn-semi', ';') + '\n';
    if (f.alignItems !== 'stretch') html += '  ' + span('syn-prop', 'align-items') + span('syn-colon', ': ') + span('syn-val', f.alignItems) + span('syn-semi', ';') + '\n';
    if (f.alignContent !== 'stretch') html += '  ' + span('syn-prop', 'align-content') + span('syn-colon', ': ') + span('syn-val', f.alignContent) + span('syn-semi', ';') + '\n';
    if (f.gap > 0) html += '  ' + span('syn-prop', 'gap') + span('syn-colon', ': ') + span('syn-val-num', f.gap + 'px') + span('syn-semi', ';') + '\n';
    html += span('syn-brace', '}') + '\n\n';

    // Check if any item has non-default properties
    let hasItemStyles = false;
    for (let i = 0; i < f.itemCount; i++) {
      if (f.itemGrow[i] !== 0 || f.itemShrink[i] !== 1 || f.itemBasis[i] !== 0 || f.itemOrder[i] !== 0 || f.itemAlignSelf[i] !== 'auto') {
        hasItemStyles = true;
        break;
      }
    }

    if (hasItemStyles) {
      html += span('syn-comment', '/* Items */') + '\n';
      for (let i = 0; i < f.itemCount; i++) {
        const g = f.itemGrow[i], sh = f.itemShrink[i], b = f.itemBasis[i], o = f.itemOrder[i], as = f.itemAlignSelf[i];
        if (g !== 0 || sh !== 1 || b !== 0 || o !== 0 || as !== 'auto') {
          html += span('syn-selector', `.item-${i + 1}`) + ' ' + span('syn-brace', '{') + '\n';
          if (g !== 0) html += '  ' + span('syn-prop', 'flex-grow') + span('syn-colon', ': ') + span('syn-val-num', '' + g) + span('syn-semi', ';') + '\n';
          if (sh !== 1) html += '  ' + span('syn-prop', 'flex-shrink') + span('syn-colon', ': ') + span('syn-val-num', '' + sh) + span('syn-semi', ';') + '\n';
          if (b !== 0) html += '  ' + span('syn-prop', 'flex-basis') + span('syn-colon', ': ') + span('syn-val-num', b + 'px') + span('syn-semi', ';') + '\n';
          if (o !== 0) html += '  ' + span('syn-prop', 'order') + span('syn-colon', ': ') + span('syn-val-num', '' + o) + span('syn-semi', ';') + '\n';
          if (as !== 'auto') html += '  ' + span('syn-prop', 'align-self') + span('syn-colon', ': ') + span('syn-val', as) + span('syn-semi', ';') + '\n';
          html += span('syn-brace', '}') + '\n';
        }
      }
    }

    dom.flexCodeOutput.innerHTML = html;
  }

  function getPlainFlexCSS() {
    const f = flexState;
    let css = '/* Container */\n.flex-container {\n  display: flex;\n';
    if (f.direction !== 'row') css += `  flex-direction: ${f.direction};\n`;
    if (f.wrap !== 'nowrap') css += `  flex-wrap: ${f.wrap};\n`;
    if (f.justifyContent !== 'flex-start') css += `  justify-content: ${f.justifyContent};\n`;
    if (f.alignItems !== 'stretch') css += `  align-items: ${f.alignItems};\n`;
    if (f.alignContent !== 'stretch') css += `  align-content: ${f.alignContent};\n`;
    if (f.gap > 0) css += `  gap: ${f.gap}px;\n`;
    css += '}\n';

    for (let i = 0; i < f.itemCount; i++) {
      const g = f.itemGrow[i], sh = f.itemShrink[i], b = f.itemBasis[i], o = f.itemOrder[i], as = f.itemAlignSelf[i];
      if (g !== 0 || sh !== 1 || b !== 0 || o !== 0 || as !== 'auto') {
        css += `\n.item-${i + 1} {\n`;
        if (g !== 0) css += `  flex-grow: ${g};\n`;
        if (sh !== 1) css += `  flex-shrink: ${sh};\n`;
        if (b !== 0) css += `  flex-basis: ${b}px;\n`;
        if (o !== 0) css += `  order: ${o};\n`;
        if (as !== 'auto') css += `  align-self: ${as};\n`;
        css += '}\n';
      }
    }
    return css;
  }


  // ═══════════════════════════════════════════════════
  //  TAB SWITCHING — Show/Hide Canvas
  // ═══════════════════════════════════════════════════

  function switchToTab(tabName) {
    currentTab = tabName;

    if (tabName === 'flexbox') {
      // Show flex canvas, hide default canvas + code panel
      dom.canvasStage.style.display = 'none';
      dom.flexCanvas.style.display = 'flex';
      dom.flexCodePanel.style.display = 'flex';
      dom.codePanel.style.display = 'none';
      dom.toggleGuides.style.display = 'none';
      if (dom.canvasToolbarTitle) dom.canvasToolbarTitle.textContent = 'Flexbox Playground';
      updateFlexPreview();
      generateFlexCode();
    } else {
      // Show default canvas, hide flex canvas
      dom.canvasStage.style.display = '';
      dom.flexCanvas.style.display = 'none';
      dom.flexCodePanel.style.display = 'none';
      dom.codePanel.style.display = '';
      dom.toggleGuides.style.display = '';
      if (dom.canvasToolbarTitle) dom.canvasToolbarTitle.textContent = 'Visualizer Canvas';
    }
  }


  // ═══════════════════════════════════════════════════
  //  EVENT BINDINGS
  // ═══════════════════════════════════════════════════

  function bindEvents() {
    // ─── Landing Page ───
    if (dom.enterLabBtn) {
      dom.enterLabBtn.addEventListener('click', showLab);
    }
    if (dom.backToLanding) {
      dom.backToLanding.addEventListener('click', showLanding);
    }

    // ─── Tabs ───
    dom.tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        dom.tabBtns.forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        dom.tabPanels.forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const panel = $(`#panel-${btn.dataset.tab}`);
        if (panel) panel.classList.add('active');
        switchToTab(btn.dataset.tab);
      });
    });

    // ─── Dimension Sliders ───
    bindSlider(dom.widthSlider, dom.widthVal, 'width', state.widthUnit);
    bindSlider(dom.heightSlider, dom.heightVal, 'height', state.heightUnit);
    
    if (dom.widthUnit) {
      dom.widthUnit.addEventListener('change', () => {
        state.widthUnit = dom.widthUnit.value;
        dom.widthVal.textContent = state.width + state.widthUnit;
        refresh();
      });
    }
    
    if (dom.heightUnit) {
      dom.heightUnit.addEventListener('change', () => {
        state.heightUnit = dom.heightUnit.value;
        dom.heightVal.textContent = state.height + state.heightUnit;
        refresh();
      });
    }

    // ─── Margin Sliders (Linked) ───
    const marginSliders = [dom.marginTop, dom.marginRight, dom.marginBottom, dom.marginLeft];
    const marginVals = [dom.marginTopVal, dom.marginRightVal, dom.marginBottomVal, dom.marginLeftVal];
    const marginKeys = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'];

    marginSliders.forEach((slider, i) => {
      slider.addEventListener('input', () => {
        const v = parseInt(slider.value);
        if (state.marginLinked) {
          marginKeys.forEach((key, j) => {
            state[key] = v;
            marginSliders[j].value = v;
            marginVals[j].textContent = v + 'px';
          });
        } else {
          state[marginKeys[i]] = v;
          marginVals[i].textContent = v + 'px';
        }
        refresh();
      });
    });

    dom.marginLink.addEventListener('change', () => {
      state.marginLinked = dom.marginLink.checked;
      if (state.marginLinked) {
        const v = state.marginTop;
        marginKeys.forEach((key, j) => {
          state[key] = v;
          marginSliders[j].value = v;
          marginVals[j].textContent = v + 'px';
        });
        refresh();
      }
    });

    // ─── Padding Sliders (Linked) ───
    const paddingSliders = [dom.paddingTop, dom.paddingRight, dom.paddingBottom, dom.paddingLeft];
    const paddingVals = [dom.paddingTopVal, dom.paddingRightVal, dom.paddingBottomVal, dom.paddingLeftVal];
    const paddingKeys = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'];

    paddingSliders.forEach((slider, i) => {
      slider.addEventListener('input', () => {
        const v = parseInt(slider.value);
        if (state.paddingLinked) {
          paddingKeys.forEach((key, j) => {
            state[key] = v;
            paddingSliders[j].value = v;
            paddingVals[j].textContent = v + 'px';
          });
        } else {
          state[paddingKeys[i]] = v;
          paddingVals[i].textContent = v + 'px';
        }
        refresh();
      });
    });

    dom.paddingLink.addEventListener('change', () => {
      state.paddingLinked = dom.paddingLink.checked;
      if (state.paddingLinked) {
        const v = state.paddingTop;
        paddingKeys.forEach((key, j) => {
          state[key] = v;
          paddingSliders[j].value = v;
          paddingVals[j].textContent = v + 'px';
        });
        refresh();
      }
    });

    // ─── Typography ───
    dom.fontFamily.addEventListener('change', () => {
      state.fontFamily = dom.fontFamily.value;
      refresh();
    });

    bindSlider(dom.fontSize, dom.fontSizeVal, 'fontSize', 'px');
    bindSlider(dom.fontWeight, dom.fontWeightVal, 'fontWeight', '');
    bindSlider(dom.lineHeight, dom.lineHeightVal, 'lineHeight', '', null, true);

    // ─── Align Buttons ───
    dom.alignBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        dom.alignBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state.textAlign = btn.dataset.align;
        refresh();
      });
    });

    // ─── Border ───
    bindSlider(dom.borderWidth, dom.borderWidthVal, 'borderWidth', 'px');
    bindSlider(dom.borderRadius, dom.borderRadiusVal, 'borderRadius', 'px');

    dom.borderStyle.addEventListener('change', () => {
      state.borderStyle = dom.borderStyle.value;
      refresh();
    });

    bindColorInput(dom.borderColor, dom.borderColorHex, 'borderColor');

    // ─── Colors ───
    bindColorInput(dom.bgColor, dom.bgColorHex, 'bgColor');
    bindColorInput(dom.textColor, dom.textColorHex, 'textColor');

    // ─── Shadow ───
    bindSlider(dom.shadowX, dom.shadowXVal, 'shadowX', 'px');
    bindSlider(dom.shadowY, dom.shadowYVal, 'shadowY', 'px');
    bindSlider(dom.shadowBlur, dom.shadowBlurVal, 'shadowBlur', 'px');
    bindSlider(dom.shadowSpread, dom.shadowSpreadVal, 'shadowSpread', 'px');
    bindSlider(dom.shadowOpacity, dom.shadowOpacityVal, 'shadowOpacity', '%');
    bindColorInput(dom.shadowColor, dom.shadowColorHex, 'shadowColor');

    // ─── Layout & BG (New tab) ───
    if (dom.displayProp) {
      dom.displayProp.addEventListener('change', () => {
        state.display = dom.displayProp.value;
        refresh();
      });
    }
    if (dom.positionProp) {
      dom.positionProp.addEventListener('change', () => {
        state.position = dom.positionProp.value;
        refresh();
      });
    }
    
    // Position sliders
    if (dom.topProp) {
      bindSlider(dom.topProp, dom.topVal, 'top', 'px', () => {
        state.activeY = 'top';
      });
    }
    if (dom.rightProp) {
      bindSlider(dom.rightProp, dom.rightVal, 'right', 'px', () => {
        state.activeX = 'right';
      });
    }
    if (dom.bottomProp) {
      bindSlider(dom.bottomProp, dom.bottomVal, 'bottom', 'px', () => {
        state.activeY = 'bottom';
      });
    }
    if (dom.leftProp) {
      bindSlider(dom.leftProp, dom.leftVal, 'left', 'px', () => {
        state.activeX = 'left';
      });
    }
    
    if (dom.bgImageProp) {
      dom.bgImageProp.addEventListener('input', () => {
        state.bgImage = dom.bgImageProp.value;
        refresh();
      });
    }
    if (dom.bgSizeProp) {
      dom.bgSizeProp.addEventListener('change', () => {
        state.bgSize = dom.bgSizeProp.value;
        refresh();
      });
    }
    if (dom.bgPosProp) {
      dom.bgPosProp.addEventListener('change', () => {
        state.bgPos = dom.bgPosProp.value;
        refresh();
      });
    }
    if (dom.bgRepeatProp) {
      dom.bgRepeatProp.addEventListener('change', () => {
        state.bgRepeat = dom.bgRepeatProp.value;
        refresh();
      });
    }
    if (dom.bgAttachProp) {
      dom.bgAttachProp.addEventListener('change', () => {
        state.bgAttach = dom.bgAttachProp.value;
        refresh();
      });
    }

    if (dom.showSiblingsToggle) {
      dom.showSiblingsToggle.addEventListener('change', () => {
        state.showSiblings = dom.showSiblingsToggle.checked;
        applyStateToPreview();
      });
    }

    // ─── Box Model Guides Toggle ───
    dom.toggleGuides.addEventListener('click', () => {
      state.showGuides = !state.showGuides;
      updateGuideToggleUI();
      applyStateToPreview();
    });

    // ─── Theme Toggle ───
    dom.themeToggle.addEventListener('change', () => {
      state.theme = dom.themeToggle.checked ? 'dark' : 'light';
      dom.html.setAttribute('data-theme', state.theme);
    });

    // ─── RTL / LTR Toggle ───
    dom.dirToggle.addEventListener('change', () => {
      state.dir = dom.dirToggle.checked ? 'rtl' : 'ltr';
      dom.html.setAttribute('dir', state.dir);
      dom.html.setAttribute('lang', state.dir === 'rtl' ? 'ar' : 'en');
    });

    // ─── Copy CSS ───
    dom.copyBtn.addEventListener('click', () => {
      const css = getPlainCSS();
      navigator.clipboard.writeText(css).then(() => {
        showToast();
      }).catch(() => {
        // Fallback: textarea method
        const ta = document.createElement('textarea');
        ta.value = css;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast();
      });
    });

    // ─── Reset ───
    dom.resetBtn.addEventListener('click', () => {
      state = { ...DEFAULTS };
      applyStateToControls();
      applyStateToPreview();
      generateCode();
      updateGuideToggleUI();
      // Reset theme and dir
      dom.html.setAttribute('data-theme', state.theme);
      dom.html.setAttribute('dir', state.dir);
      dom.html.setAttribute('lang', 'en');
    });

    // ═══════════════════════════════════════════════════
    //  FLEXBOX EVENT BINDINGS
    // ═══════════════════════════════════════════════════

    // Container properties
    if (dom.flexDirection) {
      dom.flexDirection.addEventListener('change', () => {
        flexState.direction = dom.flexDirection.value;
        updateFlexPreview();
        generateFlexCode();
      });
    }
    if (dom.flexWrap) {
      dom.flexWrap.addEventListener('change', () => {
        flexState.wrap = dom.flexWrap.value;
        updateFlexPreview();
        generateFlexCode();
      });
    }
    if (dom.justifyContent) {
      dom.justifyContent.addEventListener('change', () => {
        flexState.justifyContent = dom.justifyContent.value;
        updateFlexPreview();
        generateFlexCode();
      });
    }
    if (dom.alignItems) {
      dom.alignItems.addEventListener('change', () => {
        flexState.alignItems = dom.alignItems.value;
        updateFlexPreview();
        generateFlexCode();
      });
    }
    if (dom.alignContent) {
      dom.alignContent.addEventListener('change', () => {
        flexState.alignContent = dom.alignContent.value;
        updateFlexPreview();
        generateFlexCode();
      });
    }
    if (dom.flexGap) {
      dom.flexGap.addEventListener('input', () => {
        flexState.gap = parseInt(dom.flexGap.value);
        dom.flexGapVal.textContent = flexState.gap + 'px';
        updateFlexPreview();
        generateFlexCode();
      });
    }

    // Item count
    if (dom.flexItemCount) {
      dom.flexItemCount.addEventListener('input', () => {
        flexState.itemCount = parseInt(dom.flexItemCount.value);
        dom.flexItemCountVal.textContent = flexState.itemCount;
        updateFlexPreview();
        generateFlexCode();
      });
    }

    // Item selector buttons
    dom.flexItemBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dom.flexItemBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        flexState.selectedItem = btn.dataset.item;
        if (btn.dataset.item !== 'all') {
          loadItemProperties(parseInt(btn.dataset.item));
        } else {
          loadItemProperties(-1);
        }
        updateFlexPreview();
      });
    });

    // Click on flex children to select
    if (dom.flexContainer) {
      dom.flexContainer.addEventListener('click', (e) => {
        const child = e.target.closest('.flex-child');
        if (child) {
          selectFlexItem(parseInt(child.dataset.index));
        }
      });
    }

    // Item properties
    if (dom.flexGrow) {
      dom.flexGrow.addEventListener('input', () => {
        const v = parseInt(dom.flexGrow.value);
        dom.flexGrowVal.textContent = v;
        setItemProperty('itemGrow', v);
      });
    }
    if (dom.flexShrink) {
      dom.flexShrink.addEventListener('input', () => {
        const v = parseInt(dom.flexShrink.value);
        dom.flexShrinkVal.textContent = v;
        setItemProperty('itemShrink', v);
      });
    }
    if (dom.flexBasis) {
      dom.flexBasis.addEventListener('input', () => {
        const v = parseInt(dom.flexBasis.value);
        dom.flexBasisVal.textContent = v > 0 ? v + 'px' : 'auto';
        setItemProperty('itemBasis', v);
      });
    }
    if (dom.flexOrder) {
      dom.flexOrder.addEventListener('input', () => {
        const v = parseInt(dom.flexOrder.value);
        dom.flexOrderVal.textContent = v;
        setItemProperty('itemOrder', v);
      });
    }
    if (dom.alignSelf) {
      dom.alignSelf.addEventListener('change', () => {
        setItemProperty('itemAlignSelf', dom.alignSelf.value);
      });
    }

    // Copy Flex CSS
    if (dom.copyFlexBtn) {
      dom.copyFlexBtn.addEventListener('click', () => {
        const css = getPlainFlexCSS();
        navigator.clipboard.writeText(css).then(() => {
          showToast();
        }).catch(() => {
          const ta = document.createElement('textarea');
          ta.value = css;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          showToast();
        });
      });
    }
  }


  // ═══════════════════════════════════════════════════
  //  HELPERS
  // ═══════════════════════════════════════════════════

  function bindSlider(slider, badge, stateKey, unit = '', onChangeCallback = null, isFloat = false) {
    if (!slider) return;
    slider.addEventListener('input', () => {
      const v = isFloat ? parseFloat(slider.value) : parseInt(slider.value, 10);
      state[stateKey] = v;
      if (badge) badge.textContent = v + unit;
      if (onChangeCallback) onChangeCallback();
      refresh();
    });
  }

  function bindColorInput(input, hexDisplay, stateKey) {
    input.addEventListener('input', () => {
      state[stateKey] = input.value;
      hexDisplay.textContent = input.value;
      refresh();
    });
  }

  function refresh() {
    applyStateToPreview();
    generateCode();
  }

  function updateGuideToggleUI() {
    dom.guidesDot.classList.toggle('active', state.showGuides);
    dom.toggleGuides.title = state.showGuides ? 'Hide Box Model Guides' : 'Show Box Model Guides';
  }

  function showToast() {
    dom.toast.classList.add('show');
    setTimeout(() => dom.toast.classList.remove('show'), 2200);
  }

  // ─── CSS Shorthand Helper ───
  function shorthand(t, r, b, l, unit) {
    if (t === r && r === b && b === l) {
      return t + unit;
    } else if (t === b && r === l) {
      return t + unit + ' ' + r + unit;
    } else if (r === l) {
      return t + unit + ' ' + r + unit + ' ' + b + unit;
    }
    return t + unit + ' ' + r + unit + ' ' + b + unit + ' ' + l + unit;
  }

  // ─── Hex to RGBA ───
  function hexToRgba(hex, alpha) {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // ─── Syntax Highlight Helpers ───
  function span(cls, text) {
    return `<span class="${cls}">${text}</span>`;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function isColorValue(val) {
    return /^#[0-9a-f]{3,8}$/i.test(val) || /^rgba?\(/.test(val);
  }

  function isNumericValue(val) {
    return /^-?\d+(\.\d+)?(px|em|rem|%)?$/.test(val.trim());
  }


  // ═══════════════════════════════════════════════════
  //  BOOT
  // ═══════════════════════════════════════════════════

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
