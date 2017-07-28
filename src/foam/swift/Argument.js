foam.CLASS({
  package: 'foam.swift',
  name: 'Argument',

  properties: [
    ['externalName', '_'],
    'localName',
    'type',
    'defaultValue',
    'mutable',
    'escaping',
  ],

  methods: [
    function outputSwift(o) {
      o.out(
        this.externalName,
        this.externalName != this.localName ? ' ' + this.localName : '',
        ': ',
        this.mutable ? 'inout ' : '',
        this.escaping ? '@escaping ' : '',
        this.type,
        this.defaultValue ? ' = ' + this.defaultValue : '');
    }
  ]
});
