// Customize this file and the JSON files below to make your own quiz.
// Keep stable question IDs for corrections; use a new storageKey for a new subject.
const topics = [
  {id:'process',title:'The rules of the Hill',short:'Congressional process',description:'From introduction to enactment. Learn what each legislative step actually means.',intro:'A legislative headline tells you what happened. Knowing the rules tells you what it means—and what still has to happen.',objectives:['Distinguish committee action, chamber passage, and enactment.','Separate ending debate from passing a bill.','Follow amendments, reconciliation, and legislative vehicles.']},
  {id:'power',title:'Where the power sits',short:'Institutions & influence',description:'Committees, leadership, oversight, and the difference between authority and funding.',intro:'Congress has many ways to shape AI policy. Which tool matters depends on the objective: changing the law, supplying money, or scrutinizing implementation.',objectives:['Connect committee jurisdiction to a proposal’s mechanism.','Distinguish authorizing programs from funding them.','Recognize what hearings, caucuses, and report language can do.']},
  {id:'enacted',title:'What became law',short:'Enacted AI policy',description:'Read the obligations, agencies, and deadlines behind enacted AI safeguards.',intro:'Enactment begins another chapter. A useful reading of a law identifies who must do what, when, and under whose oversight.',objectives:['Identify specific duties in enacted laws.','Distinguish the enacted text from earlier proposals.','Connect AI safeguards to the agencies responsible for them.']},
  {id:'pending',title:'On the table',short:'Pending proposals',description:'Compare the mechanisms in proposals for reporting, evaluation, and model security.',intro:'Similar bill names can conceal different policy designs. Compare the trigger, the regulated actor, the recipient, and the strength of the obligation.',objectives:['Compare reporting, testing, and whistleblower proposals.','Separate mandatory duties from voluntary participation.','Read each question’s bill version and date.']},
  {id:'history',title:'The paths not taken',short:'Legislative history',description:'Expired bills, defeated provisions, and ideas that return in another vehicle.',intro:'A proposal’s legislative fate and its policy legacy are different questions. Follow both without assuming an idea disappeared when a bill did.',objectives:['Distinguish expired bills from defeated amendments.','Trace a policy across Congresses and legislative vehicles.','Recognize the limits of what one vote proves.']},
  {id:'people',title:'Know the players',short:'Members & coalitions',description:'Connect names to documented actions, institutional roles, and policy positions.',intro:'Learn the people through their records. Sponsorship, a specific vote, and a public statement each tell you something different.',objectives:['Recognize key members and bipartisan partnerships.','Connect policy positions to dated evidence.','Avoid inferring a complete worldview from one action.']}
];
const glossary = [
 ['Markup','A committee meeting to debate, amend, and decide what to do with a measure. Committee approval is a step toward floor consideration, not enactment.','https://www.senate.gov/committees/committees_home.htm'],
 ['Reported bill','A committee has formally sent a measure to its chamber, often with recommended changes and an explanatory report. The chamber still has to act.','https://www.congress.gov/legislative-process'],
 ['Cloture','The Senate procedure for limiting further consideration. For most legislation, invoking cloture generally requires three-fifths of senators duly chosen and sworn. That vote is different from final passage.','https://www.senate.gov/about/powers-procedures/filibusters-cloture.htm'],
 ['Reconciliation','A budget process with expedited Senate procedures. Its content is constrained by budget instructions and rules, including the Byrd rule; it is not a general fast lane for any policy.','https://www.budget.senate.gov/about/budget-reconciliation'],
 ['Authorization','Legislation that establishes or continues a program, defines powers or duties, or authorizes funding. An authorization of appropriations alone does not supply the money.','https://www.senate.gov/reference/glossary_term/authorization.htm'],
 ['Appropriation','Law providing agencies with authority to incur obligations and make payments from the Treasury for specified purposes.','https://www.senate.gov/reference/glossary_term/appropriation.htm'],
 ['Companion bills','Separate House and Senate measures on the same or similar subject. They retain distinct bill numbers and histories; identical text in separate bills is not itself completion of bicameral passage.','https://www.congress.gov/legislative-process'],
 ['Legislative vehicle','The particular bill used to carry language toward enactment. A policy can move from a standalone proposal into a larger bill. Track both the policy and the vehicle.','https://www.congress.gov/legislative-process'],
 ['Preemption','Federal law displacing state law within its scope. The breadth of covered conduct, exceptions, and savings clauses determines which state powers remain.','https://constitution.congress.gov/browse/essay/artVI-C2-3-4/ALDE_00013429/'],
 ['Ranking member','The leading minority-party member of a committee. A ranking member has institutional influence but does not hold the same powers as the chair.','https://www.senate.gov/reference/glossary.htm'],
 ['Oversight','Congress examines how laws and programs are implemented. Hearings, investigations, and information requests can inform legislation, but a hearing by itself does not enact a requirement.','https://www.senate.gov/about/powers-procedures/investigations.htm'],
 ['Expiration at Congress’s end','A bill that has not become law expires when its Congress ends. Reintroduction creates a new bill in the next Congress; a new annual session within the same Congress is different.','https://ask.loc.gov/law/faq/334496']
];

export const quizConfig = {
  brand: {
    name: 'Hillwise',
    wordmark: 'hillwise',
    subtitle: 'AI on the Hill',
    description: 'Learn how Congress shapes AI policy. Source-linked quizzes on the process, the proposals, and the people.',
    tagline: 'The process. The policy. The people.',
    eyebrow: 'The congressional AI policy quiz',
    headline: ['Know the policy.', 'Understand', 'the power.'],
    intro: 'Get fluent in the process, proposals, and people shaping AI on Capitol Hill. One short briefing at a time.',
    artLabel: 'A view from the Hill',
    artEdition: '118th & 119th Congresses',
    artTitle: 'More than a roll call.',
    artDescription: 'Learn what happened—and why it matters.',
    artStamp: ['PROCESS', '+ POLICY', '+ PEOPLE'],
    showChamberArt: true,
    quickTitle: 'A little Hill time goes a long way.',
    homeTitle: 'Choose your briefing.',
    perfectRoundTitle: 'A well-informed Hill briefing.',
    themeColor: '#f7f5ef'
  },
  edition: {date: '2026-11-13', label: 'November 13, 2026'},
  links: {
    source: 'https://github.com/shaanakshaikh/hillwise-ai-congress',
    sourceDownload: 'https://github.com/shaanakshaikh/hillwise-ai-congress/archive/refs/heads/main.zip',
    dataDownload: 'data/questions.json',
    corrections: 'https://github.com/shaanakshaikh/hillwise-ai-congress/issues/new?template=question-correction.yml'
  },
  storageKey: 'hillwise-progress-v1',
  progressFilename: 'hillwise-progress.json',
  topics,
  dataFiles: ['data/process.json', 'data/legislation.json', 'data/members.json'],
  // Set optional profile/portrait paths to null for a question-only quiz.
  profilesFile: 'data/profiles.json',
  portraitsFile: 'data/portraits.json',
  portraitsDirectory: 'portraits',
  placementCategories: ['process', 'power', 'enacted', 'pending', 'history', 'people', 'process', 'power'],
  placementCount: 8,
  roundSizes: [5, 10, 20],
  defaultRoundSize: 10,
  guide: {
    title: 'Put names to the record.',
    intro: 'A reference you can come back to. Member profiles describe dated actions; they are not overall political ratings.',
    profilesLabel: 'Members & coalitions',
    termsLabel: 'Congress, decoded',
    searchPlaceholder: 'Search a member, issue, or state…'
  },
  glossary,
  // Trusted, authored HTML. Do not insert unreviewed user submissions here.
  aboutHtml: `
    <section class="page-head"><span class="eyebrow orange">SHOW YOUR WORK</span><h1>Every answer has a paper trail.</h1><p>Original questions, grounded in public records. Designed to teach both what the evidence establishes and where it stops.</p>
    </section>
    <div class="prose">
    <h2>What this quiz covers</h2>
    <p>The question bank focuses on the 118th and 119th Congresses, AI safety and security legislation, and the people shaping it. Dates and bill versions appear in questions when they determine the answer. This edition was reviewed November 13, 2026; it does not update itself live.</p>
    
    <h2>From record to question</h2>
    <p><a href="https://legislation.shaanakshaikh.com/" target="_blank" rel="noopener">Shaan Shaikh’s AI legislation tracker</a> supplied the starting inventory. Bill text, public laws, official action histories, roll calls, committee material, and member statements supply the evidence. The tracker’s analytical classifications are not treated as official congressional findings.</p>
    <p>Every question includes linked sources and feedback. Explanations are original summaries. A sponsor’s statement establishes what that sponsor said; the operative text establishes what a proposal or law would do.</p>
    
    <h2>Distinctions worth protecting</h2>
    
    <ul><li>Committee action, chamber passage, and enactment are different events.</li><li>A bill’s status and a provision’s fate are tracked separately.</li><li>Expired, defeated, removed, and pending are different descriptions.</li><li>Enactment is distinct from effective dates and implementation deadlines.</li><li>Sponsorship, votes, and statements support specific conclusions, not blanket “pro-AI” or “anti-safety” labels.</li><li>Missing evidence of a position is not evidence of opposition.</li></ul>
    
    <h2>Related projects and reuse</h2>
    <p><a href="https://wonkolingo.com/" target="_blank" rel="noopener">WonkoLingo</a>, <a href="https://name-that-member.vercel.app/" target="_blank" rel="noopener">Name that Member</a>, and the <a href="https://legimon.pages.dev/#binder" target="_blank" rel="noopener">Legimon binder</a> were considered as related learning projects. We found no verified reusable question license for a closely matching bank, so their questions and political descriptions were not copied. The Legimon binder itself could not be retrieved during research.</p>
    <p>Public-domain member portraits, where used, come from <a href="https://github.com/unitedstates/images" target="_blank" rel="noopener">unitedstates/images</a>. Questions and profiles are authored for this quiz. Source documents and linked sites retain their own terms.</p>
    
    <h2>Keeping the content sound</h2>
    <p>This is a fixed, reviewed question bank. Changes to source legislation require a content review before affected answers are updated. Question IDs and the separate data files make corrections and future additions manageable.</p>
    <p>Each feedback panel is the fastest route to the underlying record. If an answer seems ambiguous or stale, keep the question wording and source link when requesting a correction.</p>
    </div>
  `
};
