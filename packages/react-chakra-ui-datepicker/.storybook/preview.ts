import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator } from '@storybook/react';
import { withChakra } from './withChakra';

addDecorator(withKnobs);
addDecorator(withChakra);
