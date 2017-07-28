/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

public protocol ClassInfo {
  var id: String { get }
  var parent: ClassInfo? { get }
  func isInstance(_ o: Any?) -> Bool
  func newInstance() -> Any
  func getObjClass() -> Any?.Type

  /*
  List      getAxioms();
  Object    getAxiomByName(String name);
  List      getAxiomsByClass(Class cls);
 */
}

