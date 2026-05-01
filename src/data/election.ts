export interface ElectionStep {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  category: 'registration' | 'voting' | 'deadline';
  description: string;
}

export const ELECTION_STEPS: ElectionStep[] = [
  {
    id: 'registration',
    title: 'Voter Registration',
    description: 'Register via Form 6 if you are 18+ or update details using Form 8.',
    longDescription: 'Indian citizens can register online via the NVSP portal or Voter Helpline App. You need a passport-sized photo, age proof, and residence proof. First-time voters should use Form 6, while those needing corrections use Form 8.',
    icon: 'UserPlus'
  },
  {
    id: 'electoral-roll',
    title: 'Check Electoral Roll',
    description: 'Verify your name in the Voter List to ensure you can cast your vote.',
    longDescription: 'Even if you have an EPIC card, your name must be in the current Electoral Roll. You can check this on the ECI website or via the Voter Helpline App using your EPIC number or personal details.',
    icon: 'Search'
  },
  {
    id: 'know-candidate',
    title: 'Know Your Candidate',
    description: 'Check candidate credentials, criminal records, and assets via KYC.',
    longDescription: 'The Election Commission of India provides the "Know Your Candidate" (KYC) app where you can view affidavits filed by candidates, including their education, assets, and any criminal history.',
    icon: 'Info'
  },
  {
    id: 'booth-day',
    title: 'Polling Day',
    description: 'Carry your EPIC card or valid ID and find your polling booth.',
    longDescription: 'On election day, identify your designated polling station. If you don\'t have an EPIC card, you can use any of the 12 alternative photo identity documents approved by the ECI, such as Aadhaar, PAN, or Passport.',
    icon: 'CheckCircle'
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: '1',
    date: 'Pre-Election',
    title: 'Special Summary Revision',
    category: 'registration',
    description: 'ECI conducts drives to update the electoral roll before major elections.'
  },
  {
    id: '2',
    date: 'Announcement',
    title: 'Election Schedule & MCC',
    category: 'deadline',
    description: 'Model Code of Conduct (MCC) comes into force immediately after the election schedule is announced.'
  },
  {
    id: '3',
    date: 'Nomination Phase',
    title: 'Nominations & Scrutiny',
    category: 'deadline',
    description: 'Candidates file nominations; affidavits are uploaded for public research.'
  },
  {
    id: '4',
    date: 'Polling Days',
    title: 'Voting Phases',
    category: 'voting',
    description: 'Voting usually happens in several phases across different states and constituencies.'
  },
  {
    id: '5',
    date: 'Result Day',
    title: 'Counting of Votes',
    category: 'voting',
    description: 'All EVM results are counted simultaneously across the country/state.'
  }
];
