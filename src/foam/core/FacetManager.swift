/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

public protocol FacetManager {
  func getInstanceOf(value: Any, type: Any?.Type, x: X) -> Any?
  func create<T>(type: T.Type, x: X) -> T
}
