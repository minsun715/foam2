/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

public protocol X {
  func get(key: Any) -> Any?
  func get(x: X, key: Any) -> Any?
  func put(key: Any, value: Any) -> X
  func putFactory(key: Any, factory: XFactory) -> X

  // Facet Manager
  func getInstanceOf(value: Any, type: Any?.Type) -> Any?
  func create<T>(type: T.Type) -> T
}
