import { toggleTheme } from '@lib/toggleTheme';
import { toggleContrast } from './toggleContrast';
import { hideImages } from './hideImage';
import { toggleSaturation } from './toggleSaturation';
import {applyTextSpacing} from './toggleTextSpacing'
import { applyDyslexicFont } from './changeDyslexic';
import { applyTextSize } from './changeFontSize';

console.log('content script loaded');

void toggleTheme();
void toggleContrast()
void hideImages()
void applyTextSpacing()
void toggleSaturation()
void applyDyslexicFont()
void applyTextSize()
// void changeFontSize()
// void applyFontSize('normal')
