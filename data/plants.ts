export type Lang = 'en' | 'hi' | 'es'

/** English is required; other languages fall back to English when missing. */
export type Localized = { en: string; hi?: string; es?: string }

export type CountryStatus = 'native' | 'major' | 'cultivated'

export type UseCategory = 'culinary' | 'medicinal' | 'cultural' | 'industrial' | 'ecological'

export type Plant = {
  id: string
  slug: string
  names: { en: string; hi: string; es: string }
  /** Extra search terms: local names, synonyms, trade names. */
  aliases: string[]
  scientificName: string
  family: string
  category: 'Spice' | 'Herb' | 'Tree' | 'Shrub' | 'Flower' | 'Grass'
  image: string
  imageAlt: string
  summary: Localized
  description: string
  appearance: string
  habitat: string
  growth: {
    climateType: string
    tempC: [number, number]
    rainfallMm: [number, number]
    soil: string
    soilPh: [number, number]
    sunlight: string
    /** Direct sun hours per day — used by the sunlight dial. */
    sunlightHours: [number, number]
    altitudeM: [number, number]
    waterNeed: 'low' | 'moderate' | 'high'
  }
  composition: { compound: string; relativeValue: number; partUsed: string; benefit: string }[]
  partsUsed: { part: string; uses: string[] }[]
  geography: {
    nativeRegion: string
    /** Approximate centre of the native range, used to orient the globe. */
    nativeCenter: [number, number]
    countries: { iso: number; name: string; status: CountryStatus; note: string; sharePercent?: number }[]
    /** Approximate share of world production (%). */
    topProducers: { country: string; sharePercent: number }[]
  }
  seasonality: { sowing: number[]; flowering: number[]; harvest: number[] }
  uses: Record<UseCategory, Localized[]>
  history: { era: string; event: string }[]
  facts: string[]
  taxonomy: {
    kingdom: string
    phylum: string
    class: string
    order: string
    family: string
    genus: string
    species: string
  }
  related: string[]
}

export const plants: Plant[] = [
  {
    id: 'p-001',
    slug: 'turmeric',
    names: { en: 'Turmeric', hi: 'हल्दी', es: 'Cúrcuma' },
    aliases: ['haldi', 'haridra', 'Indian saffron', 'yellow ginger', 'manjal', 'Curcuma domestica'],
    scientificName: 'Curcuma longa',
    family: 'Zingiberaceae',
    category: 'Spice',
    image: '/images/turmeric.png',
    imageAlt: 'Fresh turmeric rhizomes, one cut open to show bright orange flesh, beside a green leaf',
    summary: {
      en: 'A golden rhizome from the ginger family, prized for millennia as spice, dye and medicine across South Asia.',
      hi: 'अदरक परिवार का सुनहरा प्रकंद, जिसे दक्षिण एशिया में हज़ारों वर्षों से मसाले, रंग और औषधि के रूप में सराहा जाता है।',
      es: 'Un rizoma dorado de la familia del jengibre, apreciado durante milenios como especia, tinte y medicina en el sur de Asia.',
    },
    description:
      'Turmeric is a perennial herbaceous plant whose underground rhizomes are boiled, dried and ground into the familiar yellow-orange powder. Its colour comes from curcuminoids, a group of polyphenols that have made it one of the most studied plants in modern phytochemistry.',
    appearance:
      'Grows to about 1 m tall with large, lance-shaped leaves arranged in two rows. Pale green to white flower spikes with pinkish bracts rise from the centre. Below ground, a branched network of thick rhizomes shows brilliant orange flesh beneath a tan skin.',
    habitat:
      'Thrives in warm, humid tropical lowlands with heavy monsoon rainfall. Cultivated on well-drained loamy or alluvial soils, often intercropped under light shade. Commercial turmeric is a sterile triploid and survives only through human propagation of rhizome pieces.',
    growth: {
      climateType: 'Tropical monsoon',
      tempC: [20, 35],
      rainfallMm: [1500, 2250],
      soil: 'Well-drained sandy or clay loam, rich in organic matter',
      soilPh: [4.5, 7.5],
      sunlight: 'Full sun to partial shade',
      sunlightHours: [5, 8],
      altitudeM: [0, 1500],
      waterNeed: 'high',
    },
    composition: [
      { compound: 'Curcumin', relativeValue: 92, partUsed: 'Rhizome', benefit: 'Primary pigment; studied for anti-inflammatory and antioxidant activity.' },
      { compound: 'ar-Turmerone', relativeValue: 64, partUsed: 'Rhizome oil', benefit: 'Aromatic volatile; investigated for neuroprotective effects.' },
      { compound: 'Demethoxycurcumin', relativeValue: 48, partUsed: 'Rhizome', benefit: 'Curcuminoid that contributes to colour and antioxidant capacity.' },
      { compound: 'Zingiberene', relativeValue: 38, partUsed: 'Rhizome oil', benefit: 'Gives the earthy, ginger-like aroma.' },
      { compound: 'Bisdemethoxycurcumin', relativeValue: 30, partUsed: 'Rhizome', benefit: 'Most stable curcuminoid; antioxidant.' },
      { compound: 'Starch', relativeValue: 55, partUsed: 'Rhizome', benefit: 'Main carbohydrate store, about 40–50% of dry weight.' },
    ],
    partsUsed: [
      { part: 'Rhizome', uses: ['Ground into spice powder', 'Fresh in pickles and teas', 'Natural yellow dye', 'Traditional poultices'] },
      { part: 'Leaves', uses: ['Wrapping and steaming sweets (patoli)', 'Flavouring fish dishes'] },
      { part: 'Essential oil', uses: ['Perfumery', 'Aromatherapy blends', 'Insect repellent research'] },
    ],
    geography: {
      nativeRegion: 'Indian subcontinent and Southeast Asia',
      nativeCenter: [80, 18],
      countries: [
        { iso: 356, name: 'India', status: 'native', note: 'Largest producer, consumer and exporter; Telangana, Maharashtra and Tamil Nadu lead.', sharePercent: 75 },
        { iso: 104, name: 'Myanmar', status: 'major', note: 'Significant regional producer.', sharePercent: 4 },
        { iso: 156, name: 'China', status: 'major', note: 'Grown in Yunnan, Sichuan and Guangdong.', sharePercent: 8 },
        { iso: 50, name: 'Bangladesh', status: 'major', note: 'Mostly grown for domestic use.', sharePercent: 3 },
        { iso: 566, name: 'Nigeria', status: 'major', note: 'Leading African producer, rising exports.', sharePercent: 3 },
        { iso: 764, name: 'Thailand', status: 'cultivated', note: 'Used fresh in curry pastes.' },
        { iso: 360, name: 'Indonesia', status: 'cultivated', note: 'Key ingredient in jamu tonics.' },
        { iso: 144, name: 'Sri Lanka', status: 'cultivated', note: 'Grown in home gardens and smallholdings.' },
        { iso: 586, name: 'Pakistan', status: 'cultivated', note: 'Grown mainly in Punjab.' },
        { iso: 704, name: 'Vietnam', status: 'cultivated', note: 'Used in cha ca and traditional medicine.' },
        { iso: 604, name: 'Peru', status: 'cultivated', note: 'Growing export crop.' },
        { iso: 231, name: 'Ethiopia', status: 'cultivated', note: 'Expanding smallholder production.' },
      ],
      topProducers: [
        { country: 'India', sharePercent: 75 },
        { country: 'China', sharePercent: 8 },
        { country: 'Myanmar', sharePercent: 4 },
        { country: 'Nigeria', sharePercent: 3 },
        { country: 'Bangladesh', sharePercent: 3 },
      ],
    },
    seasonality: { sowing: [4, 5, 6], flowering: [8, 9, 10], harvest: [1, 2, 3] },
    uses: {
      culinary: [
        { en: 'Base of curry powders and dals', hi: 'करी पाउडर और दाल का आधार', es: 'Base de curris y dales' },
        { en: 'Golden milk (haldi doodh)', hi: 'हल्दी वाला दूध', es: 'Leche dorada (haldi doodh)' },
        { en: 'Natural food colouring (E100)', hi: 'प्राकृतिक खाद्य रंग (E100)', es: 'Colorante alimentario natural (E100)' },
      ],
      medicinal: [
        { en: 'Traditional anti-inflammatory remedy in Ayurveda', hi: 'आयुर्वेद में पारंपरिक सूजनरोधी औषधि', es: 'Remedio antiinflamatorio tradicional en el Ayurveda' },
        { en: 'Applied as paste on minor wounds', hi: 'छोटे घावों पर लेप के रूप में', es: 'Pasta aplicada en heridas leves' },
      ],
      cultural: [
        { en: 'Haldi ceremony before Hindu weddings', hi: 'हिंदू विवाह से पहले हल्दी की रस्म', es: 'Ceremonia haldi antes de las bodas hindúes' },
        { en: 'Sacred offering in temple rituals', hi: 'मंदिर अनुष्ठानों में पवित्र अर्पण', es: 'Ofrenda sagrada en rituales de templo' },
      ],
      industrial: [
        { en: 'Textile dye for robes and silk', hi: 'वस्त्रों और रेशम के लिए रंग', es: 'Tinte textil para túnicas y seda' },
        { en: 'Cosmetics and skin-care products', hi: 'सौंदर्य प्रसाधन और त्वचा देखभाल उत्पाद', es: 'Cosméticos y productos para la piel' },
      ],
      ecological: [
        { en: 'Shade-tolerant intercrop in orchards', hi: 'बागों में छाया-सहिष्णु अंतर-फसल', es: 'Cultivo intercalado tolerante a la sombra' },
        { en: 'Dense foliage protects soil from erosion', hi: 'घनी पत्तियाँ मिट्टी को कटाव से बचाती हैं', es: 'Su follaje denso protege el suelo de la erosión' },
      ],
    },
    history: [
      { era: 'c. 2500 BCE', event: 'Turmeric residues are found in cooking pots at Farmana, a Harappan site in present-day Haryana.' },
      { era: 'c. 600 BCE', event: 'Ayurvedic texts describe haridra for skin, digestion and wound care.' },
      { era: '1280', event: 'Marco Polo compares turmeric in China to saffron.' },
      { era: '1815', event: 'Vogel and Pelletier first isolate the "yellow colouring matter" later called curcumin.' },
      { era: '1910', event: 'Polish chemists Milobedzka, Kostanecki and Lampe determine the structure of curcumin.' },
      { era: '2000s', event: 'Thousands of studies make curcumin one of the most researched natural compounds.' },
    ],
    facts: [
      'India grows roughly three quarters of the world’s turmeric and consumes most of it at home.',
      'Cultivated turmeric is sterile — every plant is a clone grown from a rhizome piece.',
      'Black pepper’s piperine can raise curcumin absorption many times over.',
      'Turmeric fades in sunlight, which is why old saffron-dyed robes were re-dyed often.',
      'It is listed as food colour E100 in the European Union.',
    ],
    taxonomy: {
      kingdom: 'Plantae',
      phylum: 'Tracheophyta',
      class: 'Liliopsida',
      order: 'Zingiberales',
      family: 'Zingiberaceae',
      genus: 'Curcuma',
      species: 'Curcuma longa',
    },
    related: ['tulsi', 'neem'],
  },
  {
    id: 'p-002',
    slug: 'tulsi',
    names: { en: 'Holy Basil', hi: 'तुलसी', es: 'Albahaca sagrada' },
    aliases: ['tulsi', 'tulasi', 'Ocimum sanctum', 'kaphrao', 'krishna tulsi', 'rama tulsi', 'vana tulsi'],
    scientificName: 'Ocimum tenuiflorum',
    family: 'Lamiaceae',
    category: 'Herb',
    image: '/images/tulsi.png',
    imageAlt: 'A sprig of holy basil with purple-tinged stems, green leaves and slender flower spikes',
    summary: {
      en: 'An aromatic, sacred basil grown in courtyards across India, revered in Hindu tradition and valued as an adaptogenic herb.',
      hi: 'एक सुगंधित, पवित्र पौधा जो भारत के आँगनों में उगाया जाता है, हिंदू परंपरा में पूजनीय और अनुकूलनकारी जड़ी-बूटी के रूप में मूल्यवान।',
      es: 'Una albahaca aromática y sagrada cultivada en los patios de la India, venerada en la tradición hindú y valorada como hierba adaptógena.',
    },
    description:
      'Holy basil is a short-lived perennial shrub of the mint family. Its leaves are rich in eugenol, giving a clove-like, peppery scent quite different from sweet basil. In India it is grown in a raised planter, the tulsi vrindavan, and tended daily.',
    appearance:
      'An erect, much-branched sub-shrub 30–60 cm tall with hairy stems. Leaves are simple, oval and slightly toothed, green in Rama tulsi and purple in Krishna tulsi. Small purple or white flowers form in elongated whorled spikes.',
    habitat:
      'Native to the Indian subcontinent and Southeast Asia, growing from plains to the lower Himalayas. Prefers warm conditions, full sun and moderately fertile, well-drained soil; it is frost-sensitive and grown as an annual in cooler climates.',
    growth: {
      climateType: 'Tropical to subtropical',
      tempC: [20, 35],
      rainfallMm: [700, 1500],
      soil: 'Well-drained loam with moderate organic matter',
      soilPh: [6.0, 7.5],
      sunlight: 'Full sun',
      sunlightHours: [6, 8],
      altitudeM: [0, 1800],
      waterNeed: 'moderate',
    },
    composition: [
      { compound: 'Eugenol', relativeValue: 88, partUsed: 'Leaves', benefit: 'Main aromatic; studied for antimicrobial and analgesic activity.' },
      { compound: 'Ursolic acid', relativeValue: 56, partUsed: 'Leaves', benefit: 'Triterpenoid studied for anti-inflammatory effects.' },
      { compound: 'Rosmarinic acid', relativeValue: 50, partUsed: 'Leaves', benefit: 'Polyphenol with strong antioxidant capacity.' },
      { compound: 'β-Caryophyllene', relativeValue: 44, partUsed: 'Leaf oil', benefit: 'Peppery terpene that interacts with CB2 receptors.' },
      { compound: 'Methyl eugenol', relativeValue: 40, partUsed: 'Leaf oil', benefit: 'Contributes to clove-like aroma.' },
      { compound: 'Linalool', relativeValue: 26, partUsed: 'Flowers', benefit: 'Floral note; studied for calming effects.' },
    ],
    partsUsed: [
      { part: 'Leaves', uses: ['Herbal tea and decoctions', 'Chewed fresh in daily rituals', 'Stir-fries (Thai pad kra pao)'] },
      { part: 'Seeds', uses: ['Soaked into cooling drinks', 'Traditional digestive remedy'] },
      { part: 'Stems', uses: ['Carved into tulsi mala prayer beads'] },
      { part: 'Essential oil', uses: ['Aromatherapy', 'Natural insect repellents'] },
    ],
    geography: {
      nativeRegion: 'Indian subcontinent to Southeast Asia',
      nativeCenter: [82, 20],
      countries: [
        { iso: 356, name: 'India', status: 'native', note: 'Grown in nearly every Hindu household; main commercial producer.', sharePercent: 70 },
        { iso: 524, name: 'Nepal', status: 'native', note: 'Grows wild in the lowland Terai.', sharePercent: 8 },
        { iso: 764, name: 'Thailand', status: 'major', note: 'Grown as kaphrao for cooking.', sharePercent: 7 },
        { iso: 144, name: 'Sri Lanka', status: 'native', note: 'Grown in temple gardens.', sharePercent: 5 },
        { iso: 50, name: 'Bangladesh', status: 'native', note: 'Common in homesteads.' },
        { iso: 104, name: 'Myanmar', status: 'native', note: 'Part of the native range.' },
        { iso: 458, name: 'Malaysia', status: 'native', note: 'Part of the native range.' },
        { iso: 840, name: 'United States', status: 'cultivated', note: 'Grown for herbal tea markets.', sharePercent: 3 },
        { iso: 36, name: 'Australia', status: 'cultivated', note: 'Grown in Queensland and in herb farms.' },
        { iso: 76, name: 'Brazil', status: 'cultivated', note: 'Small-scale cultivation.' },
      ],
      topProducers: [
        { country: 'India', sharePercent: 70 },
        { country: 'Nepal', sharePercent: 8 },
        { country: 'Thailand', sharePercent: 7 },
        { country: 'Sri Lanka', sharePercent: 5 },
        { country: 'United States', sharePercent: 3 },
      ],
    },
    seasonality: { sowing: [3, 4, 5, 6], flowering: [8, 9, 10, 11], harvest: [6, 7, 8, 9, 10, 11] },
    uses: {
      culinary: [
        { en: 'Thai holy basil stir-fry', hi: 'थाई तुलसी स्टर-फ्राई', es: 'Salteado tailandés de albahaca sagrada' },
        { en: 'Herbal tea and kadha', hi: 'हर्बल चाय और काढ़ा', es: 'Té de hierbas y kadha' },
      ],
      medicinal: [
        { en: 'Adaptogen for stress in Ayurveda', hi: 'आयुर्वेद में तनाव के लिए अनुकूलक', es: 'Adaptógeno para el estrés en el Ayurveda' },
        { en: 'Home remedy for coughs and colds', hi: 'खाँसी-जुकाम का घरेलू उपाय', es: 'Remedio casero para la tos y el resfriado' },
        { en: 'Mouth freshener and oral care', hi: 'मुँह की ताज़गी और देखभाल', es: 'Refrescante bucal y cuidado oral' },
      ],
      cultural: [
        { en: 'Worshipped daily in the tulsi vrindavan', hi: 'तुलसी वृंदावन में प्रतिदिन पूजा', es: 'Venerada a diario en el tulsi vrindavan' },
        { en: 'Tulsi Vivah festival in Kartik month', hi: 'कार्तिक मास में तुलसी विवाह', es: 'Festival Tulsi Vivah en el mes de Kartik' },
      ],
      industrial: [
        { en: 'Essential oil for perfumes and soaps', hi: 'इत्र और साबुन के लिए तेल', es: 'Aceite esencial para perfumes y jabones' },
        { en: 'Packaged herbal teas', hi: 'पैकेज्ड हर्बल चाय', es: 'Infusiones envasadas' },
      ],
      ecological: [
        { en: 'Flowers feed bees and butterflies', hi: 'फूल मधुमक्खियों और तितलियों को भोजन देते हैं', es: 'Sus flores alimentan abejas y mariposas' },
        { en: 'Companion plant that repels some pests', hi: 'सहचर पौधा जो कुछ कीटों को दूर रखता है', es: 'Planta compañera que repele algunas plagas' },
      ],
    },
    history: [
      { era: 'Vedic period', event: 'Tulsi is honoured in early Hindu tradition as a household guardian plant.' },
      { era: 'c. 1st millennium CE', event: 'The Puranas link tulsi to Vishnu and the goddess Vrinda.' },
      { era: 'Classical Ayurveda', event: 'Charaka describes surasa (tulsi) for coughs and respiratory ailments.' },
      { era: '1753', event: 'Linnaeus formally names Ocimum tenuiflorum in Species Plantarum.' },
      { era: '20th century', event: 'Tulsi tea spreads beyond India through Ayurvedic and wellness markets.' },
      { era: '2010s', event: 'Clinical reviews examine tulsi as an adaptogen for metabolic and stress health.' },
    ],
    facts: [
      'Holy basil smells of clove rather than sweet basil because of its high eugenol content.',
      'Krishna tulsi has purple leaves; Rama tulsi is green — both are the same species.',
      'Tulsi stems are dried and turned into beads for prayer malas.',
      'Thai “pad kra pao” is traditionally made with holy basil, not Thai sweet basil.',
      'The plant is ceremonially “married” to Vishnu during Tulsi Vivah.',
    ],
    taxonomy: {
      kingdom: 'Plantae',
      phylum: 'Tracheophyta',
      class: 'Magnoliopsida',
      order: 'Lamiales',
      family: 'Lamiaceae',
      genus: 'Ocimum',
      species: 'Ocimum tenuiflorum',
    },
    related: ['neem', 'turmeric'],
  },
  {
    id: 'p-003',
    slug: 'neem',
    names: { en: 'Neem', hi: 'नीम', es: 'Nim' },
    aliases: ['nimba', 'margosa', 'Indian lilac', 'arishta', 'neem tree', 'Melia azadirachta'],
    scientificName: 'Azadirachta indica',
    family: 'Meliaceae',
    category: 'Tree',
    image: '/images/neem.png',
    imageAlt: 'A neem branch with serrated pinnate leaflets and small green and yellow fruits',
    summary: {
      en: 'A fast-growing, drought-hardy tree whose bitter leaves, seeds and bark supply medicine, natural pesticide and shade.',
      hi: 'तेज़ी से बढ़ने वाला, सूखा-सहिष्णु वृक्ष जिसकी कड़वी पत्तियाँ, बीज और छाल औषधि, प्राकृतिक कीटनाशक और छाया देते हैं।',
      es: 'Un árbol de crecimiento rápido y resistente a la sequía cuyas hojas, semillas y corteza amargas aportan medicina, pesticida natural y sombra.',
    },
    description:
      'Neem is an evergreen tree of the mahogany family. Almost every part is bitter and biologically active; its seed kernels contain azadirachtin, a limonoid that disrupts the feeding and growth of hundreds of insect species while being low in toxicity to mammals.',
    appearance:
      'Grows 15–20 m tall with a broad, rounded crown. Leaves are pinnate with 10–17 sickle-shaped, toothed leaflets. Small, fragrant white flowers appear in drooping clusters, followed by smooth olive-like drupes that ripen from green to yellow.',
    habitat:
      'Native to the dry deciduous forests of the Indian subcontinent. Tolerates heat above 45 °C, poor and rocky soils, and long dry seasons, but not frost or waterlogging. Widely planted across the Sahel and arid tropics for shade and windbreaks.',
    growth: {
      climateType: 'Tropical to semi-arid',
      tempC: [21, 40],
      rainfallMm: [400, 1200],
      soil: 'Deep, well-drained; tolerates sandy, stony and nutrient-poor soils',
      soilPh: [5.0, 8.5],
      sunlight: 'Full sun',
      sunlightHours: [7, 10],
      altitudeM: [0, 1500],
      waterNeed: 'low',
    },
    composition: [
      { compound: 'Azadirachtin', relativeValue: 94, partUsed: 'Seed kernel', benefit: 'Insect antifeedant and growth regulator; basis of neem pesticides.' },
      { compound: 'Nimbin', relativeValue: 60, partUsed: 'Seed oil, bark', benefit: 'Limonoid studied for anti-inflammatory and antifungal effects.' },
      { compound: 'Nimbidin', relativeValue: 56, partUsed: 'Seed oil', benefit: 'Main bitter principle; studied for antiulcer activity.' },
      { compound: 'Salannin', relativeValue: 46, partUsed: 'Seed kernel', benefit: 'Repels insects and deters feeding.' },
      { compound: 'Gedunin', relativeValue: 34, partUsed: 'Leaves, bark', benefit: 'Studied for antimalarial activity.' },
      { compound: 'Quercetin', relativeValue: 24, partUsed: 'Leaves', benefit: 'Flavonoid with antioxidant activity.' },
    ],
    partsUsed: [
      { part: 'Leaves', uses: ['Bitter paste for skin care', 'Stored with grain to deter insects', 'Smoke as mosquito repellent'] },
      { part: 'Seeds', uses: ['Pressed into neem oil', 'Neem cake fertiliser', 'Biopesticide extracts'] },
      { part: 'Twigs', uses: ['Chewed as datun, a natural toothbrush'] },
      { part: 'Bark', uses: ['Traditional decoctions', 'Gum for adhesives'] },
      { part: 'Wood', uses: ['Termite-resistant timber', 'Furniture and fuel'] },
    ],
    geography: {
      nativeRegion: 'Indian subcontinent',
      nativeCenter: [78, 22],
      countries: [
        { iso: 356, name: 'India', status: 'native', note: 'Estimated 25+ million trees; largest producer of neem seed and oil.', sharePercent: 60 },
        { iso: 586, name: 'Pakistan', status: 'native', note: 'Common in Sindh and Punjab.', sharePercent: 5 },
        { iso: 50, name: 'Bangladesh', status: 'native', note: 'Grown along roads and homesteads.', sharePercent: 4 },
        { iso: 104, name: 'Myanmar', status: 'major', note: 'Large dry-zone populations; seed exporter.', sharePercent: 10 },
        { iso: 144, name: 'Sri Lanka', status: 'native', note: 'Part of the native range.' },
        { iso: 566, name: 'Nigeria', status: 'major', note: 'Widely naturalised; growing oil industry.', sharePercent: 6 },
        { iso: 562, name: 'Niger', status: 'cultivated', note: 'Planted in the Majjia Valley windbreak project.' },
        { iso: 686, name: 'Senegal', status: 'cultivated', note: 'Planted for shade and reforestation.' },
        { iso: 288, name: 'Ghana', status: 'cultivated', note: 'Naturalised in the savanna north.' },
        { iso: 729, name: 'Sudan', status: 'cultivated', note: 'Site of early observations on locust resistance.' },
        { iso: 682, name: 'Saudi Arabia', status: 'cultivated', note: 'Thousands planted on the plain of Arafat to shade pilgrims.' },
        { iso: 36, name: 'Australia', status: 'cultivated', note: 'Plantations in Queensland; invasive in places.' },
        { iso: 76, name: 'Brazil', status: 'cultivated', note: 'Commercial plantations for oil.' },
      ],
      topProducers: [
        { country: 'India', sharePercent: 60 },
        { country: 'Myanmar', sharePercent: 10 },
        { country: 'Nigeria', sharePercent: 6 },
        { country: 'Pakistan', sharePercent: 5 },
        { country: 'Bangladesh', sharePercent: 4 },
      ],
    },
    seasonality: { sowing: [6, 7], flowering: [2, 3, 4, 5], harvest: [6, 7, 8] },
    uses: {
      culinary: [
        { en: 'Neem flowers in Ugadi pachadi', hi: 'उगादि पचड़ी में नीम के फूल', es: 'Flores de nim en el ugadi pachadi' },
        { en: 'Bitter leaves fried with aubergine (Bengal)', hi: 'बैंगन के साथ तली कड़वी पत्तियाँ (बंगाल)', es: 'Hojas amargas fritas con berenjena (Bengala)' },
      ],
      medicinal: [
        { en: 'Antiseptic leaf paste for skin', hi: 'त्वचा के लिए रोगाणुरोधी पत्ती का लेप', es: 'Pasta antiséptica de hojas para la piel' },
        { en: 'Datun twigs for oral hygiene', hi: 'मुँह की सफ़ाई के लिए दातुन', es: 'Ramitas datun para la higiene bucal' },
        { en: 'Traditional fever decoctions', hi: 'बुखार के लिए पारंपरिक काढ़ा', es: 'Decocciones tradicionales para la fiebre' },
      ],
      cultural: [
        { en: 'Leaves hung at doorways for protection', hi: 'रक्षा के लिए द्वार पर पत्तियाँ टाँगना', es: 'Hojas colgadas en las puertas como protección' },
        { en: 'Linked to goddess Sitala in folk tradition', hi: 'लोक परंपरा में शीतला माता से जुड़ा', es: 'Vinculado a la diosa Sitala en la tradición popular' },
      ],
      industrial: [
        { en: 'Azadirachtin-based biopesticides', hi: 'एज़ाडिरेक्टिन आधारित जैव-कीटनाशक', es: 'Bioplaguicidas a base de azadiractina' },
        { en: 'Neem oil soaps and cosmetics', hi: 'नीम तेल के साबुन और सौंदर्य उत्पाद', es: 'Jabones y cosméticos con aceite de nim' },
        { en: 'Neem-coated urea fertiliser', hi: 'नीम-लेपित यूरिया उर्वरक', es: 'Urea recubierta de nim' },
      ],
      ecological: [
        { en: 'Shade and windbreaks in arid regions', hi: 'शुष्क क्षेत्रों में छाया और वायुरोधक', es: 'Sombra y cortavientos en zonas áridas' },
        { en: 'Reclaims degraded, eroded land', hi: 'बंजर, कटावग्रस्त भूमि को सुधारता है', es: 'Recupera tierras degradadas y erosionadas' },
      ],
    },
    history: [
      { era: 'c. 2000 BCE', event: 'Neem appears in ancient Indian practice; later texts call it sarva roga nivarini, “healer of all ailments”.' },
      { era: 'c. 300 BCE–200 CE', event: 'Charaka and Sushruta Samhitas describe nimba for skin and fever.' },
      { era: '1959', event: 'Entomologist Heinrich Schmutterer notes neem trees in Sudan left untouched by a locust swarm.' },
      { era: '1968', event: 'Butterworth and Morgan isolate azadirachtin from neem seeds.' },
      { era: '1992', event: 'US National Research Council publishes “Neem: A Tree for Solving Global Problems”.' },
      { era: '2000', event: 'European Patent Office revokes a neem fungicide patent in a landmark biopiracy case.' },
    ],
    facts: [
      'Azadirachtin affects over 200 insect species yet is considered low-toxicity to mammals.',
      'Neem can shed most leaves in severe drought and still survive.',
      'A mature tree can yield up to around 50 kg of fruit a year.',
      'Neem-coated urea became mandatory in India in 2015 to slow nitrogen loss.',
      'Fresh neem seeds lose viability within weeks, so they must be sown quickly.',
    ],
    taxonomy: {
      kingdom: 'Plantae',
      phylum: 'Tracheophyta',
      class: 'Magnoliopsida',
      order: 'Sapindales',
      family: 'Meliaceae',
      genus: 'Azadirachta',
      species: 'Azadirachta indica',
    },
    related: ['tulsi', 'turmeric'],
  },
]

export function getPlant(slug: string) {
  return plants.find((p) => p.slug === slug)
}

export function getAdjacentPlants(slug: string) {
  const i = plants.findIndex((p) => p.slug === slug)
  const n = plants.length
  return {
    prev: plants[(i - 1 + n) % n],
    next: plants[(i + 1) % n],
  }
}

export const useCategories: UseCategory[] = ['culinary', 'medicinal', 'cultural', 'industrial', 'ecological']

export function getStats() {
  const countries = new Set<number>()
  let uses = 0
  for (const p of plants) {
    p.geography.countries.forEach((c) => countries.add(c.iso))
    for (const cat of useCategories) uses += p.uses[cat].length
  }
  return { plants: plants.length, countries: countries.size, uses }
}
