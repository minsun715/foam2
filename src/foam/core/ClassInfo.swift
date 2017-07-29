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
  func getAxioms() -> [Any]
  func getAxiom(name: String) -> Any?
  func getAxiom(class: Any?.Type) -> Any?
}
