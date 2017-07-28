/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

struct FOAM_utils {
  public static func equals(_ o1: Any?, _ o2: Any?) -> Bool {
    let a = o1 as AnyObject?
    let b = o2 as AnyObject?
    if a === b { return true }
    if a != nil { return a!.isEqual(b) }
    return false
  }
}
