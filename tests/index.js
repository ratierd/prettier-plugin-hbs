const assert = require('assert').strict;
const prettier = require('prettier');

const shuffleArray = arrayToShuffle => {
  return arrayToShuffle.reduce(
    (accumulator, _, currentIndex) => {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      const temp = accumulator[currentIndex];
      accumulator[currentIndex] = accumulator[randomIndex];
      accumulator[randomIndex] = temp;
      return accumulator;
    },
    [...arrayToShuffle]
  );
};

const orderedClassNames =
  'className0 className1 className2 className3 className4 className5 className6 className7 className8 className9 className10 classNameA classNameB classNameC classNameD classNameE classNameF classNameG classNameH classNameI classNameJ classNameK classNameL classNameM classNameN classNameO classNameP classNameQ classNameR classNameS classNameT classNameU classNameV classNameW classNameX classNameY classNameZ';
const randomClassNamesOrder = shuffleArray(orderedClassNames.split(' '));

const orderedProperties = `property0={{value}}
property1={{value}}
property2={{value}}
property3={{value}}
property4={{value}}
property5={{value}}
property6={{value}}
property7={{value}}
property8={{value}}
property9={{value}}
property10={{value}}
propertyA={{value}}
propertyB={{value}}
propertyC={{value}}
propertyD={{value}}
propertyE={{value}}
propertyF={{value}}
propertyG={{value}}
propertyH={{value}}
propertyI={{value}}
propertyJ={{value}}
propertyK={{value}}
propertyL={{value}}
propertyM={{value}}
propertyN={{value}}
propertyO={{value}}
propertyP={{value}}
propertyQ={{value}}
propertyR={{value}}
propertyS={{value}}
propertyT={{value}}
propertyU={{value}}
propertyV={{value}}
propertyW={{value}}
propertyX={{value}}
propertyY={{value}}
propertyZ={{value}}`;
const randomPropertiesOrder = shuffleArray(orderedProperties.split('\n'));

const orderedAngleBracketProperties = `@property0={{value}}
@property1={{value}}
@property2={{value}}
@property3={{value}}
@property4={{value}}
@property5={{value}}
@property6={{value}}
@property7={{value}}
@property8={{value}}
@property9={{value}}
@property10={{value}}
@propertyA={{value}}
@propertyB={{value}}
@propertyC={{value}}
@propertyD={{value}}
@propertyE={{value}}
@propertyF={{value}}
@propertyG={{value}}
@propertyH={{value}}
@propertyI={{value}}
@propertyJ={{value}}
@propertyK={{value}}
@propertyL={{value}}
@propertyM={{value}}
@propertyN={{value}}
@propertyO={{value}}
@propertyP={{value}}
@propertyQ={{value}}
@propertyR={{value}}
@propertyS={{value}}
@propertyT={{value}}
@propertyU={{value}}
@propertyV={{value}}
@propertyW={{value}}
@propertyX={{value}}
@propertyY={{value}}
@propertyZ={{value}}`;
const randomAngleBracketPropertiesOrder = shuffleArray(
  orderedAngleBracketProperties.split('\n')
);

// -----------------------------------------------------------------------------

const angleBracketBlockInvocation = `
<MyComponent
${shuffleArray([
  ...randomPropertiesOrder,
  ...randomAngleBracketPropertiesOrder
]).join('\n')}
class="${randomClassNamesOrder.join(' ')}"
@class="${randomClassNamesOrder.join(' ')}"
data-test="value"
data-test-no-value
>
content
</MyComponent>
`;

let expectedOutput = `<MyComponent
  data-test='value'
  data-test-no-value
  class='${orderedClassNames}'
  ${orderedProperties.split('\n').join('\n  ')}
  @class='${orderedClassNames}'
  ${orderedAngleBracketProperties.split('\n').join('\n  ')}
>
  content
</MyComponent>`;

let prettierOutput = prettier.format(angleBracketBlockInvocation, {
  parser: 'hbs',
  plugins: ['.']
});

assert(prettierOutput === expectedOutput, 'Angle bracket block formatter FAIL');

// -----------------------------------------------------------------------------

const angleBracketInlineInvocation = `
<MyComponent
${shuffleArray([
  ...randomPropertiesOrder,
  ...randomAngleBracketPropertiesOrder
]).join('\n')}
class="${randomClassNamesOrder.join(' ')}"
@class="${randomClassNamesOrder.join(' ')}"
data-test="value"
data-test-no-value
/>
`;

expectedOutput = `<MyComponent
  data-test='value'
  data-test-no-value
  class='${orderedClassNames}'
  ${orderedProperties.split('\n').join('\n  ')}
  @class='${orderedClassNames}'
  ${orderedAngleBracketProperties.split('\n').join('\n  ')}
/>`;

prettierOutput = prettier.format(angleBracketInlineInvocation, {
  parser: 'hbs',
  plugins: ['.']
});

assert(
  prettierOutput === expectedOutput,
  'Angle bracket inline formatter FAIL'
);

// -----------------------------------------------------------------------------

const orderedMustacheProperties = `property0=value
property1=value
property2=value
property3=value
property4=value
property5=value
property6=value
property7=value
property8=value
property9=value
property10=value
propertyA=value
propertyB=value
propertyC=value
propertyD=value
propertyE=value
propertyF=value
propertyG=value
propertyH=value
propertyI=value
propertyJ=value
propertyK=value
propertyL=value
propertyM=value
propertyN=value
propertyO=value
propertyP=value
propertyQ=value
propertyR=value
propertyS=value
propertyT=value
propertyU=value
propertyV=value
propertyW=value
propertyX=value
propertyY=value
propertyZ=value`;
const randomMustachePropertiesOrder = shuffleArray(
  orderedMustacheProperties.split('\n')
);

// -----------------------------------------------------------------------------

// WARNING : Putting attributes with no '=' (ex. data-test-no-value) after any other properties will break the parser

const mustacheBlockInvocation = `
{{#my-component
data-test-no-value
data-test="value"
${randomMustachePropertiesOrder.join('\n')}
class="${randomClassNamesOrder.join(' ')}"
}}
content
{{/my-component}}
`;

expectedOutput = `{{#my-component
  data-test-no-value
  data-test='value'
  class='${orderedClassNames}'
  ${orderedMustacheProperties.split('\n').join('\n  ')}
}}
  content
{{/my-component}}`;

prettierOutput = prettier.format(mustacheBlockInvocation, {
  parser: 'hbs',
  plugins: ['.']
});

assert(
  prettierOutput === expectedOutput,
  'Angle bracket inline formatter FAIL'
);

// -----------------------------------------------------------------------------

const mustacheInlineInvocation = `
{{my-component
data-test-no-value
data-test="value"
${randomMustachePropertiesOrder.join('\n')}
class="${randomClassNamesOrder.join(' ')}"
}}
`;

expectedOutput = `{{my-component
  data-test-no-value
  data-test='value'
  class='${orderedClassNames}'
  ${orderedMustacheProperties.split('\n').join('\n  ')}
}}`;

prettierOutput = prettier.format(mustacheInlineInvocation, {
  parser: 'hbs',
  plugins: ['.']
});

assert(
  prettierOutput === expectedOutput,
  'Angle bracket inline formatter FAIL'
);
