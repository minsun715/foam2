/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
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
  package: 'foam.node',
  name: 'ChildProcessManager',

  properties: [
    {
      name: 'process_',
      factory: function() { return require('process'); }
    },
    {
      class: 'Array',
      name: 'children_'
    }
  ],

  methods: [
    function init() {
      this.SUPER();
      this.process_.on('exit', this.onExit);
    },
    function add(childProcess) { this.children_.push(childProcess); },
    function remove(childProcess) {
      foam.Array.remove(this.children_, childProcess);
    }
  ],

  listeners: [
    function onExit(code) {
      var children = this.children_;
      for ( var i = 0; i < children.length; i++ ) {
        children[i].exit(code);
      }
    }
  ]
});
