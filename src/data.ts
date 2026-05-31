/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, LocalizedStrings } from './types';

export const LANGUAGES = [
  { code: 'om', name: 'Afaan Oromoo' },
  { code: 'en', name: 'English' }
] as const;

export const LOCALIZATION: Record<'om' | 'en', LocalizedStrings> = {
  om: {
    globalBtn: 'English',
    lTitle: 'Baga Nagaan Dhuftan',
    lSubtitle: "Gara Amoo Academy'tti deebi'uuf seeni",
    lEmail: 'Email Keessan',
    lPassword: 'Password',
    lBtn: 'Login Tahuu',
    lLoading: 'Eegamaa jira...',
    dWelcome: 'Kooziiwwan Keeti',
    dDesc: 'Dandeettii kee asirraatti gabbifadhu bro!',
    c1T: 'Gulaallii Suuraa (Premium)',
    c1D: 'Gulaallii suuraa professional ta\'e, qulqullina ol\'aanaa fi hojii Fiverr portfolio bifa kanaan adda baasi.',
    c2T: 'Graphic Design Guutuu',
    c2D: 'Seensa Figma, uumama logo, beeksisa, fi diizaayiniilee garaa garaa salphaatti baradhu.',
    c3T: 'Gulaallii Viidiyoo (Premium)',
    c3D: 'TikTok, YouTube fi Gidduu hojii adda addaaf gulaallii dammaqe fi \'hooks\' namatti tolu uumuu.',
    cBtn: 'Jalqabi',
    alertSuccess: 'Baga nagaan dhufte Amoo Academy keessatti!',
    alertError: 'Dogoggora Seensaa: ',
    logOut: 'Log Out',
    demoMode: 'Mode Demo',
    demoMessage: 'Amoo Academy ammaan tana mode offlayiniin hojjetaa jira. Progress kee gabattii local keessatti ni kuufama.',
    activeCourse: 'Koozii Keessan',
    allLessons: 'Barnoota Hunda',
    practiceLab: 'Lab Practice',
    takeQuiz: 'Madaallii Barnootaa (Quiz)',
    congrats: 'Baga Gammaddan!',
    completed: 'Xumurameera',
    nextLesson: 'Barnoota Itti Aanu',
    prevLesson: 'Barnoota Durii',
    finishQuiz: 'Quiz Xumuri',
    startBtnText: 'Barachuu Jalqabi',
    ownerInfo: 'Amanuel | Harar, Ethiopia | Call: +251967145146'
  },
  en: {
    globalBtn: 'Afaan Oromoo',
    lTitle: 'Welcome Back',
    lSubtitle: 'Sign in to return to your courses',
    lEmail: 'Your Email',
    lPassword: 'Password',
    lBtn: 'Sign In',
    lLoading: 'Loading...',
    dWelcome: 'Your Dashboard',
    dDesc: 'Enhance your professional skills here bro!',
    c1T: 'Premium Photo Editing',
    c1D: 'Master professional photo editing, high-resolution enhancements, and Fiverr portfolio assets.',
    c2T: 'Full Graphic Design',
    c2D: 'Learn Figma components, logo creation, branding, and modern designs step-by-step.',
    c3T: 'Premium Video Editing',
    c3D: 'Master video editing for TikTok, YouTube, and viral content engagement hooks.',
    cBtn: 'Start Learning',
    alertSuccess: 'Welcome back to Amoo Academy!',
    alertError: 'Authentication Error: ',
    logOut: 'Log Out',
    demoMode: 'Demo Mode',
    demoMessage: 'Amoo Academy is currently running in offline/demo mode. Your progress is stored locally.',
    activeCourse: 'Your Active Course',
    allLessons: 'Course Syllabus',
    practiceLab: 'Interactive Lab',
    takeQuiz: 'Take Practice Quiz',
    congrats: 'Congratulations!',
    completed: 'Completed',
    nextLesson: 'Next Lesson',
    prevLesson: 'Previous Lesson',
    finishQuiz: 'Submit Quiz',
    startBtnText: 'Start Learning Now',
    ownerInfo: 'Amanuel | Harar, Ethiopia | Call: +251967145146'
  }
};

export const COURSES: Course[] = [
  {
    id: 'photo',
    tag: 'Photo Editing',
    titleEn: 'Premium Photo Editing',
    titleOm: 'Gulaallii Suuraa (Premium)',
    descEn: 'Master professional photo editing, high-resolution color grading, and Fiverr portfolio creation.',
    descOm: 'Gulaallii suuraa professional ta\'e, qulqullina ol\'aanaa fi hojii Fiverr portfolio bifa kanaan adda baasi.',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=600',
    colorClass: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
    bgTagClass: 'bg-blue-500/10 text-blue-400',
    lessons: [
      {
        id: 'photo-1',
        titleEn: 'Dynamic Balance / Exposure & Tone',
        titleOm: 'Balance Qulqullinaa / Exposure & Tone',
        duration: '15 mins',
        contentEn: `### Understanding Light and Shadows in Photography

Every premium photo starts with maintaining a balanced distribution of exposure and highlights. 

#### Core Concepts of Exposure:
1. **Exposure**: Controls the overall brightness of your image. Overexposed images lose valuable color detail in subjects, while underexposed images hide shadow information in pure black grids.
2. **Contrast**: The scale of difference between black points and white points. Elevating contrast emphasizes texture, structures and shapes.
3. **Highlights & Shadows**: Specifically target the brightest and darkest portions of your image independently to rescue clipped sky regions or brighten hidden profile outlines.

Use the interactive slider in the panel below to tweak the real-time simulation filters. Observe how adjusting these components affects the histogram projection.`,
        contentOm: `### Hubannooo Ibsa fi Gaaddidduu Suuraalee Keessatti

Suuraan gaariin hundi gidduu-galeessummaa ibsa (exposure) fi diinaggee halluu eeguu irraa jalqaba.

#### Yaadmariwwan Exposure:
1. **Exposure**: Gidduu-galeessummaa ibsa guutuu suuraa keessanii to\'ata. Ibsi baay\'inaan gubate qulqullina suuraa balleessa; ibsi gadi xiqqaa ta\'emmoo iccitii gaaddidduu dukkaneessaa keessatti dhoksa.
2. **Contrast**: Garaasummaa gidduu bahaa (white) fi gurraacha (black) gidduu jiru. Contrast dabaluun qulqullina mala-uumamaa fi boca addaan baasa.
3. **Highlights & Shadows**: Bakka ibsa baay\'ee qabuu fi bakka dukkanaa\'e qofa addaan baasanii sirreessuuf gargaara. Sky-clipping balleessuun saphala samii mul\'isuuf murteessaa dha.

Fayyadamaa qola slider baname kanaan sirreeffama suuraa keessan dhandhamadhaa!`,
        practiceType: 'photo'
      },
      {
        id: 'photo-2',
        titleEn: 'Aesthetic Color Temperature & Grading',
        titleOm: 'Temperature Halluu fi Grading Bareedaa',
        duration: '20 mins',
        contentEn: `### The Art of Cinematic Color Temperature

Color grading is what distinguishes a boring snapshot from a Cinematic Fiverr-ready portfolio asset.

#### Key Tint & Grading Factors:
- **Temperature (Kelvin)**: Slidng towards Warmth (Yellows) creates nostalgia, comfort, or sun-drenched sunset vibes. Sliding towards Coolness (Blues) portrays elegance, high technology, or deep focus.
- **Saturation**: The intensity of the color hues. Softly desaturated tones portray premium organic vibes, while rich saturation catches fast-scrolling social attention.
- **Sepia & Tint styles**: Adding creative overlays to establish thematic coherence throughout your design project.`,
        contentOm: `### Ogummaa Cinematic Color Temperature

Color grading dandeettii suuraa burjaaja\'e tokko gara hojii qaalii fiverr gig portfolio tti jijjiiru dha.

#### Wantoota Ijoo Halluu Filachuu:
- **Temperature (Kelvin)**: Gara Warm (Oowwaa) deemuun miira jaalalaa fi nostalgia uuma. Gara Cool (Qabbanaawaa) deemuun qulqullina tech fi focus gad-fagoo ibsa.
- **Saturation**: Gidduu-galeessummaa dhiibbaa halluu. Saturation xuraa\'e qulqulleessuun bifa premium kennisiisa, midhaasummaa guddaas dabala.

Sirreessaa kana fayyadamuun suuraa portfolio keessanii asumaan adda baafadhaa.`,
        practiceType: 'photo'
      }
    ],
    quizzes: [
      {
        id: 'p-q1',
        questionEn: 'Which adjustment targets the brightest areas of an image without affecting the midtones?',
        questionOm: 'Sirreeffama suuraa kamtu bakka ibsa guddaa qabu (brightest areas) qofa target godhata?',
        optionsEn: ['Contrast', 'Highlights', 'Exposure', 'Saturation'],
        optionsOm: ['Contrast', 'Highlights', 'Exposure', 'Saturation'],
        correctIndex: 1,
        explanationEn: 'Highlights strictly control the brightest regions, leaving midtones and shadows uncompressed.',
        explanationOm: 'Highlights bakka ibsa baay\'ee mul\'atu qofa to\'ata, midtones fi shadows osoo hin tuqin.'
      },
      {
        id: 'p-q2',
        questionEn: 'How does sliding the Temperature warm factor affect the narrative mood?',
        questionOm: 'Temperature gara "Warm" slider gochuun miira akkamii uuma?',
        optionsEn: ['Nostalgic and comforting golden glow', 'Technical, cold and futuristic focus', 'Grayscale vintage documentation', 'Inverted solarized visuals'],
        optionsOm: ['Nostalgic fi golden glow oowwaa', 'Technical, qabbanaa\'aa fi focus fuulduraa', 'Grayscale vintage', 'Inverted solarized visuals'],
        correctIndex: 0,
        explanationEn: 'Warm yellow tones produce nostalgic, emotional, and comforting golden-hour vibes.',
        explanationOm: 'Halluun oowwaan (warm colors) daawwataniif miira bareedaa fi nostalgia uuma.'
      }
    ]
  },
  {
    id: 'graphic',
    tag: 'Graphic Design',
    titleEn: 'Full Graphic Design Course',
    titleOm: 'Graphic Design Guutuu',
    descEn: 'Learn Figma canvas essentials, custom logo layouts, grid hierarchy, and brand asset guidelines.',
    descOm: 'Seensa Figma, uumama logo, beeksisa, fi diizaayiniilee garaa garaa salphaatti baradhu.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600',
    colorClass: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
    bgTagClass: 'bg-emerald-500/10 text-emerald-400',
    lessons: [
      {
        id: 'graphic-1',
        titleEn: 'Visual Layout Hierarchy & Spacing rules',
        titleOm: 'Visual Layout Hierarchy fi Seera Spacing',
        duration: '18 mins',
        contentEn: `### Visual Spacing and Layout Harmony

Every premium design starts with visual layout hierarchy. It dictates what the client's eye reads first, second, and last.

#### Design Pillars:
1. **Rule of Thirds & Grids**: Keeps spacing clean and proportional instead of randomized.
2. **Whitespace (Negative Space)**: Whitespace is not empty space; it is structural breathing room that lets elements hold prestige.
3. **Dominance Scale**: Headers should be at least double the font size of primary labels, positioned with precise micro-spacing.

Use the Graphic Design interactive pad to change components, templates, title texts, and colors to construct professional Figma-style header branding.`,
        contentOm: `### visual Spacing fi Wal-qixxummaa Layout

Diizaayiniin qaalii hundi Visual Spacing irraa jalqaba. Daawwataan maal dura, maal lammataa akka dubbisu murteessa.

#### Utubaalee Diizaayinii:
1. **Rule of Thirds & Grids**: Spacing qulqulluu fi proporional ta\'e eeguuf gargaara.
2. **Whitespace (Negative Space)**: Whitespace bakka duwwaa miti; hafuura baafannaa visual elementiiti.
3. **Dominance Scale**: Barreessoonni gurguddoon (Headers) bifa xiqqaarraa harka lama guddaachuu qabu.

Leenjii kanaan asitti template diizaayiniitti fayyadamuun logo fi beeksisa uumaa!`,
        practiceType: 'graphic'
      },
      {
        id: 'graphic-2',
        titleEn: 'Perfect Typographic Pairing',
        titleOm: 'Paaringii Fontii fi Dubbifamummaa',
        duration: '22 mins',
        contentEn: `### Combining Typography to Convey Value

Fonts convey physical tone. Choosing incorrect pairs ruins the architectural harmony of your marketing flyers.

#### Elegant Combos:
- **Display Sans-Serif (Space Grotesk / Outfit)** matched with **Mono-spaced (JetBrains Mono / Fira Code)** labels for modern technical branding.
- **Elegant Serif** with highly readable clean Sans-Serifs for premium real estate or editorial branding.
- **Rule of Two**: Never combine more than two font families in a single workspace. Combine bold uppercase titles with thin trackers instead.`,
        contentOm: `### Paaringii Fontii fi Miira Halluu

Fontiin miira dubbifamaa fi gatii bittaa ifatti agarsiisa. Fontii sirrii hin taane fayyadamuun hojii kee xureessa.

#### Filannoowwan Bareedaa:
- **Display Sans-Serif (Space Grotesk)** fi **Mono-spaced (JetBrains)** walitti makuun visual tech bareedaa uuma.
- **Elegant Serif** fi Sans-Serif haaraa walitti makuun diizaayinii premium uumma.
- **Seera Lamaa**: Diizaayinii tokko keessatti gosa fontii gosa lamaa ol hin fayyadamiinaa.`,
        practiceType: 'graphic'
      }
    ],
    quizzes: [
      {
        id: 'g-q1',
        questionEn: 'What is the role of Negative Space (Whitespace) in modern design grids?',
        questionOm: 'Faayidaan Negative Space (Whitespace) diizaayinii ammayyaa keessatti maali?',
        optionsEn: ['Filling every blank region with logos', 'Allowing visual elements room to breathe', 'Increasing page load times', 'Converting vector paths into raster layers'],
        optionsOm: ['Bakka duwwaa hunda logo fill gochuu', 'Elementootaaf hafuura baafachuu kennuun salphatti akka dubbifaman gochuu', 'Saffisa load gadi xiqqeessuu', 'Vector gara raster jijjiiruu'],
        correctIndex: 1,
        explanationEn: 'Whitespace separates key components and focuses reader attention exactly where layout hierarchy demands.',
        explanationOm: 'Whitespace elementoota addaan baasuun ijji namaa bakka sirriitti akka xiyyeeffatu godha.'
      },
      {
        id: 'g-q2',
        questionEn: 'How many different font families represent the maximum limitation for stable branding design layouts?',
        questionOm: 'Diizaayinii nagaan hojjetamu tokko keessatti fontii gosa meeqa qofa fayyadamuun gorfama?',
        optionsEn: ['Maximum of Two (2)', 'At least Five (5)', 'Up to Seven (7)', 'Unlimited fonts'],
        optionsOm: ['Gosa Lama qofa (2)', 'Yoo xiqqaate gosa Shan (5)', 'Gara gosa Torbaa (7)', 'Bilisaan hunda'],
        correctIndex: 0,
        explanationEn: 'Combining more than two families dilutes brand consistency and introduces excessive visual interference.',
        explanationOm: 'Fontii gosa lamaa ol walitti makuun visual sirrummaa fi beeksisa balleessa.'
      }
    ]
  },
  {
    id: 'video',
    tag: 'Video Editing',
    titleEn: 'Premium Video Editing Mastery',
    titleOm: 'Gulaallii Viidiyoo (Premium)',
    descEn: 'Master retention mechanics, TikTok hooks, snappy jump cuts, and interactive sequence timelines.',
    descOm: 'TikTok, YouTube fi Gidduu hojii adda addaaf gulaallii dammaqe fi \'hooks\' namatti tolu uumuu.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600',
    colorClass: 'text-purple-400 border-purple-500/20 bg-purple-500/10',
    bgTagClass: 'bg-purple-500/10 text-purple-400',
    lessons: [
      {
        id: 'video-1',
        titleEn: 'The Power Hook: Keeping Viewers Glued',
        titleOm: 'The Power Hook: Daawwattoota Haalaan Kuffisuu',
        duration: '15 mins',
        contentEn: `### Retaining Human Attention: The 3-Second Rule

Viral videos are not won in the outro; they are won in the first **three seconds**.

#### What comprises an Effective Hook?
1. **The Visual Pattern Interrupt**: Fast pacing, unexpected animation, or zooms that diverge from typical static setups.
2. **The Curiosity Gap**: Asking a compelling question or showcasing the final result immediately before revealing the workflow.
3. **Aggressive Subtitling**: Bold, center-screen kinetic typography that flashes colored accents on key emotional words.

Practice organizing clip modules, selecting sound alerts, and adding transitions using the video timeline lab below.`,
        contentOm: `### Attention Daawwattootaa: Seera Sekondii Sadii (3-Sec)

Viidiyoon vaayiraal ta\'u dhuma irratti osoo hin taane, sekondii **sadii** jalqabaa keessatti injifatama.

#### Hook Gaariin Maal Of Keessaa Qaba?
1. **Visual Pattern Interrupt**: Sochii saffisaa, guddina suuraa (zooms) battalaa fi dinqisiisoo.
2. **Curiosity Gap**: Dubbii dammaqsu, fkn: "Waan kana duraan beektu turtee?" jedhanii gaafachuu.
3. **Subtitling**: Dubbii tsifame giddu-galeessatti battalatti calaqqisu.

Timeline asitti argamu fayyadamuun clip adda addaa walitti fiduun yaalii godhaa!`,
        practiceType: 'video'
      },
      {
        id: 'video-2',
        titleEn: 'Viral Audio Editing & Snappy Cuts',
        titleOm: 'Audio Editing Vaayiraal fi Snappy Cuts',
        duration: '20 mins',
        contentEn: `### Sound Design: The Subconscious Engine of Retention

Audio accounts for 60% of emotional engagement in premium video content.

#### Expert Sound Principles:
- **Audio Ducking**: Automatically lowering background background music (BGM) volume by -12dB when a voiceover tracks is speaking.
- **Sfx Accents (Whoosh, Dings, Pop, Swipes)**: Synchronizing short, impactful effects with on-screen graphical entrances.
- **Eliminating Dead Space**: Cutting breathing gaps larger than 0.2 seconds to sustain pacing momentum.`,
        contentOm: `### Sound Design: Saphala Hafuura Baafannaa Miiraa

Sagaleen diizaayinii viidiyoo keessatti 60% faayidaa miiraa qaba.

#### Wantoota Sagalee:
- **Audio Ducking**: Sagaleen sirreeffama keenyaa yeroo dubbatu musikii duubaa soft gochuu.
- **Sfx (Whoosh, Ding, Pops)**: Battala grafikii fi saphalluun dhufee mul\'atu sfx synch gochuu.
- **Breathing Gaps Balleessuu**: Hafuura gidduutti fudhatan kan sekondii 0.2 ol ta\'an hunda muraa deemsisuu.`,
        practiceType: 'video'
      }
    ],
    quizzes: [
      {
        id: 'v-q1',
        questionEn: 'What is the "3-second rule" in viral shorts editing?',
        questionOm: 'Seerri "Sekondii Sadii (3-sec)" viidiyoo gaggabaaboo (shorts) keessatti maali?',
        optionsEn: ['Adding credits for 3 seconds at the end of the timeline', 'Hooking reader focus instantly with visual pattern interrupts', 'Allowing the video screen to remain completely dark', 'Compressing audio streams to 3kbps tracks'],
        optionsOm: ['Credits dhuma irratti sekondii sadii fiduu', 'Sekondii 3 jalqabaa keessatti visual pattern interruptin attention namaa qabu', 'Viidiyoon dukkanaa\'ee akka itti fufu gochuu', 'Audio garraan compress gochuu'],
        correctIndex: 1,
        explanationEn: 'The first 3 seconds dictate whether the viewer continues scrolling past or remains captivated.',
        explanationOm: 'Sekondii sadii jalqabaa murteessaa dha daawwataan dabalee deemuuf ykn kuffisee hafuuf.'
      },
      {
        id: 'v-q2',
        questionEn: 'What is "Audio Ducking"?',
        questionOm: '"Audio Ducking" jechuun maal jechuu dha?',
        optionsEn: ['Altering voice pitch to sound like ducks', 'Lowering background volume dynamically when dialog is spoken', 'Splitting vocal sound tracks into double mono stems', 'Adding bird synthesizer tracks'],
        optionsOm: ['Pitch sagalee gara bifa simbiraatti jijjiiruu', 'Musika duubaa (BGM) battala sagaleen namaa dubbatu gadi buusuu', 'Sagalee gara double mono tti addaan baasuu', 'Synthesizer dabaluu'],
        correctIndex: 1,
        explanationEn: 'Ducking ensures dialog remains clear and high-priority against loud sound effects or backing scores.',
        explanationOm: 'Ducking sagaleen namaa qulqullinaan akka mul\'atuuf musika duubaa callisiisa.'
      }
    ]
  }
];
