/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
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
  package: 'foam.dao',
  name: 'FlowControl',

  properties: [
    {
      class: 'Boolean',
      name: 'stopped'
    },
    {
      class: 'Object',
      name: 'errorEvt'
    }
  ],

  methods: [
    {
      name: 'stop',
      code: function() { this.stopped = true; },
      javaCode: 'setStopped(true);'
    },
    {
      name: 'error',
      code: function error(e) { this.errorEvt = e; }
    }
  ]
});


foam.INTERFACE({
  package: 'foam.dao',
  name: 'Sink',

  methods: [
    {
      name: 'put',
      returns: '',
      javaReturns: 'void',
      args: [
        {
          name: 'obj',
          javaType: 'foam.core.FObject'
        },
        {
          name: 'fc',
          javaType: 'foam.dao.FlowControl'
        }
      ],
      code: function() {}
    },
    {
      name: 'remove',
      returns: '',
      javaReturns: 'void',
      args: [
        {
          name: 'obj',
          javaType: 'foam.core.FObject'
        },
        {
          name: 'fc',
          javaType: 'foam.dao.FlowControl'
        }
      ],
      code: function() {}
    },
    {
      name: 'eof',
      returns: '',
      javaReturns: 'void',
      args: [],
      code: function() {}
    },
    {
      name: 'error',
      returns: '',
      javaReturns: 'void',
      args: [],
      code: function() {}
    },
    {
      name: 'reset',
      returns: '',
      javaReturns: 'void',
      args: [],
      code: function() {}
    }
  ]
});


foam.CLASS({
  package: 'foam.dao',
  name: 'ProxySink',
  implements: [ 'foam.dao.Sink' ],

  properties: [
    {
      class: 'Proxy',
      of: 'foam.dao.Sink',
      name: 'delegate'
    }
  ]
});


foam.CLASS({
  package: 'foam.dao',
  name: 'AbstractSink',

  implements: [ 'foam.dao.Sink' ],

  methods: [
    {
      name: 'put',
      code: function() {},
      javaCode: 'return;'
    },
    {
      name: 'remove',
      code: function() {},
      javaCode: 'return;'
    },
    {
      name: 'eof',
      code: function() {},
      javaCode: 'return;'
    },
    {
      name: 'error',
      code: function() {},
      javaCode: 'return;'
    },
    {
      name: 'reset',
      code: function() {},
      javaCode: 'return;'
    }
  ]
});

foam.CLASS({
  package: 'foam.dao',
  name: 'QuickSink',

  extends: 'foam.dao.AbstractSink',

  properties: [
    {
      class: 'Function',
      name: 'putFn'
    },
    {
      class: 'Function',
      name: 'removeFn'
    },
    {
      class: 'Function',
      name: 'eofFn'
    },
    {
      class: 'Function',
      name: 'errorFn'
    },
    {
      class: 'Function',
      name: 'resetFn'
    },
  ],

  methods: [
    function put() {
      return this.putFn && this.putFn.apply(this, arguments);
    },
    function remove() {
      return this.removeFn && this.removeFn.apply(this, arguments);
    },
    function eof() {
      return this.eofFn && this.eofFn.apply(this, arguments);
    },
    function error() {
      return this.errorFn && this.errorFn.apply(this, arguments);
    },
    function reset() {
      return this.resetFn && this.resetFn.apply(this, arguments);
    },
  ]
});

foam.CLASS({
  package: 'foam.dao',
  name: 'AnonymousSink',
  implements: [ 'foam.dao.Sink' ],
  properties: [
    {
      name: 'sink'
    }
  ],
  methods: [
    function put(obj, fc) {
      var s = this.sink;
      s && s.put && s.put(obj, fc);
    },
    function remove(obj, fc) {
      var s = this.sink;
      s && s.remove && s.remove(obj, fc);
    },
    function eof() {
      var s = this.sink;
      s && s.eof && s.eof();
    },
    function error() {
      var s = this.sink;
      s && s.error && s.error();
    },
    function reset() {
      var s = this.sink;
      s && s.reset && s.reset();
    }
  ]
});

foam.CLASS({
  package: 'foam.dao',
  name: 'PredicatedSink',
  extends: 'foam.dao.ProxySink',

  properties: [
    {
      class: 'FObjectProperty',
      of: 'foam.mlang.predicate.Predicate',
      name: 'predicate'
    }
  ],

  methods: [
    {
      name: 'put',
      code: function put(obj, fc) {
        if ( this.predicate.f(obj) ) this.delegate.put(obj, fc);
      },
      javaCode: 'if ( getPredicate().f(obj) ) getDelegate().put(obj, fc);'
    },
    {
      name: 'remove',
      code:     function remove(obj, fc) {
        if ( this.predicate.f(obj) ) this.delegate.remove(obj, fc);
      },
      javaCode: 'if ( getPredicate().f(obj) ) getDelegate().remove(obj, fc);'
    }
  ]
});


foam.CLASS({
  package: 'foam.dao',
  name: 'LimitedSink',
  extends: 'foam.dao.ProxySink',

  properties: [
    {
      class: 'Int',
      name: 'limit'
    },
    {
      name: 'count',
      class: 'Int',
      value: 0
    }
  ],

  methods: [
    {
      name: 'put',
      code: function put(obj, fc) {
        if ( this.count++ >= this.limit ) {
          fc && fc.stop();
        } else {
          this.delegate.put(obj, fc);
        }
      },
      javaCode: 'if ( getCount() >= getLimit() ) {\n'
              + '  fc.stop();\n'
              + '} else {\n'
              + '  setCount(getCount() + 1);\n'
              + '  getDelegate().put(obj, fc);\n'
              + '}\n'
    },
    {
      name: 'remove',
      code: function remove(obj, fc) {
        if ( this.count++ >= this.limit ) {
          fc && fc.stop();
        } else {
          this.delegate.remove(obj, fc);
        }
      },
      javaCode: 'if ( getCount() >= getLimit() ) {\n'
              + '  fc.stop();\n'
              + '} else {'
              + '  setCount(getCount() + 1);\n'
              + '  getDelegate().put(obj, fc);\n'
              + '}\n'
    }
  ]
});


foam.CLASS({
  package: 'foam.dao',
  name: 'SkipSink',
  extends: 'foam.dao.ProxySink',

  properties: [
    {
      class: 'Int',
      name: 'skip'
    },
    {
      name: 'count',
      class: 'Int',
      value: 0
    }
  ],

  methods: [
    {
      name: 'put',
      code: function put(obj, fc) {
        if ( this.count < this.skip ) {
          this.count++;
          return;
        }

        this.delegate.put(obj, fc);
      },
      javaCode: 'if ( getCount() < getSkip() ) {\n'
              + '  setCount(getCount() + 1);\n'
              + '  return;'
              + '}\n'
              + 'getDelegate().put(obj, fc);'
    },
    {
      name: 'remove',
      code: function remove(obj, fc) {
        if ( this.count < this.skip ) {
          this.count++;
          return;
        }
        this.delegate.remove(obj, fc);
      },
      javaCode: 'if ( getCount() < getSkip() ) {\n'
              + '  setCount(getCount() + 1);\n'
              + '  return;'
              + '}\n'
              + 'getDelegate().remove(obj, fc);'
    }
  ]
});


foam.CLASS({
  package: 'foam.dao',
  name: 'OrderedSink',
  extends: 'foam.dao.ProxySink',

  properties: [
    {
      class: 'FObjectProperty',
      of: 'foam.mlang.order.Comparator',
      name: 'comparator'
    },
    {
      class: 'Object',
      name: 'array',
      javaType: 'java.util.List',
      // TODO(adamvy): Java factory
      factory: function() { return []; }
    }
  ],

  methods: [
    {
      name: 'put',
      code: function put(obj, fc) {
        this.array.push(obj);
      },
      javaCode: 'if ( getArray() == null ) setArray(new java.util.ArrayList());\n'
                + 'getArray().add(obj);'
    },
    {
      name: 'eof',
      code: function eof() {
        var comparator = this.comparator;
        this.array.sort(function(o1, o2) {
          return comparator.compare(o1, o2);
        });

        for ( var i = 0 ; i < this.array.length ; i++ ) {
          this.delegate.put(this.array[i]);
        }
      },
      javaCode: 'if ( getArray() == null ) setArray(new java.util.ArrayList());\n'
                + 'java.util.Collections.sort(getArray());\n'
                + 'foam.dao.FlowControl fc = (foam.dao.FlowControl)getX().create(foam.dao.FlowControl.class);\n'
                + 'for ( Object o : getArray() ) {\n'
                + '  if ( fc.getStopped() || fc.getErrorEvt() != null ) {\n'
                + '    break;\n'
                + '  }\n'
                + '  getDelegate().put((foam.core.FObject)o, fc);\n'
                + '}'
    },

    function remove(obj, fc) {
      // TODO
    }
  ]
});


foam.CLASS({
  package: 'foam.dao',
  name: 'DedupSink',
  extends: 'foam.dao.ProxySink',

  properties: [
    {
      /** @private */
      name: 'results_',
      hidden: true,
      factory: function() { return {}; }
    },
  ],

  methods: [
    {
      /** If the object to be put() has already been seen by this sink,
        ignore it */
      name: 'put',
      code: function put(obj, fc) {
        if ( ! this.results_[obj.id] ) {
          this.results_[obj.id] = true;
          return this.delegate.put(obj, fc);
        }
      }
    }
  ]
});

