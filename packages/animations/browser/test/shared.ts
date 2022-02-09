/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {trigger} from '@angular/animations';

import {TriggerAst} from '../src/dsl/animation_ast';
import {buildAnimationAst} from '../src/dsl/animation_ast_builder';
import {AnimationTrigger, buildTrigger} from '../src/dsl/animation_trigger';
import {NoopAnimationStyleNormalizer} from '../src/dsl/style_normalization/animation_style_normalizer';
import {triggerParsingFailed} from '../src/error_helpers';
import {MockAnimationDriver} from '../testing/src/mock_animation_driver';

export function makeTrigger(
    name: string, steps: any, skipErrors: boolean = false): AnimationTrigger {
  const driver = new MockAnimationDriver();
  const errors: Error[] = [];
  const triggerData = trigger(name, steps);
  const triggerAst = buildAnimationAst(driver, triggerData, errors) as TriggerAst;
  if (!skipErrors && errors.length) {
    throw triggerParsingFailed(name, errors);
  }
  return buildTrigger(name, triggerAst, new NoopAnimationStyleNormalizer());
}
