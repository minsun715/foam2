/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

public protocol FObject: ContextAware, Comparator {
  var classInfo: ClassInfo { get }
  func fclone() -> FObject
  func diff(obj: FObject) -> [String:Any?]
  func setProperty(_ prop: String, value: Any?) -> FObject
  func getProperty(_ prop: String) -> Any?
}
