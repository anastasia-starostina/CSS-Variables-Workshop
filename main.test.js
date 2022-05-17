const { JSDOM } = require('jsdom');

const {
  toBeInTheDocument,
  toBeEmptyDOMElement,
  toHaveStyle,
  toHaveAttribute,
  toHaveClass,
} = require('@testing-library/jest-dom/matchers');

const {default: userEvent} = require('@testing-library/user-event');

expect.extend({
  toBeInTheDocument,
  toBeEmptyDOMElement,
  toHaveStyle,
  toHaveAttribute,
  toHaveClass,
});

const LEVELS = {
  one: 'level_one',
  two: 'level_two',
  three: 'level_three',
};

let document = null;
let window = null;
beforeEach(async () => {
  const jsDOM = await JSDOM.fromFile('index.html', {
    runScripts: 'dangerously',
    resources: 'usable',
    url: `file://${__dirname}/`,
    features: {
      FetchExternalResources: ['script'],
      ProcessExternalResources: ['script'],
    },
  });
  await new Promise((res) => {
    jsDOM.window.onload = res;
  });
  document = jsDOM.window.document;
  window = jsDOM.window;
});

afterEach(() => {
  document = null;
  window = null;
});

describe(LEVELS.one, () => {
  it(
    'should use the CSS variables in the correct places in the CSS',
    () => {
      expect(document.querySelector('.plant-listing')).toHaveStyle('background-color: var(--primary-colour)');
      expect(document.querySelector('body')).toHaveStyle('background-color: var(--secondary-colour)');
      expect(document.querySelector('.body')).toHaveStyle('color: var(--text-colour)');
      expect(document.querySelector('.plant-header')).toHaveStyle('font-size: var(--header-size)');
      expect(document.querySelector('main')).toHaveStyle('font-size: var(--text-size)');
      expect(document.querySelector('button')).toHaveStyle('font-size: var(--text-size)');
      expect(document.querySelector('.plant-listing')).toHaveStyle('border-radius: var(--border-radius)');
      expect(document.querySelector('.plant-pic')).toHaveStyle('border-radius: var(--border-radius)');
      expect(document.querySelector('button')).toHaveStyle('border-radius: var(--border-radius)');
    }
  );
});

describe(LEVELS.two, () => {
  it(
    'should have the value of main-text-size be 18px (without changing any of the places in the rest of the CSS)',
    () => {
      expect(document.querySelector('main')).toHaveStyle('font-size: 18px');
    }
  );
});
describe(LEVELS.three, () => {
  it(
    'should have function hooked up to #dark-mode-button button that toggles the .dark-mode-theme class on and off',
    () => {
      const button = document.getElementById('dark-mode-button');
      expect(document.querySelector('body')).not.toHaveClass('dark-mode-theme');
      
      userEvent.click(button);

      expect(document.querySelector('body')).toHaveClass('dark-mode-theme');
      expect(document.querySelector('.plant-listing')).toHaveStyle('background-color: rgb(0, 87, 0)');
      expect(document.querySelector('body')).toHaveStyle('background-color: black');
      expect(document.querySelector('.body')).toHaveStyle('color: white');      
    }
  );
});
