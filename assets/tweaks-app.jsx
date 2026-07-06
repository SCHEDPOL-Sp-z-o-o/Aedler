/* ==========================================================================
   AEDLER — content Tweaks
   Exposes the two facts in this update as reversible, multilingual controls:
   - export reach  (Europe · a dozen-plus countries  ⇄  Global · 28 countries)
   - factory site  (north-western Poland             ⇄  southern Poland)
   The defaults below reflect the current copy. Overrides are re-applied after
   every language switch (app.js dispatches "aedler:langchanged").
   ========================================================================== */
(function () {
  const { useTweaks, TweaksPanel, TweakSection, TweakRadio } = window;

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "scope": "europe",
    "factory": "nw"
  }/*EDITMODE-END*/;

  /* Factory location — Polish needs two cases (z … / w …); EN & DE share one form. */
  const LOC = {
    nw:    { pl_z: 'północno-zachodniej Polski', pl_w: 'północno-zachodniej Polsce', en: 'north-western Poland', de: 'Nordwestpolen', fr: 'nord-ouest de la Pologne', ro: 'nord-vestul Poloniei', cs: 'severozápadního Polska', cs_w: 'severozápadním Polsku', sk: 'severozápadného Poľska', sk_w: 'severozápadnom Poľsku' },
    south: { pl_z: 'południowej Polski',          pl_w: 'południowej Polsce',          en: 'southern Poland',      de: 'Südpolen',      fr: 'sud de la Pologne', ro: 'sudul Poloniei', cs: 'jižního Polska', cs_w: 'jižním Polsku', sk: 'južného Poľska', sk_w: 'južnom Poľsku' },
  };

  /* Export reach */
  const SCOPE = {
    europe: {
      title: {
        pl: 'Produkty Aedler w <em>kilkunastu krajach Europy</em>.',
        en: 'Aedler products in <em>over a dozen European countries</em>.',
        de: 'Aedler-Produkte in <em>über einem Dutzend EU-Ländern</em>.',
        ro: 'Produse Aedler în <em>peste zece țări europene</em>.',
        cs: 'Produkty Aedler ve <em>více než deseti evropských zemích</em>.',
        sk: 'Produkty Aedler vo <em>viac ako desiatich európskych krajinách</em>.',
        fr: 'Les produits Aedler dans <em>plus d\'une dizaine de pays européens</em>.',
      },
      stat: '15+',
      to: { pl: 'do kilkunastu krajów Europy', en: 'to over a dozen countries across Europe', de: 'in über ein Dutzend Länder Europas', ro: 'în peste zece țări din Europa', cs: 'do více než deseti zemí Evropy', sk: 'do viac ako desiatich krajín Európy', fr: 'vers plus d\'une dizaine de pays d\'Europe' },
    },
    global: {
      title: {
        pl: 'Produkty Aedler w <em>28 krajach</em>.',
        en: 'Aedler products in <em>28 countries</em>.',
        de: 'Aedler-Produkte in <em>28 Ländern</em>.',
        ro: 'Produse Aedler în <em>28 de țări</em>.',
        cs: 'Produkty Aedler ve <em>28 zemích</em>.',
        sk: 'Produkty Aedler vo <em>28 krajinách</em>.',
        fr: 'Les produits Aedler dans <em>28 pays</em>.',
      },
      stat: '28',
      to: { pl: 'do całej Europy, Bliskiego Wschodu i Ameryki Północnej', en: 'to all of Europe, the Middle East and North America', de: 'in ganz Europa, den Nahen Osten und Nordamerika', ro: 'în toată Europa, Orientul Mijlociu și America de Nord', cs: 'do celé Evropy, na Blízký východ a do Severní Ameriky', sk: 'do celej Európy, na Blízky východ a do Severnej Ameriky', fr: 'vers toute l\'Europe, le Moyen-Orient et l\'Amérique du Nord' },
    },
  };

  const LEAD_VERB = { pl: 'Eksportujemy z', en: 'We export from', de: 'Wir exportieren aus', ro: 'Exportăm din', cs: 'Exportujeme ze', sk: 'Exportujeme zo', fr: 'Nous exportons du' };
  const LEAD_TAIL = { pl: '', en: '', de: '', ro: '', cs: '', sk: '', fr: '' };
  const ESG = {
    pl: (loc) => `Cała produkcja w jednym, certyfikowanym zakładzie w ${loc}.`,
    en: (loc) => `All production in one certified facility in ${loc}.`,
    de: (loc) => `Gesamte Produktion in einem zertifizierten Werk in ${loc}.`,
    ro: (loc) => `Întreaga producție într-o singură unitate certificată, în ${loc}.`,
    cs: (loc) => `Veškerá výroba v jednom certifikovaném závodě v ${loc}.`,
    sk: (loc) => `Celá výroba v jednom certifikovanom závode v ${loc}.`,
    fr: (loc) => `Toute la production dans une seule usine certifiée, dans le ${loc}.`,
  };

  function applyContent(scope, factory) {
    const raw = document.documentElement.getAttribute('lang') || 'en';
    const L = ['pl', 'en', 'de', 'ro', 'cs', 'sk', 'fr'].includes(raw) ? raw : 'en';
    const sc = SCOPE[scope] || SCOPE.europe;
    const loc = LOC[factory] || LOC.nw;
    const fromTxt = L === 'pl' ? loc.pl_z : loc[L];
    const inTxt = L === 'pl' ? loc.pl_w : (loc[L + '_w'] || loc[L]);

    const set = (sel, fn) => { const el = document.querySelector(sel); if (el) fn(el); };
    set('[data-i18n-html="map.title"]', (el) => { el.innerHTML = sc.title[L]; });
    set('[data-i18n="map.stat1.v"]', (el) => { el.textContent = sc.stat; });
    set('[data-i18n="map.lead"]', (el) => { el.textContent = `${LEAD_VERB[L]} ${fromTxt} ${sc.to[L]}.${LEAD_TAIL[L]}`; });
    set('[data-i18n="esg.pl.body"]', (el) => { el.textContent = ESG[L](inTxt); });
  }

  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

    React.useEffect(() => {
      applyContent(t.scope, t.factory);
      const onLang = () => applyContent(t.scope, t.factory);
      document.addEventListener('aedler:langchanged', onLang);
      return () => document.removeEventListener('aedler:langchanged', onLang);
    }, [t.scope, t.factory]);

    return (
      <TweaksPanel title="Tweaks">
        <TweakSection label="Zasięg & lokalizacja" />
        <TweakRadio
          label="Zasięg eksportu"
          value={t.scope}
          options={[{ value: 'europe', label: 'Europa' }, { value: 'global', label: 'Globalnie' }]}
          onChange={(v) => setTweak('scope', v)}
        />
        <TweakRadio
          label="Lokalizacja fabryki"
          value={t.factory}
          options={[{ value: 'nw', label: 'Płn.-zach.' }, { value: 'south', label: 'Południe' }]}
          onChange={(v) => setTweak('factory', v)}
        />
      </TweaksPanel>
    );
  }

  ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<App />);
})();
