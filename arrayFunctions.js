const permutationsWithRepetition = (n, as) =>
  as.length > 0 ? (
    foldl1(curry(cartesianProduct)(as), replicate(n, as))
  ) : [];

const cartesianProduct = (xs, ys) => [].concat.apply([], xs.map(x => [].concat.apply([], ys.map(y => [
  [x].concat(y)
]))));

const curry = f => a => b => f(a, b);

const flip = f => (a, b) => f.apply(null, [b, a]);

const foldl1 = (f, xs) =>
  xs.length > 0 ? xs.slice(1)
  .reduce(f, xs[0]) : [];

const replicate = (n, a) => {
  let v = [a],
    o = [];
  if (n < 1) return o;
  while (n > 1) {
    if (n & 1) o = o.concat(v);
    n >>= 1;
    v = v.concat(v);
  }
  return o.concat(v);
};

const group = xs => groupBy((a, b) => a === b, xs);

const groupBy = (f, xs) => {
  const dct = xs.slice(1)
    .reduce((a, x) => {
      const
        h = a.active.length > 0 ? a.active[0] : undefined,
        blnGroup = h !== undefined && f(h, x);

      return {
        active: blnGroup ? a.active.concat(x) : [x],
        sofar: blnGroup ? a.sofar : a.sofar.concat([a.active])
      };
    }, {
      active: xs.length > 0 ? [xs[0]] : [],
      sofar: []
    });
  return dct.sofar.concat(dct.active.length > 0 ? [dct.active] : []);
};

const compare = (a, b) => a < b ? -1 : (a > b ? 1 : 0);

const on = (f, g) => (a, b) => f(g(a), g(b));

const nub = xs => nubBy((a, b) => a === b, xs);

const nubBy = (p, xs) => {
  const x = xs.length ? xs[0] : undefined;

  return x !== undefined ? [x].concat(
    nubBy(p, xs.slice(1)
      .filter(y => !p(x, y)))
  ) : [];
};

const find = (f, xs) => {
  for (var i = 0, lng = xs.length; i < lng; i++) {
    if (f(xs[i], i)) return xs[i];
  }
  return undefined;
}

const take = (n, xs) => xs.slice(0, n);
const unlines = xs => xs.join('\n');
const show = x => JSON.stringify(x);
const head = xs => xs.length ? xs[0] : undefined;
const tail = xs => xs.length ? xs.slice(1) : undefined;
const length = xs => xs.length;

const asSum = xs => {
  const dct = xs.reduceRight((a, sign, i) => {
    const d = i + 1;
    if (sign !== 0) {
      return {
        digits: [],
        n: a.n + (sign * parseInt([d].concat(a.digits)
          .join(''), 10))
      };
    } else return {
      digits: [d].concat(a.digits),
      n: a.n
    };
  }, {
    digits: [],
    n: 0
  });
  return dct.n + (dct.digits.length > 0 ? (
    parseInt(dct.digits.join(''), 10)
  ) : 0);
};

const asString = xs => {
  const ns = xs.reduce((a, sign, i) => {
    const d = (i + 1)
      .toString();
    return (sign === 0 ? (
      a + d
    ) : (a + (sign > 0 ? ' +' : ' -') + d));
  }, '');

  return ns[0] === '+' ? tail(ns) : ns;
};
