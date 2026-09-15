import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const source = path.dirname(fileURLToPath(import.meta.url));
const app = path.resolve(source, '../..');
const existing = path.join(app, 'kajabi-deployment/pages/landing/linktree/linktree-landing-page');
const output = path.join(app, 'kajabi-deployment/pages/landing/bio-experiment');
const read = (file) => readFile(file, 'utf8');
const tracker = await read(path.join(source, 'tracker.js'));
const router = await read(path.join(source, 'router.js'));
const ids = ['home', 'membership_trial', 'newborn', 'age_3_4', 'age_5_12', 'toddler', 'camp', 'consultation', 'podcast', 'home', 'social_tiktok', 'social_instagram', 'social_spotify', 'social_youtube'];
let index = 0;
let control = (await read(existing + '.html')).replace('<div id="snooze-linktree">', '<div id="snooze-linktree" data-bio-variant="control">');
control = control.replace(/<a\s/g, () => {
  const id = ids[index++];
  if (!id) throw new Error('Unexpected control link; update the explicit link inventory.');
  const commercial = ['membership_trial', 'camp', 'consultation'].includes(id);
  return '<a data-bio-link-id="' + id + '" data-bio-commercial="' + commercial + '" ';
});
if (index !== ids.length) throw new Error('Control link inventory changed.');
const script = (value) => '<script>\n' + value + '\n</script>';
const style = (value) => '<style>\n' + value + '\n</style>';
const simple = await read(path.join(source, 'simple.html'));
const simpleCss = await read(path.join(source, 'simple.css'));
const pages = {
  control: style(await read(existing + '.css')) + '\n' + control + '\n' + script(await read(existing + '.js')) + '\n' + script(tracker),
  simple: style(simpleCss) + '\n' + simple + '\n' + script(tracker),
  router: '<div id="bio-router-page"><p>Opening your sleep resources…</p><p><a href="/links">Continue to Snooze links</a></p></div>\n' + script(router)
};
await mkdir(path.join(output, 'preview'), { recursive: true });
for (const [name, fragment] of Object.entries(pages)) {
  await writeFile(path.join(output, name + '.html'), fragment + '\n');
  const title = name === 'simple' ? 'Better sleep starts here | The Sleep Concierge' : name === 'control' ? 'Snooze Links | Current layout' : 'Snooze Bio';
  await writeFile(path.join(output, 'preview', name + '.html'), '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>' + title + '</title></head><body style="margin:0">' + fragment + '</body></html>\n');
}
console.log('Built control, simple and router Kajabi fragments with local previews.');
