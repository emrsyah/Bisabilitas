import { toggleTheme } from '@lib/toggleTheme';
import { toggleContrast } from './toggleContrast';
import { hideImages } from './hideImage';
import { toggleSaturation } from './toggleSaturation';
import {applyTextSpacing} from './toggleTextSpacing'
// import { changeFontSize } from '@lib/changeFontSize';

console.log('content script loaded');

void toggleTheme();
void toggleContrast()
void hideImages()
void applyTextSpacing()
void toggleSaturation()
// void changeFontSize()
// void applyFontSize('normal')
