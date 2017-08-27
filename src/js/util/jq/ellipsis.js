import $ from 'jquery';
import 'jquery.dotdotdot';

import type from 'class/util/type-util';

export default function ellipsis(selector, option) {
  if (!type.isString(selector)) {
    throw new Error('selector is not a string!');
  }

  const $tgt = $(selector);

  // do nothing when the result length is 0
  if ($tgt.length === 0) return;
  $tgt.dotdotdot(Object.assign({
    wrap: 'letter',
    watch: true
  }, option));
}
