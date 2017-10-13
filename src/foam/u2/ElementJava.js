/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2',
  name: 'Element',
});
foam.CLASS({
  package: 'foam.u2',
  name: 'CSS',
  properties: [ 'code' ]
});
foam.CLASS({
  package: 'foam.u2',
  name: 'View',
});
foam.CLASS({
  refines: 'foam.core.Model',
  properties: [
    {
      name: 'tableProperties',
    },
    {
      name: 'tableColumns',
      
    },
    {
      name: 'searchColumns',
    },
    {
      name: 'tableCellFormatter',
    },
    {
      name: 'generateJava'
    }
  ]
});
foam.CLASS({
  refines: 'foam.core.Currency',
  properties: [
    {
      name: 'tableCellFormatter',
    },
  ]
});
foam.CLASS({
  refines: 'foam.core.Double',
  properties: [
    {
      name: 'tableCellFormatter',
    },
  ]
});
foam.CLASS({
  refines: 'foam.core.Long',
  properties: [
    {
      name: 'tableCellFormatter',
    },
  ]
});
foam.CLASS({
  refines: 'foam.core.Date',
  properties: [
    {
      name: 'tableCellFormatter',
    },
  ]
});
foam.CLASS({
  refines: 'foam.core.Property',
  properties: [
    {
      name: 'tableCellFormatter',
    },
  ]
});
foam.CLASS({
  refines: 'foam.core.Boolean',
  properties: [
    {
      name: 'tableCellFormatter',
    },
    {
      name: 'tableCellView',
    },
  ]
});
foam.CLASS({
  refines: 'foam.core.String',
  properties: [
    {
      name: 'tableCellFormatter',
    },
    {
      name: 'tableCellView',
    },
   
    {
      name: 'view'
    },
  ]
});
foam.CLASS({
  refines: 'foam.core.Method',
  properties: [
    {
      name: 'javaCode',
    },
  ]
});