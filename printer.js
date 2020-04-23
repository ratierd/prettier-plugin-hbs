'use strict';

function orderClassNames(classNames) {
  return classNames
    .split(' ')
    .sort((className1, className2) =>
      className1.localeCompare(className2, undefined, { numeric: true })
    )
    .join(' ');
}

function sortAttributes(attr1, attr2) {
  if (!attr1.name) {
    return 0;
  }

  if (
    attr1.name.slice(0, 5) === 'data-' &&
    attr2.name.slice(0, 5) !== 'data-'
  ) {
    return -1;
  } else if (
    attr2.name.slice(0, 5) === 'data-' &&
    attr1.name.slice(0, 5) !== 'data-'
  ) {
    return 1;
  }

  if (attr1.name[0] !== '@' && attr2.name[0] === '@') {
    return -1;
  } else if (attr2.name[0] !== '@' && attr1.name[0] === '@') {
    return 1;
  }

  return attr1.name.localeCompare(attr2.name, undefined, { numeric: true });
}

function print(path, options, print) {
  const n = path.getValue();

  /* istanbul ignore if*/
  if (!n) {
    return '';
  }

  // order classnames
  if (
    (n.name === 'class' || n.name === '@class') &&
    n.value &&
    n.value.type === 'TextNode' &&
    n.value.chars
  ) {
    n.value.chars = orderClassNames(n.value.chars);
  }
  if (
    n.type === 'HashPair' &&
    (n.key === 'class' || n.key === '@class') &&
    n.value.type === 'StringLiteral' &&
    n.value.value
  ) {
    n.value.value = orderClassNames(n.value.value);
  }

  // order attributes
  if (n.type === 'ElementNode' && n.attributes) {
    n.attributes = n.attributes.sort(sortAttributes);
  }
  if (
    (n.type === 'MustacheStatement' || n.type === 'BlockStatement') &&
    n.hash &&
    n.hash.pairs
  ) {
    n.hash.pairs = n.hash.pairs
      .map(n => {
        n.name = n.key;
        return n;
      })
      .sort(sortAttributes)
      .map(n => {
        n.name = undefined;
        return JSON.parse(JSON.stringify(n));
      });
  }
}

module.exports = {
  print,
  massageAstNode: clean
};
