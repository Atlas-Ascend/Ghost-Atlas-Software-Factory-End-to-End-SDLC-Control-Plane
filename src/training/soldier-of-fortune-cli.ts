import { TRACKS, assessMission, getMission, planTraining, type Track } from './soldier-of-fortune.js';

const [action = 'list', rawTrack, ...params] = process.argv.slice(2);
function trackOf(raw: string | undefined): Track {
  if (!raw || !TRACKS.includes(raw as Track)) throw new Error('Track must be one of ' + TRACKS.join(', '));
  return raw as Track;
}
try {
  let result: unknown;
  if (action === 'list') {
    result = { program: 'GA-SOF-TRAINING-20261018', tracks: TRACKS, usage: [
      'sof list', 'sof plan MARINE_CORPS 4', 'sof scenario BLACK_OPS',
      'sof assess BLACK_OPS BO-A=A BO-B=A BO-C=A',
    ] };
  } else if (action === 'plan') {
    const track = trackOf(rawTrack);
    const weeks = params[0] === undefined ? 4 : Number(params[0]);
    result = { track, weeks: planTraining(track, weeks) };
  } else if (action === 'scenario') {
    result = getMission(trackOf(rawTrack));
  } else if (action === 'assess') {
    const answers: Record<string,string> = {};
    for (const pair of params) {
      const match = /^([A-Z0-9-]+)=([A-Z])$/.exec(pair);
      if (!match || Object.hasOwn(answers, match[1])) throw new Error('Invalid or duplicate decision assignment');
      answers[match[1]] = match[2];
    }
    result = assessMission(trackOf(rawTrack), answers);
  } else {
    throw new Error('Unknown action; use list, plan, scenario or assess');
  }
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error(JSON.stringify({ status: 'ERROR', message: error instanceof Error ? error.message : String(error) }));
  process.exitCode = 2;
}
