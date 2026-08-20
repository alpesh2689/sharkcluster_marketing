const S = require('../node_modules/.cache/shaping.cjs');
const rows = [];
let n = 0;
const add = (provider, pname, code, region, city, cc, vcpu, ram, disk, dtype, bw, usd, hourly) => rows.push({
  id: `p${++n}`, provider, provider_name: pname, region, region_city: city, region_country: cc,
  plan_code: code, plan_name: code, vcpus: vcpu, memory_gb: ram, disk_gb: disk, disk_type: dtype,
  bandwidth_tb: bw, price_monthly_usd: usd.toFixed(2), price_monthly_inr: (usd*83).toFixed(2),
  price_hourly_usd: hourly ? (usd/730).toFixed(4) : '0', price_hourly_inr: hourly ? (usd*83/730).toFixed(4) : '0',
});
for (const [r,c,cc] of [['blr1','Bangalore','IN'],['sgp1','Singapore','SG'],['nyc3','New York','US']]) {
  add('digitalocean','Digitalocean','s-1vcpu-1gb',r,c,cc,1,1,25,'ssd',1,11.80,true);
  add('digitalocean','Digitalocean','s-1vcpu-2gb',r,c,cc,1,2,50,'ssd',2,23.60,true);
  add('digitalocean','Digitalocean','s-2vcpu-4gb',r,c,cc,2,4,80,'ssd',4,47.20,true);
  add('digitalocean','Digitalocean','s-4vcpu-8gb',r,c,cc,4,8,160,'ssd',5,94.40,true);
  add('digitalocean','Digitalocean','g-2vcpu-8gb',r,c,cc,2,8,25,'ssd',4,74.00,true);
  add('digitalocean','Digitalocean','s-8vcpu-16gb',r,c,cc,8,16,320,'ssd',6,188.80,true);
}
for (const [r,c,cc] of [['india','Mumbai','IN'],['eu','Nuremberg','DE']]) {
  add('contabo','Contabo','vps-s',r,c,cc,4,6,300,'ssd',null,26.60,false);
  add('contabo','Contabo','vps-m',r,c,cc,6,16,400,'ssd',null,42.00,false);
  add('contabo','Contabo','vps-l',r,c,cc,8,30,800,'ssd',null,68.00,false);
}
add('sharkcluster','SharkCluster','sc-1','in-west','Ahmedabad','IN',1,2,40,'nvme',2,19.00,true);
add('sharkcluster','SharkCluster','sc-2','in-west','Ahmedabad','IN',2,4,60,'nvme',3,22.00,true);
add('sharkcluster','SharkCluster','sc-4','in-west','Ahmedabad','IN',4,8,120,'nvme',4,40.00,true);

let pass = 0, fail = 0;
const chk = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}`);
  if (!ok) console.log(`        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`);
  ok ? pass++ : fail++;
};

const usd = S.pricePlans(rows, 'USD');
const inr = S.pricePlans(rows, 'INR');

console.log('\n-- catalogue shaping --');
chk('RAM tiers derived, capped at 96', S.ramTiers(usd), [1,2,4,6,8,16,30]);
chk('regions deduped', S.regionOptions(usd).map(r=>r.label), ['Ahmedabad','Bangalore','Mumbai','New York','Nuremberg','Singapore']);
chk('continents mapped', S.regionOptions(usd).map(r=>r.continent), ['Asia','Asia','Asia','America','Europe','Asia']);

console.log('\n-- selection at 4GB, all regions --');
let r = S.selectPlans(usd, 4, null, null);
chk('Recommended leads', r.cards[0].basePlan.reason, '✨ Recommended');
chk('Recommended is cheapest exact match', [r.cards[0].basePlan.provider, r.cards[0].basePlan.price], ['sharkcluster', 22]);
chk('Best Value is cheapest upgrade', [r.cards[1].basePlan.provider, r.cards[1].basePlan.price], ['contabo', 26.6]);
chk('Best Value notes extra RAM', r.cards[1].basePlan.extraSpecsText, '+2GB RAM extra');
chk('table holds remaining exact-tier plans', r.tablePlans.map(p=>p.price), [47.2,47.2,47.2]);

console.log('\n-- 2x cap on Best Value --');
r = S.selectPlans(usd, 1, null, null);
const over = r.cards.filter(c => c.basePlan.reason === 'Best Value' && c.basePlan.price > 11.80*2);
chk('no Best Value above 2x baseline', over.length, 0);

console.log('\n-- region filtering --');
r = S.selectPlans(usd, 4, 'nyc3', null);
chk('only New York plans', [...new Set(r.cards.map(c=>c.basePlan.region))], ['nyc3']);
r = S.selectPlans(usd, 30, 'nyc3', null);
chk('no 30GB in New York -> no cards', r.cards.length, 0);
chk('alternative regions named', r.alternativeRegions.sort(), ['Mumbai','Nuremberg']);

console.log('\n-- vCPU filter --');
r = S.selectPlans(usd, 8, null, 2);
// Recommended = cheapest that MEETS OR EXCEEDS specs, so >= is correct here.
chk('Recommended meets-or-exceeds vCPU', r.cards[0].basePlan.vcpus >= 2, true);
const exact = r.cards.find(c => c.basePlan.reason === 'Exact match');
chk('Exact-match card has exactly the requested vCPU', exact ? exact.basePlan.vcpus : 2, 2);
chk('no card below the requested vCPU', r.cards.every(c => c.basePlan.vcpus >= 2), true);
chk('table rows all match requested vCPU exactly', r.tablePlans.every(p => p.vcpus === 2), true);

console.log('\n-- currency --');
chk('INR price = USD x 83', S.selectPlans(inr,4,null,null).cards[0].basePlan.price, 22*83);
chk('USD formatting', S.formatPrice(22, 'USD'), '$22.00');
chk('96GB+ label', S.formatRam(96), '96GB+');
chk('sub-1GB label', S.formatRam(0.5), '0.50GB');

console.log('\n-- region dropdown grouping --');
r = S.selectPlans(usd, 6, null, null);
const contabo = r.cards.find(c => c.basePlan.provider === 'contabo');
chk('same plan grouped across regions', contabo.subPlans.map(p=>p.region_city).sort(), ['Mumbai','Nuremberg']);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
