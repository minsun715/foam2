/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

 foam.INTERFACE({
   package: 'foam.mlang.order',
   name: 'Comparator',

   documentation: 'Interface for comparing two values: -1: o1 < o2, 0: o1 == o2, 1: o1 > o2.',

   methods: [
     {
       name: 'compare',
       returns: 'Int',
       args: [
         'o1',
         'o2'
       ]
     },
     {
       name: 'toIndex',
       swiftEnabled: false,
       args: [
         'tail'
       ]
     },
     {
       // TODO: why is this here?
       /** Returns remaning ordering without this first one, which may be the
         only one. */
       name: 'orderTail',
       swiftEnabled: false,
     },
     {
       // TODO: why is this here?
       /** The property, if any, sorted by this ordering. */
       name: 'orderPrimaryProperty',
       swiftEnabled: false,
     },
     {
       // TODO: why is this here?
       /** Returns 1 or -1 for ascending/descending */
       name: 'orderDirection',
       swiftEnabled: false,
     }
   ]
 });
