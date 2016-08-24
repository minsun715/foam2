/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// TODO: support 'precision' in FloatView
foam.CLASS({
  package: 'com.google.foam.demos.sevenguis',
  name: 'TempConv',
  extends: 'foam.u2.Element',

  exports: [ 'as data' ],

  properties: [
    { class: 'Float', name: 'c', view: { class: 'foam.u2.TextField', onKey: true, precision: 4 } },
    { class: 'Float', name: 'f', view: { class: 'foam.u2.TextField', onKey: true, precision: 4 } }
  ],

  methods: [
    function initE() {
      this.nodeName = 'span';
      this.c$.relateTo(this.f$, this.c2f, this.f2c);
      this.add(this.C, ' Celsius = ', this.F, ' Fahrenheit');
    },
    function c2f(f) { return 9/5 * f + 32; },
    function f2c(c) { return 5/9 * ( c - 32 ); }
  ]
});
