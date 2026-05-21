// mock data i use as a fallback if the api fails
// shape matches the real ai response so the ui renders the same either way
const mockReport = {
  overallScore: 82,

  summary:
    'This interface has a clear structure and strong visual direction, but a few ' +
    'accessibility improvements would make it easier to use for all users.',

  priorityFixes: [
    'Increase contrast on secondary text.',
    'Add visible focus states to interactive elements.',
    'Make form labels persistent instead of relying only on placeholders.',
  ],

  categories: [
    {
      name: 'Color & Contrast',
      severity: 'Medium',
      status: 'Needs improvement',
      issue: 'Some secondary text may be too light against the gradient background.',
      whyItMatters: 'Users with low vision may have difficulty reading low-contrast text.',
      suggestedFix: 'Place important text on solid cards or darken the text color.',
    },
    {
      name: 'Typography & Readability',
      severity: 'Low',
      status: 'Good',
      issue: 'Font sizes are mostly appropriate. Some caption text could be slightly larger.',
      whyItMatters: 'Readable type reduces cognitive load for all users.',
      suggestedFix: 'Bump caption text to at least 13px and ensure line-height >= 1.5.',
    },
    {
      name: 'Buttons & Links',
      severity: 'High',
      status: 'Needs improvement',
      issue: 'Focus states are not visible on pill buttons.',
      whyItMatters: 'Keyboard users cannot tell which element is currently active.',
      suggestedFix: 'Add a 2px offset focus ring using outline-offset on all interactive elements.',
    },
    {
      name: 'Forms & Inputs',
      severity: 'Medium',
      status: 'Needs improvement',
      issue: 'Labels disappear on focus — the design relies on placeholders only.',
      whyItMatters: 'Users with memory or cognitive differences lose context mid-input.',
      suggestedFix: 'Use persistent floating labels or place labels above each field.',
    },
    {
      name: 'Layout & Visual Hierarchy',
      severity: 'Low',
      status: 'Good',
      issue: 'Visual hierarchy is clear. Primary actions stand out well.',
      whyItMatters: 'Clear hierarchy guides users through tasks efficiently.',
      suggestedFix: 'Minor: increase spacing between sections to improve scannability.',
    },
    {
      name: 'Mobile Usability',
      severity: 'Medium',
      status: 'Needs attention',
      issue: 'Touch targets may be smaller than the recommended 44x44px minimum.',
      whyItMatters: 'Small targets lead to mis-taps, especially for motor-impaired users.',
      suggestedFix: 'Ensure all clickable elements have a minimum 44px hit area.',
    },
  ],
}

export default mockReport
