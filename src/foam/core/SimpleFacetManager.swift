/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

public class SimpleFacetManager: FacetManager {
  public func getInstanceOf(value: Any, type: Any?.Type, x: X) -> Any? {
    return create(type: type, x: x)
  }

  public func create<T>(type: T.Type, x: X) -> T {
    let obj: T = (type as! Initializable.Type).init() as! T
    if var obj = obj as? ContextAware {
      obj.x = x
    }
    return obj
  }
}
