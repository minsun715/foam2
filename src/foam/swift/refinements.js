foam.LIB({
  name: 'foam.util',

  methods: [
    function toSwiftType(type) {
      if ( cls = foam.lookup(type, true) ) {
        return cls.model_.swiftName;
      }
      // TODO this method needs work.
      return type == 'Boolean' ? 'Bool' :
             type
    },
  ]
});

foam.CLASS({
  refines: 'foam.core.Model',
  properties: [
    {
      class: 'String',
      name: 'swiftName',
      expression: function(name) { return name; },
    },
    {
      class: 'AxiomArray',
      of: 'foam.swift.SwiftImport',
      name: 'swiftImports',
      adaptArrayElement: function(o) {
        return foam.String.isInstance(o) ?
          foam.swift.SwiftImport.create({import: o}) :
          foam.swift.SwiftImport.create(o) ;
      }
    },
    {
      class: 'String',
      name: 'swiftExtends',
      factory: function() {
        // TODO: This should be an expression on extends but putting extends in
        // the args makes js unhappy.
        if ( this.extends == 'FObject' ) return 'AbstractFObject';
        return this.extends.split('.').pop();
      },
    },
    {
      class: 'StringArray',
      name: 'swiftImplements',
    },
    {
      class: 'String',
      name: 'swiftCode',
    },
  ],
});

foam.CLASS({
  refines: 'foam.core.AbstractInterface',
  axioms: [
    {
      installInClass: function(cls) {
        cls.buildSwiftClass =  function(cls) {
          cls = cls || foam.swift.Protocol.create();

          cls.name = this.model_.swiftName;
          cls.implements = this.model_.implements.map(function(i) { return foam.lookup(i.path).model_.swiftName });
          cls.extends = this.model_.extends && foam.lookup(this.model_.extends).swiftName;

          var self = this;
          var axioms = this.getAxioms().filter(function(a) {
            return !self.getSuperAxiomByName(a.name);
          });

          for ( var i = 0 ; i < axioms.length ; i++ ) {
            axioms[i].buildSwiftClass && axioms[i].buildSwiftClass(cls);
          }

          return cls;
        };
      }
    }
  ]
});

foam.CLASS({
  refines: 'foam.core.Argument',
  requires: [
    'foam.swift.Argument',
  ],
  properties: [
    {
      class: 'String',
      name: 'swiftLocalName',
      expression: function(name) { return name; },
    },
    {
      class: 'String',
      name: 'swiftExternalName',
      value: '_',
    },
    {
      class: 'String',
      name: 'swiftDefaultValue',
    },
    {
      class: 'String',
      name: 'swiftType',
      expression: function(of) {
        return foam.util.toSwiftType(of) || 'Any?';
      },
    },
  ],
  methods: [
    function toSwiftArg() {
      var arg = this.Argument.create({
        localName: this.swiftLocalName,
        externalName: this.swiftExternalName,
        type: this.swiftType,
      });
      if (this.swiftDefaultValue) arg.defaultValue = this.swiftDefaultValue;
      return arg;
    },
  ]
});

foam.CLASS({
  refines: 'foam.core.AbstractMethod',
  requires: [
    'foam.swift.Argument as SwiftArgument',
    'foam.core.Argument',
    'foam.swift.Method',
  ],
  properties: [
    {
      class: 'String',
      name: 'swiftName',
      expression: function(name) { return name == 'init' ? '__foamInit__' : name; },
    },
    {
      class: 'FObjectArray',
      of: 'foam.core.Argument',
      name: 'args',
      adaptArrayElement: function(o, prop) {
        return typeof o === 'string' ? foam.core.Argument.create({name: o}) :
            foam.core.Argument.create(o);
      },
    },
    {
      name: 'swiftArgs',
      expression: function(args) {
        var swiftArgs = [];
        args.forEach(function(a) {
          swiftArgs.push(this.Argument.create(a).toSwiftArg());
        }.bind(this));
        return swiftArgs;
      },
      adapt: function(_, n) {
        var self = this;
        var adaptElement = function(o) {
          if ( o.class ) {
            var m = foam.lookup(o.class);
            if ( ! m ) throw 'Unknown class : ' + o.class;
            return m.create(o, self);
          }
          return self.SwiftArgument.isInstance(o) ? o : self.SwiftArgument.create(o);
        }
        return n.map(adaptElement);
      },
    },
    {
      class: 'String',
      name: 'swiftVisibility',
      value: 'public',
    },
    {
      class: 'String',
      name: 'swiftCode',
    },
    {
      class: 'String',
      name: 'swiftReturns',
      expression: function(returns) {
        return foam.util.toSwiftType(returns)
      },
    },
    {
      class: 'StringArray',
      name: 'swiftAnnotations',
    }
  ],
  methods: [
    function createChildMethod_(child) {
      var m = child.clone();

      for ( var key in this.instance_ ) {
        if ( !m.hasOwnProperty(key) ) {
          m[key] = this.instance_[key]
        }
      }

      return m;
    },
    function writeToSwiftClass(cls, superAxiom) {
      if ( !this.swiftCode ) return;
      cls.method(this.Method.create({
        name: this.swiftName,
        body: this.swiftCode,
        returnType: this.swiftReturns,
        args: this.swiftArgs,
        visibility: this.swiftVisibility,
        override: !!(superAxiom && superAxiom.swiftCode) || this.name == 'init',
        annotations: this.swiftAnnotations,
      }));
    },
  ]
});

foam.CLASS({
  refines: 'foam.core.internal.InterfaceMethod',
  requires: [
    'foam.swift.ProtocolMethod',
  ],
  properties: [
    {
      class: 'Boolean',
      name: 'swiftEnabled',
      value: true,
    }
  ],
  methods: [
    function buildSwiftClass(cls, superAxiom) {
      if ( !this.swiftEnabled ) return;
      cls.method(this.ProtocolMethod.create({
        name: this.swiftName,
        returnType: this.swiftReturns,
        args: this.swiftArgs,
      }));
    },
  ]
});
