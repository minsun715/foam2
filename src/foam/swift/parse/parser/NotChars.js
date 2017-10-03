/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
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

foam.CLASS({
  package: 'foam.swift.parse.parser',
  name: 'NotChars',
  implements: ['foam.swift.parse.parser.Parser'],
  axioms: [
    foam.pattern.Multiton.create({ property: 'chars' })
  ],
  properties: [
    {
      swiftType: 'String',
      name: 'chars',
    },
  ],
  methods: [
    {
      name: 'parse',
      swiftCode: function() {/*
if ps.valid() && chars.index(of: ps.head()) == -1 {
  return ps.tail().setValue(ps.head())
}
return nil
      */},
    },
  ]
});