import { toggleTheme } from '@lib/toggleTheme';
import { toggleContrast } from './toggleContrast';
import { hideImages } from './hideImage';
import { toggleSaturation } from './toggleSaturation';
// import {applyTextSpacing} from './toggleTextSpacing'
import { applyDyslexicFont } from './changeDyslexic';
// import { applyTextSize } from './changeFontSize';
import { applyFocusRead } from './focusRead';
import { applySoundNavigation } from './soundNavigation';
import { toggleHighlightLink } from './highlightLink';
import { toggleBigCursor } from './toggleBigCursor';
import { applyTextAlignment } from './toggleTextAlignment'
import {applyTextSizePercentage} from './changeFontSizePercentage'
import { applyTextSpacing } from './changeLetterSpacingPercentage'
import {applyLineHeight} from './changeLineHeight'
import {applyMonochromeMode} from './toggleMonochrome'
// import {toggleAiAssistant} from './AiAssistant'
  

console.log('content script loaded');

void applyMonochromeMode()
void applyLineHeight()
void applyTextSizePercentage()
void applyTextAlignment()
void toggleBigCursor()
void toggleHighlightLink()
void toggleTheme();
void toggleContrast()
void hideImages()
void applyTextSpacing()
void toggleSaturation()
void applyDyslexicFont()
// void applyTextSize()
void applyFocusRead()
void applySoundNavigation()
// void toggleAiAssistant()
// void changeFontSize()
// void applyFontSize('normal')
